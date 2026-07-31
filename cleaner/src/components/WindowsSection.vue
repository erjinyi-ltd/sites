<script setup lang="ts">
import { Check, Construction, MonitorCog } from '@lucide/vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['windows'] }>()
</script>

<template>
  <section id="windows" class="windows-section">
    <div class="content-width windows-card">
      <div class="windows-copy">
        <p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p>
        <span class="status"><Construction :size="16" />{{ copy.status }}</span>
      </div>
      <div class="windows-panel">
        <span class="monitor"><MonitorCog :size="34" /></span>
        <ul><li v-for="feature in copy.features" :key="feature"><Check :size="16" />{{ feature }}</li></ul>
        <p>{{ copy.boundary }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.windows-section { padding-block: 108px; border-block: 1px solid var(--border); background: color-mix(in srgb, var(--muted) 48%, transparent); }
.windows-card { display: grid; grid-template-columns: minmax(0, 1fr) minmax(430px, .9fr); align-items: center; gap: clamp(50px, 8vw, 110px); }
h2 { margin-top: 13px; font-family: var(--font-display); font-size: clamp(29px, 4vw, 44px); letter-spacing: -.04em; line-height: 1.18; }
.windows-copy > p:not(.eyebrow) { margin-top: 17px; color: var(--muted-foreground); font-size: 15px; line-height: 1.75; }
.status { display: inline-flex; align-items: center; gap: 8px; margin-top: 26px; padding: 8px 11px; border: 1px solid color-mix(in srgb, var(--warning) 30%, var(--border)); border-radius: 999px; color: var(--warning); background: color-mix(in srgb, var(--warning) 7%, transparent); font-size: 11px; font-weight: 700; }
.windows-panel { position: relative; overflow: hidden; padding: 26px; border: 1px solid color-mix(in srgb, var(--primary) 28%, var(--border)); border-radius: 13px; background: color-mix(in srgb, var(--card) 92%, transparent); box-shadow: var(--shadow-card); }
.windows-panel::before { position: absolute; inset: -80px -50px auto auto; width: 220px; height: 220px; border: 1px solid color-mix(in srgb, var(--primary) 16%, transparent); border-radius: 50%; content: ''; }
.monitor { display: grid; width: 62px; height: 62px; place-items: center; border: 1px solid color-mix(in srgb, var(--primary) 26%, var(--border)); border-radius: 13px; color: var(--primary); background: var(--muted); }
ul { display: grid; grid-template-columns: 1fr 1fr; gap: 13px 18px; margin-top: 24px; }
li { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; line-height: 1.5; }
li svg { flex: 0 0 auto; color: var(--success); }
.windows-panel p { margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border); color: var(--muted-foreground); font-size: 11px; line-height: 1.7; }
@media (max-width: 900px) { .windows-card { grid-template-columns: 1fr; } }
@media (max-width: 620px) { .windows-section { padding-block: 82px; } ul { grid-template-columns: 1fr; } }
</style>
