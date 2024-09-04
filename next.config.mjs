/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      { hostname: "yyhj2qom6nwl5skj.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
