<script setup lang="ts">
import BrandLockup from './BrandLockup.vue'
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['footer'] }>()
</script>

<template>
  <footer class="site-footer">
    <div class="content-width footer-main">
      <div class="footer-brand">
        <a href="#top" aria-label="WATERMARK"><BrandLockup /></a>
        <p>{{ copy.tagline }}</p>
      </div>
      <div class="footer-column">
        <strong>{{ copy.product }}</strong>
        <a href="#capabilities">{{ copy.capabilities }}</a>
        <a href="#privacy">{{ copy.privacy }}</a>
        <a href="#faq">{{ copy.faq }}</a>
      </div>
      <div class="footer-column">
        <strong>{{ copy.resources }}</strong>
        <a href="https://gcsa.org/" target="_blank" rel="noreferrer">{{ copy.gcsa }}</a>
        <a href="mailto:contact@gcsa.org">{{ copy.contact }}</a>
      </div>
    </div>
    <div class="content-width footer-bottom">
      <p>{{ copy.copyright }}</p>
      <span>WATERMARK · GCSA ECOSYSTEM</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  background: color-mix(in srgb, var(--card) 74%, var(--background));
}

.footer-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px 180px;
  gap: 56px;
  padding-block: 52px;
}

.footer-brand p {
  max-width: 320px;
  margin-top: 18px;
  color: var(--muted-foreground);
  font-size: 12px;
  line-height: 1.6;
}

.footer-column {
  display: grid;
  align-content: start;
  gap: 11px;
}

.footer-column strong {
  margin-bottom: 3px;
  color: var(--foreground);
  font-family: var(--font-data);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.footer-column a {
  color: var(--muted-foreground);
  font-size: 12px;
  transition: color 160ms ease, transform 160ms ease;
}

.footer-column a:hover {
  color: var(--primary);
  transform: translateX(3px);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 76px;
  border-top: 1px solid var(--border);
  color: var(--muted-foreground);
  font-size: 10px;
}

.footer-bottom span {
  font-family: var(--font-data);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

@media (max-width: 720px) {
  .footer-main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 28px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .footer-bottom {
    display: grid;
    align-content: center;
    justify-content: start;
    gap: 8px;
    min-height: 100px;
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }
}
</style>
