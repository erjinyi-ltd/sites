<script setup lang="ts">
import GcsaLogoIcon from './GcsaLogoIcon.vue'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <span class="brand-lockup" :class="{ compact }">
    <GcsaLogoIcon class="brand-mark" />
    <span class="brand-copy">
      <strong>GCSA</strong>
      <small>WATERMARK</small>
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

.brand-mark {
  display: block;
  width: 39px;
  height: 36px;
  flex: 0 0 auto;
  color: var(--logo-icon-color);
}

.brand-copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}

strong {
  color: var(--primary);
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 1;
}

small {
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.13em;
  line-height: 1.2;
}

@media (max-width: 430px) {
  .brand-mark {
    width: 34.8px;
    height: 32px;
  }

  strong {
    font-size: 16px;
  }

  small {
    font-size: 8px;
  }
}
</style>
