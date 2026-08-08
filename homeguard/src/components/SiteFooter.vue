<script setup lang="ts">
import { computed } from 'vue'
import GcsaFooterNavIcon from '../../../shared/GcsaFooterNavIcon.vue'
import GcsaLegalCounsel from '../../../shared/GcsaLegalCounsel.vue'
import { getGcsaFooter } from '../content/gcsaFooterNavigation'
import type { Locale } from '../content/content'

const props = defineProps<{ locale: Locale }>()
const footer = computed(() => getGcsaFooter(props.locale))
</script>

<template>
  <footer class="gcsa-site-footer" :aria-label="footer.contactHeading">
    <div class="content-width footer-shell">
      <div class="brand-divider" aria-hidden="true">
        <span></span>
        <img src="/gcsa-icon.svg" alt="" width="29" height="27" />
        <span></span>
      </div>

      <section class="contact-zone" :aria-labelledby="'footer-contact-' + locale">
        <h2 :id="'footer-contact-' + locale">{{ footer.contactHeading }}</h2>
        <div class="contact-panel">
          <a class="email-card" href="mailto:contact@gcsa.org">
            <span class="email-icon" aria-hidden="true">
              <svg viewBox="0 0 23 19">
                <path d="M21.23 0C22.21 0 23 .79 23 1.77v15.04c0 .98-.79 1.77-1.77 1.77H1.77C.79 18.58 0 17.79 0 16.81V1.77C0 .79.79 0 1.77 0h19.46ZM11.3 8.74 5.62 4.22 4.38 5.78l6.27 5 .6.48.62-.46 6.73-5-1.2-1.6-6.1 4.54Z" />
              </svg>
            </span>
            <span class="email-copy">
              <small>{{ footer.emailLabel }}</small>
              <strong>contact@gcsa.org</strong>
            </span>
            <span class="email-arrow" aria-hidden="true">
              <svg viewBox="0 0 13 13">
                <path d="M3.37 1h7.82v7.82M10.7 1.49 1.41 10.78" />
              </svg>
            </span>
          </a>

          <nav class="social-links" :aria-label="footer.socialLabel">
            <a href="https://x.com/gcsa_org" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
              <span>{{ footer.twitter }}</span>
            </a>
            <a href="https://t.me/GCSAofficial" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.7 3.2 18.6 20c-.2 1.2-.9 1.5-1.8.9l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2L6.4 14l-4.7-1.5c-1-.3-1-1 .2-1.5L20.2 4c.9-.3 1.7.2 1.5-.8Z" />
              </svg>
              <span>{{ footer.telegram }}</span>
            </a>
          </nav>
        </div>
      </section>

      <nav class="footer-nav" :aria-label="footer.navigationLabel">
        <a v-for="link in footer.navigation" :key="link.key" :href="link.href">
          <GcsaFooterNavIcon :icon="link.key" />
          <span>{{ link.label }}</span>
          <svg class="footer-nav-arrow" viewBox="0 0 8 9" aria-hidden="true">
            <path d="m3.32 1.06 3.31 3.32-3.31 3.31" />
          </svg>
        </a>
      </nav>

      <GcsaLegalCounsel :locale="locale" />

      <div class="footer-bottom">
        <p>{{ footer.copyright }}</p>
        <nav :aria-label="footer.navigationLabel">
          <a v-for="link in footer.legal" :key="link.href" :href="link.href">{{ link.label }}</a>
          <a href="mailto:contact@gcsa.org">contact@gcsa.org</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.gcsa-site-footer {
  position: relative;
  z-index: 2;
  width: 100%;
  padding-top: clamp(56px, 7vw, 88px);
  background:
    radial-gradient(circle at 16% 0, color-mix(in srgb, var(--primary) 9%, transparent), transparent 30rem),
    var(--background);
  color: var(--muted-foreground);
  font-size: 13px;
}

.gcsa-site-footer::before {
  position: absolute;
  top: 0;
  left: 50%;
  width: 224px;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary) 65%, transparent), transparent);
  content: '';
  transform: translateX(-50%);
}

.footer-shell {
  min-width: 0;
  padding-bottom: max(28px, env(safe-area-inset-bottom));
}

.brand-divider {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 4px 0 36px;
}

.brand-divider span {
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--border) 90%, transparent) 18%, var(--border) 50%, color-mix(in srgb, var(--border) 90%, transparent) 82%, transparent 100%);
}

.brand-divider img {
  width: 29px;
  height: 27px;
  object-fit: contain;
}

.contact-zone h2 {
  margin: 0 0 12px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 500;
}

.contact-panel {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 24px;
}

.email-card,
.social-links a,
.footer-nav a {
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--card) 94%, transparent);
  box-shadow: 0 16px 42px color-mix(in srgb, #000 9%, transparent);
}

.email-card {
  display: flex;
  width: min(440px, 100%);
  min-height: 94px;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  color: var(--foreground);
  text-decoration: none;
}

.email-icon {
  display: grid;
  width: 54px;
  height: 54px;
  flex: 0 0 54px;
  place-items: center;
}

.email-icon svg {
  width: 23px;
  height: 19px;
  fill: currentColor;
}

.email-copy {
  display: grid;
  min-width: 0;
  gap: 4px;
}

.email-copy small {
  color: var(--muted-foreground);
  font-size: 12px;
}

.email-copy strong {
  overflow: hidden;
  font-size: clamp(15px, 2vw, 20px);
  font-weight: 500;
  text-overflow: ellipsis;
}

.email-arrow {
  display: grid;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  place-items: center;
  margin-left: auto;
  font-size: 18px;
}

.email-arrow svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: square;
  stroke-width: 2;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-links a {
  display: grid;
  width: 100px;
  min-height: 94px;
  place-items: center;
  align-content: center;
  gap: 9px;
  color: var(--foreground);
  text-decoration: none;
}

.social-links svg {
  width: 30px;
  height: 30px;
  fill: currentColor;
}

.social-links span {
  font-size: 12px;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 36px;
}

.footer-nav a {
  display: flex;
  min-width: 0;
  min-height: 48px;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  color: var(--foreground);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
}

.footer-nav a > span:nth-child(2) {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.footer-nav-arrow {
  width: 8px;
  height: 9px;
  flex: 0 0 auto;
  margin-left: auto;
  color: var(--muted-foreground);
  fill: none;
  stroke: currentColor;
  stroke-linecap: square;
  stroke-width: 1.5;
}

.nav-icon {
  display: block;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 40px;
  padding-top: 22px;
  border-top: 1px solid var(--border);
  font-size: 12px;
}

.footer-bottom p {
  margin: 0;
}

.footer-bottom nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 9px 18px;
}

.footer-bottom a {
  color: var(--muted-foreground);
  text-decoration: none;
}

.email-card,
.social-links a,
.footer-nav a,
.footer-bottom a {
  transition: color 180ms ease, border-color 180ms ease, background 180ms ease, transform 180ms ease;
}

.email-card:hover,
.email-card:focus-visible,
.social-links a:hover,
.social-links a:focus-visible,
.footer-nav a:hover,
.footer-nav a:focus-visible,
.footer-bottom a:hover,
.footer-bottom a:focus-visible {
  color: var(--primary);
}

.email-card:hover,
.email-card:focus-visible,
.social-links a:hover,
.social-links a:focus-visible,
.footer-nav a:hover,
.footer-nav a:focus-visible {
  border-color: color-mix(in srgb, var(--primary) 46%, var(--border));
  background: color-mix(in srgb, var(--primary) 9%, var(--card));
  transform: translateY(-1px);
}

@media (max-width: 760px) {
  .gcsa-site-footer {
    padding-top: 24px;
  }

  .content-width.footer-shell {
    display: flex;
    width: min(100% - 32px, var(--content-max));
    flex-direction: column;
    padding-bottom: max(24px, env(safe-area-inset-bottom));
  }

  .brand-divider {
    order: 1;
    gap: 14px;
    margin: 0 0 18px;
  }

  .brand-divider img {
    width: 29px;
    height: 29px;
  }

  .footer-nav {
    order: 2;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-top: 20px;
  }

  .footer-nav a {
    min-height: 42px;
    gap: 8px;
    padding: 9px 11px;
    border-radius: 8px;
    box-shadow: none;
  }

  .nav-icon {
    width: 16px;
    height: 16px;
    flex-basis: 16px;
  }

  .contact-zone {
    order: 3;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }

  .contact-zone h2 {
    margin-bottom: 10px;
  }

  .contact-panel {
    flex-direction: column;
    gap: 16px;
  }

  .email-card {
    width: 100%;
    min-height: 72px;
    padding: 16px 18px;
    border-radius: 8px;
    box-shadow: none;
  }

  .email-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .email-icon svg {
    width: 20px;
    height: auto;
  }

  .email-copy small {
    font-size: 11px;
    font-weight: 500;
  }

  .email-copy strong {
    font-size: 15px;
    font-weight: 600;
  }

  .email-arrow {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
  }

  .social-links {
    display: flex;
    gap: 10px;
  }

  .social-links a {
    width: 76px;
    min-height: 54px;
    gap: 5px;
    padding: 8px 6px 7px;
    border-radius: 8px;
    box-shadow: none;
  }

  .social-links svg {
    width: 16px;
    height: 16px;
  }

  .social-links span {
    font-size: 10px;
    font-weight: 600;
  }

  .footer-bottom {
    order: 5;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: 32px;
    padding-top: 32px;
  }

  .footer-bottom nav {
    justify-content: flex-start;
    gap: 8px 16px;
  }
}
</style>
