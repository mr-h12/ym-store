import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds the static demo (Cloudflare Pages). Normal builds stay server-capable.
const nextConfig: NextConfig = process.env.STATIC_EXPORT === "1" ? { output: "export" } : {};

export default nextConfig;
