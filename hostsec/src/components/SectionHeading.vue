<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  lead: string
  centered?: boolean
}>(), {
  centered: false,
})
</script>

<template>
  <header class="section-heading" :class="{ 'section-heading--centered': centered }">
    <p class="eyebrow"><span aria-hidden="true" />{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p class="section-lead">{{ lead }}</p>
  </header>
</template>
