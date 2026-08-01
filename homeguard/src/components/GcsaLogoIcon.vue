<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import originalLogoSvg from '/gcsa-icon.svg?raw'

const instanceId = `gcsa-logo-${getCurrentInstance()?.uid ?? 0}`
const inlineLogoSvg = computed(() =>
  originalLogoSvg
    .replaceAll('clip0_vpn_logo_cyan', instanceId)
    .replaceAll('fill="#07BCCD"', 'fill="currentColor"')
    .replace('width="200" height="184"', 'width="100%" height="100%"'),
)
</script>

<template>
  <span class="brand-symbol" aria-hidden="true" v-html="inlineLogoSvg" />
</template>
