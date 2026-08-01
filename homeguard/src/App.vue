<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { legalCopy } from './content/content'
import { privacyCopy } from './content/privacy-content'
import { usePreferences } from './composables/usePreferences'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import type { LegalCopy, LegalPageKind } from './types/site'

const route = useRoute()
const { locale, copy } = usePreferences()

const legalKind = computed<LegalPageKind | null>(() => {
  if (route.name === 'privacy' || route.name === 'terms' || route.name === 'support') return route.name
  return null
})

const currentLegal = computed<LegalCopy | null>(() => {
  if (!legalKind.value) return null
  if (legalKind.value === 'privacy') return privacyCopy[locale.value] as LegalCopy
  return legalCopy[locale.value][legalKind.value]
})

watchEffect(() => {
  document.title = currentLegal.value?.pageTitle ?? 'GCSA Home Guard｜家庭网络与移动安全'
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${window.location.origin}${route.path}`)
})
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">{{ copy.skip }}</a>
    <SiteHeader />
    <RouterView />
    <SiteFooter />
  </div>
</template>
