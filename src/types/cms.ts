export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  priceFromINR: number;
  priceFromUSD: number;
  priceFromEUR: number;
  priceFromAED: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
}

export interface BrandLogo {
  id: string;
  name: string;
  image: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo: string;
  favicon: string;
  whatsappNumber: string;
  whatsappMessage: string;
  liveChatEmbed: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  linkedin: string;
  twitter: string;
  facebook: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroImage: string;
  stats: StatItem[];
  sustainabilityTitle: string;
  sustainabilityStats: StatItem[];
  founderTitle: string;
  founderMessage: string;
  founderName: string;
  founderRole: string;
  founderImage: string;
  sinceYear: string;
  brandsTitle: string;
  clientsTitle: string;
  newsTitle: string;
  newsSubtitle: string;
}

export interface CMSData {
  settings: SiteSettings;
  navigation: NavItem[];
  home: HomeContent;
  solutions: Solution[];
  testimonials: Testimonial[];
  brands: BrandLogo[];
  blog: BlogPost[];
  about: {
    title: string;
    intro: string;
    mission: string;
    vision: string;
    timeline: TimelineItem[];
  };
  sustainability: {
    title: string;
    intro: string;
    metrics: StatItem[];
    initiatives: { title: string; description: string }[];
  };
  team: {
    title: string;
    intro: string;
    members: TeamMember[];
  };
  investors: {
    title: string;
    intro: string;
    highlights: string[];
  };
  careers: {
    title: string;
    intro: string;
    benefits: string[];
    openings: { title: string; location: string; type: string }[];
  };
  contact: {
    title: string;
    intro: string;
    mapEmbed: string;
  };
  footer: {
    aboutText: string;
    copyright: string;
  };
  contactSubmissions: ContactSubmission[];
}
