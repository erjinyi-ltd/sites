<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight, Mail } from '@lucide/vue'
import { useRoute } from 'vue-router'
import { legalCopy } from '../content/legalCopy'
import type { LegalPageKind } from '../types/legal'
import type { Locale, SiteCopy } from '../types/site'

const props = defineProps<{
  copy: SiteCopy
  locale: Locale
}>()

const route = useRoute()

const pageKind = computed<LegalPageKind>(() => {
  const kind = route.meta.legalKind
  return kind === 'terms' || kind === 'support' ? kind : 'privacy'
})
const localeCopy = computed(() => legalCopy[props.locale])
const page = computed(() => localeCopy.value.pages[pageKind.value])
</script>

<template>
  <div class="legal-page">
    <div class="content-width legal-shell">
      <header class="legal-hero">
        <p class="eyebrow">{{ page.eyebrow }}</p>
        <h1>{{ page.title }}</h1>
        <p class="legal-summary">{{ page.summary }}</p>
        <p class="legal-updated">
          <span>{{ page.dateLabel }}</span>
          <span aria-hidden="true">·</span>
          <time>{{ page.date }}</time>
        </p>
      </header>

      <div class="legal-content">
        <aside class="section-index">
          <p>{{ localeCopy.sectionNavLabel }}</p>
          <nav :aria-label="localeCopy.sectionNavLabel">
            <a
              v-for="section in page.sections"
              :key="section.id"
              :href="`#legal-${section.id}`"
            >{{ section.title }}</a>
          </nav>
        </aside>

        <article class="legal-article">
          <section
            v-for="section in page.sections"
            :id="`legal-${section.id}`"
            :key="section.id"
            class="legal-section"
          >
            <h2>{{ section.title }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            <ul v-if="section.bullets?.length">
              <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
            <div v-if="section.links?.length" class="legal-links">
              <a
                v-for="link in section.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>{{ link.label }}</span>
                <ArrowUpRight :size="15" aria-hidden="true" />
              </a>
            </div>
          </section>

          <section class="legal-contact">
            <div class="contact-icon" aria-hidden="true">
              <Mail :size="22" />
            </div>
            <div>
              <h2>{{ page.contactTitle }}</h2>
              <p>{{ page.contactDescription }}</p>
            </div>
            <a href="mailto:contact@gcsa.org">
              <span>{{ page.contactAction }}</span>
              <ArrowUpRight :size="17" aria-hidden="true" />
            </a>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal-page {
  position: relative;
  min-height: 72vh;
  padding: calc(var(--header-height) + 54px) 0 112px;
}

.legal-shell {
  max-width: 1120px;
}

.legal-hero {
  max-width: 820px;
  padding: 72px 0 58px;
}

.legal-hero h1 {
  margin-top: 17px;
  color: var(--foreground);
  font-size: clamp(2.125rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.12;
}

.legal-summary {
  max-width: 760px;
  margin-top: 24px;
  color: var(--muted-foreground);
  font-size: clamp(1rem, 1.8vw, 1.16rem);
  line-height: 1.8;
}

.section-index > p {
  color: var(--primary);
  font-family: var(--font-data);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.legal-updated {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 28px;
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 1.6;
}

.legal-content {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: clamp(50px, 8vw, 104px);
  align-items: start;
  padding-top: 56px;
  border-top: 1px solid var(--border);
}

.section-index {
  position: sticky;
  top: calc(var(--header-height) + 30px);
}

.section-index nav {
  display: grid;
  gap: 2px;
  margin-top: 16px;
  padding-left: 14px;
  border-left: 1px solid var(--border);
}

.section-index a {
  padding: 6px 0;
  color: var(--muted-foreground);
  font-size: 12px;
  line-height: 1.42;
  transition: color 160ms ease, transform 160ms ease;
}

.section-index a:hover {
  color: var(--primary);
  transform: translateX(2px);
}

.legal-article {
  min-width: 0;
}

.legal-section {
  scroll-margin-top: calc(var(--header-height) + 26px);
  padding: 0 0 44px;
}

.legal-section + .legal-section {
  padding-top: 44px;
  border-top: 1px solid color-mix(in srgb, var(--border) 76%, transparent);
}

.legal-section h2,
.legal-contact h2 {
  color: var(--foreground);
  font-size: clamp(1.22rem, 2vw, 1.48rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.legal-section p,
.legal-contact p {
  margin-top: 17px;
  color: var(--muted-foreground);
  font-size: 15px;
  line-height: 1.9;
}

.legal-section ul {
  display: grid;
  gap: 11px;
  margin-top: 19px;
}

.legal-section li {
  position: relative;
  padding-left: 21px;
  color: var(--muted-foreground);
  font-size: 15px;
  line-height: 1.75;
}

.legal-section li::before {
  position: absolute;
  top: 0.72em;
  left: 2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary);
  content: '';
}

.legal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.legal-links a {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 40px;
  padding: 0 13px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 4%, var(--card));
  font-size: 12px;
  font-weight: 700;
}

.legal-links a:hover {
  border-color: var(--primary);
}

.legal-contact {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  margin-top: 12px;
  padding: 26px;
  border: 1px solid color-mix(in srgb, var(--primary) 32%, var(--border));
  border-radius: 14px;
  background: color-mix(in srgb, var(--primary) 5%, var(--card));
}

.contact-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 11px;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 11%, var(--muted));
}

.legal-contact p {
  margin-top: 7px;
  font-size: 13px;
  line-height: 1.65;
}

.legal-contact > a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 15px;
  border: 1px solid var(--primary);
  border-radius: 8px;
  color: var(--primary-foreground);
  background: var(--primary);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

@media (max-width: 840px) {
  .legal-page {
    padding-top: calc(var(--header-height) + 32px);
  }

  .legal-hero {
    padding: 54px 0 44px;
  }

  .legal-content {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    padding-top: 38px;
  }

  .section-index {
    position: static;
    margin-bottom: 44px;
  }

  .section-index nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4px 20px;
  }
}

@media (max-width: 620px) {
  .legal-page {
    padding-bottom: 76px;
  }

  .section-index nav {
    grid-template-columns: minmax(0, 1fr);
  }

  .legal-section {
    padding-bottom: 34px;
  }

  .legal-section + .legal-section {
    padding-top: 34px;
  }

  .legal-section p,
  .legal-section li {
    font-size: 14px;
  }

  .legal-contact {
    grid-template-columns: auto minmax(0, 1fr);
    padding: 21px;
  }

  .legal-contact > a {
    grid-column: 1 / -1;
    width: 100%;
  }
}
</style>
