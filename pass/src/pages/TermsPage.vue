<script setup lang="ts">
import LegalPage from "../components/LegalPage.vue";
import { termsMessages } from "../i18n/terms";
</script>

<template>
  <LegalPage
    :messages="termsMessages"
    content-id="terms-content"
    icon="terms"
  />
</template>
