import type { Locale } from '../i18n/chrome'

interface FooterLabels {
  contactHeading: string
  emailLabel: string
  twitter: string
  telegram: string
  navigationLabel: string
  socialLabel: string
  copyright: string
  privacy: string
  terms: string
  cookies: string
  home: string
  products: string
  media: string
  updates: string
  research: string
  partners: string
  join: string
  about: string
}
const labels: Record<Locale, FooterLabels> = {
  'zh-CN': {
    contactHeading: 'GCSA 联系方式',
    emailLabel: '联系邮箱',
    twitter: '推特',
    telegram: 'Telegram',
    navigationLabel: '页面导航',
    socialLabel: '社交媒体',
    copyright: '© Global Cybersecurity Alliance. 保留所有权利。',
    privacy: '隐私政策',
    terms: '使用条款',
    cookies: 'Cookie 设置',
    home: '首页',
    products: 'GCSA 生态产品',
    media: 'GCSA 媒体',
    updates: 'GCSA 动态',
    research: 'GCSA AI网络安全研究所',
    partners: 'GCSA 战略合作及顾问',
    join: '加入联盟',
    about: '关于联盟',
  },
  'zh-Hant': {
    contactHeading: 'GCSA 聯繫方式',
    emailLabel: '聯繫郵箱',
    twitter: '推特',
    telegram: 'Telegram',
    navigationLabel: '頁面導航',
    socialLabel: '社交媒體',
    copyright: '© Global Cybersecurity Alliance. 保留所有權利。',
    privacy: '隱私政策',
    terms: '使用條款',
    cookies: 'Cookie 設置',
    home: '首頁',
    products: 'GCSA 生態產品',
    media: 'GCSA 媒體',
    updates: 'GCSA 動態',
    research: 'GCSA AI網絡安全研究所',
    partners: 'GCSA 戰略合作及顧問',
    join: '加入聯盟',
    about: '關於聯盟',
  },
  en: {
    contactHeading: 'GCSA Contact',
    emailLabel: 'Email',
    twitter: 'X',
    telegram: 'Telegram',
    navigationLabel: 'Page navigation',
    socialLabel: 'Social media',
    copyright: '© Global Cybersecurity Alliance. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    cookies: 'Cookie Settings',
    home: 'Home',
    products: 'GCSA Ecosystem Products',
    media: 'GCSA Media',
    updates: 'GCSA Updates',
    research: 'GCSA AI Cybersecurity Research Institute',
    partners: 'GCSA Strategic Partners & Advisors',
    join: 'Join the Alliance',
    about: 'About Alliance',
  },
}

export function getGcsaFooter(locale: Locale) {
  const copy = labels[locale]
  const siteBase = locale === 'zh-CN'
    ? 'https://gcsa.org'
    : locale === 'zh-Hant'
      ? 'https://gcsa.org/zh-TW'
      : 'https://gcsa.org/en-US'
  const mediaBase = locale === 'zh-CN'
    ? 'https://media.gcsa.org/'
    : locale === 'zh-Hant'
      ? 'https://media.gcsa.org/zh-TW'
      : 'https://media.gcsa.org/en-US'

  return {
    ...copy,
    navigation: [
      { key: 'home', label: copy.home, href: siteBase },
      { key: 'products', label: copy.products, href: siteBase + '/products' },
      { key: 'media', label: copy.media, href: mediaBase },
      { key: 'updates', label: copy.updates, href: siteBase + '/forums' },
      { key: 'research', label: copy.research, href: siteBase + '/ai-research-institute' },
      { key: 'partners', label: copy.partners, href: siteBase + '/strategic-partners' },
      { key: 'join', label: copy.join, href: siteBase + '/contact' },
      { key: 'about', label: copy.about, href: siteBase + '/about' },
    ],
    legal: [
      { label: copy.privacy, href: siteBase + '/privacy-policy' },
      { label: copy.terms, href: siteBase + '/terms-of-use' },
      { label: copy.cookies, href: siteBase + '/cookie-settings' },
    ],
  }
}
