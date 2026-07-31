<script setup lang="ts">
import { ArrowUpRight, Globe2, House, Shield } from '@lucide/vue'
import type { Component } from 'vue'
import type { EcosystemProduct, SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['ecosystem'] }>()

const icons: Record<EcosystemProduct['theme'], Component> = { wallet: Shield, vpn: Globe2, homeGuard: House }
</script>

<template>
  <section class="ecosystem content-width" aria-labelledby="ecosystem-title">
    <div class="section-heading"><p class="eyebrow">{{ copy.eyebrow }}</p><h2 id="ecosystem-title">{{ copy.title }}</h2><p>{{ copy.description }}</p></div>
    <div class="ecosystem-grid">
      <article v-for="product in copy.products" :key="product.name" :class="`theme-${product.theme}`">
        <span class="product-icon"><component :is="icons[product.theme]" :size="23" /></span><small>{{ product.type }}</small><h3>{{ product.name }}</h3><p>{{ product.description }}</p>
        <a :href="product.href" target="_blank" rel="noopener noreferrer">{{ copy.officialWebsite }}<ArrowUpRight :size="15" /></a>
      </article>
      <a class="more-card more-desktop" href="https://gcsa.org/products" target="_blank" rel="noopener noreferrer"><span>{{ copy.eyebrow }}</span><h3>{{ copy.moreTitle }}</h3><p>{{ copy.moreDescription }}</p><strong>{{ copy.viewAll }}<ArrowUpRight :size="16" /></strong></a>
      <a class="more-card more-mobile" href="https://gcsa.org/app/products" target="_blank" rel="noopener noreferrer"><span>{{ copy.eyebrow }}</span><h3>{{ copy.moreTitle }}</h3><p>{{ copy.moreDescription }}</p><strong>{{ copy.viewAll }}<ArrowUpRight :size="16" /></strong></a>
    </div>
  </section>
</template>

<style scoped>
.ecosystem { padding-block: 112px 84px; }
.ecosystem-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 40px; }
article, .more-card { position: relative; display: flex; min-height: 280px; flex-direction: column; padding: 23px; overflow: hidden; border: 1px solid var(--border); border-radius: 12px; background: color-mix(in srgb, var(--card) 92%, transparent); box-shadow: var(--shadow-card); transition: transform 180ms ease, border-color 180ms ease; }
article:hover, .more-card:hover { border-color: var(--border-strong); transform: translateY(-3px); }
.product-icon { display: grid; width: 46px; height: 46px; place-items: center; border: 1px solid color-mix(in srgb, var(--primary) 25%, var(--border)); border-radius: 10px; color: var(--primary); background: var(--muted); }
article small { margin-top: 20px; color: var(--muted-foreground); font-size: 10px; }
h3 { margin-top: 5px; font-family: var(--font-display); font-size: 17px; line-height: 1.25; }
article p, .more-card p { margin-top: 14px; color: var(--muted-foreground); font-size: 12px; line-height: 1.7; }
article a { display: inline-flex; align-items: center; gap: 6px; width: fit-content; margin-top: auto; padding-top: 18px; color: var(--primary); font-size: 11px; font-weight: 700; }
.theme-vpn .product-icon { color: var(--success); }
.theme-homeGuard .product-icon { color: var(--mac); }
.more-card { justify-content: center; background: radial-gradient(circle at 90% 10%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 42%), var(--card); }
.more-card > span { color: var(--primary); font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.more-card h3 { margin-top: 11px; font-size: 23px; }
.more-card strong { display: inline-flex; align-items: center; gap: 7px; margin-top: 22px; color: var(--primary); font-size: 12px; }
.more-mobile { display: none; }
@media (max-width: 1050px) { .ecosystem-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 620px) { .ecosystem { padding-block: 88px 62px; } .ecosystem-grid { grid-template-columns: 1fr; } article, .more-card { min-height: 240px; } .more-desktop { display: none; } .more-mobile { display: flex; } }
</style>
