<script setup lang="ts">
import { Apple, Monitor } from '@lucide/vue'
import type { ProductPlatform } from '../types/site'

defineProps<{
  label: string
  macLabel: string
  windowsLabel: string
  platform: ProductPlatform
}>()

defineEmits<{ platformChange: [platform: ProductPlatform] }>()
</script>

<template>
  <div class="platform-switch">
    <span class="switch-label">{{ label }}</span>
    <div class="platform-actions" role="group" :aria-label="label">
      <button class="platform-button" :class="{ active: platform === 'mac' }" type="button" :aria-pressed="platform === 'mac'" @click="$emit('platformChange', 'mac')">
        <Apple :size="23" aria-hidden="true" />
        <span>macOS</span>
        <small>{{ macLabel }}</small>
      </button>
      <button class="platform-button" :class="{ active: platform === 'windows' }" type="button" :aria-pressed="platform === 'windows'" @click="$emit('platformChange', 'windows')">
        <Monitor :size="23" aria-hidden="true" />
        <span>Windows</span>
        <small>{{ windowsLabel }}</small>
      </button>
    </div>
  </div>
</template>

<style scoped>
.platform-switch {
  width: min(100%, 520px);
}

.switch-label {
  display: block;
  margin-bottom: 12px;
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.platform-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.platform-button {
  display: inline-flex;
  min-width: 0;
  height: 62px;
  align-items: center;
  justify-content: center;
  gap: 11px;
  padding: 0 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--foreground);
  background: transparent;
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: color .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .2s ease;
}

.platform-button small {
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 11px;
  font-weight: 600;
}

.platform-button:hover:not(.active) {
  border-color: color-mix(in srgb, var(--primary) 50%, var(--border));
  background: color-mix(in srgb, var(--primary) 8%, transparent);
  transform: translateY(-1px);
}

.platform-button.active {
  border-color: var(--primary);
  color: var(--primary-foreground);
  background: var(--primary);
  box-shadow: 0 4px 20px color-mix(in srgb, var(--primary) 26%, transparent);
}

.platform-button.active small {
  color: inherit;
  opacity: .72;
}

.platform-button:active {
  transform: none;
}

.platform-button:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--primary) 45%, transparent);
  outline-offset: 2px;
}

@media (max-width: 420px) {
  .platform-button {
    height: 58px;
    gap: 6px;
    padding-inline: 10px;
    font-size: 15px;
  }

  .platform-button small {
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .platform-button {
    transition: none;
  }
}
</style>
