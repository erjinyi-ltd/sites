<script setup lang="ts">
import { computed } from 'vue'
import { GcsaLogo } from 'gcsa-ui'

const props = withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
const rootClass = computed(() =>
  props.compact ? 'site-brand-lockup site-brand-lockup--compact' : 'site-brand-lockup',
)
</script>

<template>
  <GcsaLogo
    title="GCSA"
    tagline="WATERMARK"
    :size="compact ? 'sm' : 'md'"
    :root-class="rootClass"
  />
</template>

<style src="../../../shared/gcsaUiLogo.css"></style>
