<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Component } from 'vue'
import {
  Eraser,
  FileText,
  Home,
  LifeBuoy,
  LockKeyhole,
  Menu,
  Moon,
  ScanSearch,
  ShieldCheck,
  Sun,
  Workflow,
  X,
} from '@lucide/vue'
import { RouterLink, useRoute } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import BrandLockup from './BrandLockup.vue'
import GcsaProductsMenu from './GcsaProductsMenu.vue'
import { languageOptions } from '../content/siteCopy'
import type { Locale, SiteCopy, Theme } from '../types/site'

const props = defineProps<{ copy: SiteCopy; locale: Locale; theme: Theme }>()
const route = useRoute()

interface HeaderNavItem {
  key: string
  label: string
  to: RouteLocationRaw
  icon: Component
  sectionHref?: string
  pagePath?: string
}
const emit = defineEmits<{
  localeChange: [locale: Locale]
  themeToggle: []
}>()

const languageOpen = ref(false)
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeNavHref = ref('')
const sectionIcons = [ScanSearch, Workflow, Eraser, LockKeyhole]

const headerNavItems = computed<HeaderNavItem[]>(() => [
  {
    key: 'home',
    label: props.copy.footer.home,
    to: '/',
    icon: Home,
  },
  ...props.copy.nav.map((item, index) => ({
    key: item.href,
    label: item.label,
    to: { path: '/', hash: item.href },
    sectionHref: item.href,
    icon: sectionIcons[index],
  })),
  {
    key: 'privacy',
    label: props.copy.footer.privacy,
    to: '/privacy',
    pagePath: '/privacy',
    icon: ShieldCheck,
  },
  {
    key: 'terms',
    label: props.copy.footer.terms,
    to: '/terms',
    pagePath: '/terms',
    icon: FileText,
  },
  {
    key: 'support',
    label: props.copy.footer.support,
    to: '/support',
    pagePath: '/support',
    icon: LifeBuoy,
  },
])

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

function isNavActive(item: (typeof headerNavItems.value)[number]) {
  if (item.pagePath) return route.path === item.pagePath
  if (item.sectionHref) return route.path === '/' && activeNavHref.value === item.sectionHref
  return route.path === '/' && activeNavHref.value === ''
}

function onDocumentPointerDown() {
  languageOpen.value = false
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenus()
}

function onScroll() {
  isScrolled.value = window.scrollY > 8

  if (route.path !== '/') {
    activeNavHref.value = ''
    return
  }

  const activationLine = Math.min(window.innerHeight * 0.32, 280)
  let currentHref = ''

  for (const item of props.copy.nav) {
    const section = document.querySelector<HTMLElement>(item.href)
    if (section && section.getBoundingClientRect().top <= activationLine) {
      currentHref = item.href
    }
  }

  activeNavHref.value = currentHref
}

watch(mobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(() => route.fullPath, () => {
  closeMenus()
  requestAnimationFrame(onScroll)
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
      <RouterLink class="product-brand" to="/" :aria-label="copy.homeLabel">
        <BrandLockup />
      </RouterLink>

      <nav class="desktop-nav" :aria-label="copy.navLabel">
        <RouterLink
          v-for="item in headerNavItems.slice(0, 1)"
          :key="item.key"
          :to="item.to"
          :class="{ active: isNavActive(item) }"
          :aria-current="isNavActive(item) ? (item.pagePath ? 'page' : 'location') : undefined"
        >{{ item.label }}</RouterLink>
        <GcsaProductsMenu :locale="locale" />
        <RouterLink
          v-for="item in headerNavItems.slice(1)"
          :key="item.key"
          :to="item.to"
          :class="{ active: isNavActive(item) }"
          :aria-current="isNavActive(item) ? (item.pagePath ? 'page' : 'location') : undefined"
        >{{ item.label }}</RouterLink>
      </nav>

      <div class="desktop-tools">
        <button
          class="tool-button"
          type="button"
          :aria-label="theme === 'dark' ? copy.switchToLight : copy.switchToDark"
          :title="theme === 'dark' ? copy.switchToLight : copy.switchToDark"
          @click="$emit('themeToggle')"
        >
          <Sun v-if="theme === 'dark'" :size="17" aria-hidden="true" />
          <Moon v-else :size="17" aria-hidden="true" />
        </button>

        <div class="language-select" @pointerdown.stop>
          <button
            class="language-trigger"
            type="button"
            :aria-label="copy.languageLabel"
            :aria-expanded="languageOpen"
            @click="languageOpen = !languageOpen"
          >
            <span class="language-trigger-label">{{ inlineLanguageLabel }}</span>
            <span class="language-trigger-chevron" :class="{ open: languageOpen }" aria-hidden="true"></span>
          </button>
          <div v-if="languageOpen" class="language-menu" role="listbox" :aria-label="copy.languageLabel">
            <button
              v-for="option in languageOptions"
              :key="option.code"
              type="button"
              role="option"
              :class="{ selected: locale === option.code }"
              :aria-selected="locale === option.code"
              @click="setLocale(option.code)"
            >
              <span>{{ option.label }}</span>
              <small>{{ option.short }}</small>
            </button>
          </div>
        </div>

        <RouterLink class="header-cta" :to="{ path: '/', hash: '#capabilities' }">{{ copy.headerCta }}</RouterLink>
      </div>

      <div class="mobile-tools">
        <button
          class="tool-button compact"
          type="button"
          :aria-label="theme === 'dark' ? copy.switchToLight : copy.switchToDark"
          :title="theme === 'dark' ? copy.switchToLight : copy.switchToDark"
          @click="$emit('themeToggle')"
        >
          <Sun v-if="theme === 'dark'" :size="17" aria-hidden="true" />
          <Moon v-else :size="17" aria-hidden="true" />
        </button>
        <div class="language-select mobile-language-select" @pointerdown.stop>
          <button
            class="mobile-language"
            type="button"
            :aria-label="copy.languageLabel"
            :aria-expanded="languageOpen"
            @click="languageOpen = !languageOpen"
          >
            {{ selectedLanguage.short }}
          </button>
          <div v-if="languageOpen" class="language-menu mobile-language-menu" role="listbox" :aria-label="copy.languageLabel">
            <button
              v-for="option in languageOptions"
              :key="option.code"
              type="button"
              role="option"
              :class="{ selected: locale === option.code }"
              :aria-selected="locale === option.code"
              @click="setLocale(option.code)"
            >
              <span>{{ option.label }}</span>
              <small>{{ option.short }}</small>
            </button>
          </div>
        </div>
        <button
          class="menu-toggle"
          type="button"
          :aria-label="mobileMenuOpen ? copy.closeMenu : copy.openMenu"
          :aria-expanded="mobileMenuOpen"
          @pointerdown.stop
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <X v-if="mobileMenuOpen" :size="19" aria-hidden="true" />
          <Menu v-else :size="19" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <button
      class="mobile-menu-scrim"
      :class="{ open: mobileMenuOpen }"
      type="button"
      :aria-label="copy.closeMenu"
      :tabindex="mobileMenuOpen ? 0 : -1"
      @click="closeMenus"
    ></button>
    <aside
      class="mobile-drawer"
      :class="{ open: mobileMenuOpen }"
      role="dialog"
      aria-modal="true"
      :aria-label="copy.navLabel"
      :inert="!mobileMenuOpen"
    >
      <div class="mobile-drawer-head">
        <RouterLink to="/" :aria-label="copy.homeLabel" @click="closeMenus">
          <BrandLockup />
        </RouterLink>
        <button class="drawer-close" type="button" :aria-label="copy.closeMenu" @click="closeMenus">
          <X :size="19" aria-hidden="true" />
        </button>
      </div>
      <nav class="mobile-nav" :aria-label="copy.navLabel">
        <RouterLink
          v-for="item in headerNavItems.slice(0, 1)"
          :key="item.key"
          :to="item.to"
          :class="{ active: isNavActive(item) }"
          :aria-current="isNavActive(item) ? (item.pagePath ? 'page' : 'location') : undefined"
          @click="closeMenus"
        >
          <span class="mobile-nav-icon">
            <component :is="item.icon" :size="20" aria-hidden="true" />
          </span>
          <span>{{ item.label }}</span>
        </RouterLink>
        <GcsaProductsMenu :locale="locale" mobile />
        <RouterLink
          v-for="item in headerNavItems.slice(1)"
          :key="item.key"
          :to="item.to"
          :class="{ active: isNavActive(item) }"
          :aria-current="isNavActive(item) ? (item.pagePath ? 'page' : 'location') : undefined"
          @click="closeMenus"
        >
          <span class="mobile-nav-icon">
            <component :is="item.icon" :size="20" aria-hidden="true" />
          </span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <RouterLink class="drawer-cta" :to="{ path: '/', hash: '#capabilities' }" @click="closeMenus">{{ copy.headerCta }}</RouterLink>
    </aside>
  </Teleport>
</template>

<style scoped>
.topbar {
  position: fixed;
  inset: 0 0 auto;
  z-index: 40;
  height: var(--header-height);
  border-bottom: 1px solid transparent;
  background: var(--header-bg);
  transition: background 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.topbar.scrolled {
  border-bottom-color: var(--border);
  background: var(--header-bg);
  box-shadow: 0 8px 28px color-mix(in srgb, var(--background) 46%, transparent);
}

.topbar-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 24px;
  width: min(var(--content-max), calc(100% - 64px));
  height: 100%;
  margin-inline: auto;
}

.product-brand {
  justify-self: start;
  min-width: 0;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.desktop-nav a {
  padding: 9px 12px;
  border-radius: 8px;
  color: var(--muted-foreground);
  font-size: 13px;
  font-weight: 400;
  transition: color 160ms ease, background 160ms ease;
}

.desktop-nav a:hover {
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}

.desktop-nav a.active {
  color: var(--primary);
  background: transparent;
}

.desktop-tools,
.mobile-tools {
  position: relative;
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 8px;
}

.mobile-tools {
  display: none;
}

.tool-button,
.menu-toggle,
.mobile-language,
.drawer-close {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--muted-foreground);
  background: color-mix(in srgb, var(--card) 72%, transparent);
  cursor: pointer;
  transition: color 160ms ease, border-color 160ms ease, background 160ms ease;
}

.tool-button:hover,
.menu-toggle:hover,
.mobile-language:hover,
.drawer-close:hover {
  border-color: var(--border-strong);
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 8%, var(--card));
}

.tool-button,
.tool-button:hover {
  border-color: transparent;
  background: transparent;
}

.language-select {
  position: relative;
}

.language-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.45rem;
  border: 0;
  border-radius: 6px;
  color: var(--muted-foreground);
  background: transparent;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  transition: color 250ms cubic-bezier(0.32, 0.72, 0, 1);
}

.language-trigger:hover {
  color: var(--foreground);
}

.language-trigger-label {
  max-width: 6.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.language-trigger-chevron {
  display: block;
  width: 0;
  height: 0;
  border-top: 0.28rem solid;
  border-right: 0.22rem solid transparent;
  border-left: 0.22rem solid transparent;
  opacity: 0.55;
  transition: transform 250ms cubic-bezier(0.32, 0.72, 0, 1), opacity 250ms cubic-bezier(0.32, 0.72, 0, 1);
}

.language-trigger-chevron.open {
  opacity: 0.85;
  transform: rotate(180deg);
}

.language-menu {
  position: absolute;
  top: calc(100% + 9px);
  right: 0;
  z-index: 55;
  display: grid;
  width: 178px;
  padding: 6px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--card);
  box-shadow: var(--shadow-card);
}

.language-menu button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 38px;
  padding: 0 10px;
  border: 0;
  border-radius: 7px;
  color: var(--muted-foreground);
  background: transparent;
  cursor: pointer;
}

.language-menu button:hover,
.language-menu button.selected {
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 9%, transparent);
}

.language-menu button.selected {
  font-weight: 700;
}

.language-menu small {
  color: var(--primary);
  font-family: var(--font-data);
  font-size: 9px;
  font-weight: 800;
}

.header-cta {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid var(--primary);
  border-radius: 8px;
  color: var(--primary-foreground);
  background: var(--primary);
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 1180px) {
  .topbar-inner {
    gap: 14px;
  }

  .desktop-nav a {
    padding-inline: 6px;
    font-size: 12px;
  }

  .header-cta {
    display: none;
  }
}

@media (max-width: 860px) {
  .topbar {
    border-bottom-color: var(--border);
    background: var(--header-bg);
  }

  .topbar-inner {
    display: flex;
    width: min(100% - 28px, var(--content-max));
    gap: 8px;
  }

  .desktop-nav,
  .desktop-tools {
    display: none;
  }

  .mobile-tools {
    display: flex;
    margin-left: auto;
    gap: 3px;
  }

  .tool-button.compact,
  .menu-toggle,
  .mobile-language {
    width: 36px;
    height: 36px;
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .menu-toggle,
  .menu-toggle:hover,
  .drawer-close,
  .drawer-close:hover {
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .mobile-language {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-data);
    font-size: 10px;
    font-weight: 800;
  }

  .mobile-language-menu {
    right: 38px;
  }
}
</style>

<style>
.mobile-menu-scrim,
.mobile-drawer {
  display: none;
}

@media (max-width: 860px) {
  .mobile-menu-scrim {
    position: fixed;
    inset: 0;
    z-index: 68;
    display: block;
    border: 0;
    background: rgba(0, 0, 0, 0.48);
    opacity: 0;
    pointer-events: none;
    transition: opacity 260ms ease;
  }

  .mobile-menu-scrim.open {
    opacity: 1;
    pointer-events: auto;
  }

  .mobile-drawer {
    position: fixed;
    inset: 0 0 0 auto;
    z-index: 70;
    display: flex;
    flex-direction: column;
    width: min(88vw, 21.5rem);
    padding: max(18px, env(safe-area-inset-top)) 18px max(20px, env(safe-area-inset-bottom));
    border-left: 1px solid var(--border);
    background: var(--mobile-menu-panel-bg);
    box-shadow: -22px 0 60px rgba(0, 0, 0, 0.3);
    transform: translateX(102%);
    visibility: hidden;
    transition: transform 0.55s cubic-bezier(0.32, 0.72, 0, 1), visibility 0.55s;
  }

  .mobile-drawer.open {
    transform: translateX(0);
    visibility: visible;
  }

  .mobile-drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }

  .drawer-close {
    display: inline-grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 0;
    color: var(--muted-foreground);
    background: transparent;
    box-shadow: none;
    cursor: pointer;
  }

  .mobile-nav {
    display: grid;
    flex: 1 1 auto;
    align-content: start;
    gap: 8px;
    min-height: 0;
    margin-top: 26px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .mobile-nav a {
    display: flex;
    align-items: center;
    gap: 13px;
    min-height: 54px;
    padding: 7px 10px;
    border-radius: 10px;
    color: var(--foreground);
    font-family: var(--font-data);
    font-size: 16px;
    font-weight: 400;
  }

  .mobile-nav a:hover {
    background: color-mix(in srgb, var(--primary) 8%, transparent);
  }

  .mobile-nav a.active,
  .mobile-nav a.active:hover {
    color: var(--primary);
    background: transparent;
  }

  .mobile-nav a.active .mobile-nav-icon {
    border-color: color-mix(in srgb, var(--primary) 48%, var(--border));
  }

  .mobile-nav-icon {
    display: inline-grid;
    place-items: center;
    width: 40px;
    height: 40px;
    flex: 0 0 auto;
    border: 1px solid color-mix(in srgb, var(--primary) 24%, var(--border));
    border-radius: 9px;
    color: var(--primary);
    background: var(--muted);
  }

  .drawer-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    margin-top: 18px;
    border: 1px solid var(--primary);
    border-radius: 9999px;
    color: var(--primary-foreground);
    background: var(--primary);
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
