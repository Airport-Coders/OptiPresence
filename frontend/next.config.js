/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_PINATA_GATEWAY: process.env.PINATA_GATEWAY,
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
