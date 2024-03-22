import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

import { ContractsProvider } from '../providers/contracts'

const config = getDefaultConfig({
  appName: 'Airport Coders',
  projectId: 'YOUR_PROJECT_ID',
  chains: [optimismSepolia],
  ssr: true,
})

const client = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider locale="en">
          <Toaster position="top-center" />
          <ChakraProvider>
            <ContractsProvider>
              <Component {...pageProps} />
            </ContractsProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
