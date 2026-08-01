import { siteCopy } from '../content/content'
import type { LegalCopy, LegalPageKind, Locale } from '../content/content'

export type { LegalCopy, LegalPageKind, Locale }
export type SiteCopy = (typeof siteCopy)[Locale]
export type Theme = 'dark' | 'light'
