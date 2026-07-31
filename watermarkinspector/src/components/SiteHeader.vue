<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ChevronDown, Eraser, LockKeyhole, Menu, Moon, ScanSearch, Sun, Workflow, X } from '@lucide/vue'
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
const navIcons = [ScanSearch, Workflow, Eraser, LockKeyhole]

const selectedLanguage = computed(
  () => languageOptions.find((option) => option.code === props.locale) ?? languageOptions[0],
)

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
}

watch(mobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeyDown)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeyDown)
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="topbar" :class="{ scrolled: isScrolled }">
    <div class="topbar-inner">
      <a class="product-brand" href="#top" :aria-label="copy.homeLabel">
        <BrandLockup />
      </a>

      <nav class="desktop-nav" :aria-label="copy.navLabel">
        <a v-for="item in copy.nav" :key="item.href" :href="item.href">{{ item.label }}</a>
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
            <span>{{ selectedLanguage.label }}</span>
            <small>{{ selectedLanguage.short }}</small>
            <ChevronDown :class="{ open: languageOpen }" :size="14" aria-hidden="true" />
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

        <a class="header-cta" href="#capabilities">{{ copy.headerCta }}</a>
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
        <a href="#top" :aria-label="copy.homeLabel" @click="closeMenus">
          <BrandLockup />
        </a>
        <button class="drawer-close" type="button" :aria-label="copy.closeMenu" @click="closeMenus">
          <X :size="19" aria-hidden="true" />
        </button>
      </div>
      <nav class="mobile-nav" :aria-label="copy.navLabel">
        <a v-for="(item, index) in copy.nav" :key="item.href" :href="item.href" @click="closeMenus">
          <span class="mobile-nav-icon">
            <component :is="navIcons[index]" :size="20" aria-hidden="true" />
          </span>
          <span>{{ item.label }}</span>
        </a>
      </nav>
      <a class="drawer-cta" href="#capabilities" @click="closeMenus">{{ copy.headerCta }}</a>
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
  background: color-mix(in srgb, var(--header-bg) 72%, transparent);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
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
  font-weight: 600;
  transition: color 160ms ease, background 160ms ease;
}

.desktop-nav a:hover {
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
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

.language-select {
  position: relative;
}

.language-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 11px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--foreground);
  background: color-mix(in srgb, var(--card) 72%, transparent);
  cursor: pointer;
}

.language-trigger span {
  font-size: 12px;
  font-weight: 600;
}

.language-trigger small {
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 9px;
  font-weight: 800;
}

.language-trigger svg {
  color: var(--muted-foreground);
  transition: transform 160ms ease;
}

.language-trigger svg.open {
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

.mobile-menu-scrim,
.mobile-drawer {
  display: none;
}

@media (max-width: 1020px) {
  .topbar-inner {
    gap: 14px;
  }

  .desktop-nav a {
    padding-inline: 8px;
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
    border-color: transparent;
    background: transparent;
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
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--muted-foreground);
    background: var(--muted);
    cursor: pointer;
  }

  .mobile-nav {
    display: grid;
    gap: 8px;
    margin-top: 26px;
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
    font-weight: 650;
  }

  .mobile-nav a:hover {
    background: color-mix(in srgb, var(--primary) 8%, transparent);
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
    margin-top: auto;
    border: 1px solid var(--primary);
    border-radius: 9999px;
    color: var(--primary-foreground);
    background: var(--primary);
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
