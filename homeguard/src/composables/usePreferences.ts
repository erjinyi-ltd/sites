import { computed, ref, watch } from 'vue'
import { siteCopy } from '../content/content'
import type { Locale, Theme } from '../types/site'

const validLocales: Locale[] = ['zh-CN', 'zh-Hant', 'en']

function loadLocale(): Locale {
  try {
    const savedLocale = window.localStorage.getItem('gcsa-site-locale')
    if (validLocales.includes(savedLocale as Locale)) return savedLocale as Locale
  } catch {
    // Storage may be unavailable in restricted browser contexts.
  }
  return 'zh-CN'
}

function loadTheme(): Theme {
  try {
    return window.localStorage.getItem('gcsa-site-theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

const locale = ref<Locale>(loadLocale())
const theme = ref<Theme>(loadTheme())
const copy = computed(() => siteCopy[locale.value])

watch(
  [locale, theme],
  () => {
    const dark = theme.value === 'dark'
    document.documentElement.lang = copy.value.lang
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = theme.value
    document.documentElement.style.backgroundColor = dark ? '#000205' : '#f7f9fb'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#000205' : '#f7f9fb')

    try {
      window.localStorage.setItem('gcsa-site-locale', locale.value)
      window.localStorage.setItem('gcsa-site-theme', theme.value)
    } catch {
      // Keep the selected state for this session if storage is unavailable.
    }
  },
  { immediate: true },
)

export function usePreferences() {
  function chooseLocale(value: Locale) {
    locale.value = value
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { locale, theme, copy, chooseLocale, toggleTheme }
}
