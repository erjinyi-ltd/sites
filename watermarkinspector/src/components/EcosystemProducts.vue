<script setup lang="ts">
import type { SiteCopy } from '../types/site'

defineProps<{ copy: SiteCopy['ecosystem'] }>()
</script>

<template>
  <section class="ecosystem-products content-width" aria-labelledby="ecosystem-products-title">
    <div class="section-heading">
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h2 id="ecosystem-products-title">{{ copy.title }}</h2>
      <p class="section-description">{{ copy.description }}</p>
    </div>

    <div class="product-grid">
      <article
        v-for="product in copy.products"
        :key="product.name"
        class="product-card"
        :class="`product-card-${product.theme}`"
      >
        <div class="product-card-head">
          <span class="product-icon" aria-hidden="true">
            <svg
              v-if="product.theme === 'wallet'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 6.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h12" />
              <path d="M15 11h5v4h-5a2 2 0 0 1 0-4Z" />
              <path d="M5 9h6" />
            </svg>
            <svg
              v-else-if="product.theme === 'vpn'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              <rect x="8.5" y="10" width="7" height="6" rx="1.4" />
              <path d="M10.5 10V8.5a1.5 1.5 0 0 1 3 0V10" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m3.5 10 8.5-7 8.5 7" />
              <path d="M5.5 9v10.5h13V9" />
              <path d="M9 19.5v-6h6v6" />
              <path d="m9.5 9.8 1.6 1.6 3.4-3.4" />
            </svg>
          </span>
          <div>
            <span class="product-type">{{ product.type }}</span>
            <h3>{{ product.name }}</h3>
          </div>
        </div>

        <p class="product-description">{{ product.description }}</p>
        <ul class="product-features">
          <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
        </ul>
        <div class="product-actions">
          <a :href="product.href" target="_blank" rel="noopener noreferrer">
            {{ copy.officialWebsite }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>

      <a
        class="product-card product-card-more product-more-desktop"
        href="https://gcsa.org/products"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="product-more-kicker">{{ copy.eyebrow }}</span>
        <h3>{{ copy.moreTitle }}</h3>
        <p>{{ copy.moreDescription }}</p>
        <span class="product-more-cta">{{ copy.viewAll }} <span aria-hidden="true">↗</span></span>
      </a>
      <a
        class="product-card product-card-more product-more-mobile"
        href="https://gcsa.org/app/products"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="product-more-kicker">{{ copy.eyebrow }}</span>
        <h3>{{ copy.moreTitle }}</h3>
        <p>{{ copy.moreDescription }}</p>
        <span class="product-more-cta">{{ copy.viewAll }} <span aria-hidden="true">↗</span></span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.ecosystem-products {
  position: relative;
  z-index: 2;
  margin-bottom: 82px;
}

.section-heading {
  max-width: 680px;
  margin-bottom: 24px;
}

.section-heading h2 {
  margin-top: 10px;
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 650;
  line-height: 1.18;
  letter-spacing: -0.035em;
}

.section-description {
  margin-top: 12px;
  color: var(--muted-foreground);
  font-size: 15px;
  line-height: 1.65;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.product-card {
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 100%;
  flex-direction: column;
  overflow: hidden;
  padding: clamp(22px, 2.4vw, 28px);
  border: 1px solid var(--border);
  border-radius: 12px;
  background:
    radial-gradient(circle at 100% 0, color-mix(in srgb, var(--primary) 10%, transparent), transparent 42%),
    var(--card);
  box-shadow: var(--shadow-card);
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.product-card:hover,
.product-card:focus-visible {
  border-color: color-mix(in srgb, var(--primary) 42%, var(--border));
  outline: 0;
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.product-card::before {
  position: absolute;
  top: 0;
  right: 24px;
  left: 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--cdn-glow) 80%, transparent), transparent);
  content: '';
}

.product-card-vpn {
  background:
    radial-gradient(circle at 100% 0, rgba(74, 184, 120, 0.1), transparent 42%),
    var(--card);
}

.product-card-vpn::before {
  background: linear-gradient(90deg, transparent, rgba(74, 184, 120, 0.82), transparent);
}

.product-card-homeGuard {
  background:
    radial-gradient(circle at 100% 0, rgba(27, 118, 255, 0.1), transparent 42%),
    var(--card);
}

.product-card-homeGuard::before {
  background: linear-gradient(90deg, transparent, rgba(85, 154, 255, 0.82), transparent);
}

.product-card-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.product-icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--primary) 36%, transparent);
  border-radius: 8px;
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, var(--muted));
}

.product-card-vpn .product-icon {
  border-color: rgba(74, 184, 120, 0.35);
  color: #4fb97b;
  background: rgba(74, 184, 120, 0.08);
}

.product-card-homeGuard .product-icon {
  border-color: rgba(85, 154, 255, 0.35);
  color: #559aff;
  background: rgba(27, 118, 255, 0.08);
}

.product-icon svg {
  width: 25px;
  height: 25px;
}

.product-type {
  display: block;
  margin-bottom: 4px;
  color: var(--muted-foreground);
  font-size: 12px;
}

.product-card h3 {
  font-family: var(--font-display);
  font-size: 18px;
  line-height: 1.15;
}

.product-description {
  margin-top: 20px;
  color: var(--muted-foreground);
  font-size: 14px;
  line-height: 1.72;
}

.product-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 24px;
}

.product-features li {
  padding: 6px 10px;
  border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
  border-radius: 999px;
  color: var(--muted-foreground);
  background: color-mix(in srgb, var(--primary) 5%, transparent);
  font-size: 12px;
  line-height: 1.35;
}

.product-card-vpn .product-features li {
  border-color: rgba(74, 184, 120, 0.2);
  background: rgba(74, 184, 120, 0.05);
}

.product-card-homeGuard .product-features li {
  border-color: rgba(85, 154, 255, 0.2);
  background: rgba(27, 118, 255, 0.05);
}

.product-actions {
  display: flex;
  margin-top: auto;
}

.product-actions a {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 14px;
  border: 1px solid var(--primary);
  border-radius: 8px;
  color: var(--primary-foreground);
  background: var(--primary);
  font-size: 13px;
  font-weight: 700;
  transition: background 160ms ease, transform 160ms ease;
}

.product-actions a:hover,
.product-actions a:focus-visible {
  background: var(--primary-strong);
  transform: translateY(-1px);
}

.product-card-vpn .product-actions a {
  border-color: #348c5a;
  color: #fff;
  background: #348c5a;
}

.product-card-homeGuard .product-actions a {
  border-color: #3575d3;
  color: #fff;
  background: #3575d3;
}

.product-card-more {
  min-height: 286px;
  justify-content: center;
  color: var(--foreground);
  background:
    radial-gradient(circle at 84% 16%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 34%),
    linear-gradient(135deg, color-mix(in srgb, var(--primary) 7%, var(--card)), var(--card));
}

.product-card-more::after {
  position: absolute;
  right: -38px;
  bottom: -52px;
  width: 164px;
  height: 164px;
  border: 1px solid color-mix(in srgb, var(--primary) 18%, transparent);
  border-radius: 50%;
  content: '';
}

.product-more-kicker {
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.product-card-more h3 {
  margin-top: 12px;
  font-size: clamp(22px, 2.6vw, 30px);
}

.product-card-more p {
  max-width: 500px;
  margin-top: 14px;
  color: var(--muted-foreground);
  font-size: 14px;
  line-height: 1.7;
}

.product-more-cta {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
}

.product-more-mobile {
  display: none;
}

@media (max-width: 760px) {
  .ecosystem-products {
    margin-bottom: 62px;
  }

  .section-heading {
    margin-bottom: 18px;
    text-align: center;
  }

  .product-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }

  .product-card {
    padding: 20px 18px;
  }

  .product-card::before {
    right: 18px;
    left: 18px;
  }

  .product-actions,
  .product-actions a {
    width: 100%;
  }

  .product-card-more {
    min-height: 236px;
  }

  .product-more-desktop {
    display: none;
  }

  .product-more-mobile {
    display: flex;
  }
}
</style>
