<script setup lang="ts">
import { LockKeyhole, ShieldCheck } from '@lucide/vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['safety'] }>()
</script>

<template>
  <section id="privacy" class="safety-section content-width">
    <div class="safety-copy">
      <div class="section-heading"><p class="eyebrow">{{ copy.eyebrow }}</p><h2>{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
      <p class="safety-note"><ShieldCheck :size="18" />{{ copy.note }}</p>
    </div>
    <div class="safety-list">
      <article v-for="(point, index) in copy.points" :key="point.title"><span><LockKeyhole :size="19" /><small>0{{ index + 1 }}</small></span><div><h3>{{ point.title }}</h3><p>{{ point.description }}</p></div></article>
    </div>
  </section>
</template>

<style scoped>
.safety-section { display: grid; grid-template-columns: minmax(0, .88fr) minmax(480px, 1.12fr); align-items: start; gap: clamp(54px, 8vw, 112px); padding-block: 124px; }
.safety-copy { position: sticky; top: calc(var(--header-height) + 42px); }
.safety-note { display: flex; align-items: flex-start; gap: 10px; margin-top: 28px; padding: 16px 18px; border-left: 2px solid var(--primary); color: var(--muted-foreground); background: color-mix(in srgb, var(--primary) 6%, transparent); font-size: 12px; line-height: 1.7; }
.safety-note svg { flex: 0 0 auto; margin-top: 2px; color: var(--primary); }
.safety-list { display: grid; gap: 12px; }
article { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 16px; padding: 20px; border: 1px solid var(--border); border-radius: 11px; background: color-mix(in srgb, var(--card) 90%, transparent); }
article > span { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid color-mix(in srgb, var(--primary) 26%, var(--border)); border-radius: 9px; color: var(--primary); background: var(--muted); }
article > span small { display: none; }
h3 { font-family: var(--font-display); font-size: 16px; }
article p { margin-top: 8px; color: var(--muted-foreground); font-size: 13px; line-height: 1.72; }
@media (max-width: 920px) { .safety-section { grid-template-columns: 1fr; } .safety-copy { position: static; } }
@media (max-width: 620px) { .safety-section { gap: 38px; padding-block: 88px; } article { padding: 17px; } }
</style>
