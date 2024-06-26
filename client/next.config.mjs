/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i3.ytimg.com',
        port: '',
        pathname: '/vi/**'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  }
}

export default nextConfig 