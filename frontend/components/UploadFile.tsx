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
    toast.success('File uploaded successfully! 🎉')
    return resData.IpfsHash
  } catch (e) {
    toast.error('Error uploading file 😢 Try again later')
  }
}
