/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "https://amzn-s3-lecture-bucket.s3.us-west-2.amazonaws.com",
      "gw.alipayobjects.com",
      "www.skillfinder.com.au",
      "images.pexels.com",
    ],
  },
};

export default nextConfig;
