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
      {
        protocol: 'https',
        hostname: 'nyc3.digitaloceanspaces.com',  // Add this line for the new domain
        pathname: '/**', // You can adjust the pathname as needed
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
