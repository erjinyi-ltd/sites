<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string }>()
const contactEmail = 'contact@gcsa.org'
const legalLinkPattern = /(https:\/\/homeguard\.gcsa\.org\/privacy|https:\/\/homeguard\.gcsa\.org\/|(?:homeguard|ip|chainscan)\.gcsa\.org|contact@gcsa\.org)/g

const parts = computed(() =>
  props.text.split(legalLinkPattern).map((text) => {
    if (!text.match(legalLinkPattern)) return { text }
    const href = text === contactEmail ? `mailto:${text}` : text.startsWith('https://') ? text : `https://${text}`
    return { text, href }
  }),
)
</script>

<template>
  <template v-for="(part, index) in parts" :key="`${part.text}-${index}`">
    <a v-if="part.href" class="legal-inline-link" :href="part.href">{{ part.text }}</a>
    <template v-else>{{ part.text }}</template>
  </template>
</template>
