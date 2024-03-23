import { EventsCardsContainer } from '../components/EventsCards'
import { CreateEvent } from '../components/CreateEvent'

export default function Events() {
  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Events</h1>
      <CreateEvent />
      <EventsCardsContainer />
    </main>
  )
}
