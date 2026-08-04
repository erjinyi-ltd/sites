<script setup lang="ts">
import { computed } from 'vue'
import { getGcsaFooter } from '../content/gcsaFooterNavigation'
import type { Locale } from '../types/site'

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
              <svg viewBox="0 0 24 20">
                <path d="M2 3h20v14H2V3Zm1.7 1.8L12 11l8.3-6.2" />
              </svg>
            </span>
            <span class="email-copy">
              <small>{{ footer.emailLabel }}</small>
              <strong>contact@gcsa.org</strong>
            </span>
            <span class="email-arrow" aria-hidden="true">↗</span>
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
          <span class="nav-icon" aria-hidden="true"><i></i></span>
          <span>{{ link.label }}</span>
          <b aria-hidden="true">›</b>
        </a>
      </nav>

      <section class="counsel-zone" :aria-labelledby="'footer-counsel-' + locale">
        <h2 :id="'footer-counsel-' + locale">{{ footer.counselHeading }}</h2>
        <div class="counsel-grid">
          <div v-for="(name, index) in footer.counselNames" :key="name" class="counsel-card">
            <span class="counsel-mark" aria-hidden="true">
              <img v-if="index === 0" src="/gcsa-legal-fn.png" alt="" width="40" height="40" />
              <svg v-else-if="index === 1" viewBox="0 0 80 80">
                <path d="M50.097 27.427h-3.613c-.972 0-1.388.417-1.388 1.852v20.84c0 1.111.092 1.991 1.343 1.991h3.612V56H33.565v-3.89h4.167c1.111 0 1.205-.972 1.205-1.99V28.677L28.424 56H25.46l-4.445-13.384c1.682.016 5.213-.064 5.88-.509.149.556.71 1.898.973 2.5.309-.988 1.27-3.213 2.64-4.213 1.713-1.25 3.75-3.103 3.75-7.734 0-.88-.37-2.732-.37-3.38 0-.52 1.544-3.736 2.316-5.28h13.893v3.427Zm27.739 8.567h-3.427c-.046-1.157-.36-3.89-1.25-5.556-1.111-2.084-3.427-2.594-4.03-2.594h-1.388c-.74 0-1.065.277-1.065.787v21.58c0 .926.74 1.9 1.435 1.9h3.52V56H55.56v-3.89h3.705c1.111 0 1.297-.973 1.297-1.668V28.354c0-.649-.324-.927-1.02-.927h-6.76V24h25.053v11.994ZM22.913 24.047c2.316 0 10.234.926 10.235 8.706 0 7.78-8.012 8.567-10.235 8.567h-2.5l-1.298-3.426c.309 0 1.251 0 2.918-.37 2.084-.464 3.89-1.668 3.89-5.187 0-3.705-3.102-4.955-4.908-4.955h-6.206v22.136c0 1.203.139 2.592 1.204 2.592h4.214v3.844H3V52.11h3.103c1.574 0 1.99-1.435 1.99-2.592V29.142c0-.973-.786-1.76-1.944-1.76H3.093v-3.335h19.82Z" />
              </svg>
              <svg v-else viewBox="0 0 80 80">
                <path d="M56.358 19c8.523 0 16.27 6.212 16.27 14.911 0 8.7-9.055 14.914-16.334 14.914H44.575v11.719H32.68v-10.12c1.657 0 6.034-.266 9.41-1.953 3.906-1.953 6.391-4.795 7.28-6.393h4.793c4.794 0 7.457-4.439 7.457-8.345 0-4.26-3.373-7.633-7.457-7.633h-4.26c-1.99-3.835-6.8-6.449-8.99-7.1h15.445Zm-14.09 23.611H32.68V25.567h9.588v17.044Z" />
                <path d="M20.25 60.369V25.924h8.346c7.101 0 10.297 4.44 10.297 8.345 0 3.906-3.373 7.635-7.634 7.635h-4.261l-4.44 7.102h9.944c9.41 0 17.577-8.168 17.577-15.447 0-7.28-6.57-14.559-17.577-14.559H8v41.369h12.25Z" />
              </svg>
            </span>
            <span>{{ name }}</span>
          </div>
        </div>
      </section>

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

.contact-zone h2,
.counsel-zone h2 {
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
.footer-nav a,
.counsel-card {
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
  border-radius: 8px;
  background: color-mix(in srgb, var(--primary) 10%, transparent);
}

.email-icon svg {
  width: 27px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
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
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary) 10%, transparent);
  font-size: 18px;
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

.footer-nav b {
  margin-left: auto;
  color: var(--muted-foreground);
  font-size: 18px;
  font-weight: 400;
}

.nav-icon {
  position: relative;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  border: 1px solid currentColor;
  border-radius: 4px;
  opacity: 0.72;
}

.nav-icon::before,
.nav-icon::after,
.nav-icon i::before,
.nav-icon i::after {
  position: absolute;
  width: 3px;
  height: 3px;
  border: 1px solid currentColor;
  border-radius: 1px;
  content: '';
}

.nav-icon::before { top: 3px; left: 3px; }
.nav-icon::after { top: 3px; right: 3px; }
.nav-icon i::before { bottom: 3px; left: 3px; }
.nav-icon i::after { right: 3px; bottom: 3px; }

.counsel-zone {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.counsel-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.counsel-card {
  display: flex;
  min-width: 0;
  min-height: 58px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 14px;
  color: var(--foreground);
  text-align: center;
}

.counsel-mark {
  display: grid;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  place-items: center;
}

.counsel-mark img,
.counsel-mark svg {
  display: block;
  max-width: 40px;
  max-height: 40px;
  object-fit: contain;
}

.counsel-mark svg {
  fill: currentColor;
}

.counsel-card > span:last-child {
  min-width: 0;
  font-size: 12px;
  line-height: 1.4;
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
.counsel-card,
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
    padding-top: 44px;
  }

  .contact-panel {
    display: grid;
  }

  .email-card {
    width: 100%;
  }

  .social-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .social-links a {
    width: 100%;
    min-height: 82px;
  }

  .footer-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 28px;
  }

  .footer-nav a {
    min-height: 54px;
  }

  .counsel-grid {
    grid-template-columns: 1fr;
  }

  .counsel-card {
    justify-content: flex-start;
    text-align: left;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-bottom nav {
    justify-content: flex-start;
  }
}

@media (max-width: 460px) {
  .footer-nav {
    grid-template-columns: 1fr;
  }

  .email-card {
    padding-inline: 14px;
  }

  .email-icon {
    width: 46px;
    height: 46px;
    flex-basis: 46px;
  }

  .email-arrow {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }
}
</style>
