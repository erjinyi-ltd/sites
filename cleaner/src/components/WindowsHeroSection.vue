<script setup lang="ts">
import { Check, Cpu, MonitorCog, Package, ShieldCheck, Trash2 } from '@lucide/vue'
import PlatformToggle from './PlatformToggle.vue'
import type { ProductPageCopy, ProductPlatform } from '../types/site'

defineProps<{ copy: ProductPageCopy['hero']; platform: ProductPlatform; switchLabel: string }>()
defineEmits<{ platformChange: [platform: ProductPlatform] }>()
</script>

<template>
  <section id="top" class="windows-hero content-width">
    <div class="hero-copy">
      <p class="ecosystem-label"><span></span>{{ copy.ecosystem }}</p>
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h1>{{ copy.title }}</h1>
      <p class="lead">{{ copy.lead }}</p>
      <PlatformToggle class="platform-status" :label="switchLabel" :mac-label="copy.macStatus" :windows-label="copy.windowsStatus" :platform="platform" @platform-change="$emit('platformChange', $event)" />
    </div>

    <div class="manager-console" role="img" :aria-label="copy.visualLabel">
      <div class="console-bar">
        <span><MonitorCog :size="16" />{{ copy.visualSystem }}</span>
        <span class="live-status"><i></i>{{ copy.visualBadge }}</span>
      </div>

      <div class="console-body">
        <div class="manager-summary">
          <div class="health-dial">
            <span><strong>{{ copy.scanValue }}</strong><small>{{ copy.scanUnit }}</small></span>
          </div>
          <div class="health-copy">
            <small>{{ copy.reclaimable }}</small>
            <strong>{{ copy.selected }} · {{ copy.selectedValue }}</strong>
            <p><ShieldCheck :size="14" />{{ copy.guarded }}</p>
          </div>
        </div>

        <div class="quick-tools">
          <article v-for="(candidate, index) in copy.candidates" :key="candidate.title" :class="`tool-${candidate.tone}`">
            <span class="tool-icon">
              <Package v-if="index === 0" :size="19" />
              <Cpu v-else-if="index === 1" :size="19" />
              <Trash2 v-else :size="19" />
            </span>
            <div><small>{{ candidate.kind }}</small><strong>{{ candidate.title }}</strong><span>{{ candidate.value }}</span></div>
          </article>
        </div>

        <div class="manager-flow">
          <div class="flow-step complete"><span><Check :size="13" /></span><small>{{ copy.scan }}</small></div>
          <i></i>
          <div class="flow-step active"><span>02</span><small>{{ copy.review }}</small></div>
          <i></i>
          <div class="flow-step"><span>03</span><small>{{ copy.confirm }}</small></div>
          <i></i>
          <div class="flow-step"><span>04</span><small>{{ copy.recover }}</small></div>
        </div>
      </div>

      <div class="console-footer"><span v-for="label in copy.visualFooter" :key="label"><i></i>{{ label }}</span></div>
    </div>
  </section>
</template>

<style scoped>
.windows-hero { display: grid; grid-template-columns: minmax(0, .86fr) minmax(580px, 1.14fr); align-items: center; gap: clamp(46px, 6vw, 88px); min-height: min(920px, 100vh); padding-block: calc(var(--header-height) + 86px) 104px; }
.hero-copy { max-width: 660px; }
.ecosystem-label { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; color: var(--muted-foreground); font-family: var(--font-data); font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
.ecosystem-label span { width: 26px; height: 1px; background: var(--windows); }
h1 { max-width: 760px; margin-top: 14px; font-family: var(--font-display); font-size: clamp(36px, 3.5vw, 40px); font-weight: 700; letter-spacing: 0; line-height: 1.12; }
.lead { max-width: 660px; margin-top: 25px; color: var(--muted-foreground); font-size: clamp(16px, 1.5vw, 18px); line-height: 1.78; }
.platform-status { margin-top: 28px; }

.manager-console { position: relative; overflow: hidden; border: 1px solid color-mix(in srgb, var(--windows) 42%, var(--border)); border-radius: 17px; background: linear-gradient(145deg, color-mix(in srgb, var(--card) 97%, transparent), color-mix(in srgb, var(--windows) 6%, var(--card))); box-shadow: var(--shadow-card), 0 0 78px color-mix(in srgb, var(--windows) 13%, transparent); }
.manager-console::before { position: absolute; inset: -34% -14% auto 30%; height: 430px; background: radial-gradient(circle, color-mix(in srgb, var(--windows) 18%, transparent), transparent 64%); content: ''; pointer-events: none; }
.console-bar, .console-footer { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; min-height: 50px; padding: 0 20px; border-bottom: 1px solid var(--border); color: var(--muted-foreground); font-family: var(--font-data); font-size: 9px; font-weight: 700; letter-spacing: .1em; }
.console-bar > span { display: inline-flex; align-items: center; gap: 8px; }
.console-bar svg { color: var(--windows); }
.live-status { padding: 5px 8px; border: 1px solid color-mix(in srgb, var(--success) 30%, var(--border)); border-radius: 999px; color: var(--success); }
.live-status i, .console-footer i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 9px currentColor; animation: status-pulse 2.2s ease-in-out infinite; }
.console-body { position: relative; z-index: 2; display: grid; gap: 22px; padding: clamp(24px, 3vw, 36px); }
.manager-summary { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 24px; }
.health-dial { --windows-progress: 94%; position: relative; display: grid; width: 142px; height: 142px; place-items: center; border-radius: 50%; background: conic-gradient(var(--windows) 0 var(--windows-progress), color-mix(in srgb, var(--windows) 11%, var(--muted)) var(--windows-progress) 100%); box-shadow: 0 0 38px color-mix(in srgb, var(--windows) 18%, transparent); animation: windows-ring-progress 6.4s cubic-bezier(.22, 1, .36, 1) infinite; }
.health-dial::before { position: absolute; width: 118px; height: 118px; border-radius: 50%; background: var(--card); content: ''; }
.health-dial span { position: relative; z-index: 1; display: flex; align-items: end; }
.health-dial strong { font-family: var(--font-display); font-size: 32px; line-height: 1; }
.health-dial small { margin: 0 0 2px 5px; color: var(--muted-foreground); font-size: 9px; }
.health-copy { display: grid; gap: 9px; }
.health-copy > small { color: var(--muted-foreground); font-size: 11px; }
.health-copy > strong { font-family: var(--font-display); font-size: 17px; line-height: 1.4; }
.health-copy p { display: flex; align-items: center; gap: 7px; color: var(--success); font-size: 11px; }

.quick-tools { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
.quick-tools article { position: relative; min-width: 0; min-height: 132px; padding: 13px; overflow: hidden; border: 1px solid var(--border); border-radius: 10px; background: color-mix(in srgb, var(--muted) 56%, transparent); transition: border-color 180ms ease, transform 180ms ease; }
.quick-tools article:hover { border-color: color-mix(in srgb, var(--windows) 40%, var(--border)); transform: translateY(-2px); }
.tool-icon { display: grid; width: 36px; height: 36px; place-items: center; border-radius: 8px; color: var(--windows); background: color-mix(in srgb, var(--windows) 9%, transparent); }
.tool-green .tool-icon { color: var(--success); background: color-mix(in srgb, var(--success) 9%, transparent); }
.tool-amber .tool-icon { color: var(--warning); background: color-mix(in srgb, var(--warning) 9%, transparent); }
.quick-tools article > div { display: grid; gap: 4px; margin-top: 12px; }
.quick-tools small { color: var(--windows); font-family: var(--font-data); font-size: 8px; font-weight: 700; letter-spacing: .09em; }
.quick-tools strong { overflow: hidden; font-size: 11px; font-weight: 600; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; }
.quick-tools article span:last-child { color: var(--muted-foreground); font-family: var(--font-data); font-size: 9px; }

.manager-flow { display: grid; grid-template-columns: auto 1fr auto 1fr auto 1fr auto; align-items: center; gap: 9px; padding-top: 4px; }
.manager-flow > i { position: relative; height: 1px; overflow: hidden; background: var(--border); }
.manager-flow > i::after { position: absolute; inset: 0 auto 0 0; width: 46%; background: var(--windows); content: ''; opacity: 0; animation: progress-travel 5.6s ease-in-out infinite; }
.manager-flow > i:nth-of-type(2)::after { animation-delay: .22s; }
.manager-flow > i:nth-of-type(3)::after { animation-delay: .44s; }
.flow-step { display: grid; justify-items: center; gap: 7px; color: var(--muted-foreground); }
.flow-step span { display: grid; width: 30px; height: 30px; place-items: center; border: 1px solid var(--border); border-radius: 7px; font-family: var(--font-data); font-size: 9px; }
.flow-step small { font-size: 9px; white-space: nowrap; }
.flow-step.complete span, .flow-step.active span { border-color: var(--windows); color: var(--windows); background: color-mix(in srgb, var(--windows) 10%, transparent); }
.flow-step.active { color: var(--foreground); }
.console-footer { justify-content: flex-start; gap: 20px; min-height: 42px; border-top: 1px solid var(--border); border-bottom: 0; }
.console-footer span { display: inline-flex; align-items: center; gap: 7px; }
.console-footer i { width: 4px; height: 4px; color: var(--windows); }

@property --windows-progress { syntax: '<percentage>'; inherits: false; initial-value: 94%; }
@keyframes windows-ring-progress { 0%, 8% { --windows-progress: 0%; } 44%, 100% { --windows-progress: 94%; } }
@keyframes status-pulse { 0%, 100% { opacity: .45; transform: scale(.85); } 50% { opacity: 1; transform: scale(1.15); } }
@keyframes progress-travel { 0%, 12% { opacity: 0; transform: translateX(-130%); } 16% { opacity: 1; } 38% { opacity: 1; transform: translateX(260%); } 42%, 100% { opacity: 0; transform: translateX(260%); } }

@media (max-width: 1160px) { .windows-hero { grid-template-columns: 1fr; min-height: auto; padding-top: calc(var(--header-height) + 74px); } .hero-copy { max-width: 820px; margin-inline: auto; text-align: center; } .ecosystem-label { justify-content: center; } .platform-status { margin-inline: auto; text-align: left; } .lead { margin-inline: auto; } .manager-console { width: min(780px, 100%); margin-inline: auto; } }
@media (max-width: 640px) { .windows-hero { gap: 46px; padding-block: calc(var(--header-height) + 54px) 74px; } h1 { font-size: clamp(30px, 8.5vw, 34px); } .manager-summary { gap: 15px; } .health-dial { width: 116px; height: 116px; } .health-dial::before { width: 96px; height: 96px; } .quick-tools { grid-template-columns: 1fr; } .quick-tools article { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 11px; min-height: auto; } .quick-tools article > div { margin-top: 0; } .flow-step small { font-size: 0; } .console-footer { flex-wrap: wrap; gap: 8px 14px; padding-block: 10px; } }
@media (prefers-reduced-motion: reduce) { .health-dial, .live-status i, .console-footer i, .manager-flow > i::after { animation: none; } .quick-tools article { transition: none; } }
</style>
