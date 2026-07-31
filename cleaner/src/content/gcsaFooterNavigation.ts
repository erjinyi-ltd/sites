import type { Locale } from '../types/site'

export function getGcsaFooterNavigation(locale: Locale) {
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
    home: '#top',
    products: `${siteBase}/products`,
    media: mediaBase,
    updates: `${siteBase}/forums`,
    join: `${siteBase}/contact`,
    about: `${siteBase}/about`,
    privacy: `${siteBase}/privacy`,
    terms: `${siteBase}/terms`,
    support: 'mailto:contact@gcsa.org',
  }
}
