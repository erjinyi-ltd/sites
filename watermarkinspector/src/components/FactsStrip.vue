<script setup lang="ts">
import { FileStack, Languages, LockKeyhole } from '@lucide/vue'
import type { SiteCopy } from '../types/site'

defineProps<{ items: SiteCopy['facts'] }>()
const icons = [FileStack, LockKeyhole, Languages]
</script>

<template>
  <section class="facts content-width" aria-label="Product facts">
    <article v-for="(item, index) in items" :key="item.label">
      <span class="fact-icon"><component :is="icons[index]" :size="20" aria-hidden="true" /></span>
      <div><strong>{{ item.value }}</strong><span>{{ item.label }}</span><p>{{ item.description }}</p></div>
    </article>
  </section>
</template>

<style scoped>
.facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--card) 88%, transparent);
  box-shadow: var(--shadow-soft);
}

article {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 14px;
  min-height: 116px;
  padding: 22px 24px;
}

article + article {
  border-left: 1px solid var(--border);
}

.fact-icon {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border));
  border-radius: 9px;
  color: var(--primary);
  background: var(--muted);
}

article div {
  display: grid;
  gap: 3px;
}

strong {
  color: var(--foreground);
  font-family: var(--font-data);
  font-size: 15px;
  font-weight: 750;
}

span,
p {
  color: var(--muted-foreground);
  font-size: 11px;
  line-height: 1.45;
}

article div > span {
  color: var(--primary);
  font-weight: 700;
}

@media (max-width: 820px) {
  .facts {
    grid-template-columns: 1fr;
  }

  article + article {
    border-top: 1px solid var(--border);
    border-left: 0;
  }
}
</style>
