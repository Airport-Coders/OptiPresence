import { useContracts } from '../providers/contracts'
import { useReadContract } from 'wagmi'
import { getFileUrl } from '../modules/IPFS'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface UserCheckInProps {
  address: string
  id: string
}

const UserCheckIn: React.FC<UserCheckInProps> = ({ address, id }) => {
  const { data: contractsData } = useContracts()
  const checkInManager = contractsData?.CheckInManager

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp * 1000))
  }

  const {
    data: checkInData,
    isLoading,
    isError,
  } = useReadContract({
    address: checkInManager?.address,
    abi: checkInManager?.abi,
    functionName: 'getUserCheckIns',
    args: [id, address],
  })

  if (isLoading)
    return <div className="text-center text-gray-600">Loading...</div>
  if (isError || !checkInData)
    return <div className="text-center text-red-500">Error fetching data</div>

  const latestCheckIn = (checkInData as any)[(checkInData as any).length - 1]
  const faceImageUrl = getFileUrl(latestCheckIn.faceHash)
  const mapsQuery = encodeURIComponent(latestCheckIn.location)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`

  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
      {faceImageUrl && (
        <div className="flex justify-center">
          <Image
            src={faceImageUrl}
            alt="Face"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900">
        Address: {address}
      </h3>
      <p className="flex items-center text-sm text-gray-600">
        <span className="material-icons-outlined mr-2 text-gray-500">
          Face hash:
        </span>
        {latestCheckIn.faceHash}
      </p>
      <p className="flex items-center text-sm text-gray-600">
        <span className="material-icons-outlined mr-2 text-gray-500">
          Checkin location:
        </span>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded bg-gray-900 px-4 py-2 font-medium text-white transition duration-200 hover:bg-purple-700"
        >
          View location on map
        </a>
      </p>
      <p className="flex items-center text-sm text-gray-600">
        <span className="material-icons-outlined mr-2 text-gray-500">
          Chekin time:
        </span>
        {formatDate(Number(latestCheckIn.timestamp))}
      </p>
      <p className="flex items-center text-sm text-gray-600">
        <span className="material-icons-outlined mr-2 text-gray-500">
          Status:
        </span>
        {latestCheckIn.status ? 'Checked in' : 'Not checked in'}
      </p>
    </div>
  )
}
interface CheckInEventListProps {
  id: string
}

export function CheckInEventList({
  id,
}: CheckInEventListProps): React.ReactElement {
  const { data: contractsData } = useContracts()
  const checkInManager = contractsData?.CheckInManager
  const router = useRouter()

  const {
    data: checkInListData,
    isLoading,
    isError,
  } = useReadContract({
    address: checkInManager?.address,
    abi: checkInManager?.abi,
    functionName: 'getUsersCheckInsFromEvent',
    args: [id],
  })

  if (isLoading)
    return <div className="text-center text-gray-600">Loading...</div>
  if (isError || !checkInListData)
    return <div className="text-center text-red-500">Error fetching data</div>

  return (
    <main className="m-auto mt-8 flex min-h-screen w-full flex-col items-center justify-center">
      <button
        onClick={() => router.push(`/checkin/${id}`)}
        className="mt-4 inline-block rounded bg-gray-900 px-4 py-2 font-medium text-white transition duration-200 hover:bg-purple-700"
      >
        Make check in
      </button>
      <h1 className="text-3xl font-semibold text-gray-900">Check-ins</h1>
      <ul className="list-none space-y-4">
        {(checkInListData as any).map((address: string, index: number) => (
          <li
            key={index}
            className="transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
          >
            <UserCheckIn address={address} id={id} />
          </li>
        ))}
      </ul>
    </main>
  )
}
