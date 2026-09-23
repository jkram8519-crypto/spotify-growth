import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Les cas d'étude ont été retirés en attendant de vrais témoignages vérifiables.
      { source: '/case-studies', destination: '/', permanent: false },
    ];
  },
};

export default nextConfig;
