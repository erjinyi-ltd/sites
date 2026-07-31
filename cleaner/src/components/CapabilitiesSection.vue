<script setup lang="ts">
import { Activity, Boxes, Code2, Files, RotateCcw, Trash2 } from '@lucide/vue'
import type { Component } from 'vue'
import type { FeatureItem, SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['capabilities'] }>()

const icons: Record<FeatureItem['icon'], Component> = {
  trash: Trash2,
  code: Code2,
  apps: Boxes,
  files: Files,
  restore: RotateCcw,
  system: Activity,
}
</script>

<template>
  <section id="capabilities" class="capabilities content-width">
    <div class="section-heading"><p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
    <div class="feature-grid">
      <article v-for="item in copy.items" :key="item.title">
        <div class="card-head"><span class="icon"><component :is="icons[item.icon]" :size="22" /></span><span class="tag">{{ item.tag }}</span></div>
        <h3>{{ item.title }}</h3><p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.capabilities { padding-block: 120px; }
.feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 44px; }
article { position: relative; min-height: 260px; padding: 25px; overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: color-mix(in srgb, var(--card) 92%, transparent); box-shadow: var(--shadow-card); transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
article::before { position: absolute; inset: 0 22px auto; height: 1px; background: linear-gradient(90deg, var(--primary), transparent); content: ''; }
article:hover { border-color: color-mix(in srgb, var(--primary) 38%, var(--border)); box-shadow: var(--shadow-card-hover); transform: translateY(-3px); }
.card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.icon { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid color-mix(in srgb, var(--primary) 25%, var(--border)); border-radius: 9px; color: var(--primary); background: var(--muted); }
.tag { color: var(--primary); font-family: var(--font-data); font-size: 9px; font-weight: 700; letter-spacing: .12em; }
h3 { margin-top: 25px; font-family: var(--font-display); font-size: 19px; font-weight: 600; line-height: 1.3; }
article p { margin-top: 14px; color: var(--muted-foreground); font-size: 13px; line-height: 1.75; }
@media (max-width: 960px) { .feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 620px) { .capabilities { padding-block: 88px; } .feature-grid { grid-template-columns: 1fr; } article { min-height: auto; } }
</style>
