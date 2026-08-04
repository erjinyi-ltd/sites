<script setup lang="ts">
import { watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import { usePreferences } from './composables/usePreferences'
import { legalCopy } from './content/legalCopy'
import type { LegalPageKind } from './types/legal'

const { locale, theme, copy, setLocale, toggleTheme } = usePreferences()
const route = useRoute()
const siteOrigin = 'https://watermarkinspector.gcsa.org'

function setMetaContent(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content)
}

function isLegalPageKind(value: unknown): value is LegalPageKind {
  return value === 'privacy' || value === 'terms' || value === 'support'
}

watchEffect(() => {
  const legalKind = route.meta.legalKind
  const page = isLegalPageKind(legalKind) ? legalCopy[locale.value].pages[legalKind] : undefined
  const productName = locale.value === 'en' ? 'WATERMARK' : '水印分析'
  const title = page ? `${page.title} — GCSA` : `${productName} — GCSA`
  const description = page?.summary ?? copy.value.hero.lead
  const canonicalUrl = new URL(route.path, siteOrigin).toString()

  document.title = title
  setMetaContent('meta[name="description"]', description)
  setMetaContent('meta[property="og:title"]', title)
  setMetaContent('meta[property="og:description"]', description)
  setMetaContent('meta[property="og:url"]', canonicalUrl)
  setMetaContent('meta[name="twitter:title"]', title)
  setMetaContent('meta[name="twitter:description"]', description)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
})
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">{{ copy.skipMain }}</a>
    <div class="ambient-grid" aria-hidden="true"></div>
    <SiteHeader
      :copy="copy"
      :locale="locale"
      :theme="theme"
      @locale-change="setLocale"
      @theme-toggle="toggleTheme"
    />
    <main id="main-content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :copy="copy" :locale="locale" />
      </RouterView>
    </main>
    <SiteFooter :locale="locale" />
  </div>
</template>

<style scoped>
.site-shell {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow: clip;
  background:
    radial-gradient(circle at 78% 9%, var(--hero-glow), transparent 31rem),
    radial-gradient(circle at 8% 36%, color-mix(in srgb, var(--hero-glow) 55%, transparent), transparent 26rem),
    var(--background);
}

.ambient-grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.68;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, black 0, rgba(0, 0, 0, 0.76) 35%, transparent 74%);
}
</style>
