/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TypeScript Error থাকলেও Build থামবে না
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint Warning থাকলেও Build থামবে না
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;