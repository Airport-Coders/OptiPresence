import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { toast } from 'react-hot-toast';

const Home: NextPage = () => {
	const handleButtonClick = () => {
		toast.success('Nice toast!');
	};

	return (
		<div>
			<Head>
				<title>Home</title>
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center h-screen">
				<ConnectButton />
				<button onClick={handleButtonClick}>Show Success Toast</button>
			</main>
		</div>
	);
};

export default Home;
