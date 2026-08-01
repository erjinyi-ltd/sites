<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    lead?: string
    centered?: boolean
  }>(),
  { lead: undefined, centered: false },
)
</script>

<template>
  <div class="section-heading" :class="{ 'is-centered': centered }">
    <p class="eyebrow"><span />{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="lead" class="section-lead">{{ lead }}</p>
  </div>
</template>
