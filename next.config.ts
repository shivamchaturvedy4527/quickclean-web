import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "quickclean.co.in" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/company/team", destination: "/our-team", permanent: true },
      { source: "/company/sustainability", destination: "/sustainability", permanent: true },
      { source: "/company/investors", destination: "/our-investors", permanent: true },
      { source: "/company/financial-planning", destination: "/financial-planning", permanent: true },
      { source: "/solutions", destination: "/build-own-and-operate", permanent: false },
      { source: "/solutions/build-own-operate", destination: "/build-own-and-operate", permanent: true },
      { source: "/solutions/turnkey", destination: "/turnkey-project", permanent: true },
      { source: "/solutions/linen-rental", destination: "/linen-rental", permanent: true },
      { source: "/solutions/equipment-on-lease", destination: "/equipment-on-lease", permanent: true },
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
