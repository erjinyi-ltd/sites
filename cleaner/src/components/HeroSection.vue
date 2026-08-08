<script setup lang="ts">
import { Check, HardDrive, ShieldCheck } from '@lucide/vue'
import PlatformToggle from './PlatformToggle.vue'
import type { ProductPageCopy, ProductPlatform } from '../types/site'

defineProps<{ copy: ProductPageCopy['hero']; platform: ProductPlatform; switchLabel: string }>()
defineEmits<{ platformChange: [platform: ProductPlatform] }>()
</script>

<template>
  <section id="top" class="hero content-width">
    <div class="hero-copy">
      <p class="ecosystem-label"><span></span>{{ copy.ecosystem }}</p>
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h1>{{ copy.title }}</h1>
      <p class="lead">{{ copy.lead }}</p>
      <PlatformToggle class="platform-status" :label="switchLabel" :mac-label="copy.macStatus" :windows-label="copy.windowsStatus" :platform="platform" @platform-change="$emit('platformChange', $event)" />
    </div>

    <div class="cleaner-visual" role="img" :aria-label="copy.visualLabel">
      <div class="visual-topbar">
        <span><i></i>{{ copy.visualSystem }}</span>
        <span class="secure-badge"><ShieldCheck :size="13" />{{ copy.visualBadge }}</span>
      </div>
      <div class="visual-body">
        <div class="scan-summary">
          <div class="scan-ring">
            <div><HardDrive :size="22" /><strong>{{ copy.scanValue }}</strong><small>{{ copy.scanUnit }}</small></div>
          </div>
          <div class="scan-copy">
            <small>{{ copy.reclaimable }}</small>
            <strong>{{ copy.selected }} {{ copy.selectedValue }}</strong>
            <span><ShieldCheck :size="14" />{{ copy.guarded }}</span>
          </div>
        </div>
        <div class="flow-row">
          <div class="flow-step done"><span><Check :size="14" /></span>{{ copy.scan }}</div>
          <i></i>
          <div class="flow-step active"><span>02</span>{{ copy.review }}</div>
          <i></i>
          <div class="flow-step"><span>03</span>{{ copy.confirm }}</div>
          <i></i>
          <div class="flow-step"><span>04</span>{{ copy.recover }}</div>
        </div>
        <div class="candidate-list">
          <div v-for="candidate in copy.candidates" :key="candidate.title" :class="{ guarded: candidate.guarded }"><span class="kind" :class="candidate.tone">{{ candidate.kind }}</span><strong>{{ candidate.title }}</strong><small>{{ candidate.value }}</small></div>
        </div>
      </div>
      <div class="visual-footer"><template v-for="(label, index) in copy.visualFooter" :key="label"><i v-if="index"></i><span>{{ label }}</span></template></div>
    </div>
  </section>
</template>

<style scoped>
.hero { display: grid; grid-template-columns: minmax(0, .92fr) minmax(520px, 1.08fr); align-items: center; gap: clamp(48px, 7vw, 96px); min-height: min(880px, 100vh); padding-block: calc(var(--header-height) + 90px) 96px; }
.hero-copy { max-width: 650px; }
.ecosystem-label { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; color: var(--muted-foreground); font-family: var(--font-data); font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.ecosystem-label span { width: 26px; height: 1px; background: var(--primary); }
h1 { max-width: 720px; margin-top: 14px; font-family: var(--font-display); font-size: clamp(38px, 3.8vw, 44px); font-weight: 700; letter-spacing: 0; line-height: 1.12; }
.lead { max-width: 650px; margin-top: 25px; color: var(--muted-foreground); font-size: clamp(16px, 1.5vw, 18px); line-height: 1.78; }
.platform-status { margin-top: 28px; }
.cleaner-visual { position: relative; overflow: hidden; border: 1px solid color-mix(in srgb, var(--primary) 28%, var(--border)); border-radius: 16px; background: color-mix(in srgb, var(--card) 92%, transparent); box-shadow: var(--shadow-card), 0 0 56px color-mix(in srgb, var(--primary) 10%, transparent); }
.cleaner-visual::before { position: absolute; inset: -40% -20% auto 24%; height: 420px; background: radial-gradient(circle, color-mix(in srgb, var(--primary) 14%, transparent), transparent 66%); content: ''; pointer-events: none; }
.visual-topbar, .visual-footer { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; min-height: 48px; padding: 0 20px; border-bottom: 1px solid var(--border); color: var(--muted-foreground); font-family: var(--font-data); font-size: 9px; font-weight: 700; letter-spacing: .1em; }
.visual-topbar > span:first-child { display: inline-flex; align-items: center; gap: 8px; }
.visual-topbar > span:first-child i { width: 7px; height: 7px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary); }
.secure-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 8px; border: 1px solid color-mix(in srgb, var(--success) 26%, var(--border)); border-radius: 999px; color: var(--success); }
.visual-body { position: relative; z-index: 2; display: grid; gap: 26px; padding: clamp(24px, 3vw, 38px); }
.scan-summary { display: flex; align-items: center; justify-content: center; gap: 24px; }
.scan-ring { --mac-progress: 74%; position: relative; display: grid; width: 150px; height: 150px; flex: 0 0 auto; place-items: center; border-radius: 50%; background: conic-gradient(var(--primary) 0 var(--mac-progress), color-mix(in srgb, var(--primary) 12%, var(--muted)) var(--mac-progress) 100%); box-shadow: 0 0 36px color-mix(in srgb, var(--primary) 18%, transparent); animation: mac-ring-progress 6.4s cubic-bezier(.22, 1, .36, 1) infinite; }
.scan-ring::before { position: absolute; width: 126px; height: 126px; border-radius: 50%; background: var(--card); content: ''; }
.scan-ring div { position: relative; z-index: 1; display: grid; grid-template-columns: auto auto; align-items: end; justify-content: center; }
.scan-ring svg { grid-column: 1 / -1; justify-self: center; margin-bottom: 4px; color: var(--primary); }
.scan-ring strong { font-family: var(--font-display); font-size: 27px; line-height: 1; }
.scan-ring small { margin-left: 3px; color: var(--muted-foreground); font-size: 10px; }
.scan-copy { display: grid; gap: 8px; min-width: 0; }
.scan-copy > small { color: var(--muted-foreground); font-size: 11px; }
.scan-copy > strong { font-family: var(--font-display); font-size: 17px; }
.scan-copy > span { display: inline-flex; align-items: center; gap: 6px; color: var(--success); font-size: 11px; }
.flow-row { display: grid; grid-template-columns: auto 1fr auto 1fr auto 1fr auto; align-items: center; gap: 9px; }
.flow-row > i { position: relative; height: 1px; overflow: hidden; background: var(--border); }
.flow-row > i::after { position: absolute; inset: 0 auto 0 0; width: 46%; background: var(--primary); content: ''; opacity: 0; animation: progress-travel 5.6s ease-in-out infinite; }
.flow-row > i:nth-of-type(2)::after { animation-delay: .22s; }
.flow-row > i:nth-of-type(3)::after { animation-delay: .44s; }
.flow-step { display: grid; justify-items: center; gap: 7px; color: var(--muted-foreground); font-size: 10px; white-space: nowrap; }
.flow-step span { display: grid; width: 30px; height: 30px; place-items: center; border: 1px solid var(--border); border-radius: 8px; font-family: var(--font-data); font-size: 9px; }
.flow-step.done span, .flow-step.active span { border-color: var(--primary); color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, transparent); }
.flow-step.active { color: var(--foreground); }
.candidate-list { display: grid; gap: 8px; }
.candidate-list > div { display: grid; grid-template-columns: 58px minmax(0, 1fr) auto; align-items: center; gap: 12px; min-height: 45px; padding: 8px 10px; border: 1px solid var(--border); border-radius: 9px; background: color-mix(in srgb, var(--muted) 58%, transparent); }
.candidate-list strong { overflow: hidden; color: var(--foreground); font-size: 12px; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.candidate-list small { color: var(--muted-foreground); font-family: var(--font-data); font-size: 10px; }
.kind { display: inline-flex; justify-content: center; padding: 4px 5px; border-radius: 5px; font-family: var(--font-data); font-size: 8px; font-weight: 700; }
.kind.cyan { color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, transparent); }
.kind.green { color: var(--success); background: color-mix(in srgb, var(--success) 10%, transparent); }
.kind.amber { color: var(--warning); background: color-mix(in srgb, var(--warning) 10%, transparent); }
.candidate-list .guarded { opacity: .72; }
.visual-footer { justify-content: center; gap: 12px; min-height: 42px; border-top: 1px solid var(--border); border-bottom: 0; font-size: 8px; }
.visual-footer i { width: 3px; height: 3px; border-radius: 50%; background: var(--primary); }

@property --mac-progress {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 74%;
}

@keyframes mac-ring-progress {
  0%, 8% { --mac-progress: 0%; }
  44%, 100% { --mac-progress: 74%; }
}

@keyframes progress-travel {
  0%, 12% { opacity: 0; transform: translateX(-130%); }
  16% { opacity: 1; }
  38% { opacity: 1; transform: translateX(260%); }
  42%, 100% { opacity: 0; transform: translateX(260%); }
}

@media (max-width: 1080px) {
  .hero { grid-template-columns: 1fr; min-height: auto; padding-top: calc(var(--header-height) + 74px); }
  .hero-copy { max-width: 760px; text-align: center; margin-inline: auto; }
  .ecosystem-label { justify-content: center; }
  .platform-status { margin-inline: auto; text-align: left; }
  .lead { margin-inline: auto; }
  .cleaner-visual { width: min(720px, 100%); margin-inline: auto; }
}

@media (max-width: 640px) {
  .hero { gap: 48px; padding-block: calc(var(--header-height) + 56px) 72px; }
  h1 { font-size: clamp(32px, 9vw, 36px); }
  .scan-summary { gap: 14px; }
  .scan-ring { width: 124px; height: 124px; }
  .scan-ring::before { width: 104px; height: 104px; }
  .flow-step { font-size: 0; }
  .candidate-list > div { grid-template-columns: 52px minmax(0, 1fr) auto; gap: 8px; }
  .visual-footer { gap: 7px; }
}

@media (prefers-reduced-motion: reduce) {
  .scan-ring,
  .flow-row > i::after {
    animation: none;
  }
}
</style>
