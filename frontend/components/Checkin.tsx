import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Webcam from 'react-webcam'
import toast from 'react-hot-toast'
import { uploadFile } from '../modules/IPFS'
import { useContracts } from '../providers/contracts'
import { useWriteContract } from 'wagmi'

function CaptureButton({
  getScreenshot,
  uploadImage,
}: {
  getScreenshot: any
  uploadImage: any
}): React.ReactElement {
  return (
    <div>
      <button
        onClick={() => {
          getScreenshot()
        }}
        className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Capture Photo
      </button>
      <button
        onClick={() => {
          uploadImage()
        }}
        className="ml-4 rounded-full bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Upload Photo
      </button>
    </div>
  )
}

function useLocation() {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setLocation({ latitude, longitude })
      })
    }
  }, [])

  return location
}

// Main component
export function Checkin({ id }: { id: number }): React.ReactElement {
  const router = useRouter()
  const webcamRef = React.useRef<Webcam>(null)
  const location = useLocation()
  const [photo, setPhoto] = useState<string | null>(null)
  const [ipfsHash, setIpfsHash] = useState<string | null>(null)
  const [transactionStarted, setTransactionStarted] = useState(false)
  const { data: contractsData } = useContracts()
  const { data: hash, isPending, isError, writeContract } = useWriteContract()

  const eventManager = contractsData?.EventManager

  const capture = useCallback(() => {
    const base64jpeg = webcamRef.current?.getScreenshot()
    setPhoto(base64jpeg || null)
  }, [webcamRef])

  const uploadPhoto = async () => {
    if (photo) {
      try {
        const fetchRes = await fetch(photo)
        const blob = await fetchRes.blob()
        const file = new File([blob], 'photo.jpeg', { type: 'image/jpeg' })
        const ipfsHash = await uploadFile(file)

        if (ipfsHash) {
          toast.success('Photo uploaded successfully!')
          setIpfsHash(ipfsHash)
          requestCheckIn()
        }
      } catch (error) {
        toast.error('Error uploading photo. Try again later.')
      }
    } else {
      toast.error('No photo to upload. Please capture a photo first.')
    }
  }

  const requestCheckIn = async () => {
    if (!eventManager?.address || !ipfsHash || !location) {
      console.error('Missing data for check-in.')
      return
    }

    setTransactionStarted(true)
    try {
      await writeContract({
        address: eventManager.address,
        abi: eventManager.abi,
        functionName: 'requestCheckIn',
        args: [id, ipfsHash, `${location.latitude},${location.longitude}`],
      })
      toast.success('Check-in request sent!')
    } catch (error) {
      console.error('Smart contract interaction failed', error)
      toast.error('Check-in request failed. Try again later.')
    } finally {
      setTransactionStarted(false)
    }
  }

  useEffect(() => {
    if (transactionStarted && !isPending && !isError) {
      router.push('/events')
    }
  }, [isPending, isError, transactionStarted, router])

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  }

  return (
    <main className="m-auto mt-8 flex min-h-screen w-full flex-col items-center justify-center">
      {photo ? (
        <Image src={photo} alt="Captured photo" width={1280} height={720} />
      ) : (
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
      )}

      <CaptureButton getScreenshot={capture} uploadImage={uploadPhoto} />

      <div className="mt-4">
        {location ? (
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        ) : (
          <p>Loading location...</p>
        )}
      </div>
    </main>
  )
}
