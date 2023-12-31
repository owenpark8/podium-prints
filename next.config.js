/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "localhost",
        pathname: "**",
        port: "4566",
        protocol: "http",
      },
      {
        hostname: "localhost.localstack.cloud",
        pathname: "**",
        port: "4566",
        protocol: "http",
      },
      {
        protocol: "https",
        hostname: "podium-prints.com",
      },
    ],
  },
};

module.exports = nextConfig;
