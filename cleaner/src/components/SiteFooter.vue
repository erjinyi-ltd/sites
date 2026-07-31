<script setup lang="ts">
import { computed } from 'vue'
import { getGcsaFooterNavigation } from '../content/gcsaFooterNavigation'
import type { Locale, SiteCopy } from '../types/site'

const props = defineProps<{ copy: SiteCopy['footer']; locale: Locale }>()
const navigation = computed(() => getGcsaFooterNavigation(props.locale))
const primaryLinks = computed(() => [
  { label: props.copy.home, href: navigation.value.home }, { label: props.copy.products, href: navigation.value.products },
  { label: props.copy.media, href: navigation.value.media }, { label: props.copy.updates, href: navigation.value.updates },
  { label: props.copy.join, href: navigation.value.join }, { label: props.copy.about, href: navigation.value.about },
])
const legalLinks = computed(() => [
  { label: props.copy.privacy, href: navigation.value.privacy }, { label: props.copy.terms, href: navigation.value.terms }, { label: props.copy.support, href: navigation.value.support },
])
</script>

<template>
  <footer class="site-footer"><div class="content-width footer-shell">
    <div class="footer-main">
      <section class="footer-contact" :aria-label="copy.contactUs"><h2>{{ copy.contactUs }}</h2><a class="footer-email" href="mailto:contact@gcsa.org"><span>{{ copy.email }}</span><strong>contact@gcsa.org</strong></a><div class="socials"><a href="https://x.com/gcsa_org" target="_blank" rel="noopener noreferrer">𝕏 <span>{{ copy.twitter }}</span></a><a href="https://t.me/GCSAofficial" target="_blank" rel="noopener noreferrer">↗ <span>{{ copy.telegram }}</span></a></div></section>
      <nav class="footer-nav" :aria-label="copy.menuLabel"><a v-for="link in primaryLinks" :key="link.label" :href="link.href">{{ link.label }}</a></nav>
    </div>
    <div class="footer-bottom"><p>{{ copy.copyright }}</p><nav class="footer-legal" :aria-label="copy.menuLabel"><a v-for="link in legalLinks" :key="link.label" :href="link.href">{{ link.label }}</a><a href="mailto:contact@gcsa.org">contact@gcsa.org</a></nav></div>
  </div></footer>
</template>

<style scoped>
.site-footer { position: relative; z-index: 2; width: 100%; }
.footer-shell { min-width: 0; padding: 32px 0 28px; border-top: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border)); color: var(--muted-foreground); font-size: 13px; }
.footer-main, .footer-bottom { display: grid; grid-template-columns: minmax(280px, .85fr) minmax(0, 1.65fr); gap: clamp(48px, 7vw, 96px); }
.footer-contact h2 { margin-bottom: 16px; color: var(--foreground); font-size: 16px; }
.footer-email { display: grid; gap: 3px; width: fit-content; }
.footer-email span { font-size: 12px; }
.footer-email strong { color: var(--foreground); font-size: 14px; font-weight: 600; }
.socials { display: flex; gap: 22px; margin-top: 16px; }
.socials a { display: inline-flex; align-items: center; gap: 7px; }
.footer-nav { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-content: start; gap: 14px clamp(24px, 4vw, 52px); }
.footer-nav a { width: fit-content; min-height: 30px; padding: 4px 0; color: var(--foreground); font-size: 14px; font-weight: 500; }
.footer-bottom { align-items: center; margin-top: 34px; padding-top: 19px; border-top: 1px solid var(--border); }
.footer-bottom p { margin: 0; }
.footer-legal { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px 22px; }
a { color: var(--muted-foreground); transition: color 160ms ease; }
a:hover { color: var(--primary); }
@media (max-width: 760px) { .footer-shell { padding: 26px 0 calc(24px + env(safe-area-inset-bottom)); font-size: 12px; } .footer-main, .footer-bottom { grid-template-columns: 1fr; gap: 24px; } .footer-contact, .footer-email { justify-items: center; width: 100%; text-align: center; } .socials { justify-content: center; } .footer-nav { grid-template-columns: repeat(2, 1fr); gap: 10px 24px; } .footer-nav a { justify-self: center; text-align: center; } .footer-bottom { gap: 14px; margin-top: 24px; text-align: center; } .footer-legal { justify-content: center; gap: 9px 16px; } }
</style>
