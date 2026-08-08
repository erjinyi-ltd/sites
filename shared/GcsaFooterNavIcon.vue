<script setup lang="ts">
defineProps<{ icon: string }>()
</script>

<template>
  <svg class="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <template v-if="icon === 'home'">
      <path d="M3.607 11.934 11.5 4.042l7.893 7.892" stroke-linecap="square" />
      <path d="M6.035 10.502v7.893h10.929v-7.893M11.5 18.002v-4" />
    </template>

    <template v-else-if="icon === 'products'">
      <path d="M12.47 10.9a1.18 1.18 0 0 1-.94 0l-5.7-2.64a.56.56 0 0 1 0-1l5.7-2.66a1.18 1.18 0 0 1 .94 0l5.7 2.64a.56.56 0 0 1 0 1l-5.7 2.66Z" />
      <path d="m18.5 12.35-6.1 2.81a1 1 0 0 1-.83 0L5.5 12.35M18.5 16.6l-6.1 2.81a1 1 0 0 1-.83 0L5.5 16.6" />
    </template>

    <template v-else-if="icon === 'media'">
      <path d="M15.77 5H8.23A3.23 3.23 0 0 0 5 8.23v7.54A3.23 3.23 0 0 0 8.23 19h7.54A3.23 3.23 0 0 0 19 15.77V8.23A3.23 3.23 0 0 0 15.77 5Z" />
      <path d="m5 16 4-4 9.5 4" />
      <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
    </template>

    <template v-else-if="icon === 'updates'">
      <path d="M15.154 9H5.846A.846.846 0 0 0 5 9.846v7.193c0 .467.379.846.846.846h1.692V20l2.64-2.115h4.976a.846.846 0 0 0 .846-.846V9.846A.846.846 0 0 0 15.154 9Z" />
      <path d="M8 6h8a3 3 0 0 1 3 3v7" />
    </template>

    <template v-else-if="icon === 'research'">
      <path d="m22 9-10-4L2 9l10 4 10-4Z" />
      <path d="M6 10.6V16s2.5 3 6 3 6-3 6-3v-5.4" />
    </template>

    <template v-else-if="icon === 'partners'">
      <path d="M16 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM13.5 19c0-2.2 1.3-3.5 3-3.5s3 1.3 3 3M9.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M4.5 19.5c0-2.4 1.9-4 4.5-4s4.5 1.6 4.5 4" />
    </template>

    <template v-else-if="icon === 'join'">
      <path d="M20 12.654 15.246 19l-3.173-2.377M10.192 9.192a2.596 2.596 0 1 0 0-5.192 2.596 2.596 0 0 0 0 5.192Z" />
      <path d="M7.79 17.929H5V16.32a4.68 4.68 0 0 1 8.571-3.409" />
    </template>

    <template v-else>
      <path d="M11.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM6 18c1.15-1.221 3.269-2 5.5-2s4.35.779 5.5 2" />
      <circle cx="11.643" cy="12.355" r="8" />
    </template>
  </svg>
</template>

<style scoped>
.nav-icon {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}
</style>
