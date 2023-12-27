/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "localhost",
    //   "podium-prints.com",
    //   "podium-prints-production.up.railway.app",
    // ],
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        protocol: "https",
        hostname: "podium-prints-production.up.railway.app",
      },
    ],
  },
};

module.exports = nextConfig;
