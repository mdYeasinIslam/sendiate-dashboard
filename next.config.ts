import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [new URL('https://randomuser.me/api/portraits/**')],
      domains: [
      'i.pravatar.cc',
      'images.unsplash.com',
      'cdn.pixabay.com',
        'avatars.githubusercontent.com',
      'randomuser.me/api/portraits/**'
      // Add more domains here if needed
    ],
  },
};

export default nextConfig;
