<script setup lang="ts">
import type { SiteCopy } from '../types/site'
import ArrowMark from './ArrowMark.vue'
import BrandLockup from './BrandLockup.vue'

defineProps<{ copy: SiteCopy }>()
</script>

<template>
  <section class="hero-section">
    <div class="hero-grid content-width">
      <div class="hero-copy">
        <p class="eyebrow"><span />{{ copy.heroEyebrow }}</p>
        <h1>{{ copy.heroTitle }}</h1>
        <p class="hero-lead">{{ copy.heroLead }}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#scenarios">{{ copy.heroPrimary }}<ArrowMark /></a>
          <a class="button button-secondary" href="#privacy-first">{{ copy.heroSecondary }}</a>
        </div>
        <div class="trust-pills" aria-label="Product attributes">
          <span><i class="pill-dot" />{{ copy.iosBadge }}</span>
          <span>{{ copy.localBadge }}</span>
          <span>{{ copy.noTrackBadge }}</span>
        </div>
      </div>

      <div class="hero-visual" :aria-label="copy.phoneTitle">
        <div class="visual-orbit orbit-a" aria-hidden="true" />
        <div class="visual-orbit orbit-b" aria-hidden="true" />
        <span class="visual-node node-a" aria-hidden="true" />
        <span class="visual-node node-b" aria-hidden="true" />
        <span class="visual-node node-c" aria-hidden="true" />
        <div class="phone-frame">
          <div class="phone-island" />
          <div class="phone-screen">
            <div class="phone-topline">
              <BrandLockup compact />
              <span class="live-dot" />
            </div>
            <div class="score-panel">
              <div class="score-ring">
                <span>{{ copy.phoneScore }}</span>
                <small>{{ copy.phoneScoreLabel }}</small>
              </div>
              <div class="score-copy">
                <strong>{{ copy.phoneTitle }}</strong>
                <p><i />{{ copy.phoneStatus }}</p>
              </div>
            </div>
            <div class="phone-checks">
              <div>
                <span class="check-glyph">⌁</span>
                <p><strong>{{ copy.phoneNetwork }}</strong><small>{{ copy.phoneSafe }}</small></p>
                <i class="status-good">✓</i>
              </div>
              <div>
                <span class="check-glyph">◎</span>
                <p><strong>{{ copy.phonePrivacy }}</strong><small>{{ copy.phoneWatch }}</small></p>
                <i class="status-watch">!</i>
              </div>
              <div>
                <span class="check-glyph">◇</span>
                <p><strong>{{ copy.phoneFinance }}</strong><small>{{ copy.phoneSafe }}</small></p>
                <i class="status-good">✓</i>
              </div>
            </div>
            <button class="phone-action" type="button"><span class="scan-mini" aria-hidden="true" />{{ copy.phoneCheck }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-gridline" aria-hidden="true" />
  </section>

  <section class="metrics-band">
    <div class="content-width metrics-grid">
      <article v-for="item in copy.metrics" :key="item.label">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </article>
    </div>
  </section>
</template>
