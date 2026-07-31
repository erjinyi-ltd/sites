<script setup lang="ts">
import CapabilitiesSection from './components/CapabilitiesSection.vue'
import ClosingCta from './components/ClosingCta.vue'
import EcosystemProducts from './components/EcosystemProducts.vue'
import FactsStrip from './components/FactsStrip.vue'
import FaqSection from './components/FaqSection.vue'
import HeroSection from './components/HeroSection.vue'
import PlatformSection from './components/PlatformSection.vue'
import SafetySection from './components/SafetySection.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import WindowsSection from './components/WindowsSection.vue'
import WorkflowSection from './components/WorkflowSection.vue'
import { usePreferences } from './composables/usePreferences'

const { locale, theme, copy, setLocale, toggleTheme } = usePreferences()
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">{{ copy.skipMain }}</a>
    <div class="ambient-grid" aria-hidden="true"></div>
    <SiteHeader :copy="copy" :locale="locale" :theme="theme" @locale-change="setLocale" @theme-toggle="toggleTheme" />
    <main id="main-content">
      <HeroSection :copy="copy.hero" />
      <FactsStrip :items="copy.facts" />
      <PlatformSection :copy="copy.platforms" />
      <CapabilitiesSection :copy="copy.capabilities" />
      <WorkflowSection :copy="copy.workflow" />
      <SafetySection :copy="copy.safety" />
      <WindowsSection :copy="copy.windows" />
      <FaqSection :copy="copy.faq" />
      <ClosingCta :copy="copy.closing" />
      <EcosystemProducts :copy="copy.ecosystem" />
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
    radial-gradient(circle at 8% 36%, color-mix(in srgb, var(--hero-glow) 50%, transparent), transparent 26rem),
    var(--background);
}

.ambient-grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: .68;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(to bottom, black 0, rgba(0,0,0,.76) 35%, transparent 74%);
}
</style>
