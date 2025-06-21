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
        // pathname: '/dezfej6wq/image/upload/v1748285799/uploads/file.png',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nyc3.digitaloceanspaces.com',  // Add this line for the new domain
        pathname: '/**', // You can adjust the pathname as needed
      },
      {
        protocol: 'https',
        hostname: 'tor1.digitaloceanspaces.com',  // Add this line for the new domain
        pathname: '/**', // You can adjust the pathname as needed
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',  // Add this line for the new domain
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
      'nyc3.digitaloceanspaces.com',
      'tor1.digitaloceanspaces.com',
      'upload.wikimedia.org'
    ],
  },
};

export default nextConfig;
