// @ts-check
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': false,
      }
    }
    return config
  },
  turbopack: {   
  },
  allowedDevOrigins: [
    '100.71.110.116',
    '*.tail1234.ts.net',
    '100.*',
  ],
}

export default nextConfig