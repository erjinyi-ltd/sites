<script setup lang="ts">
import { computed } from 'vue'
import { getGcsaFooterNavigation } from '../content/gcsaFooterNavigation'
import type { Locale, SiteCopy } from '../types/site'

const props = defineProps<{
  copy: SiteCopy['footer']
  locale: Locale
}>()

const navigation = computed(() => getGcsaFooterNavigation(props.locale))
const primaryLinks = computed(() => [
  { label: props.copy.home, href: navigation.value.home },
  { label: props.copy.products, href: navigation.value.products },
  { label: props.copy.media, href: navigation.value.media },
  { label: props.copy.updates, href: navigation.value.updates },
  { label: props.copy.join, href: navigation.value.join },
  { label: props.copy.about, href: navigation.value.about },
])
const legalLinks = computed(() => [
  { label: props.copy.privacy, href: navigation.value.privacy },
  { label: props.copy.terms, href: navigation.value.terms },
  { label: props.copy.support, href: navigation.value.support },
])
</script>

<template>
  <footer class="site-footer">
    <div class="content-width footer-shell">
      <div class="footer-main">
        <section class="footer-contact" :aria-label="copy.contactUs">
          <h2>{{ copy.contactUs }}</h2>
          <div class="footer-contact-links">
            <a class="footer-email" href="mailto:contact@gcsa.org">
              <span>{{ copy.email }}</span>
              <strong>contact@gcsa.org</strong>
            </a>
            <div class="footer-socials">
              <a
                class="footer-social-link"
                href="https://x.com/gcsa_org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.727-8.835L1.254 2.25h6.826l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
                <span>{{ copy.twitter }}</span>
              </a>
              <a
                class="footer-social-link"
                href="https://t.me/GCSAofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.7 3.2 18.6 20c-.2 1.2-.9 1.5-1.8.9l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2L6.4 14l-4.7-1.5c-1-.3-1-1 .2-1.5L20.2 4c.9-.3 1.7.2 1.5-.8Z" />
                </svg>
                <span>{{ copy.telegram }}</span>
              </a>
            </div>
          </div>
        </section>

        <nav class="footer-nav" :aria-label="copy.menuLabel">
          <a v-for="link in primaryLinks" :key="link.label" :href="link.href">{{ link.label }}</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">{{ copy.copyright }}</p>
        <nav class="footer-legal" :aria-label="copy.menuLabel">
          <a v-for="link in legalLinks" :key="link.label" :href="link.href">{{ link.label }}</a>
          <a href="mailto:contact@gcsa.org">contact@gcsa.org</a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 2;
  width: 100%;
}

.footer-shell {
  min-width: 0;
  border-top: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border));
  padding: 32px 0 28px;
  color: var(--muted-foreground);
  font-family: var(--font-body);
  font-size: 13px;
}

.footer-main,
.footer-bottom {
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.65fr);
  gap: clamp(48px, 7vw, 96px);
}

.footer-contact h2 {
  margin: 0 0 16px;
  color: var(--foreground);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.footer-contact-links {
  display: grid;
  gap: 16px;
}

.footer-email {
  display: grid;
  gap: 3px;
  width: fit-content;
}

.footer-email span {
  font-size: 12px;
}

.footer-email strong {
  color: var(--foreground);
  font-size: 14px;
  font-weight: 600;
}

.footer-socials {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 22px;
}

.footer-social-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: fit-content;
  font-weight: 500;
}

.footer-social-link svg {
  display: block;
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
  fill: currentColor;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-content: start;
  gap: 14px clamp(24px, 4vw, 52px);
  padding-top: 1px;
}

.footer-nav a {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 30px;
  padding: 4px 0;
  color: var(--foreground);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  transition: color 160ms ease, transform 160ms ease;
}

.footer-nav a:hover,
.footer-nav a:focus-visible {
  transform: translateX(2px);
}

.footer-bottom {
  align-items: center;
  margin-top: 34px;
  padding-top: 19px;
  border-top: 1px solid color-mix(in srgb, var(--border) 78%, transparent);
}

.footer-copyright {
  margin: 0;
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px 22px;
}

.site-footer a {
  color: var(--muted-foreground);
  text-decoration: none;
  transition: color 160ms ease;
}

.site-footer a:hover,
.site-footer a:focus-visible {
  color: var(--primary);
}

@media (max-width: 760px) {
  .footer-shell {
    padding: 26px 0 calc(24px + env(safe-area-inset-bottom));
    font-size: 12px;
  }

  .footer-main,
  .footer-bottom {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .footer-contact,
  .footer-contact-links,
  .footer-email {
    justify-items: center;
    text-align: center;
  }

  .footer-email {
    width: 100%;
  }

  .footer-socials {
    justify-content: center;
  }

  .footer-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 24px;
  }

  .footer-nav a {
    justify-self: center;
    min-height: 34px;
    text-align: center;
  }

  .footer-bottom {
    gap: 14px;
    margin-top: 24px;
    text-align: center;
  }

  .footer-legal {
    justify-content: center;
    gap: 9px 16px;
  }
}
</style>
