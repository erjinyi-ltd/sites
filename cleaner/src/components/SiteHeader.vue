<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { GitCompareArrows, HardDrive, LayoutGrid, Menu, Moon, ShieldCheck, Sun, X } from '@lucide/vue'
import BrandLockup from './BrandLockup.vue'
import { languageOptions } from '../content/siteCopy'
import type { Locale, SiteCopy, Theme } from '../types/site'

const props = defineProps<{ copy: SiteCopy; locale: Locale; theme: Theme }>()
const emit = defineEmits<{
  localeChange: [locale: Locale]
  themeToggle: []
}>()

const languageOpen = ref(false)
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeNavHref = ref('')
const navIcons = [LayoutGrid, HardDrive, GitCompareArrows, ShieldCheck]

const selectedLanguage = computed(
  () => languageOptions.find((option) => option.code === props.locale) ?? languageOptions[0],
)
const inlineLanguageLabel = computed(() => {
  if (props.locale === 'zh-CN') return '简体中文'
  if (props.locale === 'zh-Hant') return '繁體中文'
  return 'English'
})

function setLocale(locale: Locale) {
  emit('localeChange', locale)
  languageOpen.value = false
}

function closeMenus() {
  languageOpen.value = false
  mobileMenuOpen.value = false
}

function onDocumentPointerDown() {
  languageOpen.value = false
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenus()
}

function onScroll() {
  isScrolled.value = window.scrollY > 8
  const activationLine = Math.min(window.innerHeight * 0.32, 280)
  let currentHref = ''

  for (const item of props.copy.nav) {
    const section = document.querySelector<HTMLElement>(item.href)
    if (section && section.getBoundingClientRect().top <= activationLine) currentHref = item.href
  }

  activeNavHref.value = currentHref
}

watch(mobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeyDown)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeyDown)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="topbar" :class="{ scrolled: isScrolled }">
    <div class="topbar-inner">
      <a class="product-brand" href="#top" :aria-label="copy.homeLabel"><BrandLockup /></a>

      <nav class="desktop-nav" :aria-label="copy.navLabel">
        <a
          v-for="item in copy.nav"
          :key="item.href"
          :href="item.href"
          :class="{ active: activeNavHref === item.href }"
          :aria-current="activeNavHref === item.href ? 'location' : undefined"
        >{{ item.label }}</a>
      </nav>

      <div class="desktop-tools">
        <button class="icon-button" type="button" :aria-label="theme === 'dark' ? copy.switchToLight : copy.switchToDark" :title="theme === 'dark' ? copy.switchToLight : copy.switchToDark" @click="$emit('themeToggle')">
          <Sun v-if="theme === 'dark'" :size="17" aria-hidden="true" />
          <Moon v-else :size="17" aria-hidden="true" />
        </button>
        <div class="language-select" @pointerdown.stop>
          <button class="language-trigger" type="button" :aria-label="copy.languageLabel" :aria-expanded="languageOpen" @click="languageOpen = !languageOpen">
            <span>{{ inlineLanguageLabel }}</span><span class="chevron" :class="{ open: languageOpen }" aria-hidden="true"></span>
          </button>
          <div v-if="languageOpen" class="language-menu" role="listbox" :aria-label="copy.languageLabel">
            <button v-for="option in languageOptions" :key="option.code" type="button" role="option" :class="{ selected: locale === option.code }" :aria-selected="locale === option.code" @click="setLocale(option.code)">
              <span>{{ option.label }}</span><small>{{ option.short }}</small>
            </button>
          </div>
        </div>
        <a class="header-cta" href="#platforms">{{ copy.headerCta }}</a>
      </div>

      <div class="mobile-tools">
        <button class="icon-button" type="button" :aria-label="theme === 'dark' ? copy.switchToLight : copy.switchToDark" @click="$emit('themeToggle')">
          <Sun v-if="theme === 'dark'" :size="17" aria-hidden="true" />
          <Moon v-else :size="17" aria-hidden="true" />
        </button>
        <div class="language-select" @pointerdown.stop>
          <button class="mobile-language" type="button" :aria-label="copy.languageLabel" :aria-expanded="languageOpen" @click="languageOpen = !languageOpen">{{ selectedLanguage.short }}</button>
          <div v-if="languageOpen" class="language-menu mobile-language-menu" role="listbox" :aria-label="copy.languageLabel">
            <button v-for="option in languageOptions" :key="option.code" type="button" role="option" :class="{ selected: locale === option.code }" :aria-selected="locale === option.code" @click="setLocale(option.code)">
              <span>{{ option.label }}</span><small>{{ option.short }}</small>
            </button>
          </div>
        </div>
        <button class="menu-toggle" type="button" :aria-label="mobileMenuOpen ? copy.closeMenu : copy.openMenu" :aria-expanded="mobileMenuOpen" @pointerdown.stop @click="mobileMenuOpen = !mobileMenuOpen">
          <X v-if="mobileMenuOpen" :size="19" aria-hidden="true" /><Menu v-else :size="19" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <button class="mobile-menu-scrim" :class="{ open: mobileMenuOpen }" type="button" :aria-label="copy.closeMenu" :tabindex="mobileMenuOpen ? 0 : -1" @click="closeMenus"></button>
    <aside class="mobile-drawer" :class="{ open: mobileMenuOpen }" role="dialog" aria-modal="true" :aria-label="copy.navLabel" :inert="!mobileMenuOpen">
      <div class="mobile-drawer-head">
        <a href="#top" :aria-label="copy.homeLabel" @click="closeMenus"><BrandLockup /></a>
        <button class="drawer-close" type="button" :aria-label="copy.closeMenu" @click="closeMenus"><X :size="19" aria-hidden="true" /></button>
      </div>
      <nav class="mobile-nav" :aria-label="copy.navLabel">
        <a v-for="(item, index) in copy.nav" :key="item.href" :href="item.href" :class="{ active: activeNavHref === item.href }" :aria-current="activeNavHref === item.href ? 'location' : undefined" @click="closeMenus">
          <span class="mobile-nav-icon"><component :is="navIcons[index]" :size="20" aria-hidden="true" /></span><span>{{ item.label }}</span>
        </a>
      </nav>
      <a class="drawer-cta" href="#platforms" @click="closeMenus">{{ copy.headerCta }}</a>
    </aside>
  </Teleport>
</template>

<style scoped>
.topbar { position: fixed; inset: 0 0 auto; z-index: 40; height: var(--header-height); border-bottom: 1px solid transparent; background: color-mix(in srgb, var(--header-bg) 74%, transparent); backdrop-filter: blur(18px); transition: background 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
.topbar.scrolled { border-bottom-color: var(--border); background: var(--header-bg); box-shadow: 0 8px 28px color-mix(in srgb, var(--background) 46%, transparent); }
.topbar-inner { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 24px; width: min(var(--content-max), calc(100% - 64px)); height: 100%; margin-inline: auto; }
.product-brand { justify-self: start; min-width: 0; }
.desktop-nav { display: flex; align-items: center; gap: 4px; }
.desktop-nav a { padding: 9px 12px; border-radius: 8px; color: var(--muted-foreground); font-size: 13px; font-weight: 400; transition: color 160ms ease, background 160ms ease; }
.desktop-nav a:hover, .desktop-nav a.active { color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, transparent); }
.desktop-tools, .mobile-tools { position: relative; display: flex; align-items: center; justify-self: end; gap: 8px; }
.mobile-tools { display: none; }
.icon-button, .menu-toggle, .mobile-language, .drawer-close { display: inline-grid; place-items: center; width: 40px; height: 40px; border: 0; border-radius: 8px; color: var(--muted-foreground); background: transparent; cursor: pointer; transition: color 160ms ease; }
.icon-button:hover, .menu-toggle:hover, .mobile-language:hover, .drawer-close:hover { color: var(--foreground); }
.language-select { position: relative; }
.language-trigger { display: inline-flex; align-items: center; gap: .35rem; padding: .35rem .45rem; border: 0; border-radius: 6px; color: var(--muted-foreground); background: transparent; font-size: 12px; font-weight: 500; cursor: pointer; }
.language-trigger:hover { color: var(--foreground); }
.chevron { width: 0; height: 0; border-top: .28rem solid; border-right: .22rem solid transparent; border-left: .22rem solid transparent; opacity: .55; transition: transform 250ms ease; }
.chevron.open { transform: rotate(180deg); }
.language-menu { position: absolute; top: calc(100% + 9px); right: 0; z-index: 55; display: grid; width: 178px; padding: 6px; border: 1px solid var(--border); border-radius: 10px; background: var(--card); box-shadow: var(--shadow-card); }
.language-menu button { display: flex; align-items: center; justify-content: space-between; min-height: 38px; padding: 0 10px; border: 0; border-radius: 7px; color: var(--muted-foreground); background: transparent; cursor: pointer; }
.language-menu button:hover, .language-menu button.selected { color: var(--foreground); background: color-mix(in srgb, var(--primary) 9%, transparent); }
.language-menu button.selected { font-weight: 700; }
.language-menu small { color: var(--primary); font-family: var(--font-data); font-size: 9px; }
.header-cta { display: inline-flex; align-items: center; min-height: 40px; padding: 0 16px; border: 1px solid var(--primary); border-radius: 8px; color: var(--primary-foreground); background: var(--primary); font-size: 12px; font-weight: 700; }
.mobile-menu-scrim, .mobile-drawer { display: none; }

@media (max-width: 1020px) {
  .topbar-inner { gap: 14px; }
  .desktop-nav a { padding-inline: 8px; }
  .header-cta { display: none; }
}

@media (max-width: 860px) {
  .topbar { border-bottom-color: var(--border); background: var(--header-bg); }
  .topbar-inner { display: flex; width: min(100% - 28px, var(--content-max)); gap: 8px; }
  .desktop-nav, .desktop-tools { display: none; }
  .mobile-tools { display: flex; margin-left: auto; gap: 3px; }
  .icon-button, .menu-toggle, .mobile-language { width: 36px; height: 36px; }
  .mobile-language { font-family: var(--font-data); font-size: 10px; font-weight: 700; }
  .mobile-language-menu { right: 38px; }
  .mobile-menu-scrim { position: fixed; inset: 0; z-index: 68; display: block; border: 0; background: rgba(0,0,0,.48); opacity: 0; pointer-events: none; transition: opacity 260ms ease; }
  .mobile-menu-scrim.open { opacity: 1; pointer-events: auto; }
  .mobile-drawer { position: fixed; inset: 0 0 0 auto; z-index: 70; display: flex; flex-direction: column; width: min(88vw, 21.5rem); padding: max(18px, env(safe-area-inset-top)) 18px max(20px, env(safe-area-inset-bottom)); border-left: 1px solid var(--border); background: var(--mobile-menu-panel-bg); box-shadow: -22px 0 60px rgba(0,0,0,.3); transform: translateX(102%); visibility: hidden; transition: transform .55s cubic-bezier(.32,.72,0,1), visibility .55s; }
  .mobile-drawer.open { transform: translateX(0); visibility: visible; }
  .mobile-drawer-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
  .drawer-close { width: 34px; height: 34px; }
  .mobile-nav { display: grid; gap: 8px; margin-top: 26px; }
  .mobile-nav a { display: flex; align-items: center; gap: 13px; min-height: 54px; padding: 7px 10px; border-radius: 10px; color: var(--foreground); font-family: var(--font-data); font-size: 16px; font-weight: 400; }
  .mobile-nav a:hover, .mobile-nav a.active { color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, transparent); }
  .mobile-nav-icon { display: inline-grid; place-items: center; width: 40px; height: 40px; flex: 0 0 auto; border: 1px solid color-mix(in srgb, var(--primary) 24%, var(--border)); border-radius: 9px; color: var(--primary); background: var(--muted); }
  .mobile-nav a.active .mobile-nav-icon { border-color: color-mix(in srgb, var(--primary) 48%, var(--border)); background: color-mix(in srgb, var(--primary) 10%, var(--muted)); }
  .drawer-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; margin-top: auto; border: 1px solid var(--primary); border-radius: 999px; color: var(--primary-foreground); background: var(--primary); font-size: 14px; font-weight: 700; }
}
</style>
