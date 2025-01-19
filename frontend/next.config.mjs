/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;