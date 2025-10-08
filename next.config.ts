import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "u9o9f5tedy.ufs.sh"
      }
    ]
  }
};

export default nextConfig;
