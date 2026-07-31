export type Locale = 'zh-CN' | 'zh-Hant' | 'en'
export type Theme = 'light' | 'dark'

export interface NavItem {
  href: string
  label: string
}

export interface FeatureItem {
  tag: string
  title: string
  description: string
  icon: 'trash' | 'code' | 'apps' | 'files' | 'restore' | 'system'
}

export interface PlatformItem {
  platform: string
  name: string
  status: string
  statusTone: 'ready' | 'limited' | 'building'
  description: string
  features: string[]
  note: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface EcosystemProduct {
  type: string
  name: string
  description: string
  href: string
  theme: 'wallet' | 'vpn' | 'homeGuard'
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
    macStatus: string
    windowsStatus: string
    visualLabel: string
    scan: string
    review: string
    confirm: string
    recover: string
    reclaimable: string
    selected: string
    guarded: string
  }
  facts: Array<{ value: string; label: string; description: string }>
  platforms: {
    eyebrow: string
    title: string
    description: string
    items: PlatformItem[]
  }
  capabilities: {
    eyebrow: string
    title: string
    description: string
    items: FeatureItem[]
  }
  workflow: {
    eyebrow: string
    title: string
    description: string
    steps: Array<{ number: string; title: string; description: string }>
  }
  safety: {
    eyebrow: string
    title: string
    description: string
    points: Array<{ title: string; description: string }>
    note: string
  }
  windows: {
    eyebrow: string
    title: string
    description: string
    status: string
    features: string[]
    boundary: string
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
    primary: string
    secondary: string
  }
  ecosystem: {
    eyebrow: string
    title: string
    description: string
    officialWebsite: string
    moreTitle: string
    moreDescription: string
    viewAll: string
    products: EcosystemProduct[]
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
