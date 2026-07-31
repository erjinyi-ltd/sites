<script setup lang="ts">
defineProps<{ items: Array<{ value: string; label: string; description: string }> }>()
</script>

<template>
  <section class="facts content-width" aria-label="Product facts">
    <article v-for="item in items" :key="item.label">
      <strong>{{ item.value }}</strong><span>{{ item.label }}</span><p>{{ item.description }}</p>
    </article>
  </section>
</template>

<style scoped>
.facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); overflow: hidden; margin-bottom: 112px; border: 1px solid var(--border); border-radius: 12px; background: color-mix(in srgb, var(--card) 88%, transparent); box-shadow: var(--shadow-soft); }
article { position: relative; display: grid; gap: 5px; min-height: 132px; align-content: center; padding: 24px 28px; }
article + article { border-left: 1px solid var(--border); }
strong { color: var(--primary); font-family: var(--font-display); font-size: clamp(18px, 2vw, 25px); }
span { font-size: 13px; font-weight: 700; }
p { color: var(--muted-foreground); font-size: 12px; line-height: 1.55; }
@media (max-width: 720px) { .facts { grid-template-columns: 1fr; margin-bottom: 88px; } article { min-height: 116px; text-align: center; } article + article { border-top: 1px solid var(--border); border-left: 0; } }
</style>
