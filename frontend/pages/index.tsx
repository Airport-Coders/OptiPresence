import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Home</title>
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen">
				<ConnectButton />
			</main>
		</div>
	);
};

export default Home;
