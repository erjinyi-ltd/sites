<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePreferences } from '../composables/usePreferences'

const { copy } = usePreferences()
const contactEmail = 'contact@gcsa.org'
</script>

<template>
  <footer class="site-footer content-width">
    <p>{{ copy.footerCopyright }}</p>
    <div class="footer-links">
      <RouterLink to="/privacy">{{ copy.privacy }}</RouterLink>
      <RouterLink to="/terms">{{ copy.terms }}</RouterLink>
      <RouterLink to="/support">{{ copy.support }}</RouterLink>
      <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
    </div>
  </footer>
</template>
