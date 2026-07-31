<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['faq'] }>()
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="content-width faq-layout">
      <SectionHeader :eyebrow="copy.eyebrow" :title="copy.title" :description="copy.description" />
      <div class="faq-list">
        <details v-for="(item, index) in copy.items" :key="item.question" :open="index === 0">
          <summary>
            <span>{{ item.question }}</span>
            <ChevronDown :size="18" aria-hidden="true" />
          </summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  padding-block: 116px;
}

.faq-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(480px, 1.28fr);
  align-items: start;
  gap: clamp(54px, 8vw, 112px);
}

.faq-list {
  border-top: 1px solid var(--border);
}

details {
  border-bottom: 1px solid var(--border);
}

summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 74px;
  padding: 18px 4px;
  color: var(--foreground);
  cursor: pointer;
  list-style: none;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 620;
  line-height: 1.45;
}

summary::-webkit-details-marker {
  display: none;
}

summary svg {
  flex: 0 0 auto;
  color: var(--primary);
  transition: transform 200ms ease;
}

details[open] summary svg {
  transform: rotate(180deg);
}

details p {
  max-width: 680px;
  padding: 0 34px 24px 4px;
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 1.75;
}

@media (max-width: 900px) {
  .faq-layout {
    grid-template-columns: 1fr;
    gap: 42px;
  }
}

@media (max-width: 640px) {
  .faq-section {
    padding-block: 82px;
  }

  summary {
    min-height: 68px;
    font-size: 13px;
  }
}
</style>
