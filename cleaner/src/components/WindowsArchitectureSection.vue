<script setup lang="ts">
import { Check, Cpu, ScanLine, ShieldCheck } from '@lucide/vue'
import type { ProductPageCopy } from '../types/site'

defineProps<{ copy: ProductPageCopy['platforms'] }>()
</script>

<template>
  <section id="platforms" class="architecture-section">
    <div class="content-width architecture-layout">
      <div class="section-heading architecture-heading">
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h2>{{ copy.title }}</h2>
        <p>{{ copy.description }}</p>
        <div class="architecture-proof"><ShieldCheck :size="18" /><span>x64</span><i></i><span>ARM64</span><i></i><span>Windows 11</span></div>
      </div>
      <div class="architecture-grid">
        <article v-for="(item, index) in copy.items" :key="item.name">
          <div class="architecture-head">
            <span class="architecture-icon"><Cpu v-if="index === 0" :size="24" /><ScanLine v-else :size="24" /></span>
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
.architecture-section { padding-block: 118px; border-block: 1px solid var(--border); background: linear-gradient(135deg, color-mix(in srgb, var(--windows) 5%, var(--muted)), color-mix(in srgb, var(--muted) 48%, transparent)); }
.architecture-layout { display: grid; grid-template-columns: minmax(300px, .72fr) minmax(0, 1.28fr); align-items: start; gap: clamp(48px, 7vw, 100px); }
.architecture-heading { position: sticky; top: calc(var(--header-height) + 42px); }
.architecture-proof { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; width: fit-content; margin-top: 28px; padding: 11px 13px; border: 1px solid color-mix(in srgb, var(--windows) 28%, var(--border)); border-radius: 9px; color: var(--windows); background: color-mix(in srgb, var(--windows) 7%, transparent); font-family: var(--font-data); font-size: 10px; font-weight: 700; letter-spacing: .06em; }
.architecture-proof i { width: 3px; height: 3px; border-radius: 50%; background: currentColor; }
.architecture-grid { display: grid; gap: 16px; }
article { position: relative; overflow: hidden; padding: 25px; border: 1px solid color-mix(in srgb, var(--windows) 22%, var(--border)); border-radius: 13px; background: color-mix(in srgb, var(--card) 94%, transparent); box-shadow: var(--shadow-card); }
article::before { position: absolute; inset: 0 24px auto; height: 1px; background: linear-gradient(90deg, transparent, var(--windows), transparent); content: ''; }
.architecture-head { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 13px; }
.architecture-icon { display: grid; width: 48px; height: 48px; place-items: center; border: 1px solid color-mix(in srgb, var(--windows) 30%, var(--border)); border-radius: 10px; color: var(--windows); background: color-mix(in srgb, var(--windows) 8%, var(--muted)); }
.architecture-head small { color: var(--muted-foreground); font-family: var(--font-data); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; }
h3 { margin-top: 4px; font-family: var(--font-display); font-size: 18px; line-height: 1.2; }
.status { padding: 5px 8px; border: 1px solid color-mix(in srgb, var(--success) 30%, var(--border)); border-radius: 999px; color: var(--success); background: color-mix(in srgb, var(--success) 7%, transparent); font-size: 9px; font-weight: 700; }
.description { margin-top: 21px; color: var(--muted-foreground); font-size: 13px; line-height: 1.7; }
ul { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; margin-top: 20px; }
li { display: flex; align-items: flex-start; gap: 8px; font-size: 11px; line-height: 1.55; }
li svg { flex: 0 0 auto; margin-top: 1px; color: var(--success); }
.note { margin-top: 21px; padding-top: 17px; border-top: 1px solid var(--border); color: var(--muted-foreground); font-size: 11px; line-height: 1.65; }
@media (max-width: 940px) { .architecture-layout { grid-template-columns: 1fr; } .architecture-heading { position: static; } }
@media (max-width: 620px) { .architecture-section { padding-block: 88px; } .architecture-head { grid-template-columns: auto minmax(0, 1fr); } .status { grid-column: 2; justify-self: start; } ul { grid-template-columns: 1fr; } }
</style>
