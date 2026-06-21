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
  benefitsHeading?: string;
  sidebarTitle?: string;
  sidebarText?: string;
  breadcrumb?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  features: string[];
  specs?: string[];
  category?: string;
  imageAspectRatio?: string;
  imageObjectFit?: "cover" | "contain";
  heroImageAlt?: string;
  enquireTitle?: string;
  enquireText?: string;
  enquireCtaText?: string;
  specsHeading?: string;
  featuresHeading?: string;
  breadcrumb?: string;
}

export interface GalleryImage {
  src: string;
  caption?: string;
}

export interface InstallationGalleryContent {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
}

export interface PressingMachineItem {
  name: string;
  image: string;
}

export interface PressingMachinesContent {
  title: string;
  subtitle?: string;
  items: PressingMachineItem[];
}

export interface Client {
  id: string;
  name: string;
}

export interface ProductsPageContent {
  title: string;
  intro: string;
  heroImage?: string;
  overviewEyebrow?: string;
  overviewTitle?: string;
  machinesEyebrow?: string;
  machinesTitle?: string;
  machinesSubtitle?: string;
  enquireTitle?: string;
  enquireText?: string;
  enquireCtaText?: string;
  specsHeading?: string;
  featuresHeading?: string;
  productImageAspectRatio?: string;
  productImageObjectFit?: "cover" | "contain";
  viewDetailsText?: string;
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
  companyLegalName: string;
  tagline: string;
  logo: string;
  favicon: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappGreetingTemplate: string;
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
  logoMaxWidth?: number;
  logoMaxHeight?: number;
  mapLatitude?: number;
  mapLongitude?: number;
  mapZoom?: number;
}

export interface WaterComparison {
  title: string;
  industryLabel: string;
  industryDisplayValue: number;
  industryValue: number;
  industryUnit: string;
  qcLabel?: string;
  qcDisplayValue?: number;
  qcValue?: number;
  qcUnit?: string;
  laundrexLabel: string;
  laundrexDisplayValue: number;
  laundrexValue: number;
  laundrexUnit: string;
  monthlySavedLabel: string;
  monthlySaved: number;
  yearlySavedLabel: string;
  yearlySaved: number;
}

export interface HomeContent {
  heroTitle: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  heroImage: string;
  heroImages?: string[];
  /** Auto-slide interval in seconds (default 5). */
  heroSlideInterval?: number;
  stats: StatItem[];
  linenWashedLabel: string;
  linenWashedValue: number;
  linenWashedSuffix: string;
  linenWashedUnit: string;
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
  productsTitle?: string;
  productsSubtitle?: string;
  productsVideoUrl?: string;
  productsVideoFileUrl?: string;
  productsVideoSourceUrl?: string;
  companyProfile?: string;
  heroEyebrow?: string;
  heroFeatures?: HeroFeatureItem[];
}

export interface HeroFeatureItem {
  line1: string;
  line2: string;
}

export interface FooterContent {
  aboutText: string;
  manufacturedByLabel?: string;
  manufacturedByCompany?: string;
  manufacturedByDivision?: string;
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

export interface WhatsAppInquiryOption {
  value: string;
  label: string;
}

export interface SiteLabels {
  breadcrumbs: {
    company: string;
    contact: string;
    products: string;
    solutions: string;
    getInTouch: string;
    ourSolutions: string;
  };
  home: {
    readMore: string;
    viewProduct: string;
    fullCatalogue: string;
    machinesEyebrow: string;
    clientsEyebrow: string;
    heroImageAlt: string;
  };
  solutions: {
    learnMore: string;
    benefitsHeading: string;
    partnerTitle: string;
    partnerText: string;
    contactCta: string;
    keyPointsHeading: string;
  };
  products: {
    viewDetails: string;
    enquireTitle: string;
    enquireText: string;
    enquireCta: string;
    specsHeading: string;
    featuresHeading: string;
  };
  contact: {
    getInTouchTitle: string;
    getInTouchSubtitle: string;
    sendMessageTitle: string;
    sendMessageSubtitle: string;
    serviceCentresTitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formPhonePlaceholder: string;
    formCompany: string;
    formMessage: string;
    formSubmit: string;
    formSubmitting: string;
    formSuccess: string;
    formError: string;
  };
  newsletter: {
    namePlaceholder: string;
    emailPlaceholder: string;
    subscribe: string;
    subscribing: string;
    successTitle: string;
    successText: string;
    errorName: string;
    errorEmail: string;
    errorGeneric: string;
  };
  whatsapp: {
    ariaLabel: string;
    modalTitle: string;
    modalSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneError: string;
    inquiryLabel: string;
    inquiryOptional: string;
    submit: string;
    submitting: string;
    inquiryOptions: WhatsAppInquiryOption[];
  };
  meta: {
    about: string;
    contact: string;
    products: string;
    solutions: string;
    news: string;
    sustainability: string;
    financialPlanning: string;
    reweave360: string;
    team: string;
    investors: string;
    blog: string;
    terms: string;
    privacy: string;
    codeOfConduct: string;
  };
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
    breadcrumb?: string;
    expertSolutions?: {
      title: string;
      sections: { title: string; items: string[] }[];
    };
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
    partnersTitle?: string;
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
    heroImage?: string;
    serviceCentres?: string[];
    breadcrumb?: string;
    getInTouchTitle?: string;
    getInTouchSubtitle?: string;
    sendMessageTitle?: string;
    sendMessageSubtitle?: string;
    serviceCentresTitle?: string;
  };
  products: Product[];
  productsPage: ProductsPageContent;
  installationGallery?: InstallationGalleryContent;
  pressingMachines?: PressingMachinesContent;
  clients: Client[];
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
  pptMediaArchive?: string[];
  labels: SiteLabels;
}
