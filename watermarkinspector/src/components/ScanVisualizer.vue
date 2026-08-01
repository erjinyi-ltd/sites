<script setup lang="ts">
import { Apple, BatteryMedium, FileAudio, Image, ScanSearch, Signal, Smartphone, Video, Wifi } from '@lucide/vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['hero'] }>()
</script>

<template>
  <div class="scan-visual" role="img" :aria-label="copy.visualLabel">
    <div class="visual-glow" aria-hidden="true"></div>
    <div class="mobile-showcase">
      <div class="platform-label">
        <Apple :size="15" aria-hidden="true" /><span>iOS 17+</span>
        <i></i>
        <Smartphone :size="15" aria-hidden="true" /><span>Android</span>
      </div>

      <div class="phone app-phone">
        <div class="phone-surface">
          <div class="camera-cutout"></div>
          <div class="phone-status">
            <span>09:41</span>
            <div><Signal :size="11" /><Wifi :size="11" /><BatteryMedium :size="13" /></div>
          </div>
          <div class="app-bar">
            <span class="app-mark"><ScanSearch :size="15" /></span>
            <div><strong>WATERMARK</strong><small>LOCAL INSPECTION</small></div>
            <span class="local-badge">LOCAL</span>
          </div>
          <div class="inspection-screen">
            <span class="screen-label">{{ copy.visualInput }}</span>
            <div class="media-preview">
              <div class="media-thumb"><span></span><i></i></div>
              <div><strong>IMG_2048.HEIC</strong><small>4.8 MB · HEIC</small></div>
            </div>
            <div class="media-types">
              <span class="active"><Image :size="15" /></span>
              <span><Video :size="15" /></span>
              <span><FileAudio :size="15" /></span>
            </div>
            <div class="scan-block">
              <div class="scan-progress"><div><ScanSearch :size="23" /><strong>64%</strong></div></div>
              <strong>{{ copy.visualScanning }}</strong>
              <div class="detector-tags"><span>C2PA</span><span>XMP</span><span>SHA-256</span></div>
            </div>
          </div>
          <div class="gesture-indicator"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scan-visual {
  position: relative;
  display: grid;
  min-height: 620px;
  place-items: center;
  isolation: isolate;
}

.visual-glow {
  position: absolute;
  z-index: -1;
  width: min(94%, 500px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--primary) 17%, transparent), transparent 68%);
  filter: blur(8px);
  animation: halo-breathe 6s ease-in-out infinite;
}

.mobile-showcase {
  position: relative;
  width: min(100%, 430px);
  height: 610px;
  animation: phone-reveal 720ms cubic-bezier(.22, 1, .36, 1) both;
}

.platform-label {
  position: absolute;
  z-index: 5;
  top: 0;
  left: 50%;
  display: inline-flex;
  min-height: 36px;
  align-items: center;
  gap: 8px;
  padding: 0 13px;
  border: 1px solid color-mix(in srgb, var(--primary) 35%, var(--border));
  border-radius: 999px;
  color: var(--foreground);
  background: color-mix(in srgb, var(--card) 94%, transparent);
  box-shadow: var(--shadow-soft);
  font-family: var(--font-data);
  font-size: 10px;
  font-weight: 750;
  letter-spacing: .05em;
  white-space: nowrap;
  backdrop-filter: blur(14px);
  transform: translateX(-50%);
}

.platform-label svg { color: var(--primary); }
.platform-label i { width: 1px; height: 14px; margin-inline: 2px; background: var(--border); }

.phone {
  position: absolute;
  overflow: hidden;
  border: 7px solid #11171d;
  border-radius: 40px;
  background: #11171d;
  box-shadow: 0 32px 84px rgba(0, 0, 0, .28), 0 0 46px color-mix(in srgb, var(--primary) 11%, transparent);
}

.phone-surface {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  border-radius: 31px;
  background: color-mix(in srgb, var(--card) 97%, var(--muted));
}

.app-phone {
  top: 43px;
  left: 50%;
  width: 272px;
  aspect-ratio: .49;
  transform: translateX(-50%);
}

.camera-cutout {
  position: absolute;
  z-index: 3;
  top: 9px;
  left: 50%;
  width: 48px;
  height: 15px;
  border-radius: 999px;
  background: #050709;
  transform: translateX(-50%);
}

.phone-status {
  display: flex;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  padding: 0 17px;
  color: var(--foreground);
  font-family: var(--font-data);
  font-size: 8px;
  font-weight: 750;
}

.phone-status > div { display: flex; align-items: center; gap: 4px; }

.app-bar {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 9px;
  min-height: 52px;
  padding: 0 14px;
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--card) 91%, transparent);
}

.app-mark {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 9px;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 10%, var(--muted));
}

.app-bar > div { display: grid; gap: 2px; min-width: 0; }
.app-bar strong { font-family: var(--font-display); font-size: 9px; letter-spacing: .08em; }
.app-bar small { color: var(--muted-foreground); font-family: var(--font-data); font-size: 5px; font-weight: 750; letter-spacing: .09em; }
.local-badge { padding: 4px 6px; border-radius: 999px; color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, transparent); font-family: var(--font-data); font-size: 6px; font-weight: 800; }

.inspection-screen {
  display: grid;
  align-content: start;
  gap: 12px;
  flex: 1;
  padding: 15px 14px;
}

.screen-label { color: var(--muted-foreground); font-family: var(--font-data); font-size: 7px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }

.media-preview {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  min-height: 70px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card);
}

.media-thumb { position: relative; height: 52px; overflow: hidden; border-radius: 8px; background: linear-gradient(150deg, color-mix(in srgb, var(--primary) 34%, var(--muted)), var(--card-soft)); }
.media-thumb span { position: absolute; right: 8px; bottom: 8px; width: 27px; height: 27px; border-radius: 50%; background: color-mix(in srgb, var(--primary) 72%, transparent); }
.media-thumb i { position: absolute; bottom: -10px; left: -5px; width: 52px; height: 36px; border-radius: 50% 50% 0 0; background: color-mix(in srgb, var(--foreground) 18%, transparent); transform: rotate(-12deg); }
.media-preview > div:last-child { display: grid; gap: 4px; min-width: 0; }
.media-preview strong { overflow: hidden; font-size: 8px; text-overflow: ellipsis; white-space: nowrap; }
.media-preview small { color: var(--muted-foreground); font-family: var(--font-data); font-size: 6px; }

.media-types { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.media-types span { display: grid; height: 34px; place-items: center; border: 1px solid var(--border); border-radius: 9px; color: var(--muted-foreground); background: var(--card); }
.media-types span.active { border-color: color-mix(in srgb, var(--primary) 48%, var(--border)); color: var(--primary); background: color-mix(in srgb, var(--primary) 9%, var(--card)); }

.scan-block { display: grid; justify-items: center; gap: 8px; padding-top: 5px; }
.scan-block > strong { font-size: 9px; font-weight: 650; }

.scan-progress {
  --mobile-scan-progress: 64%;
  position: relative;
  display: grid;
  width: 112px;
  height: 112px;
  place-items: center;
  border-radius: 50%;
  background: conic-gradient(var(--primary) 0 var(--mobile-scan-progress), color-mix(in srgb, var(--primary) 11%, var(--muted)) var(--mobile-scan-progress) 100%);
  box-shadow: 0 0 28px color-mix(in srgb, var(--primary) 18%, transparent);
  animation: mobile-scan 5.8s cubic-bezier(.22, 1, .36, 1) infinite;
}

.scan-progress::before { position: absolute; inset: 7px; border-radius: 50%; background: var(--card); content: ''; }
.scan-progress > div { position: relative; z-index: 1; display: grid; justify-items: center; gap: 3px; }
.scan-progress svg { color: var(--primary); }
.scan-progress strong { font-family: var(--font-data); font-size: 13px; }
.detector-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; }
.detector-tags span { padding: 4px 5px; border: 1px solid var(--border); border-radius: 5px; color: var(--muted-foreground); background: var(--muted); font-family: var(--font-data); font-size: 6px; font-weight: 750; }
.gesture-indicator { width: 88px; height: 4px; flex: 0 0 auto; margin: 5px auto 8px; border-radius: 999px; background: color-mix(in srgb, var(--foreground) 76%, transparent); }

@property --mobile-scan-progress { syntax: '<percentage>'; inherits: false; initial-value: 64%; }
@keyframes mobile-scan { 0%, 8% { --mobile-scan-progress: 0%; } 48%, 100% { --mobile-scan-progress: 64%; } }
@keyframes phone-reveal { from { opacity: 0; transform: translateY(18px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes halo-breathe { 0%, 100% { opacity: .58; transform: scale(.96); } 50% { opacity: 1; transform: scale(1.03); } }

@media (max-width: 640px) {
  .scan-visual { min-height: 535px; }
  .mobile-showcase { width: min(100%, 340px); height: 520px; }
  .platform-label { min-height: 32px; padding-inline: 10px; font-size: 8px; }
  .app-phone { top: 38px; width: 232px; border-width: 6px; border-radius: 35px; }
  .phone-surface { border-radius: 28px; }
  .app-bar { min-height: 47px; padding-inline: 11px; }
  .app-mark { width: 27px; height: 27px; }
  .inspection-screen { gap: 9px; padding: 12px 11px; }
  .media-preview { grid-template-columns: 46px minmax(0, 1fr); min-height: 60px; }
  .media-thumb { height: 44px; }
  .scan-progress { width: 90px; height: 90px; }
  .scan-progress svg { width: 19px; height: 19px; }
}
</style>
