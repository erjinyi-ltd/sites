<script setup lang="ts">
import { Fingerprint, KeyRound, RotateCcw, ShieldCheck } from '@lucide/vue'
import type { Component } from 'vue'
import type { ProductPageCopy } from '../types/site'

defineProps<{ copy: ProductPageCopy['safety'] }>()

const icons: Component[] = [KeyRound, ShieldCheck, Fingerprint, RotateCcw]
</script>

<template>
  <section id="privacy" class="windows-safety">
    <div class="content-width">
      <div class="safety-intro">
        <div class="section-heading"><p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
        <p class="boundary-note"><ShieldCheck :size="19" />{{ copy.note }}</p>
      </div>
      <div class="safety-stack">
        <article v-for="(point, index) in copy.points" :key="point.title">
          <span class="index">0{{ index + 1 }}</span>
          <span class="icon"><component :is="icons[index]" :size="21" /></span>
          <div><h3>{{ point.title }}</h3><p>{{ point.description }}</p></div>
          <i></i>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.windows-safety { padding-block: 124px; border-block: 1px solid var(--border); background: radial-gradient(circle at 12% 40%, color-mix(in srgb, var(--windows) 10%, transparent), transparent 30rem), color-mix(in srgb, var(--muted) 42%, transparent); }
.safety-intro { display: grid; grid-template-columns: minmax(0, 1fr) minmax(420px, .85fr); align-items: end; gap: 60px; }
.boundary-note { display: flex; align-items: flex-start; gap: 11px; padding: 18px 20px; border: 1px solid color-mix(in srgb, var(--windows) 28%, var(--border)); border-left: 3px solid var(--windows); border-radius: 9px; color: var(--muted-foreground); background: color-mix(in srgb, var(--card) 80%, transparent); font-size: 12px; line-height: 1.72; }
.boundary-note svg { flex: 0 0 auto; margin-top: 2px; color: var(--windows); }
.safety-stack { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 48px; }
article { position: relative; display: grid; grid-template-columns: auto auto minmax(0, 1fr); align-items: start; gap: 14px; min-height: 170px; padding: 22px; overflow: hidden; border: 1px solid var(--border); border-radius: 11px; background: color-mix(in srgb, var(--card) 91%, transparent); }
article > i { position: absolute; right: -38px; bottom: -58px; width: 130px; height: 130px; border: 1px solid color-mix(in srgb, var(--windows) 10%, transparent); border-radius: 50%; }
.index { padding-top: 14px; color: color-mix(in srgb, var(--windows) 66%, var(--muted-foreground)); font-family: var(--font-data); font-size: 9px; font-weight: 700; }
.icon { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid color-mix(in srgb, var(--windows) 28%, var(--border)); border-radius: 9px; color: var(--windows); background: color-mix(in srgb, var(--windows) 8%, var(--muted)); }
h3 { padding-top: 3px; font-family: var(--font-card-title); font-size: 16px; }
article p { margin-top: 9px; color: var(--muted-foreground); font-size: 12px; line-height: 1.72; }
@media (max-width: 920px) { .safety-intro { grid-template-columns: 1fr; gap: 34px; } }
@media (max-width: 700px) { .windows-safety { padding-block: 88px; } .safety-stack { grid-template-columns: 1fr; } article { min-height: auto; } }
</style>
