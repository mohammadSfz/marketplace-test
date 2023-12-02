/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            hostname: 'i.dummyjson.com'
          },
        ],
      },
}

module.exports = nextConfig
