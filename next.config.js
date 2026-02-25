/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["firebase"],
  },
};

module.exports = nextConfig;
