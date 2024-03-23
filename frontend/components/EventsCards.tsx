import { useContracts } from '../providers/contracts'
import { useReadContract } from 'wagmi'
import { getFileUrl } from '../modules/IPFS'
import Image from 'next/image'
import { useRouter } from 'next/router'

function EventCard(props: { event: any }) {
  const router = useRouter()
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp * 1000))
  }

  const navigateToEvent = () => {
    router.push(`/event/${props.event.index}`)
  }

  const mapsQuery = encodeURIComponent(props.event.location)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`

  return (
    <div
      onClick={navigateToEvent}
      className="cursor-pointer rounded-lg border border-purple-300 bg-purple-100 p-6 shadow-xl transition duration-300 ease-in-out hover:bg-purple-200 hover:shadow-2xl"
    >
      <h2 className="text-2xl font-semibold text-purple-900">
        {props.event.name}
      </h2>
      <p className="mt-2 text-purple-700">{props.event.description}</p>
      <div className="mt-4 overflow-hidden rounded-lg shadow-sm">
        <Image
          src={getFileUrl(props.event.imageHash)}
          alt={props.event.name}
          className="w-full object-cover transition-transform duration-500 hover:scale-105"
          width={400}
          height={200}
          loading="lazy"
        />
      </div>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded bg-purple-900 px-4 py-2 font-medium text-white transition duration-200 hover:bg-purple-700"
      >
        View location on map
      </a>
      <p className="mt-4 text-sm text-purple-600">
        {formatDate(Number(props.event.startTime))} -{' '}
        {formatDate(Number(props.event.endTime))}
      </p>
    </div>
  )
}

export function EventsCardsContainer() {
  const { data: contractsData } = useContracts()
  const eventManager = contractsData?.EventManager
  const { data: allEventsData, isLoading: isReadContractPending } =
    useReadContract({
      address: eventManager?.address,
      abi: eventManager?.abi,
      functionName: 'getAllEvents',
      args: [],
    })

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isReadContractPending && <p>Loading...</p>}
      {(allEventsData as any)?.map((event: any, index: number) => {
        const eventWithIndex = { ...event, index: index }
        return <EventCard key={event.index} event={eventWithIndex} />
      })}
    </div>
  )
}
