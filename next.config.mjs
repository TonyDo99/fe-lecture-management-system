/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "https://amzn-s3-lecture-bucket.s3.us-west-2.amazonaws.com",
      "os.alipayobjects.com",
      "images.pexels.com",
    ],
  },
};

export default nextConfig;
