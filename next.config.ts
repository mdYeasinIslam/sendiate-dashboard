import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dezfej6wq/image/upload/v1748285799/uploads/file.png',
      },
    ],
    domains: [
      'i.pravatar.cc',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'avatars.githubusercontent.com',
      'randomuser.me',
      'res.cloudinary.com',
    ],
  },
};

export default nextConfig;
