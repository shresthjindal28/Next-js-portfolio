import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  images: {
    domains: [
      'img.icons8.com',
      'images.unsplash.com',
      'plus.unsplash.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
