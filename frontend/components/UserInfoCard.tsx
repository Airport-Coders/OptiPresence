import React from 'react'
import { useReadContract } from 'wagmi'
import { useContracts } from '../providers/contracts'
import { Address } from 'viem'

export function UserInfoCard({ address }: { address: Address }) {
  const { data: contractsData, isLoading: contractsLoading } = useContracts()
  const UserRegistry = contractsData?.UserRegistry

  const {
    data: userInfoData,
    error: readContractError,
    isLoading: isReadContractPending,
  } = useReadContract({
    address: UserRegistry?.address,
    abi: UserRegistry?.abi,
    functionName: 'getUserInfo',
    args: [address],
  })

  if (!address) {
    return <div>No address provided</div>
  }

  return (
    <>
      {contractsLoading && <div>Loading contract info...</div>}
      {isReadContractPending && <div>Loading user info...</div>}
      {readContractError && <div>Error: {readContractError.message}</div>}
      {userInfoData && <div>Hello, {(userInfoData as any).name}</div>}
    </>
  )
}
