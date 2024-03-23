import { CheckInEventList } from '../../components/CheckInEventList'
import { useRouter } from 'next/router'

export default function Event() {
  const router = useRouter()
  const { id } = router.query

  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center">
      <CheckInEventList id={id as string} />
    </main>
  )
}
