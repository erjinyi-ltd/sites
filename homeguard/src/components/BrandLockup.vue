<script setup lang="ts">
import GcsaLogoIcon from './GcsaLogoIcon.vue'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <span class="brand-lockup" :class="{ 'brand-lockup--compact': compact }">
    <GcsaLogoIcon />
    <span class="brand-wordmark">
      <strong>GCSA</strong>
      <small>Home Guard</small>
    </span>
  </span>
</template>
