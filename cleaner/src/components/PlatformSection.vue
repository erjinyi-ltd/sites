<script setup lang="ts">
import { Apple, Check, MonitorCog } from '@lucide/vue'
import type { ProductPageCopy } from '../types/site'

defineProps<{ copy: ProductPageCopy['platforms'] }>()
</script>

<template>
  <section id="platforms" class="platform-section">
    <div class="content-width">
      <div class="section-heading">
        <p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p>
      </div>
      <div class="platform-grid">
        <article v-for="item in copy.items" :key="item.name" :class="[`tone-${item.statusTone}`, { windows: item.platform.startsWith('Windows') }]">
          <div class="platform-head">
            <span class="platform-icon"><Apple v-if="item.platform === 'macOS'" :size="24" /><MonitorCog v-else :size="24" /></span>
            <div><small>{{ item.platform }}</small><h3>{{ item.name }}</h3></div>
            <span class="status">{{ item.status }}</span>
          </div>
          <p class="description">{{ item.description }}</p>
          <ul><li v-for="feature in item.features" :key="feature"><Check :size="15" />{{ feature }}</li></ul>
          <p class="note">{{ item.note }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platform-section { padding-block: 112px; background: color-mix(in srgb, var(--muted) 48%, transparent); border-block: 1px solid color-mix(in srgb, var(--border) 70%, transparent); }
.platform-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 42px; }
article { position: relative; display: flex; flex-direction: column; min-height: 100%; padding: 25px; overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: color-mix(in srgb, var(--card) 92%, transparent); box-shadow: var(--shadow-card); }
article::before { position: absolute; inset: 0 22px auto; height: 1px; background: linear-gradient(90deg, transparent, var(--primary), transparent); content: ''; }
.tone-ready::before { background: linear-gradient(90deg, transparent, var(--mac), transparent); }
.tone-ready.windows::before { background: linear-gradient(90deg, transparent, var(--windows), transparent); }
.tone-building::before { background: linear-gradient(90deg, transparent, var(--windows), transparent); }
.platform-head { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; }
.platform-icon { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid var(--border); border-radius: 9px; color: var(--primary); background: var(--muted); }
.tone-ready .platform-icon { color: var(--mac); }
.tone-ready.windows .platform-icon { color: var(--windows); }
.platform-head small { color: var(--muted-foreground); font-size: 10px; text-transform: uppercase; }
h3 { margin-top: 3px; font-family: var(--font-display); font-size: 16px; line-height: 1.2; }
.status { align-self: start; padding: 5px 8px; border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border)); border-radius: 999px; color: var(--primary); background: color-mix(in srgb, var(--primary) 7%, transparent); font-size: 9px; font-weight: 700; white-space: nowrap; }
.tone-ready .status { color: var(--mac); border-color: color-mix(in srgb, var(--mac) 30%, var(--border)); background: color-mix(in srgb, var(--mac) 7%, transparent); }
.tone-ready.windows .status { color: var(--windows); border-color: color-mix(in srgb, var(--windows) 30%, var(--border)); background: color-mix(in srgb, var(--windows) 7%, transparent); }
.tone-building .status { color: var(--warning); border-color: color-mix(in srgb, var(--warning) 30%, var(--border)); background: color-mix(in srgb, var(--warning) 7%, transparent); }
.description { margin-top: 22px; color: var(--muted-foreground); font-size: 14px; line-height: 1.7; }
ul { display: grid; gap: 10px; margin-top: 20px; }
li { display: flex; align-items: flex-start; gap: 8px; color: var(--foreground); font-size: 12px; line-height: 1.5; }
li svg { flex: 0 0 auto; margin-top: 1px; color: var(--success); }
.note { margin-top: auto; padding-top: 22px; color: var(--muted-foreground); font-size: 11px; line-height: 1.65; }
@media (max-width: 680px) { .platform-section { padding-block: 88px; } .platform-grid { grid-template-columns: 1fr; } }
</style>
