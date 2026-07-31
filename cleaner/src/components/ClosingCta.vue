<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['closing'] }>()
</script>

<template>
  <section class="closing content-width">
    <div><p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
    <div class="actions"><a class="primary-action" href="#platforms">{{ copy.primary }}<ArrowRight :size="17" /></a><a class="secondary-action" href="#windows">{{ copy.secondary }}</a></div>
  </section>
</template>

<style scoped>
.closing { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 42px; padding-block: 55px; border-block: 1px solid var(--border); }
.closing > div:first-child { max-width: 760px; }
h2 { margin-top: 12px; font-family: var(--font-display); font-size: clamp(26px, 3vw, 38px); letter-spacing: -.035em; line-height: 1.2; }
.closing p:last-child { margin-top: 14px; color: var(--muted-foreground); font-size: 14px; line-height: 1.7; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; }
@media (max-width: 900px) { .closing { grid-template-columns: 1fr; align-items: start; } }
@media (max-width: 580px) { .actions, .actions a { width: 100%; } }
</style>
