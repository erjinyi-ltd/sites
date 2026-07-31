import { computed, ref, watch } from 'vue'
import { siteCopy } from '../content/siteCopy'
import type { Locale, Theme } from '../types/site'

const themeStorageKey = 'gcsa-site-theme'
const localeStorageKey = 'gcsa-site-locale'

function readStoredValue<T extends string>(key: string, accepted: readonly T[]): T | null {
  try {
    const value = window.localStorage.getItem(key)
    return accepted.includes(value as T) ? (value as T) : null
  } catch {
    return null
  }
}
function getInitialLocale(): Locale {
  const saved = readStoredValue<Locale>(localeStorageKey, ['zh-CN', 'zh-Hant', 'en'])
  if (saved) return saved

  const browserLocale = window.navigator.language.toLowerCase()
  if (browserLocale.startsWith('zh-hant') || browserLocale.startsWith('zh-tw') || browserLocale.startsWith('zh-hk')) {
    return 'zh-Hant'
  }
  if (browserLocale.startsWith('en')) return 'en'
  return 'zh-CN'
}

export function usePreferences() {
  const locale = ref<Locale>(getInitialLocale())
  const theme = ref<Theme>(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  const copy = computed(() => siteCopy[locale.value])

  const setLocale = (nextLocale: Locale) => {
    locale.value = nextLocale
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  watch(
    locale,
    (nextLocale) => {
      document.documentElement.lang = nextLocale === 'zh-Hant' ? 'zh-Hant' : nextLocale
      try {
        window.localStorage.setItem(localeStorageKey, nextLocale)
      } catch {
        // Preferences remain available for the current page if storage is unavailable.
      }
    },
    { immediate: true },
  )

  watch(
    theme,
    (nextTheme) => {
      const isDark = nextTheme === 'dark'
      document.documentElement.classList.toggle('dark', isDark)
      document.documentElement.style.colorScheme = nextTheme
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#000205' : '#f7f9fb')
      try {
        window.localStorage.setItem(themeStorageKey, nextTheme)
      } catch {
        // Theme switching remains available if storage is unavailable.
      }
    },
    { immediate: true },
  )

  return { locale, theme, copy, setLocale, toggleTheme }
}
