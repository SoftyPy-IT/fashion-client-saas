const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "media.neelabh.com.bd",
      },
      {
        protocol: "https",
        hostname: "neelabh.com.bd",
      },
      {
        protocol: "http",
        hostname: "neelabh.com.bd",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
      },
    ],
  },
};

export default nextConfig;
