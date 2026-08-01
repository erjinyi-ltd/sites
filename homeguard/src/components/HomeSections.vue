<script setup lang="ts">
import type { SiteCopy } from '../types/site'
import ArrowMark from './ArrowMark.vue'
import SectionHeading from './SectionHeading.vue'

defineProps<{ copy: SiteCopy }>()
const contactEmail = 'contact@gcsa.org'
</script>

<template>
  <section id="scenarios" class="section content-width">
    <SectionHeading :eyebrow="copy.scenarioEyebrow" :title="copy.scenarioTitle" :lead="copy.scenarioLead" />
    <div class="scenario-grid">
      <article v-for="item in copy.scenarios" :key="item.code" class="scenario-card">
        <div class="scenario-card-top"><span>{{ item.code }}</span><i /></div>
        <div class="scenario-icon" :class="`scenario-icon-${item.code}`"><span /><i /><b /></div>
        <p class="signal-label">{{ item.signal }}</p>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>

  <section class="network-band">
    <div class="content-width network-grid">
      <div class="network-copy">
        <SectionHeading :eyebrow="copy.mapEyebrow" :title="copy.mapTitle" :lead="copy.mapLead" />
        <div class="network-legend">
          <span><i class="legend-safe" />{{ copy.mapLegendSafe }}</span>
          <span><i class="legend-review" />{{ copy.mapLegendReview }}</span>
          <span><i class="legend-risk" />{{ copy.mapLegendRisk }}</span>
        </div>
        <p class="network-note">{{ copy.mapNote }}</p>
      </div>
      <div class="network-map" :aria-label="copy.mapTitle">
        <div class="map-grid" aria-hidden="true" />
        <div class="map-route route-phone" aria-hidden="true" />
        <div class="map-route route-camera" aria-hidden="true" />
        <div class="map-route route-speaker" aria-hidden="true" />
        <div class="map-route route-unknown" aria-hidden="true" />
        <div class="map-node map-hub"><span class="map-node-icon">⌁</span><strong>{{ copy.mapRouter }}</strong><small>192.168.1.1</small></div>
        <div class="map-node map-phone"><span class="map-node-icon">▯</span><strong>{{ copy.mapPhone }}</strong><small>TRUSTED</small></div>
        <div class="map-node map-camera"><span class="map-node-icon">◉</span><strong>{{ copy.mapCamera }}</strong><small>REVIEW</small></div>
        <div class="map-node map-speaker"><span class="map-node-icon">◌</span><strong>{{ copy.mapSpeaker }}</strong><small>TRUSTED</small></div>
        <div class="map-node map-unknown"><span class="map-node-icon">?</span><strong>{{ copy.mapUnknown }}</strong><small>NEW DEVICE</small></div>
      </div>
    </div>
  </section>

  <section id="coverage" class="section content-width">
    <SectionHeading :eyebrow="copy.coverageEyebrow" :title="copy.coverageTitle" :lead="copy.coverageLead" centered />
    <div class="coverage-grid">
      <article v-for="item in copy.coverage" :key="item.code" class="coverage-card">
        <span>{{ item.code }}</span>
        <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
        <i aria-hidden="true">+</i>
      </article>
    </div>
  </section>

  <section class="finance-band">
    <div class="content-width finance-grid">
      <div class="finance-copy">
        <SectionHeading :eyebrow="copy.financeEyebrow" :title="copy.financeTitle" :lead="copy.financeLead" />
        <ul>
          <li v-for="item in copy.financeSignals" :key="item"><span>✓</span>{{ item }}</li>
        </ul>
      </div>
      <div class="finance-console">
        <div class="console-head"><span>HOME GUARD / RISK SIGNAL</span><i /></div>
        <div class="console-radar" aria-hidden="true">
          <span class="radar-sweep" /><i class="radar-point point-one" /><i class="radar-point point-two" /><i class="radar-point point-three" />
        </div>
        <div class="console-alert"><span>!</span><div><strong>{{ copy.financeAlert }}</strong><p>{{ copy.financeAlertText }}</p></div></div>
      </div>
    </div>
  </section>

  <section id="privacy-first" class="privacy-band">
    <div class="content-width privacy-grid">
      <div>
        <p class="eyebrow"><span />{{ copy.boundaryEyebrow }}</p>
        <h2>{{ copy.boundaryTitle }}</h2>
        <p class="section-lead">{{ copy.boundaryLead }}</p>
        <RouterLink class="text-link" to="/privacy">{{ copy.privacyAction }} <ArrowMark /></RouterLink>
      </div>
      <div class="boundary-list">
        <article v-for="(item, index) in copy.boundaries" :key="item.title">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
        </article>
      </div>
    </div>
  </section>

  <section id="faq" class="section content-width faq-section">
    <SectionHeading :eyebrow="copy.faqEyebrow" :title="copy.faqTitle" />
    <div class="faq-list">
      <details v-for="(item, index) in copy.faqs" :key="item.q">
        <summary><span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ item.q }}</strong><i aria-hidden="true">+</i></summary>
        <p>{{ item.a }}</p>
      </details>
    </div>
  </section>

  <section class="closing-section">
    <div class="content-width closing-inner">
      <p class="eyebrow"><span />{{ copy.ctaEyebrow }}</p>
      <h2>{{ copy.ctaTitle }}</h2>
      <div>
        <RouterLink class="button button-primary" to="/support">{{ copy.ctaPrimary }}<ArrowMark /></RouterLink>
        <a class="button button-secondary" :href="`mailto:${contactEmail}`">{{ copy.ctaSecondary }}</a>
      </div>
    </div>
  </section>
</template>
