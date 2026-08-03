<script setup lang="ts">
import type { ArchitectureLayer } from '../types'

defineProps<{
  layers: ArchitectureLayer[]
  note: string
}>()
</script>

<template>
  <div class="architecture-shell">
    <div class="architecture-stack">
      <article v-for="(layer, index) in layers" :key="layer.index" class="architecture-layer">
        <div class="layer-index">{{ layer.index }}</div>
        <div class="layer-copy">
          <h3>{{ layer.title }}</h3>
          <p>{{ layer.text }}</p>
        </div>
        <div class="layer-tags">
          <span v-for="tag in layer.tags" :key="tag">{{ tag }}</span>
        </div>
        <span v-if="index < layers.length - 1" class="layer-connector" aria-hidden="true">↓</span>
      </article>
    </div>
    <p class="architecture-note"><span aria-hidden="true" />{{ note }}</p>
  </div>
</template>
