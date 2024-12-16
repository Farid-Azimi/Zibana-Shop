// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'localhost',
//           port: '5000', 
//           pathname: '/images/**', 
//         },
//       ],
//     },
//   };
  
//   export default nextConfig;
  

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // تنظیم برای localhost با هر دو پروتکل
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
      // تنظیم برای example.com
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
