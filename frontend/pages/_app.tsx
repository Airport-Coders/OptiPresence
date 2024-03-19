import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { optimismSepolia, hardhat } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { Toaster } from 'react-hot-toast';

const config = getDefaultConfig({
	appName: 'Airport Coders',
	projectId: 'YOUR_PROJECT_ID',
	chains: [optimismSepolia, hardhat],
	ssr: true,
});

const client = new QueryClient();

function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<RainbowKitProvider locale="en">
					<Toaster position="top-center" />
					<Component {...pageProps} />
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

export default App;
