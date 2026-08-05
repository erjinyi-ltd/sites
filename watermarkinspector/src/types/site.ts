export type Locale = 'zh-CN' | 'zh-Hant' | 'en'
export type Theme = 'light' | 'dark'

export interface NavItem {
  href: string
  label: string
}

export interface FeatureItem {
  title: string
  description: string
  tag: string
}

export interface FlowStep {
  number: string
  title: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface SiteCopy {
  skipMain: string
  homeLabel: string
  navLabel: string
  openMenu: string
  closeMenu: string
  languageLabel: string
  switchToLight: string
  switchToDark: string
  headerCta: string
  nav: NavItem[]
  hero: {
    ecosystem: string
    eyebrow: string
    title: string
    lead: string
    primaryAction: string
    secondaryAction: string
    proof: string
    visualLabel: string
    visualInput: string
    visualScanning: string
    visualResult: string
    visualFound: string
    visualReview: string
    visualReady: string
  }
  facts: Array<{ value: string; label: string; description: string }>
  capability: {
    eyebrow: string
    title: string
    description: string
    items: FeatureItem[]
  }
  flow: {
    eyebrow: string
    title: string
    description: string
    steps: FlowStep[]
  }
  redaction: {
    eyebrow: string
    title: string
    description: string
    points: string[]
    badge: string
    visualLabel: string
    visualFace: string
    visualText: string
    visualExport: string
  }
  privacy: {
    eyebrow: string
    title: string
    description: string
    points: Array<{ title: string; description: string }>
    note: string
  }
  faq: {
    eyebrow: string
    title: string
    description: string
    items: FaqItem[]
  }
  closing: {
    eyebrow: string
    title: string
    description: string
    action: string
  }
  footer: {
    menuLabel: string
    contactUs: string
    email: string
    twitter: string
    telegram: string
    home: string
    products: string
    media: string
    updates: string
    join: string
    about: string
    privacy: string
    terms: string
    support: string
    copyright: string
  }
}
