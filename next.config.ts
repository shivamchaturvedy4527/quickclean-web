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
      { source: "/build-own-and-operate", destination: "/solutions/basic-analysis-planning", permanent: true },
      { source: "/solutions/build-own-operate", destination: "/solutions/basic-analysis-planning", permanent: true },
      { source: "/turnkey-project", destination: "/solutions/process-improvement", permanent: true },
      { source: "/solutions/turnkey", destination: "/solutions/process-improvement", permanent: true },
      { source: "/linen-rental", destination: "/solutions/laundry-consultancy", permanent: true },
      { source: "/solutions/linen-rental", destination: "/solutions/laundry-consultancy", permanent: true },
      { source: "/equipment-on-lease", destination: "/solutions/laundry-consultancy", permanent: true },
      { source: "/solutions/equipment-on-lease", destination: "/solutions/laundry-consultancy", permanent: true },
      { source: "/blog", destination: "/news", permanent: true },
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
      { source: "/careers", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
