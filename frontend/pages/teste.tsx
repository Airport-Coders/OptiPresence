import { UserInfoCard } from '../components/UserInfoCard'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
  const { address, isConnected } = useAccount()

  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">User Info</h1>
      {address ? (
        <UserInfoCard address={address} />
      ) : (
        <>
          <div>Connect your wallet</div>
          <ConnectButton />
        </>
      )}
    </main>
  )
}
