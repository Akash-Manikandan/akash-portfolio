/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  // Image optimization
  images: {
    remotePatterns: [
      { hostname: "yyhj2qom6nwl5skj.public.blob.vercel-storage.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Production optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  reactStrictMode: true,

  // Remove console logs in production
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Optimize CSS
  experimental: {
    optimizeCss: true,
    optimisticClientCache: true,
    serverMinification: true,
    serverSourceMaps: true,
    optimizeServerReact: true,
  },

  // Output configuration for Vercel
  output: "standalone",
};

export default nextConfig;
