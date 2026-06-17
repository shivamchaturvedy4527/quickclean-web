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
  heroImage?: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
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
  image?: string;
  rating?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
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

export interface NewsletterSubmission {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface LegalLink {
  label: string;
  href: string;
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
  businessHours: string;
  headerCtaText: string;
  headerCtaLink: string;
  careersLabel: string;
}

export interface WaterComparison {
  title: string;
  industryLabel: string;
  industryValue: number;
  industryUnit: string;
  qcLabel: string;
  qcValue: number;
  qcUnit: string;
  monthlySavedLabel: string;
  monthlySaved: number;
  yearlySavedLabel: string;
  yearlySaved: number;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  heroImage: string;
  stats: StatItem[];
  linenWashedLabel: string;
  linenWashedValue: number;
  linenWashedSuffix: string;
  waterComparison: WaterComparison;
  solutionsTitle: string;
  solutionsSubtitle: string;
  sustainabilityTitle: string;
  sustainabilityStats: StatItem[];
  sustainabilityImpactTitle: string;
  founderTitle: string;
  founderMessage: string;
  founderName: string;
  founderRole: string;
  founderImage: string;
  sinceYear: string;
  videoTitle: string;
  videoUrl: string;
  videoThumbnail: string;
  brandsTitle: string;
  clientsTitle: string;
  newsTitle: string;
  newsSubtitle: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

export interface FooterContent {
  aboutText: string;
  copyright: string;
  solutionsTitle: string;
  companyTitle: string;
  headOfficeTitle: string;
  legalLinks: LegalLink[];
}

export interface CookieConsentContent {
  message: string;
  acceptText: string;
  declineText: string;
  policyLink: string;
  policyLabel: string;
}

export interface InvestorPartner {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
}

export interface ReweaveStep {
  title: string;
  description: string;
}

export interface ReweaveBenefit {
  title: string;
}

export interface Reweave360Content {
  heroTitle: string;
  heroSubtitle: string;
  stats: StatItem[];
  partnersTitle: string;
  wakeUpTitle: string;
  wakeUpParagraphs: string[];
  programTitle: string;
  programDescription: string;
  howItWorksTitle: string;
  steps: ReweaveStep[];
  benefitsTitle: string;
  benefits: ReweaveBenefit[];
  wasteToWorthTitle: string;
  wasteToWorthDescription: string;
  getStartedTitle: string;
  getStartedDescription: string;
  contactPhone: string;
  contactEmail: string;
  contactWebsite: string;
  ctaText: string;
}

export interface FinancialPlanningContent {
  title: string;
  intro: string;
  sections: { title: string; content: string }[];
}

export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
}

export interface CMSData {
  settings: SiteSettings;
  navigation: NavItem[];
  home: HomeContent;
  solutions: Solution[];
  testimonials: Testimonial[];
  brands: BrandLogo[];
  blog: BlogPost[];
  blogCategories: string[];
  about: {
    title: string;
    intro: string;
    mission: string;
    vision: string;
    heroImage: string;
    timeline: TimelineItem[];
    missionTitle: string;
    visionTitle: string;
    journeyTitle: string;
  };
  sustainability: {
    title: string;
    intro: string;
    heroImage: string;
    metrics: StatItem[];
    initiatives: { title: string; description: string; image?: string }[];
  };
  team: {
    title: string;
    intro: string;
    heroImage: string;
    members: TeamMember[];
  };
  investors: {
    title: string;
    intro: string;
    highlights: string[];
    partners: InvestorPartner[];
  };
  careers: {
    title: string;
    intro: string;
    benefitsTitle: string;
    benefits: string[];
    openingsTitle: string;
    openings: JobOpening[];
  };
  contact: {
    title: string;
    intro: string;
    mapEmbed: string;
  };
  footer: FooterContent;
  cookieConsent: CookieConsentContent;
  reweave360: Reweave360Content;
  financialPlanning: FinancialPlanningContent;
  legal: {
    privacy: LegalPageContent;
    terms: LegalPageContent;
    codeOfConduct: LegalPageContent;
  };
  contactSubmissions: ContactSubmission[];
  newsletterSubmissions: NewsletterSubmission[];
}
