<script setup lang="ts">
import { GcsaLogo } from 'gcsa-ui'

defineProps<{ href?: string; ariaLabel?: string }>()
const emit = defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <GcsaLogo
    :href="href"
    title="GCSA"
    tagline="HostSec"
    size="md"
    root-class="site-brand-lockup"
    :aria-label="ariaLabel"
    @click="emit('click', $event)"
  />
</template>

<style src="../../../shared/gcsaUiLogo.css"></style>
