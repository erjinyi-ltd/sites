<script setup lang="ts">
import { computed } from 'vue'
import { legalCopy } from '../content/content'
import { privacyCopy } from '../content/privacy-content'
import { usePreferences } from '../composables/usePreferences'
import ArrowMark from '../components/ArrowMark.vue'
import LegalInlineText from '../components/LegalInlineText.vue'
import type { LegalCopy, LegalPageKind } from '../types/site'

const props = defineProps<{ kind: LegalPageKind }>()
const { locale } = usePreferences()
const contactEmail = 'contact@gcsa.org'

const content = computed<LegalCopy>(() => {
  if (props.kind === 'privacy') return privacyCopy[locale.value] as LegalCopy
  return legalCopy[locale.value][props.kind]
})
</script>

<template>
  <main id="main-content" class="legal-main" tabindex="-1">
    <section class="legal-hero content-width">
      <p class="eyebrow"><span />{{ content.eyebrow }}</p>
      <h1>{{ content.title }}</h1>
      <p class="legal-lead">{{ content.lead }}</p>
      <p class="legal-updated"><strong>{{ content.updatedLabel }}</strong>{{ content.updatedDate }}</p>
    </section>
    <div class="legal-layout content-width">
      <aside class="legal-summary">
        <div class="legal-symbol" :class="`legal-symbol-${kind}`">{{ kind === 'privacy' ? '⌾' : kind === 'terms' ? '§' : '?' }}</div>
        <h2>{{ content.summaryTitle }}</h2>
        <p>{{ content.summaryText }}</p>
        <ul>
          <li v-for="item in content.highlights" :key="item"><span>✓</span>{{ item }}</li>
        </ul>
      </aside>
      <article class="legal-document">
        <section
          v-for="(section, index) in content.sections"
          :id="`${kind}-section-${index + 1}`"
          :key="section.title"
          class="legal-section"
        >
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">
            <LegalInlineText v-if="kind === 'privacy'" :text="paragraph" />
            <template v-else>{{ paragraph }}</template>
          </p>
          <ul v-if="section.bullets">
            <li v-for="item in section.bullets" :key="item">{{ item }}</li>
          </ul>
          <a v-if="kind !== 'privacy' && index === content.sections.length - 1" class="legal-contact" :href="`mailto:${contactEmail}`">
            {{ contactEmail }} <ArrowMark />
          </a>
        </section>
      </article>
    </div>
  </main>
</template>
