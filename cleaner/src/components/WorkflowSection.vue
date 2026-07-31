<script setup lang="ts">
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['workflow'] }>()
</script>

<template>
  <section id="workflow" class="workflow-section">
    <div class="content-width">
      <div class="section-heading"><p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
      <ol class="workflow-grid">
        <li v-for="step in copy.steps" :key="step.number"><span>{{ step.number }}</span><div><h3>{{ step.title }}</h3><p>{{ step.description }}</p></div></li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.workflow-section { padding-block: 116px; border-block: 1px solid color-mix(in srgb, var(--border) 72%, transparent); background: radial-gradient(circle at 78% 48%, color-mix(in srgb, var(--primary) 9%, transparent), transparent 28rem), color-mix(in srgb, var(--muted) 45%, transparent); }
.workflow-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 48px; }
li { position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 16px; padding: 0 23px; }
li:first-child { padding-left: 0; }
li:last-child { padding-right: 0; }
li + li { border-left: 1px solid var(--border); }
li > span { display: grid; width: 42px; height: 42px; place-items: center; border: 1px solid color-mix(in srgb, var(--primary) 30%, var(--border)); border-radius: 10px; color: var(--primary); background: color-mix(in srgb, var(--primary) 7%, var(--card)); font-family: var(--font-data); font-size: 11px; font-weight: 700; }
h3 { font-family: var(--font-display); font-size: 16px; line-height: 1.3; }
li p { margin-top: 10px; color: var(--muted-foreground); font-size: 12px; line-height: 1.72; }
@media (max-width: 980px) { .workflow-grid { grid-template-columns: 1fr 1fr; gap: 34px 0; } li:nth-child(3) { padding-left: 0; border-left: 0; } }
@media (max-width: 620px) { .workflow-section { padding-block: 88px; } .workflow-grid { grid-template-columns: 1fr; gap: 0; } li, li:first-child, li:last-child { padding: 22px 0; } li + li { border-top: 1px solid var(--border); border-left: 0; } }
</style>
