'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { uploadFile, getFileUrl } from '../modules/IPFS'

export default function Home() {
  const [file, setFile] = useState('')
  const [cid, setCid] = useState('')
  const [uploading, setUploading] = useState(false)

  const inputFile = useRef(null)

  const handleChange = async (e: any) => {
    setFile(e.target.files[0])
    setUploading(true)
    const cid = await uploadFile(e.target.files[0])
    setCid(cid)
    setUploading(false)
  }

  return (
    <main className="m-auto flex min-h-screen w-full flex-col items-center justify-center">
      <input type="file" id="file" ref={inputFile} onChange={handleChange} />
      <button
        disabled={uploading}
        onClick={() => (inputFile.current as any)?.click()}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {cid && (
        <Image
          width={500}
          height={500}
          src={`${getFileUrl(cid)}`}
          alt="Image from IPFS"
        />
      )}
    </main>
  )
}
