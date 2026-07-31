export type Locale = 'zh-CN' | 'zh-Hant' | 'en'
export type Theme = 'light' | 'dark'
export type ProductPlatform = 'mac' | 'windows'

export interface NavItem {
  href: string
  label: string
}

export interface FeatureItem {
  tag: string
  title: string
  description: string
  icon: 'trash' | 'code' | 'apps' | 'files' | 'restore' | 'system' | 'database' | 'rocket' | 'network' | 'shield' | 'software' | 'driver'
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
  features: string[]
  href: string
  theme: 'wallet' | 'vpn' | 'homeGuard'
}

export interface ProductPageCopy {
  hero: {
    ecosystem: string
    eyebrow: string
    title: string
    lead: string
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
    visualSystem: string
    visualBadge: string
    scanValue: string
    scanUnit: string
    selectedValue: string
    candidates: Array<{ kind: string; tone: 'cyan' | 'green' | 'amber'; title: string; value: string; guarded?: boolean }>
    visualFooter: string[]
  }
  factsLabel: string
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
  faq: {
    eyebrow: string
    title: string
    description: string
    items: FaqItem[]
  }
}

export interface SiteCopy {
  skipMain: string
  homeLabel: string
  navLabel: string
  openMenu: string
  closeMenu: string
  languageLabel: string
  platformSwitchLabel: string
  switchToLight: string
  switchToDark: string
  headerCta: string
  nav: NavItem[]
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

export interface LocaleMessages {
  shared: SiteCopy
  pages: Record<ProductPlatform, ProductPageCopy>
}
