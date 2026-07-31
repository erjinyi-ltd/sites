<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['closing'] }>()
</script>

<template>
  <section class="closing-section content-width">
    <div>
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h2>{{ copy.title }}</h2>
      <p class="description">{{ copy.description }}</p>
    </div>
    <a href="#top">{{ copy.action }}<ArrowUp :size="17" aria-hidden="true" /></a>
  </section>
</template>

<style scoped>
.closing-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 40px;
  margin-bottom: 82px;
  padding-block: 48px;
  border-block: 1px solid var(--border);
}

.closing-section > div {
  max-width: 780px;
}

h2 {
  margin-top: 13px;
  font-family: var(--font-display);
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 650;
  letter-spacing: -0.035em;
  line-height: 1.2;
}

.description {
  margin-top: 16px;
  color: var(--muted-foreground);
  font-size: 14px;
  line-height: 1.72;
}

a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 18px;
  border-left: 2px solid var(--primary);
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 6%, transparent);
  font-size: 13px;
  font-weight: 700;
}

a svg {
  color: var(--primary);
  transition: transform 180ms ease;
}

a:hover svg {
  transform: translateY(-3px);
}

@media (max-width: 720px) {
  .closing-section {
    grid-template-columns: 1fr;
    align-items: start;
    margin-bottom: 62px;
  }

  a {
    justify-self: start;
  }
}
</style>
