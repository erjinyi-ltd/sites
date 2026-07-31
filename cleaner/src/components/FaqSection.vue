<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import type { ProductPageCopy } from '../types/site'

defineProps<{ copy: ProductPageCopy['faq'] }>()
</script>

<template>
  <section class="faq-section content-width">
    <div class="section-heading"><p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
    <div class="faq-list">
      <details v-for="(item, index) in copy.items" :key="item.question" :open="index === 0">
        <summary><span>{{ item.question }}</span><ChevronDown :size="18" aria-hidden="true" /></summary><p>{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>

<style scoped>
.faq-section { display: grid; grid-template-columns: minmax(0, .82fr) minmax(500px, 1.18fr); align-items: start; gap: clamp(54px, 8vw, 116px); padding-block: 118px; }
.faq-list { display: grid; border-top: 1px solid var(--border); }
details { border-bottom: 1px solid var(--border); }
summary { display: flex; min-height: 68px; align-items: center; justify-content: space-between; gap: 18px; color: var(--foreground); font-size: 14px; font-weight: 600; cursor: pointer; list-style: none; }
summary::-webkit-details-marker { display: none; }
summary svg { flex: 0 0 auto; color: var(--primary); transition: transform 180ms ease; }
details[open] summary svg { transform: rotate(180deg); }
details p { max-width: 720px; padding: 0 40px 22px 0; color: var(--muted-foreground); font-size: 13px; line-height: 1.75; }
@media (max-width: 900px) { .faq-section { grid-template-columns: 1fr; } }
@media (max-width: 620px) { .faq-section { gap: 36px; padding-block: 88px; } }
</style>
