<script setup lang="ts">
import { FileCheck2, FileSearch, Fingerprint, History, Radar, ScanText } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['capability'] }>()
const icons = [FileCheck2, Fingerprint, FileSearch, ScanText, Radar, History]
</script>

<template>
  <section id="capabilities" class="capability-section">
    <div class="content-width">
      <SectionHeader :eyebrow="copy.eyebrow" :title="copy.title" :description="copy.description" align="center" />
      <div class="feature-grid">
        <article v-for="(item, index) in copy.items" :key="item.title" class="feature-card">
          <div class="feature-topline">
            <span class="feature-icon"><component :is="icons[index]" :size="21" aria-hidden="true" /></span>
            <span class="feature-tag">{{ item.tag }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.capability-section {
  padding-block: 112px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 44px;
}

.feature-card {
  position: relative;
  min-height: 240px;
  padding: 22px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--card) 92%, transparent);
  box-shadow: var(--shadow-card);
  transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0 auto auto 22px;
  width: 48px;
  height: 1px;
  background: linear-gradient(90deg, var(--primary), transparent);
}

.feature-card:hover {
  border-color: color-mix(in srgb, var(--primary) 40%, var(--border));
  box-shadow: var(--shadow-card-hover), 0 0 22px color-mix(in srgb, var(--primary) 8%, transparent);
  transform: translateY(-3px);
}

.feature-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.feature-icon {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid color-mix(in srgb, var(--primary) 24%, var(--border));
  border-radius: 9px;
  color: var(--primary);
  background: var(--muted);
}

.feature-tag {
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

h3 {
  margin-top: 30px;
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 650;
  line-height: 1.35;
}

p {
  margin-top: 13px;
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 1.72;
}

@media (max-width: 940px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .capability-section {
    padding-block: 80px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
    margin-top: 34px;
  }

  .feature-card {
    min-height: 0;
  }
}
</style>
