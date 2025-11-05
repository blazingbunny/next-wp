import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow remote images from the WordPress host (from env) and a known WP domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.cannafeatured.pro",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: `${process.env.WORDPRESS_URL}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
