import type { NextConfig } from "next";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
  console.info = () => {};
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
