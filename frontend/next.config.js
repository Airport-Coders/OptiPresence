/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_PINATA_GATEWAY: process.env.PINATA_GATEWAY,
    NEXT_PUBLIC_CONTRACT_UserRegistry: process.env.CONTRACT_UserRegistry,
    NEXT_PUBLIC_CONTRACT_EventManager: process.env.CONTRACT_EventManager,
    NEXT_PUBLIC_CONTRACT_CheckInManager: process.env.CONTRACT_CheckInManager,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.PINATA_GATEWAY,
      },
    ],
  },
}

module.exports = nextConfig
