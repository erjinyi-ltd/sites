<script setup lang="ts">
import { AlertTriangle, CheckCircle2, FileAudio, Image, ScanSearch, ShieldCheck, Video } from '@lucide/vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['hero'] }>()
</script>

<template>
  <div class="scan-visual" role="img" :aria-label="copy.visualLabel">
    <div class="visual-glow" aria-hidden="true"></div>
    <div class="scan-board">
      <div class="board-header">
        <div class="board-brand">
          <span class="brand-dot"></span>
          <span>WATERMARK / LOCAL</span>
        </div>
        <span class="status-pill"><span></span>{{ copy.visualScanning }}</span>
      </div>

      <div class="inspection-chain">
        <div class="source-column">
          <span class="column-label">{{ copy.visualInput }}</span>
          <div class="source-item active"><Image :size="16" aria-hidden="true" /><span>IMAGE</span></div>
          <div class="source-item"><Video :size="16" aria-hidden="true" /><span>VIDEO</span></div>
          <div class="source-item"><FileAudio :size="16" aria-hidden="true" /><span>AUDIO</span></div>
        </div>

        <div class="flow-line" aria-hidden="true"><i></i></div>

        <div class="scan-core">
          <div class="scan-progress">
            <div class="scan-core-inner">
              <ScanSearch :size="30" aria-hidden="true" />
              <strong>64%</strong>
            </div>
          </div>
          <div class="detector-tags">
            <span>C2PA</span><span>XMP</span><span>SHA-256</span>
          </div>
        </div>

        <div class="flow-line reverse" aria-hidden="true"><i></i></div>

        <div class="report-column">
          <span class="column-label">{{ copy.visualResult }}</span>
          <div class="report-summary">
            <ShieldCheck :size="24" aria-hidden="true" />
            <div><strong>{{ copy.visualReady }}</strong><small>3 / 4 CHECKS</small></div>
          </div>
          <div class="report-row positive">
            <CheckCircle2 :size="14" aria-hidden="true" />
            <span>{{ copy.visualFound }}</span>
          </div>
          <div class="report-row warning">
            <AlertTriangle :size="14" aria-hidden="true" />
            <span>{{ copy.visualReview }}</span>
          </div>
        </div>
      </div>

      <div class="board-footer">
        <span>ON-DEVICE</span><i></i><span>NO CLOUD UPLOAD</span><i></i><span>EXPLAINABLE REPORT</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scan-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 490px;
  isolation: isolate;
  animation: board-reveal 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.visual-glow {
  position: absolute;
  z-index: -1;
  width: min(92%, 510px);
  aspect-ratio: 1;
  border: 1px dashed color-mix(in srgb, var(--primary) 24%, transparent);
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--primary) 12%, transparent), transparent 68%);
  box-shadow: 0 0 0 54px color-mix(in srgb, var(--primary) 3%, transparent);
  animation: halo-breathe 6s ease-in-out infinite;
}

.scan-board {
  position: relative;
  width: min(100%, 610px);
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 16px;
  background:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    color-mix(in srgb, var(--card) 94%, transparent);
  background-size: 18px 18px;
  box-shadow: var(--shadow-card), 0 0 52px color-mix(in srgb, var(--primary) 10%, transparent);
  backdrop-filter: blur(18px);
}

.board-header,
.board-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 48px;
  padding: 0 18px;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--muted) 64%, transparent);
}

.board-brand,
.status-pill,
.board-footer {
  font-family: var(--font-data);
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.12em;
}

.board-brand,
.status-pill {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-dot,
.status-pill span {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--primary);
  box-shadow: 0 0 11px color-mix(in srgb, var(--primary) 72%, transparent);
}

.status-pill {
  min-height: 25px;
  padding: 0 9px;
  border: 1px solid color-mix(in srgb, var(--primary) 24%, var(--border));
  border-radius: 999px;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}

.status-pill span {
  width: 5px;
  height: 5px;
  animation: status-pulse 1.5s ease-in-out infinite;
}

.inspection-chain {
  display: grid;
  grid-template-columns: minmax(98px, 1fr) 42px minmax(116px, 0.95fr) 42px minmax(150px, 1.25fr);
  align-items: center;
  min-height: 322px;
  padding: 28px 20px;
}

.source-column,
.report-column {
  display: grid;
  gap: 8px;
}

.column-label {
  margin-bottom: 4px;
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 8px;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.source-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--muted-foreground);
  background: color-mix(in srgb, var(--card) 76%, transparent);
  font-family: var(--font-data);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.source-item svg {
  color: var(--primary);
}

.source-item.active {
  border-color: color-mix(in srgb, var(--primary) 48%, var(--border));
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 8%, var(--card));
}

.flow-line {
  position: relative;
  height: 1px;
  margin-inline: 7px;
  overflow: hidden;
  background: color-mix(in srgb, var(--primary) 24%, transparent);
}

.flow-line::after {
  content: '';
  position: absolute;
  top: -2px;
  right: 0;
  border-top: 2.5px solid transparent;
  border-bottom: 2.5px solid transparent;
  border-left: 4px solid var(--primary);
}

.flow-line i {
  position: absolute;
  top: -2px;
  left: -8px;
  width: 8px;
  height: 5px;
  border-radius: 999px;
  background: var(--cdn-glow);
  box-shadow: 0 0 8px var(--cdn-glow);
  animation: data-flow 2.4s linear infinite;
}

.flow-line.reverse i {
  animation-delay: 0.8s;
}

.scan-core {
  display: grid;
  justify-items: center;
  gap: 18px;
}

.scan-progress {
  position: relative;
  display: grid;
  place-items: center;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: conic-gradient(transparent 0deg 238deg, color-mix(in srgb, var(--primary) 18%, transparent) 270deg, var(--primary) 340deg, var(--cdn-glow) 360deg);
  box-shadow: 0 0 32px color-mix(in srgb, var(--primary) 17%, transparent);
  animation: progress-spin 1.8s linear infinite;
}

.scan-progress::before {
  content: '';
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  background: var(--card);
}

.scan-core-inner {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  gap: 3px;
  animation: progress-counter-spin 1.8s linear infinite;
}

.scan-core-inner svg {
  color: var(--primary);
}

.scan-core-inner strong {
  color: var(--foreground);
  font-family: var(--font-data);
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.detector-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
}

.detector-tags span {
  padding: 4px 5px;
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--muted-foreground);
  background: var(--muted);
  font-family: var(--font-data);
  font-size: 6px;
  font-weight: 750;
  letter-spacing: 0.06em;
}

.report-column {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: color-mix(in srgb, var(--card) 82%, transparent);
}

.report-summary {
  display: flex;
  align-items: center;
  gap: 9px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.report-summary svg {
  color: var(--primary);
}

.report-summary div {
  display: grid;
  gap: 3px;
}

.report-summary strong {
  font-size: 10px;
}

.report-summary small {
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 6px;
  font-weight: 750;
  letter-spacing: 0.08em;
}

.report-row {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 28px;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  color: var(--muted-foreground);
  font-size: 8px;
}

.report-row.positive svg {
  color: var(--success);
}

.report-row.warning svg {
  color: var(--warning);
}

.board-footer {
  justify-content: center;
  min-height: 42px;
  border-top: 1px solid var(--border);
  border-bottom: 0;
  color: var(--muted-foreground);
  font-size: 7px;
}

.board-footer i {
  width: 3px;
  height: 3px;
  border-radius: 999px;
  background: var(--primary);
}

@keyframes board-reveal {
  from { opacity: 0; transform: translateY(16px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes halo-breathe {
  0%, 100% { opacity: 0.62; transform: scale(0.97); }
  50% { opacity: 1; transform: scale(1.02); }
}

@keyframes status-pulse {
  0%, 100% { opacity: 0.35; transform: scale(0.78); }
  50% { opacity: 1; transform: scale(1.15); }
}

@keyframes data-flow {
  from { transform: translateX(0); }
  to { transform: translateX(54px); }
}

@keyframes progress-spin {
  to { transform: rotate(360deg); }
}

@keyframes progress-counter-spin {
  to { transform: rotate(-360deg); }
}

@media (max-width: 1100px) {
  .inspection-chain {
    grid-template-columns: minmax(88px, 1fr) 26px minmax(108px, 0.95fr) 26px minmax(135px, 1.2fr);
    padding-inline: 15px;
  }

  .flow-line {
    margin-inline: 3px;
  }
}

@media (max-width: 640px) {
  .scan-visual {
    min-height: 500px;
  }

  .scan-board {
    width: min(100%, 430px);
  }

  .board-header {
    padding-inline: 13px;
  }

  .board-brand {
    font-size: 8px;
  }

  .inspection-chain {
    grid-template-columns: 1fr;
    gap: 13px;
    padding: 18px;
  }

  .source-column {
    grid-template-columns: repeat(3, 1fr);
  }

  .source-column .column-label {
    grid-column: 1 / -1;
  }

  .source-item {
    justify-content: center;
    min-width: 0;
    padding-inline: 5px;
  }

  .source-item span {
    display: none;
  }

  .flow-line {
    width: 1px;
    height: 22px;
    margin: 0 auto;
    overflow: hidden;
  }

  .flow-line::after {
    top: auto;
    right: -2px;
    bottom: 0;
    border-top: 4px solid var(--primary);
    border-right: 2.5px solid transparent;
    border-bottom: 0;
    border-left: 2.5px solid transparent;
  }

  .flow-line i {
    top: -8px;
    left: -2px;
    width: 5px;
    height: 8px;
    animation-name: data-flow-vertical;
  }

  .scan-progress {
    width: 100px;
    height: 100px;
  }

  .report-column {
    width: min(100%, 270px);
    margin-inline: auto;
  }

  .board-footer {
    gap: 8px;
    padding-inline: 10px;
    letter-spacing: 0.07em;
  }
}

@keyframes data-flow-vertical {
  from { transform: translateY(0); }
  to { transform: translateY(34px); }
}
</style>
