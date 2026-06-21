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
    'localhost',
  ],
}

export default nextConfig