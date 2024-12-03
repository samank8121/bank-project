import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "~@/styles/variables.scss";@import "~@/styles/mixins.scss";`,
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
