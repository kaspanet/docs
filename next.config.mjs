import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/toccata",
        destination: "/programmability",
        permanent: true,
      },
      {
        source: "/toccata/:path*",
        destination: "/programmability/:path*",
        permanent: true,
      },
      {
        source: "/programmability/covenants",
        destination: "/programmability/covenant-state",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
