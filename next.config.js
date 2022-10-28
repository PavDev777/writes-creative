/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/ALm5wu06O1sxKM4SIGWwht_sginGZZ9I7s_vKmqLjsRY=s96-c'
      }
    ]
  }
}

module.exports = nextConfig
