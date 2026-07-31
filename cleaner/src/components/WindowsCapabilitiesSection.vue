<script setup lang="ts">
import { Activity, Boxes, Code2, Cpu, Database, Files, Network, Package, Rocket, RotateCcw, ShieldCheck, Trash2 } from '@lucide/vue'
import type { Component } from 'vue'
import type { FeatureItem, ProductPageCopy } from '../types/site'

defineProps<{ copy: ProductPageCopy['capabilities'] }>()

const icons: Record<FeatureItem['icon'], Component> = {
  trash: Trash2,
  code: Code2,
  apps: Boxes,
  files: Files,
  restore: RotateCcw,
  system: Activity,
  database: Database,
  rocket: Rocket,
  network: Network,
  shield: ShieldCheck,
  software: Package,
  driver: Cpu,
}
</script>

<template>
  <section id="capabilities" class="windows-capabilities content-width">
    <div class="section-heading"><p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
    <div class="capability-matrix">
      <article v-for="(item, index) in copy.items" :key="item.title" :class="{ recovery: index === copy.items.length - 1 }">
        <div class="card-head"><span class="module-number">{{ String(index + 1).padStart(2, '0') }}</span><span class="icon"><component :is="icons[item.icon]" :size="23" /></span><span class="tag">{{ item.tag }}</span></div>
        <h3>{{ item.title }}</h3><p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.windows-capabilities { padding-block: 126px; }
.capability-matrix { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 52px; }
article { position: relative; min-height: 270px; padding: 30px; overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: linear-gradient(145deg, color-mix(in srgb, var(--card) 96%, transparent), color-mix(in srgb, var(--windows) 3%, var(--card))); box-shadow: var(--shadow-card); transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
article::before { position: absolute; inset: 0 22px auto; height: 1px; background: linear-gradient(90deg, var(--windows), transparent); content: ''; }
article::after { position: absolute; right: -70px; bottom: -100px; width: 190px; height: 190px; border: 1px solid color-mix(in srgb, var(--windows) 9%, transparent); border-radius: 50%; content: ''; pointer-events: none; }
article:hover { border-color: color-mix(in srgb, var(--windows) 42%, var(--border)); box-shadow: var(--shadow-card-hover); transform: translateY(-3px); }
article.recovery { background: radial-gradient(circle at 88% 16%, color-mix(in srgb, var(--success) 10%, transparent), transparent 35%), color-mix(in srgb, var(--card) 96%, transparent); }
.card-head { display: grid; grid-template-columns: auto auto minmax(0, 1fr); align-items: center; gap: 11px; }
.module-number { color: color-mix(in srgb, var(--windows) 55%, var(--muted-foreground)); font-family: var(--font-data); font-size: 9px; font-weight: 700; }
.icon { display: grid; width: 46px; height: 46px; place-items: center; border: 1px solid color-mix(in srgb, var(--windows) 28%, var(--border)); border-radius: 9px; color: var(--windows); background: color-mix(in srgb, var(--windows) 8%, var(--muted)); }
.tag { justify-self: end; color: var(--windows); font-family: var(--font-data); font-size: 9px; font-weight: 700; letter-spacing: .12em; }
h3 { margin-top: 25px; font-family: var(--font-display); font-size: 19px; font-weight: 600; line-height: 1.3; }
article p { max-width: 760px; margin-top: 13px; color: var(--muted-foreground); font-size: 13px; line-height: 1.75; }
@media (max-width: 760px) { .capability-matrix { grid-template-columns: 1fr; gap: 18px; } }
@media (max-width: 620px) { .windows-capabilities { padding-block: 88px; } .capability-matrix { margin-top: 40px; } article { min-height: auto; padding: 24px; } }
</style>
