<script setup lang="ts">
import { ArrowLeft, CheckCircle2, Download, Eraser, EyeOff, ScanFace } from '@lucide/vue'
import SectionHeader from './SectionHeader.vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['redaction'] }>()
</script>

<template>
  <section id="redaction" class="redaction-section">
    <div class="content-width redaction-layout">
      <div class="redaction-copy">
        <SectionHeader :eyebrow="copy.eyebrow" :title="copy.title" :description="copy.description" />
        <ul>
          <li v-for="point in copy.points" :key="point"><CheckCircle2 :size="17" aria-hidden="true" />{{ point }}</li>
        </ul>
        <p class="boundary-badge"><EyeOff :size="15" aria-hidden="true" />{{ copy.badge }}</p>
      </div>

      <div class="editor-stage" role="img" :aria-label="copy.visualLabel">
        <div class="editor-phone">
          <div class="phone-cutout"></div>
          <div class="phone-status"><span>09:41</span><div><i></i><i></i><i></i></div></div>
          <div class="editor-topbar">
            <span class="back-button"><ArrowLeft :size="16" aria-hidden="true" /></span>
            <strong>SMART REDACTION</strong>
            <Eraser :size="17" aria-hidden="true" />
          </div>
          <div class="media-canvas">
            <div class="canvas-grid" aria-hidden="true"></div>
            <div class="media-block block-one"></div>
            <div class="media-block block-two"></div>
            <div class="media-lines"><i></i><i></i><i></i><i></i></div>
            <div class="selection-box face-box"><span>{{ copy.visualFace }}</span><b></b><b></b><b></b><b></b></div>
            <div class="selection-box text-box"><span>{{ copy.visualText }}</span><b></b><b></b><b></b><b></b></div>
            <div class="redaction-mask mask-one"></div>
            <div class="redaction-mask mask-two"></div>
          </div>
          <div class="control-sheet">
            <span class="sheet-handle"></span>
            <span class="sheet-label">DETECTED REGIONS</span>
            <div class="region-list">
              <div class="region active"><ScanFace :size="15" aria-hidden="true" /><span>{{ copy.visualFace }}</span><strong>01</strong></div>
              <div class="region"><EyeOff :size="15" aria-hidden="true" /><span>{{ copy.visualText }}</span><strong>02</strong></div>
            </div>
            <div class="sheet-actions">
              <div class="style-swatches"><span></span><span></span><span></span><span></span></div>
              <div class="export-row"><Download :size="14" aria-hidden="true" />{{ copy.visualExport }}</div>
            </div>
          </div>
          <div class="home-indicator"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.redaction-section { padding-block: 116px; }
.redaction-layout { display: grid; grid-template-columns: minmax(0, .9fr) minmax(380px, 1.1fr); align-items: center; gap: clamp(52px, 8vw, 112px); }
.redaction-copy ul { display: grid; gap: 13px; margin-top: 34px; }
.redaction-copy li { display: flex; align-items: flex-start; gap: 10px; color: var(--muted-foreground); font-size: 13px; line-height: 1.65; }
.redaction-copy li svg { flex: 0 0 auto; margin-top: 2px; color: var(--success); }
.boundary-badge { display: inline-flex; min-height: 30px; align-items: center; gap: 8px; margin-top: 27px; padding: 0 11px; border: 1px solid color-mix(in srgb, var(--warning) 38%, var(--border)); border-radius: 999px; color: var(--warning); background: color-mix(in srgb, var(--warning) 8%, transparent); font-size: 11px; font-weight: 700; }

.editor-stage { position: relative; display: grid; place-items: center; }
.editor-stage::before { position: absolute; inset: 12% 16%; z-index: -1; border-radius: 50%; background: color-mix(in srgb, var(--primary) 18%, transparent); filter: blur(78px); content: ''; }
.editor-phone { position: relative; width: min(100%, 365px); overflow: hidden; border: 8px solid #11171d; border-radius: 44px; background: var(--card); box-shadow: 0 34px 82px rgba(0, 0, 0, .25), 0 0 44px color-mix(in srgb, var(--primary) 10%, transparent); }
.phone-cutout { position: absolute; z-index: 5; top: 9px; left: 50%; width: 82px; height: 21px; border-radius: 999px; background: #050709; transform: translateX(-50%); }
.phone-status { display: flex; height: 39px; align-items: center; justify-content: space-between; padding: 0 20px; color: var(--foreground); font-family: var(--font-data); font-size: 8px; font-weight: 750; }
.phone-status > div { display: flex; align-items: end; gap: 3px; }
.phone-status i { display: block; width: 3px; height: 7px; border-radius: 1px; background: var(--foreground); }
.phone-status i:nth-child(2) { height: 9px; }
.phone-status i:nth-child(3) { width: 13px; height: 6px; border-radius: 999px; }

.editor-topbar { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 50px; padding: 0 14px; border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--card) 94%, transparent); }
.editor-topbar strong { color: var(--foreground); font-family: var(--font-data); font-size: 8px; font-weight: 800; letter-spacing: .11em; }
.editor-topbar > svg { justify-self: end; color: var(--primary); }
.back-button { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 50%; color: var(--primary); background: var(--muted); }

.media-canvas { position: relative; min-height: 372px; overflow: hidden; background: radial-gradient(circle at 30% 34%, color-mix(in srgb, var(--primary) 14%, transparent), transparent 30%), linear-gradient(145deg, var(--card-soft), var(--muted)); }
.canvas-grid { position: absolute; inset: 0; opacity: .55; background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px); background-size: 22px 22px; }
.media-block { position: absolute; border: 1px solid var(--border); background: color-mix(in srgb, var(--card) 62%, transparent); }
.block-one { top: 65px; left: 42px; width: 118px; height: 156px; border-radius: 62px 62px 22px 22px; }
.block-two { right: 34px; bottom: 54px; width: 138px; height: 98px; border-radius: 12px; }
.media-lines { position: absolute; top: 82px; right: 30px; display: grid; gap: 12px; width: 132px; }
.media-lines i { height: 6px; border-radius: 999px; background: var(--border); }
.media-lines i:nth-child(2) { width: 82%; }
.media-lines i:nth-child(3) { width: 94%; }
.media-lines i:nth-child(4) { width: 66%; }

.selection-box { position: absolute; border: 1px solid var(--primary); border-radius: 5px; box-shadow: 0 0 18px color-mix(in srgb, var(--primary) 18%, transparent); }
.selection-box span { position: absolute; top: -23px; left: -1px; padding: 4px 6px; border-radius: 4px 4px 4px 0; color: var(--primary-foreground); background: var(--primary); font-size: 7px; font-weight: 800; }
.selection-box b { position: absolute; width: 6px; height: 6px; border: 1px solid var(--primary); background: var(--card); }
.selection-box b:nth-child(2) { top: -3px; left: -3px; }
.selection-box b:nth-child(3) { top: -3px; right: -3px; }
.selection-box b:nth-child(4) { bottom: -3px; left: -3px; }
.selection-box b:nth-child(5) { right: -3px; bottom: -3px; }
.face-box { top: 78px; left: 54px; width: 94px; height: 110px; }
.text-box { top: 76px; right: 22px; width: 148px; height: 98px; }
.redaction-mask { position: absolute; border-radius: 4px; opacity: .86; background: repeating-linear-gradient(45deg, color-mix(in srgb, var(--primary) 84%, black) 0 5px, var(--primary) 5px 10px); }
.mask-one { top: 107px; left: 72px; width: 58px; height: 35px; border-radius: 50%; }
.mask-two { top: 114px; right: 39px; width: 115px; height: 18px; }

.control-sheet { position: relative; display: grid; gap: 10px; padding: 17px 14px 13px; border-top: 1px solid var(--border); background: color-mix(in srgb, var(--card) 96%, transparent); }
.sheet-handle { position: absolute; top: 6px; left: 50%; width: 34px; height: 3px; border-radius: 999px; background: var(--border); transform: translateX(-50%); }
.sheet-label { color: var(--muted-foreground); font-family: var(--font-data); font-size: 7px; font-weight: 800; letter-spacing: .12em; }
.region-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
.region { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 6px; min-height: 37px; padding: 0 8px; border: 1px solid var(--border); border-radius: 9px; color: var(--muted-foreground); background: var(--card); font-size: 8px; }
.region.active { border-color: color-mix(in srgb, var(--primary) 48%, var(--border)); color: var(--foreground); background: color-mix(in srgb, var(--primary) 8%, var(--card)); }
.region svg, .region strong { color: var(--primary); }
.region strong { font-family: var(--font-data); font-size: 7px; }
.sheet-actions { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 12px; }
.style-swatches { display: flex; gap: 5px; }
.style-swatches span { width: 20px; height: 20px; border: 1px solid var(--border); border-radius: 6px; background: var(--primary); }
.style-swatches span:nth-child(2) { background: var(--foreground); }
.style-swatches span:nth-child(3) { background: var(--warning); }
.style-swatches span:nth-child(4) { background: var(--danger); }
.export-row { display: flex; min-height: 38px; align-items: center; justify-content: center; gap: 6px; border-radius: 9px; color: var(--primary-foreground); background: var(--primary); font-size: 8px; font-weight: 800; }
.home-indicator { width: 94px; height: 4px; margin: 0 auto 8px; border-radius: 999px; background: color-mix(in srgb, var(--foreground) 72%, transparent); }

@media (max-width: 980px) { .redaction-layout { grid-template-columns: 1fr; } }
@media (max-width: 640px) {
  .redaction-section { padding-block: 82px; }
  .redaction-layout { gap: 42px; }
  .editor-phone { width: min(100%, 340px); border-width: 7px; border-radius: 40px; }
  .media-canvas { min-height: 350px; }
  .block-one { left: 32px; }
  .face-box { left: 44px; }
  .mask-one { left: 62px; }
  .media-lines { right: 22px; width: 120px; }
  .text-box { right: 15px; width: 134px; }
  .mask-two { right: 31px; width: 105px; }
}
</style>
