import { Address } from 'viem'
import { loadContracts } from '../modules/Contracts'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export function ContractsProvider({ children }: { children: React.ReactNode }) {
  const { data: contracts } = useQuery({
    queryKey: ['contracts'],
    queryFn: loadContracts,
  })

  return <>{children}</>
}

interface Contract {
  address: Address
  abi: any
}

export function useContracts(): UseQueryResult<{ [key: string]: Contract }> {
  return useQuery({
    queryKey: ['contracts'],
    queryFn: loadContracts,
  })
}
