<script setup lang="ts">
import LegalPage from "../components/LegalPage.vue";
import { supportMessages } from "../i18n/support";
</script>

<template>
  <LegalPage
    :messages="supportMessages"
    content-id="support-content"
    icon="support"
  />
</template>
