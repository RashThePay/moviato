import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
        protocol: "https",
        pathname: "*/**"
      }
    ]
  }
};

export default nextConfig;
