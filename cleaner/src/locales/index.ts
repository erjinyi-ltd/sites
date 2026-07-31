import en from './en.json'
import zhCN from './zh-CN.json'
import zhHant from './zh-Hant.json'
import type { Locale, LocaleMessages } from '../types/site'

export const languageOptions: Array<{ code: Locale; label: string; short: string }> = [
  { code: 'zh-CN', label: '简体中文', short: 'CN' },
  { code: 'zh-Hant', label: '繁體中文', short: 'HK' },
  { code: 'en', label: 'English', short: 'EN' },
]

export const localeMessages = {
  'zh-CN': zhCN,
  'zh-Hant': zhHant,
  en,
} as unknown as Record<Locale, LocaleMessages>
