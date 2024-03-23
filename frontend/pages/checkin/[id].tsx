import { useRouter } from 'next/router'
import { Checkin } from '../../components/Checkin'

export default function CheckinPage(): React.ReactElement {
  const router = useRouter()
  const { id } = router.query

  return (
    <main className="m-auto mt-8 flex min-h-screen w-full flex-col items-center justify-center">
      <Checkin id={Number(id)} />
    </main>
  )
}
