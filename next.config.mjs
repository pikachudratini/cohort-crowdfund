/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_BASE_PATH || '';

const nextConfig = {
  experimental: {},
  basePath,
};

export default nextConfig;
