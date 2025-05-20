/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["admin.i-read.org", "i-read.org", "ireadapp.techparkit.org", "www.aalto.fi", "cdn.pixabay.com", "127.0.0.1", "localhost", "i.ibb.co", "ibb.co"],
  },
  // Disable static generation or implement ISR
  experimental: {
    isrMemoryCacheSize: 0,
  },
};

export default nextConfig;
