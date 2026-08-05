export type Locale = 'zh-CN' | 'zh-Hant' | 'en'
export type Theme = 'light' | 'dark'

export type NavItem = {
  label: string
  href: string
}

export type Feature = {
  code: string
  title: string
  text: string
  tags: string[]
}

export type ArchitectureLayer = {
  index: string
  title: string
  text: string
  tags: string[]
}

export type FlowStep = {
  index: string
  title: string
  text: string
}

export type SiteCopy = {
  lang: string
  skip: string
  navLabel: string
  nav: NavItem[]
  menuOpen: string
  menuClose: string
  themeLight: string
  themeDark: string
  localeLabel: string
  panelEntry: string
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  heroPrimary: string
  heroSecondary: string
  heroSignals: string[]
  console: {
    title: string
    live: string
    overview: string
    hosts: string
    events: string
    policies: string
    totalHosts: string
    online: string
    openEvents: string
    activeTasks: string
    hostName: string
    platform: string
    status: string
    protected: string
    updated: string
  }
  facts: Array<{ value: string; label: string }>
  featuresEyebrow: string
  featuresTitle: string
  featuresLead: string
  features: Feature[]
  architectureEyebrow: string
  architectureTitle: string
  architectureLead: string
  architectureLayers: ArchitectureLayer[]
  architectureNote: string
  flowEyebrow: string
  flowTitle: string
  flowLead: string
  flowSteps: FlowStep[]
  controlEyebrow: string
  controlTitle: string
  controlLead: string
  controls: Array<{ title: string; text: string }>
  faqEyebrow: string
  faqTitle: string
  faqs: Array<{ question: string; answer: string }>
  closingEyebrow: string
  closingTitle: string
  closingLead: string
  closingPrimary: string
  closingSecondary: string
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
