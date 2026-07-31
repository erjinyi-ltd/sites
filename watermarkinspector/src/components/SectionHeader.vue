<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    description?: string
    align?: 'left' | 'center'
  }>(),
  { description: '', align: 'left' },
)
</script>

<template>
  <header class="section-header" :class="`align-${align}`">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="description" class="description">{{ description }}</p>
  </header>
</template>

<style scoped>
.section-header {
  max-width: 720px;
}

.align-center {
  margin-inline: auto;
  text-align: center;
}

h2 {
  margin-top: 14px;
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 650;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

.description {
  margin-top: 18px;
  color: var(--muted-foreground);
  font-size: 15px;
  line-height: 1.75;
}
</style>
