<script setup lang="ts">
import ClosingCta from '../components/ClosingCta.vue'
import DetectionFlow from '../components/DetectionFlow.vue'
import FactsStrip from '../components/FactsStrip.vue'
import FaqSection from '../components/FaqSection.vue'
import FeatureGrid from '../components/FeatureGrid.vue'
import HeroSection from '../components/HeroSection.vue'
import PrivacySection from '../components/PrivacySection.vue'
import RedactionSection from '../components/RedactionSection.vue'
import type { Locale, SiteCopy } from '../types/site'

defineProps<{
  copy: SiteCopy
  locale: Locale
}>()
</script>

<template>
  <HeroSection :copy="copy.hero" />
  <FactsStrip :items="copy.facts" />
  <FeatureGrid :copy="copy.capability" />
  <DetectionFlow :copy="copy.flow" />
  <RedactionSection :copy="copy.redaction" />
  <PrivacySection :copy="copy.privacy" />
  <FaqSection :copy="copy.faq" />
  <ClosingCta :copy="copy.closing" />
</template>
