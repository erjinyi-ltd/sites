import { computed, ref, watch } from 'vue'
import { siteCopy } from '../content'
import type { Locale, Theme } from '../types'

function loadLocale(): Locale {
  try {
    const saved = window.localStorage.getItem('gcsa-site-locale') ?? window.localStorage.getItem('gcsa-hostsec-locale')
    if (saved === 'zh-CN' || saved === 'zh-Hant' || saved === 'en') return saved

    const browserLocale = window.navigator.language.toLowerCase()
    if (browserLocale.startsWith('zh-hant') || browserLocale.startsWith('zh-tw') || browserLocale.startsWith('zh-hk')) return 'zh-Hant'
    if (browserLocale.startsWith('en')) return 'en'
    return 'zh-CN'
  } catch {
    return 'zh-CN'
  }
}

function loadTheme(): Theme {
  try {
    const saved = window.localStorage.getItem('gcsa-site-theme') ?? window.localStorage.getItem('gcsa-hostsec-theme')
    return saved === 'light' ? 'light' : 'dark'
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
    document.documentElement.style.backgroundColor = dark ? '#05080d' : '#f6f8fa'
    document.title = locale.value === 'en'
      ? 'GCSA HostSec | Multi-tenant host security and operations'
      : locale.value === 'zh-Hant'
        ? 'GCSA HostSec｜多租戶主機安全與運維控制平臺'
        : 'GCSA HostSec｜多租户主机安全与运维控制平台'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#05080d' : '#f6f8fa')

    try {
      window.localStorage.setItem('gcsa-site-locale', locale.value)
      window.localStorage.setItem('gcsa-site-theme', theme.value)
    } catch {
      // Keep preferences for the current session if storage is unavailable.
    }
  },
  { immediate: true },
)

export function usePreferences() {
  function setLocale(nextLocale: Locale) {
    locale.value = nextLocale
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { locale, theme, copy, setLocale, toggleTheme }
}
