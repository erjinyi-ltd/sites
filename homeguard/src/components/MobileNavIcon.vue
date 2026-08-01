<script setup lang="ts">
defineProps<{ href: string }>()
</script>

<template>
  <svg v-if="href === '/'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m3.5 10.5 8.5-7 8.5 7" />
    <path d="M5.5 9.5V21h13V9.5M9.5 21v-6h5v6" />
  </svg>
  <svg v-else-if="href.includes('#scenarios')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m5 12 7 4 7-4M5 16l7 4 7-4" />
  </svg>
  <svg v-else-if="href.includes('#coverage')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.3 12.2 2.3 2.3 5.2-5.2" />
  </svg>
  <svg v-else-if="href.includes('#privacy-first')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10M12 14v2" />
  </svg>
  <svg v-else-if="href.includes('#faq')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.7 9a2.4 2.4 0 0 1 4.7.7c0 1.8-2.4 2-2.4 3.8M12 17.4h.01" />
  </svg>
  <svg v-else-if="href === '/privacy'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3 5 6v5.2c0 4.4 2.8 7.7 7 9.8 4.2-2.1 7-5.4 7-9.8V6l-7-3Z" />
    <path d="m9.3 12 1.8 1.8 3.8-3.8" />
  </svg>
  <svg v-else-if="href === '/terms'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 3h8l4 4v14H6V3Z" />
    <path d="M14 3v5h4M9 12h6M9 16h6" />
  </svg>
  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <path d="M4 13h3v6H5a1 1 0 0 1-1-1v-5ZM20 13h-3v6h2a1 1 0 0 0 1-1v-5ZM17 19c0 1.1-1.8 2-4 2" />
  </svg>
</template>
