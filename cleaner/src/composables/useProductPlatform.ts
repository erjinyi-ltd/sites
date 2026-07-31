import { ref, watch } from 'vue'
import type { ProductPlatform } from '../types/site'

const storageKey = 'gcsa-cleaner-platform'

function getInitialPlatform(): ProductPlatform {
  try {
    const savedPlatform = window.localStorage.getItem(storageKey)
    if (savedPlatform === 'mac' || savedPlatform === 'windows') return savedPlatform
  } catch {
    // Fall back to macOS when browser state is unavailable.
  }

  return 'mac'
}

export function useProductPlatform() {
  const platform = ref<ProductPlatform>(getInitialPlatform())

  const setPlatform = (nextPlatform: ProductPlatform) => {
    platform.value = nextPlatform
  }

  watch(platform, (nextPlatform) => {
    try {
      window.localStorage.setItem(storageKey, nextPlatform)
    } catch {
      // Platform switching remains available for the current page.
    }
  }, { immediate: true })

  return { platform, setPlatform }
}
