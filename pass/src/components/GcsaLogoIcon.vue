<script setup lang="ts">
import { useId } from "vue";
import originalLogoSvg from "../assets/gcsa-icon.svg?raw";

const clipId = `gcsa-logo-${useId()}`;
const inlineLogoSvg = originalLogoSvg
  .replaceAll("clip0_vpn_logo_cyan", clipId)
  .replaceAll('fill="#07BCCD"', 'fill="currentColor"')
  .replace('width="200" height="184"', 'width="100%" height="100%"');
</script>

<template>
  <span class="gcsa-logo-symbol" aria-hidden="true" v-html="inlineLogoSvg"></span>
</template>
