<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { CheckCircle2, LifeBuoy, Scale, ShieldCheck } from "@lucide/vue";
import SiteFooter from "./SiteFooter.vue";
import SiteHeader from "./SiteHeader.vue";
import { localeOptions, siteChromeCopy, type Locale, type Theme } from "../i18n/chrome";
import type { LegalMessages } from "../i18n/legal";

const props = defineProps<{
  messages: LegalMessages;
  contentId: string;
  icon: "privacy" | "terms" | "support";
}>();

function readInitialLocale(): Locale {
  try {
    const savedLocale = localStorage.getItem("gcsa-site-locale");
    return localeOptions.some((item) => item.id === savedLocale) ? (savedLocale as Locale) : "zh-CN";
  } catch {
    return "zh-CN";
  }
}

function readInitialTheme(): Theme {
  try {
    return localStorage.getItem("gcsa-site-theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

const locale = ref<Locale>(readInitialLocale());
const theme = ref<Theme>(readInitialTheme());
const copy = computed(() => props.messages[locale.value]);
const chrome = computed(() => siteChromeCopy[locale.value]);

watchEffect(() => {
  document.documentElement.lang = locale.value === "en" ? "en" : locale.value;
  document.title = copy.value.pageTitle;
  localStorage.setItem("gcsa-site-locale", locale.value);
});

watchEffect(() => {
  const dark = theme.value === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = theme.value;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", dark ? "#000205" : "#f7f9fb");
  localStorage.setItem("gcsa-site-theme", theme.value);
});
</script>

<template>
  <main class="site-shell legal-shell">
    <SiteHeader
      v-model:locale="locale"
      v-model:theme="theme"
      :copy="chrome"
      :skip-target="`#${contentId}`"
    />

    <section class="legal-hero content-width">
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h1>{{ copy.title }}</h1>
      <p class="legal-lead">{{ copy.lead }}</p>
      <p class="legal-updated">
        <strong>{{ copy.updatedLabel }}:</strong>
        {{ copy.updatedDate }}
      </p>
    </section>

    <div :id="contentId" class="legal-layout content-width" tabindex="-1">
      <aside class="legal-summary">
        <div class="legal-summary-icon">
          <ShieldCheck v-if="icon === 'privacy'" :size="23" aria-hidden="true" />
          <Scale v-else-if="icon === 'terms'" :size="23" aria-hidden="true" />
          <LifeBuoy v-else :size="23" aria-hidden="true" />
        </div>
        <h2>{{ copy.summaryTitle }}</h2>
        <p>{{ copy.summaryText }}</p>
        <ul class="legal-highlights">
          <li v-for="item in copy.highlights" :key="item">
            <CheckCircle2 :size="16" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </aside>

      <article class="legal-document">
        <section
          v-for="(section, index) in copy.sections"
          :id="`${contentId}-section-${index + 1}`"
          :key="section.title"
          class="legal-section"
        >
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.bullets">
            <li v-for="item in section.bullets" :key="item">{{ item }}</li>
          </ul>
          <a
            v-if="index === copy.sections.length - 1"
            class="legal-contact"
            :href="`mailto:${copy.contactAction}`"
          >
            {{ copy.contactAction }}
          </a>
        </section>
      </article>
    </div>

    <SiteFooter :locale="locale" />
  </main>
</template>

<style scoped src="./LegalPage.css"></style>
