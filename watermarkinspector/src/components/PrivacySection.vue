<script setup lang="ts">
import { Activity, CloudOff, Database, MousePointerClick } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['privacy'] }>()
const icons = [MousePointerClick, Database, CloudOff, Activity]
</script>

<template>
  <section id="privacy" class="privacy-section">
    <div class="privacy-mesh" aria-hidden="true"></div>
    <div class="content-width">
      <SectionHeader :eyebrow="copy.eyebrow" :title="copy.title" :description="copy.description" align="center" />
      <div class="privacy-grid">
        <article v-for="(point, index) in copy.points" :key="point.title">
          <span><component :is="icons[index]" :size="23" aria-hidden="true" /></span>
          <h3>{{ point.title }}</h3>
          <p>{{ point.description }}</p>
        </article>
      </div>
      <p class="privacy-note"><CloudOff :size="17" aria-hidden="true" />{{ copy.note }}</p>
    </div>
  </section>
</template>

<style scoped>
.privacy-section {
  position: relative;
  overflow: hidden;
  padding-block: 112px;
  border-block: 1px solid var(--border);
  background: color-mix(in srgb, var(--muted) 48%, transparent);
}

.privacy-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 50% 34%, color-mix(in srgb, var(--primary) 12%, transparent), transparent 34rem);
}

.content-width {
  position: relative;
}

.privacy-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 44px;
}

article {
  min-height: 230px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--card) 90%, transparent);
  box-shadow: var(--shadow-card);
}

article > span {
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid color-mix(in srgb, var(--primary) 28%, var(--border));
  border-radius: 10px;
  color: var(--primary);
  background: var(--muted);
}

h3 {
  margin-top: 28px;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 650;
}

article p {
  margin-top: 12px;
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 1.72;
}

.privacy-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  max-width: 760px;
  min-height: 48px;
  margin: 18px auto 0;
  padding: 10px 16px;
  border-left: 2px solid var(--primary);
  color: var(--muted-foreground);
  background: color-mix(in srgb, var(--primary) 6%, var(--card));
  font-size: 12px;
  line-height: 1.55;
}

.privacy-note svg {
  flex: 0 0 auto;
  color: var(--primary);
}

@media (max-width: 1100px) {
  .privacy-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  article {
    min-height: 0;
  }
}

@media (max-width: 640px) {
  .privacy-grid {
    grid-template-columns: 1fr;
  }

  .privacy-section {
    padding-block: 82px;
  }
}
</style>
