<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { localeOptions } from '../content/content'
import { usePreferences } from '../composables/usePreferences'
import type { Locale } from '../types/site'
import BrandLockup from './BrandLockup.vue'
import GcsaProductsMenu from './GcsaProductsMenu.vue'
import MobileNavIcon from './MobileNavIcon.vue'
import ThemeIcon from './ThemeIcon.vue'
import { focusMobileMenu, handleMobileMenuKeydown } from '../../../shared/mobileMenuDialog'

const route = useRoute()
const { locale, theme, copy, chooseLocale, toggleTheme } = usePreferences()
const localeOpen = ref(false)
const menuOpen = ref(false)
const mobileMenuDialog = ref<HTMLElement | null>(null)
const mobileMenuTrigger = ref<HTMLButtonElement | null>(null)
const scrolled = ref(false)
const activeNavHref = ref('')
const localeControl = ref<HTMLElement | null>(null)

const currentLocale = computed(
  () => localeOptions.find((option) => option.id === locale.value) ?? localeOptions[0],
)
const legalLinks = computed(() => [
  { href: '/privacy', label: copy.value.privacy },
  { href: '/terms', label: copy.value.terms },
  { href: '/support', label: copy.value.support },
])

function linkTarget(href: string) {
  if (href.startsWith('/#')) return { path: '/', hash: href.slice(1) }
  return href
}

function selectLocale(value: Locale) {
  chooseLocale(value)
  localeOpen.value = false
  menuOpen.value = false
}

function isNavActive(item: { href: string }) {
  if (route.path !== '/') return item.href === route.path
  if (item.href === '/') return activeNavHref.value === ''
  return item.href === activeNavHref.value
}

function handleScroll() {
  scrolled.value = window.scrollY > 16

  if (route.path !== '/') {
    activeNavHref.value = ''
    return
  }

  const activationLine = Math.min(window.innerHeight * 0.32, 280)
  let currentHref = ''

  for (const item of copy.value.nav) {
    const section = document.querySelector<HTMLElement>(item.href.slice(1))
    if (section && section.getBoundingClientRect().top <= activationLine) {
      currentHref = item.href
    }
  }

  activeNavHref.value = currentHref
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  localeOpen.value = false
  menuOpen.value = false
}

function handlePointerdown(event: PointerEvent) {
  if (!localeControl.value?.contains(event.target as Node)) localeOpen.value = false
}

watch(menuOpen, async (open) => {
  document.body.classList.toggle('menu-open', open)
  document.body.style.overflow = open ? 'hidden' : ''
  await nextTick()
  if (open) focusMobileMenu(mobileMenuDialog.value)
  else mobileMenuTrigger.value?.focus({ preventScroll: true })
})
watch(
  () => route.fullPath,
  () => {
    localeOpen.value = false
    menuOpen.value = false
    requestAnimationFrame(handleScroll)
  },
)

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handlePointerdown)
})

onBeforeUnmount(() => {
  document.body.classList.remove('menu-open')
  document.body.style.overflow = ''
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handlePointerdown)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="nav-glow-line" aria-hidden="true" />
    <div class="header-inner">
      <RouterLink class="brand-link" to="/" aria-label="GCSA Home Guard">
        <BrandLockup />
      </RouterLink>

      <nav class="desktop-nav" :aria-label="copy.navLabel">
        <RouterLink
          :to="linkTarget('/')"
          :class="{ 'is-active': isNavActive({ href: '/' }) }"
          :aria-current="isNavActive({ href: '/' }) ? 'page' : undefined"
        >
          {{ copy.home }}
        </RouterLink>
        <GcsaProductsMenu :locale="locale" />
        <RouterLink
          v-for="item in copy.nav"
          :key="item.href"
          :to="linkTarget(item.href)"
          :class="{ 'is-active': isNavActive(item) }"
          :aria-current="isNavActive(item) ? (item.href.startsWith('/#') ? 'location' : 'page') : undefined"
        >
          {{ item.label }}
        </RouterLink>
        <RouterLink
          v-for="item in legalLinks"
          :key="item.href"
          :to="item.href"
          :class="{ 'is-active': isNavActive(item) }"
          :aria-current="isNavActive(item) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header-tools">
        <button
          class="icon-button theme-button"
          type="button"
          :aria-label="theme === 'dark' ? copy.themeLight : copy.themeDark"
          :title="theme === 'dark' ? copy.themeLight : copy.themeDark"
          @click="toggleTheme"
        >
          <ThemeIcon :dark="theme === 'dark'" />
        </button>

        <div ref="localeControl" class="locale-control">
          <button
            class="locale-trigger"
            type="button"
            :aria-label="copy.language"
            :aria-expanded="localeOpen"
            @click="localeOpen = !localeOpen"
          >
            <span>{{ currentLocale.name }}</span>
            <strong>{{ currentLocale.code }}</strong>
            <i :class="{ 'is-open': localeOpen }" aria-hidden="true" />
          </button>
          <div v-if="localeOpen" class="locale-menu" role="menu">
            <button
              v-for="option in localeOptions"
              :key="option.id"
              :class="{ 'is-active': option.id === locale }"
              type="button"
              role="menuitem"
              @click="selectLocale(option.id)"
            >
              <span>{{ option.name }}</span>
              <strong>{{ option.code }}</strong>
            </button>
          </div>
        </div>

        <button
          ref="mobileMenuTrigger"
          class="mobile-menu-trigger"
          type="button"
          :aria-label="copy.menuOpen"
          :aria-expanded="menuOpen"
          @click="menuOpen = true"
        >
          <span aria-hidden="true"><i /><i /><i /></span>
        </button>
      </div>
    </div>
  </header>

  <div
    v-if="menuOpen"
    ref="mobileMenuDialog"
    class="gcsa-mobile-menu"
    role="dialog"
    aria-modal="true"
    :aria-label="copy.navLabel"
    @keydown="handleMobileMenuKeydown($event, mobileMenuDialog, () => { menuOpen = false })"
  >
    <button class="gcsa-mobile-menu__scrim" type="button" :aria-label="copy.menuClose" tabindex="-1" @click="menuOpen = false" />
    <aside class="gcsa-mobile-menu__panel">
      <div class="gcsa-mobile-menu__head">
        <RouterLink class="gcsa-mobile-menu__brand" to="/" aria-label="GCSA Home Guard" @click="menuOpen = false">
          <BrandLockup />
        </RouterLink>
        <button class="gcsa-mobile-menu__close" type="button" :aria-label="copy.menuClose" @click="menuOpen = false">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav class="gcsa-mobile-menu__nav" :aria-label="copy.navLabel">
        <RouterLink
          class="gcsa-mobile-menu__item"
          :to="linkTarget('/')"
          :class="{ 'is-active': isNavActive({ href: '/' }) }"
          :aria-current="isNavActive({ href: '/' }) ? 'page' : undefined"
          @click="menuOpen = false"
        >
          <span class="gcsa-mobile-menu__icon"><MobileNavIcon href="/" /></span>
          <strong class="gcsa-mobile-menu__label">{{ copy.home }}</strong>
        </RouterLink>
        <GcsaProductsMenu class="gcsa-mobile-menu__products" :locale="locale" mobile />
        <RouterLink
          v-for="item in copy.nav"
          :key="item.href"
          class="gcsa-mobile-menu__item"
          :to="linkTarget(item.href)"
          :class="{ 'is-active': isNavActive(item) }"
          :aria-current="isNavActive(item) ? (item.href.startsWith('/#') ? 'location' : 'page') : undefined"
        >
          <span class="gcsa-mobile-menu__icon"><MobileNavIcon :href="item.href" /></span>
          <strong class="gcsa-mobile-menu__label">{{ item.label }}</strong>
        </RouterLink>
        <div class="gcsa-mobile-menu__secondary">
          <RouterLink
            v-for="item in legalLinks"
            :key="item.href"
            class="gcsa-mobile-menu__item"
            :to="item.href"
            :class="{ 'is-active': isNavActive(item) }"
            :aria-current="isNavActive(item) ? 'page' : undefined"
          >
            <span class="gcsa-mobile-menu__icon"><MobileNavIcon :href="item.href" /></span>
            <strong class="gcsa-mobile-menu__label">{{ item.label }}</strong>
          </RouterLink>
        </div>
      </nav>
    </aside>
  </div>
</template>

<style src="../../../shared/mobileMenu.css"></style>
