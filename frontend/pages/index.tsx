import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button } from '@chakra-ui/react';
const Home: NextPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleButtonClick = () => {
		toast.success('Nice toast!');

		onOpen();
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
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>
						<ModalCloseButton />
						<ModalBody>Tester modal</ModalBody>
						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
							<Button variant="ghost">Secondary Action</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</main>
		</div>
	);
};

export default Home;
