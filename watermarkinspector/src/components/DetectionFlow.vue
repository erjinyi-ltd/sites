<script setup lang="ts">
import { ClipboardCheck, Cpu, FileUp, History } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['flow'] }>()
const icons = [FileUp, Cpu, ClipboardCheck, History]
</script>

<template>
  <section id="workflow" class="flow-section">
    <div class="flow-mesh" aria-hidden="true"></div>
    <div class="content-width">
      <SectionHeader :eyebrow="copy.eyebrow" :title="copy.title" :description="copy.description" />
      <div class="flow-track">
        <article v-for="(step, index) in copy.steps" :key="step.number" class="flow-step">
          <div class="step-head">
            <span class="step-icon"><component :is="icons[index]" :size="22" aria-hidden="true" /></span>
            <span class="step-number">{{ step.number }}</span>
          </div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
          <div v-if="index < copy.steps.length - 1" class="connector" aria-hidden="true"><i></i><b></b></div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flow-section {
  position: relative;
  overflow: hidden;
  padding-block: 112px;
  border-block: 1px solid var(--border);
  background: color-mix(in srgb, var(--muted) 45%, transparent);
}

.flow-mesh {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 16% 24%, color-mix(in srgb, var(--primary) 9%, transparent), transparent 24rem),
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: auto, 42px 42px, 42px 42px;
  mask-image: linear-gradient(90deg, transparent, black 18%, black 82%, transparent);
}

.content-width {
  position: relative;
}

.flow-track {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 50px;
  border-block: 1px solid var(--border);
}

.flow-step {
  position: relative;
  min-height: 250px;
  padding: 28px 26px;
}

.flow-step + .flow-step {
  border-left: 1px solid var(--border);
}

.step-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step-icon {
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid color-mix(in srgb, var(--primary) 28%, var(--border));
  border-radius: 10px;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 7%, var(--card));
}

.step-number {
  color: var(--primary);
  font-family: var(--font-data);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

h3 {
  margin-top: 30px;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 650;
}

p {
  margin-top: 12px;
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 1.7;
}

.connector {
  position: absolute;
  top: 50px;
  right: -19px;
  z-index: 2;
  width: 38px;
  height: 1px;
  overflow: hidden;
  background: color-mix(in srgb, var(--primary) 32%, var(--border));
}

.connector::after {
  content: '';
  position: absolute;
  top: -2px;
  right: 0;
  border-top: 2.5px solid transparent;
  border-bottom: 2.5px solid transparent;
  border-left: 4px solid var(--primary);
}

.connector i {
  position: absolute;
  top: -2px;
  left: -8px;
  width: 8px;
  height: 5px;
  border-radius: 999px;
  background: var(--cdn-glow);
  box-shadow: 0 0 8px var(--cdn-glow);
  animation: connector-flow 2.6s linear infinite;
}

@keyframes connector-flow {
  to { transform: translateX(52px); }
}

@media (max-width: 900px) {
  .flow-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .flow-step:nth-child(3) {
    border-left: 0;
  }

  .flow-step:nth-child(n + 3) {
    border-top: 1px solid var(--border);
  }

  .flow-step:nth-child(2) .connector {
    display: none;
  }
}

@media (max-width: 640px) {
  .flow-section {
    padding-block: 82px;
  }

  .flow-track {
    grid-template-columns: 1fr;
    margin-top: 36px;
    border: 0;
  }

  .flow-step {
    min-height: 0;
    padding: 25px 8px 30px 66px;
    border-top: 1px solid var(--border);
  }

  .flow-step + .flow-step,
  .flow-step:nth-child(3) {
    border-left: 0;
  }

  .step-head {
    position: absolute;
    top: 23px;
    left: 6px;
  }

  .step-number {
    display: none;
  }

  h3 {
    margin-top: 0;
  }

  .connector {
    display: none;
  }
}
</style>
