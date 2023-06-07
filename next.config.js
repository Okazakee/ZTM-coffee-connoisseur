/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["images.unsplash.com", "media-cdn.tripadvisor.com"],
  },
};
