import toast from 'react-hot-toast'

export const uploadFile = async (fileToUpload: any) => {
  try {
    const data = new FormData()
    data.set('file', fileToUpload)
    const res = await fetch('/api/files', {
      method: 'POST',
      body: data,
    })
    const resData = await res.json()
    console.log(resData)
    toast.success('File uploaded successfully! 🎉')
    return resData.IpfsHash
  } catch (e) {
    toast.error('Error uploading file 😢 Try again later')
  }
}

export const getFileUrl = (cid: string) => {
  return `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}`
}
