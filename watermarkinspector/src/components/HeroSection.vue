<script setup lang="ts">
import { ArrowRight, CheckCircle2, LockKeyhole } from '@lucide/vue'
import ScanVisualizer from './ScanVisualizer.vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['hero'] }>()
</script>

<template>
  <section id="top" class="hero content-width">
    <div class="hero-copy">
      <p class="ecosystem-line"><span></span>{{ copy.ecosystem }}</p>
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h1>{{ copy.title }}</h1>
      <p class="lead">{{ copy.lead }}</p>
      <p class="proof-line"><CheckCircle2 :size="17" aria-hidden="true" />{{ copy.proof }}</p>
      <div class="hero-actions">
        <a class="primary-action" href="#capabilities">
          {{ copy.primaryAction }}
          <ArrowRight :size="17" aria-hidden="true" />
        </a>
        <a class="secondary-action" href="#privacy">
          <LockKeyhole :size="16" aria-hidden="true" />
          {{ copy.secondaryAction }}
        </a>
      </div>
    </div>
    <ScanVisualizer :copy="copy" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(440px, 0.95fr);
  align-items: center;
  gap: clamp(44px, 6vw, 88px);
  min-height: 760px;
  padding-top: 114px;
  padding-bottom: 72px;
}

.hero-copy {
  position: relative;
  z-index: 2;
  max-width: 700px;
}

.ecosystem-line {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 26px;
  color: var(--muted-foreground);
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.ecosystem-line span {
  width: 26px;
  height: 1px;
  background: var(--primary);
}

h1 {
  max-width: 760px;
  margin-top: 15px;
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: clamp(38px, 3.8vw, 44px);
  font-weight: 680;
  letter-spacing: 0;
  line-height: 1.12;
}

.lead {
  max-width: 650px;
  margin-top: 24px;
  color: var(--muted-foreground);
  font-size: clamp(16px, 1.4vw, 18px);
  line-height: 1.78;
}

.proof-line {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  max-width: 620px;
  margin-top: 20px;
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 1.55;
}

.proof-line svg {
  flex: 0 0 auto;
  margin-top: 1px;
  color: var(--success);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

@media (max-width: 1060px) {
  .hero {
    grid-template-columns: minmax(0, 1fr) minmax(405px, 0.85fr);
    gap: 32px;
  }
}

@media (max-width: 920px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 24px;
    min-height: 0;
    padding-top: 120px;
    padding-bottom: 64px;
  }

  .hero-copy {
    max-width: 760px;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 100px;
    padding-bottom: 48px;
  }

  .ecosystem-line {
    margin-bottom: 22px;
  }

  h1 {
    margin-top: 12px;
    font-size: clamp(32px, 9vw, 36px);
    line-height: 1.16;
  }

  .lead {
    margin-top: 20px;
    font-size: 15px;
  }

  .proof-line {
    font-size: 12px;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .hero-actions a {
    width: 100%;
  }
}
</style>
