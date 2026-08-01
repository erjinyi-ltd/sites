<script setup lang="ts">
import HomeHero from '../components/HomeHero.vue'
import HomeSections from '../components/HomeSections.vue'
import { usePreferences } from '../composables/usePreferences'

const { copy } = usePreferences()
</script>

<template>
  <main id="main-content" tabindex="-1">
    <HomeHero :copy="copy" />
    <HomeSections :copy="copy" />
  </main>
</template>
