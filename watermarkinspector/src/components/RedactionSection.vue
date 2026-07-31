<script setup lang="ts">
import { CheckCircle2, Download, Eraser, EyeOff, ScanFace } from '@lucide/vue'
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
        <div class="editor-window">
          <div class="editor-topbar">
            <div><span></span><span></span><span></span></div>
            <strong>SMART REDACTION</strong>
            <Eraser :size="17" aria-hidden="true" />
          </div>
          <div class="editor-body">
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
            <div class="editor-sidebar">
              <span class="sidebar-label">DETECTED REGIONS</span>
              <div class="region active"><ScanFace :size="15" aria-hidden="true" /><span>{{ copy.visualFace }}</span><strong>01</strong></div>
              <div class="region"><EyeOff :size="15" aria-hidden="true" /><span>{{ copy.visualText }}</span><strong>02</strong></div>
              <div class="style-swatches"><span></span><span></span><span></span><span></span></div>
              <div class="export-row"><Download :size="14" aria-hidden="true" />{{ copy.visualExport }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.redaction-section {
  padding-block: 116px;
}

.redaction-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(480px, 1.14fr);
  align-items: center;
  gap: clamp(52px, 7vw, 96px);
}

.redaction-copy ul {
  display: grid;
  gap: 13px;
  margin-top: 34px;
}

.redaction-copy li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 1.65;
}

.redaction-copy li svg {
  flex: 0 0 auto;
  margin-top: 2px;
  color: var(--success);
}

.boundary-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  margin-top: 27px;
  padding: 0 11px;
  border: 1px solid color-mix(in srgb, var(--warning) 38%, var(--border));
  border-radius: 999px;
  color: var(--warning);
  background: color-mix(in srgb, var(--warning) 8%, transparent);
  font-size: 11px;
  font-weight: 700;
}

.editor-stage {
  position: relative;
}

.editor-stage::before {
  content: '';
  position: absolute;
  inset: 12% 10%;
  z-index: -1;
  border-radius: 50%;
  background: color-mix(in srgb, var(--primary) 16%, transparent);
  filter: blur(72px);
}

.editor-window {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--card);
  box-shadow: var(--shadow-card);
}

.editor-topbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 48px;
  padding: 0 15px;
  border-bottom: 1px solid var(--border);
  background: var(--muted);
}

.editor-topbar > div {
  display: flex;
  gap: 6px;
}

.editor-topbar > div span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--border-strong);
}

.editor-topbar > div span:first-child {
  background: var(--primary);
}

.editor-topbar strong {
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.editor-topbar > svg {
  justify-self: end;
  color: var(--primary);
}

.editor-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  min-height: 370px;
}

.media-canvas {
  position: relative;
  min-height: 370px;
  overflow: hidden;
  background:
    radial-gradient(circle at 30% 34%, color-mix(in srgb, var(--primary) 14%, transparent), transparent 29%),
    linear-gradient(145deg, var(--card-soft), var(--muted));
}

.canvas-grid {
  position: absolute;
  inset: 0;
  opacity: 0.55;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 22px 22px;
}

.media-block {
  position: absolute;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--card) 62%, transparent);
}

.block-one {
  top: 62px;
  left: 48px;
  width: 124px;
  height: 160px;
  border-radius: 62px 62px 22px 22px;
}

.block-two {
  right: 48px;
  bottom: 54px;
  width: 144px;
  height: 102px;
  border-radius: 12px;
}

.media-lines {
  position: absolute;
  top: 82px;
  right: 48px;
  display: grid;
  gap: 12px;
  width: 146px;
}

.media-lines i {
  height: 6px;
  border-radius: 999px;
  background: var(--border);
}

.media-lines i:nth-child(2) { width: 82%; }
.media-lines i:nth-child(3) { width: 94%; }
.media-lines i:nth-child(4) { width: 66%; }

.selection-box {
  position: absolute;
  border: 1px solid var(--primary);
  border-radius: 5px;
  box-shadow: 0 0 18px color-mix(in srgb, var(--primary) 18%, transparent);
}

.selection-box span {
  position: absolute;
  top: -23px;
  left: -1px;
  padding: 4px 6px;
  border-radius: 4px 4px 4px 0;
  color: var(--primary-foreground);
  background: var(--primary);
  font-size: 7px;
  font-weight: 800;
}

.selection-box b {
  position: absolute;
  width: 6px;
  height: 6px;
  border: 1px solid var(--primary);
  background: var(--card);
}

.selection-box b:nth-child(2) { top: -3px; left: -3px; }
.selection-box b:nth-child(3) { top: -3px; right: -3px; }
.selection-box b:nth-child(4) { bottom: -3px; left: -3px; }
.selection-box b:nth-child(5) { right: -3px; bottom: -3px; }

.face-box {
  top: 76px;
  left: 62px;
  width: 96px;
  height: 112px;
}

.text-box {
  top: 76px;
  right: 42px;
  width: 158px;
  height: 98px;
}

.redaction-mask {
  position: absolute;
  border-radius: 4px;
  background:
    repeating-linear-gradient(45deg, color-mix(in srgb, var(--primary) 84%, black) 0 5px, var(--primary) 5px 10px);
  opacity: 0.86;
}

.mask-one {
  top: 105px;
  left: 80px;
  width: 60px;
  height: 36px;
  border-radius: 50%;
}

.mask-two {
  top: 114px;
  right: 61px;
  width: 120px;
  height: 18px;
}

.editor-sidebar {
  display: grid;
  align-content: start;
  gap: 8px;
  padding: 18px 14px;
  border-left: 1px solid var(--border);
  background: color-mix(in srgb, var(--muted) 56%, var(--card));
}

.sidebar-label {
  margin-bottom: 7px;
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.region {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 7px;
  min-height: 36px;
  padding: 0 8px;
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--muted-foreground);
  background: var(--card);
  font-size: 8px;
}

.region.active {
  border-color: color-mix(in srgb, var(--primary) 48%, var(--border));
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 8%, var(--card));
}

.region svg,
.region strong {
  color: var(--primary);
}

.region strong {
  font-family: var(--font-data);
  font-size: 7px;
}

.style-swatches {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}

.style-swatches span {
  width: 20px;
  height: 20px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--primary);
}

.style-swatches span:nth-child(2) { background: var(--foreground); }
.style-swatches span:nth-child(3) { background: var(--warning); }
.style-swatches span:nth-child(4) { background: var(--danger); }

.export-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  margin-top: 14px;
  border-radius: 8px;
  color: var(--primary-foreground);
  background: var(--primary);
  font-size: 8px;
  font-weight: 800;
}

@media (max-width: 980px) {
  .redaction-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .redaction-section {
    padding-block: 82px;
  }

  .redaction-layout {
    gap: 42px;
  }

  .editor-body {
    grid-template-columns: 1fr;
  }

  .media-canvas {
    min-height: 350px;
  }

  .editor-sidebar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 1px solid var(--border);
    border-left: 0;
  }

  .sidebar-label,
  .style-swatches,
  .export-row {
    grid-column: 1 / -1;
  }

  .media-lines {
    right: 30px;
    width: 120px;
  }

  .text-box {
    right: 25px;
    width: 132px;
  }

  .mask-two {
    right: 42px;
    width: 98px;
  }
}
</style>
