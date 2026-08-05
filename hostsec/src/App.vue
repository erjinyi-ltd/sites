<script setup lang="ts">
import ArchitectureFlow from './components/ArchitectureFlow.vue'
import HeroConsole from './components/HeroConsole.vue'
import SectionHeading from './components/SectionHeading.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import { usePreferences } from './composables/usePreferences'

const { locale, theme, copy, setLocale, toggleTheme } = usePreferences()
</script>

<template>
  <div id="top" class="site-shell">
    <a class="skip-link" href="#main-content">{{ copy.skip }}</a>
    <div class="ambient-grid" aria-hidden="true" />
    <SiteHeader
      :copy="copy"
      :locale="locale"
      :theme="theme"
      @locale-change="setLocale"
      @theme-toggle="toggleTheme"
    />

    <main id="main-content">
      <section class="hero-section">
        <div class="hero-orbit hero-orbit-a" aria-hidden="true" />
        <div class="hero-orbit hero-orbit-b" aria-hidden="true" />
        <div class="content-width hero-grid">
          <div class="hero-copy">
            <p class="eyebrow"><span aria-hidden="true" />{{ copy.heroEyebrow }}</p>
            <h1>{{ copy.heroTitle }}</h1>
            <p class="hero-lead">{{ copy.heroLead }}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#capabilities">{{ copy.heroPrimary }}<span aria-hidden="true">↓</span></a>
              <a class="button button-secondary" href="#architecture">{{ copy.heroSecondary }}<span aria-hidden="true">↓</span></a>
            </div>
            <div class="hero-signals" aria-label="Platform highlights">
              <span v-for="signal in copy.heroSignals" :key="signal"><i aria-hidden="true" />{{ signal }}</span>
            </div>
          </div>
          <div class="hero-visual">
            <HeroConsole :copy="copy.console" />
          </div>
        </div>
      </section>

      <section class="facts-band" aria-label="Platform facts">
        <div class="content-width facts-grid">
          <article v-for="fact in copy.facts" :key="fact.value">
            <strong>{{ fact.value }}</strong>
            <span>{{ fact.label }}</span>
          </article>
        </div>
      </section>

      <section id="capabilities" class="section capabilities-section">
        <div class="content-width">
          <SectionHeading
            :eyebrow="copy.featuresEyebrow"
            :title="copy.featuresTitle"
            :lead="copy.featuresLead"
          />
          <div class="feature-grid">
            <article v-for="feature in copy.features" :key="feature.code" class="feature-card">
              <div class="feature-card-top">
                <span>{{ feature.code }}</span>
                <i aria-hidden="true" />
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.text }}</p>
              <div class="feature-tags">
                <span v-for="tag in feature.tags" :key="tag">{{ tag }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="architecture" class="section architecture-section">
        <div class="content-width architecture-grid">
          <div class="architecture-copy">
            <SectionHeading
              :eyebrow="copy.architectureEyebrow"
              :title="copy.architectureTitle"
              :lead="copy.architectureLead"
            />
            <div class="architecture-metrics">
              <span><strong>1</strong> Go control plane</span>
              <span><strong>2</strong> Host platforms</span>
              <span><strong>3</strong> API scopes</span>
            </div>
          </div>
          <ArchitectureFlow :layers="copy.architectureLayers" :note="copy.architectureNote" />
        </div>
      </section>

      <section id="workflow" class="section workflow-section">
        <div class="content-width">
          <SectionHeading
            :eyebrow="copy.flowEyebrow"
            :title="copy.flowTitle"
            :lead="copy.flowLead"
            centered
          />
          <div class="workflow-track">
            <article v-for="(step, index) in copy.flowSteps" :key="step.index">
              <div class="workflow-index"><span>{{ step.index }}</span><i aria-hidden="true" /></div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
              <span v-if="index < copy.flowSteps.length - 1" class="workflow-arrow" aria-hidden="true">→</span>
            </article>
          </div>
        </div>
      </section>

      <section id="security-boundaries" class="section control-section">
        <div class="content-width control-grid">
          <div>
            <p class="eyebrow"><span aria-hidden="true" />{{ copy.controlEyebrow }}</p>
            <h2>{{ copy.controlTitle }}</h2>
            <p class="section-lead">{{ copy.controlLead }}</p>
          </div>
          <div class="control-list">
            <article v-for="(control, index) in copy.controls" :key="control.title">
              <span>0{{ index + 1 }}</span>
              <div><h3>{{ control.title }}</h3><p>{{ control.text }}</p></div>
            </article>
          </div>
        </div>
      </section>

      <section class="section faq-section">
        <div class="content-width faq-grid">
          <div class="faq-heading">
            <p class="eyebrow"><span aria-hidden="true" />{{ copy.faqEyebrow }}</p>
            <h2>{{ copy.faqTitle }}</h2>
          </div>
          <div class="faq-list">
            <details v-for="(faq, index) in copy.faqs" :key="faq.question" :open="index === 0">
              <summary><span>0{{ index + 1 }}</span><strong>{{ faq.question }}</strong><i aria-hidden="true">+</i></summary>
              <p>{{ faq.answer }}</p>
            </details>
          </div>
        </div>
      </section>

      <section class="closing-section">
        <div class="closing-lines" aria-hidden="true" />
        <div class="content-width closing-inner">
          <p class="eyebrow"><span aria-hidden="true" />{{ copy.closingEyebrow }}</p>
          <h2>{{ copy.closingTitle }}</h2>
          <p>{{ copy.closingLead }}</p>
          <div>
            <a class="button button-primary" href="#capabilities">{{ copy.closingPrimary }}<span aria-hidden="true">↑</span></a>
            <a class="button button-secondary" href="mailto:tools@gcsa.org">{{ copy.closingSecondary }}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

    </main>

    <SiteFooter :locale="locale" />
  </div>
</template>
