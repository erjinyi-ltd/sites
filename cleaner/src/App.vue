<script setup lang="ts">
import { computed } from 'vue'
import CapabilitiesSection from './components/CapabilitiesSection.vue'
import EcosystemProducts from './components/EcosystemProducts.vue'
import FactsStrip from './components/FactsStrip.vue'
import FaqSection from './components/FaqSection.vue'
import HeroSection from './components/HeroSection.vue'
import PlatformSection from './components/PlatformSection.vue'
import SafetySection from './components/SafetySection.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import WorkflowSection from './components/WorkflowSection.vue'
import WindowsArchitectureSection from './components/WindowsArchitectureSection.vue'
import WindowsCapabilitiesSection from './components/WindowsCapabilitiesSection.vue'
import WindowsHeroSection from './components/WindowsHeroSection.vue'
import WindowsSafetySection from './components/WindowsSafetySection.vue'
import { usePreferences } from './composables/usePreferences'
import { useProductPlatform } from './composables/useProductPlatform'

const { locale, theme, messages, copy, setLocale, toggleTheme } = usePreferences()
const { platform, setPlatform } = useProductPlatform()
const pageCopy = computed(() => messages.value.pages[platform.value])
</script>

<template>
  <div class="site-shell" :data-platform="platform">
    <a class="skip-link" href="#main-content">{{ copy.skipMain }}</a>
    <div class="ambient-grid" aria-hidden="true"></div>
    <SiteHeader :copy="copy" :locale="locale" :theme="theme" @locale-change="setLocale" @theme-toggle="toggleTheme" />
    <main id="main-content">
      <div class="platform-stage">
        <Transition name="platform-page">
          <div :key="platform" class="product-page">
            <HeroSection v-if="platform === 'mac'" :copy="pageCopy.hero" :platform="platform" :switch-label="copy.platformSwitchLabel" @platform-change="setPlatform" />
            <WindowsHeroSection v-else :copy="pageCopy.hero" :platform="platform" :switch-label="copy.platformSwitchLabel" @platform-change="setPlatform" />
            <FactsStrip :label="pageCopy.factsLabel" :items="pageCopy.facts" />
            <PlatformSection v-if="platform === 'mac'" :copy="pageCopy.platforms" />
            <CapabilitiesSection v-if="platform === 'mac'" :copy="pageCopy.capabilities" />
            <WindowsCapabilitiesSection v-else :copy="pageCopy.capabilities" />
            <WindowsArchitectureSection v-if="platform === 'windows'" :copy="pageCopy.platforms" />
            <WorkflowSection :copy="pageCopy.workflow" />
            <SafetySection v-if="platform === 'mac'" :copy="pageCopy.safety" />
            <WindowsSafetySection v-else :copy="pageCopy.safety" />
            <FaqSection :copy="pageCopy.faq" />
          </div>
        </Transition>
      </div>
      <EcosystemProducts :copy="copy.ecosystem" />
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

.platform-stage {
  position: relative;
}

.platform-page-enter-active {
  position: relative;
  z-index: 1;
}

.platform-page-leave-active {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  pointer-events: none;
}

.platform-page-enter-active :deep(.hero-copy),
.platform-page-enter-active :deep(.cleaner-visual),
.platform-page-enter-active :deep(.manager-console),
.platform-page-enter-active > :not(:first-child) {
  will-change: opacity, transform, filter;
  transition: opacity .38s ease, transform .42s cubic-bezier(.22, 1, .36, 1), filter .48s ease;
}

.platform-page-leave-active :deep(.hero-copy),
.platform-page-leave-active :deep(.cleaner-visual),
.platform-page-leave-active :deep(.manager-console),
.platform-page-leave-active > :not(:first-child) {
  will-change: opacity, transform, filter;
  transition: opacity .26s ease, transform .3s cubic-bezier(.4, 0, 1, 1), filter .32s ease;
}

.platform-page-enter-active :deep(.cleaner-visual),
.platform-page-enter-active :deep(.manager-console) {
  transition-delay: .08s;
}

.platform-page-enter-active > :nth-child(3n + 2) {
  transition-delay: .04s;
}

.platform-page-enter-active > :nth-child(3n) {
  transition-delay: .08s;
}

.platform-page-enter-active > :nth-child(3n + 1):not(:first-child) {
  transition-delay: .12s;
}

.platform-page-enter-from :deep(.hero-copy),
.platform-page-leave-to :deep(.hero-copy),
.platform-page-enter-from > :not(:first-child):nth-child(odd),
.platform-page-leave-to > :not(:first-child):nth-child(odd) {
  opacity: 0;
  filter: blur(5px);
  transform: translateX(-32px);
}

.platform-page-enter-from :deep(.cleaner-visual),
.platform-page-enter-from :deep(.manager-console),
.platform-page-leave-to :deep(.cleaner-visual),
.platform-page-leave-to :deep(.manager-console),
.platform-page-enter-from > :not(:first-child):nth-child(even),
.platform-page-leave-to > :not(:first-child):nth-child(even) {
  opacity: 0;
  filter: blur(5px);
  transform: translateX(32px);
}

@media (max-width: 640px) {
  .platform-page-enter-from :deep(.hero-copy),
  .platform-page-leave-to :deep(.hero-copy),
  .platform-page-enter-from > :not(:first-child):nth-child(odd),
  .platform-page-leave-to > :not(:first-child):nth-child(odd) {
    transform: translateX(-18px);
  }

  .platform-page-enter-from :deep(.cleaner-visual),
  .platform-page-enter-from :deep(.manager-console),
  .platform-page-leave-to :deep(.cleaner-visual),
  .platform-page-leave-to :deep(.manager-console),
  .platform-page-enter-from > :not(:first-child):nth-child(even),
  .platform-page-leave-to > :not(:first-child):nth-child(even) {
    transform: translateX(18px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .platform-page-enter-active :deep(.hero-copy),
  .platform-page-enter-active :deep(.cleaner-visual),
  .platform-page-enter-active :deep(.manager-console),
  .platform-page-enter-active > :not(:first-child),
  .platform-page-leave-active :deep(.hero-copy),
  .platform-page-leave-active :deep(.cleaner-visual),
  .platform-page-leave-active :deep(.manager-console),
  .platform-page-leave-active > :not(:first-child) {
    transition: none;
  }

  .platform-page-enter-from :deep(.hero-copy),
  .platform-page-enter-from :deep(.cleaner-visual),
  .platform-page-enter-from :deep(.manager-console),
  .platform-page-enter-from > :not(:first-child),
  .platform-page-leave-to :deep(.hero-copy),
  .platform-page-leave-to :deep(.cleaner-visual),
  .platform-page-leave-to :deep(.manager-console),
  .platform-page-leave-to > :not(:first-child) {
    opacity: 1;
    filter: none;
    transform: none;
  }
}

</style>
