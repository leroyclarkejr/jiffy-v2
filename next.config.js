/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GIPHY_API: process.env.GIPHY_API,
  },
};

module.exports = nextConfig;
