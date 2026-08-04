<script setup lang="ts">
import LegalPage from "../components/LegalPage.vue";
import { privacyMessages } from "../i18n/privacy";
</script>

<template>
  <LegalPage
    :messages="privacyMessages"
    content-id="privacy-content"
    icon="privacy"
  />
</template>
