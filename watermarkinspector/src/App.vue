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

function isLegalPageKind(value: unknown): value is LegalPageKind {
  return value === 'privacy' || value === 'terms' || value === 'support'
}

watchEffect(() => {
  const legalKind = route.meta.legalKind
  const page = isLegalPageKind(legalKind) ? legalCopy[locale.value].pages[legalKind] : undefined
  const productName = locale.value === 'en' ? 'WATERMARK' : '水印分析'
  const title = page ? `${page.title} — GCSA` : `${productName} — GCSA`
  const description = page?.summary ?? copy.value.hero.lead

  document.title = title
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
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
    <SiteFooter :copy="copy.footer" :locale="locale" />
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
