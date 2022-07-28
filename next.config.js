/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["kopis.or.kr", "cdn.class101.net"],
    formats: ["image/avif", "image/webp"]
  },
  swcMinify: true
};
