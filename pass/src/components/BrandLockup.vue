<script setup lang="ts">
import { GcsaLogo } from 'gcsa-ui'

withDefaults(defineProps<{ tagline?: string }>(), { tagline: 'PassRecover' })
</script>

<template>
  <GcsaLogo
    title="GCSA"
    :tagline="tagline"
    size="md"
    root-class="site-brand-lockup"
  />
</template>

<style src="../../../shared/gcsaUiLogo.css"></style>
