<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <span class="brand-lockup" :class="{ compact }">
    <img src="/gcsa-icon.svg" alt="" />
    <span class="brand-copy">
      <strong>WATERMARK</strong>
      <small>GCSA ECOSYSTEM</small>
    </span>
  </span>
</template>

<style scoped>
.brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

img {
  width: 39px;
  height: 36px;
  flex: 0 0 auto;
}

.brand-copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}

strong {
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.055em;
  line-height: 1;
}

small {
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.15em;
  line-height: 1.2;
}

@media (max-width: 430px) {
  img {
    width: 34.8px;
    height: 32px;
  }

  strong {
    font-size: 14px;
  }

  small {
    font-size: 7px;
  }
}
</style>
