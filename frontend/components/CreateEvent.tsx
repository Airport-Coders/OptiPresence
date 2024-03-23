import React, { useState, useEffect } from 'react'
import {
  Button,
  Input,
  Box,
  FormControl,
  FormLabel,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { uploadFile, getFileUrl } from '../modules/IPFS'
import { useContracts } from '../providers/contracts'
import { useWriteContract } from 'wagmi'
import toast from 'react-hot-toast'
import Image from 'next/image'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

function useLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  })

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setLocation({ latitude, longitude } as any)
      })
    }
  }, [])

  return location
}

export function CreateEvent() {
  const { data: contractsData } = useContracts()
  const eventManager = contractsData?.EventManager
  const { writeContract } = useWriteContract()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [imageHash, setImageHash] = useState('')
  const userLocation = useLocation()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const sendTransaction = async () => {
    let finalImageHash = imageHash

    if (image && !imageHash) {
      const uploadedImageHash = await uploadFile(image)
      finalImageHash = uploadedImageHash
    }

    const startTimestamp = new Date(startTime).getTime() / 1000
    const endTimestamp = new Date(endTime).getTime() / 1000

    writeContract({
      address: eventManager?.address as any,
      abi: eventManager?.abi,
      functionName: 'createEvent',
      args: [
        name,
        description,
        finalImageHash,
        `${userLocation.latitude},${userLocation.longitude}`,
        startTimestamp,
        endTimestamp,
      ],
    })
  }

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      toast.promise(
        uploadFile(file).then((hash) => {
          setImageHash(hash)
          return getFileUrl(hash)
        }),
        {
          loading: 'Uploading image...',
          success: 'Image uploaded successfully!',
          error: 'Error uploading image!',
        },
      )
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Create Event</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Event Image</FormLabel>
              <Input type="file" onChange={handleFileChange} />
              {imageHash && (
                <Box mt={2}>
                  <Image
                    src={getFileUrl(imageHash)}
                    alt="Event Image"
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover"
                  />
                </Box>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input
                isReadOnly
                value={`Latitude: ${userLocation.latitude}, Longitude: ${userLocation.longitude}`}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={sendTransaction}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
