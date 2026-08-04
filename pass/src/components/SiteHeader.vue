<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from "vue";
import { ArrowDownToLine, ArrowRight, Boxes, House, LifeBuoy, LockKeyhole, Moon, Radar, Scale, ShieldCheck, Sun, X } from "@lucide/vue";
import { RouterLink, useRoute } from "vue-router";
import GcsaLogoIcon from "./GcsaLogoIcon.vue";
import ProductIcon from "./ProductIcon.vue";
import { getGcsaNavigation } from "../gcsaNavigation";
import {
  localeOptions,
  type Locale,
  type SiteChromeCopy,
  type Theme
} from "../i18n/chrome";

const props = defineProps<{
  locale: Locale;
  theme: Theme;
  copy: SiteChromeCopy;
  skipTarget: string;
}>();

const emit = defineEmits<{
  "update:locale": [value: Locale];
  "update:theme": [value: Theme];
}>();

const isScrolled = ref(false);
const menuOpen = ref(false);
const localeOpen = ref(false);
const productsOpen = ref(false);
const activeNavKey = ref("home");
const route = useRoute();
let productsCloseTimer: ReturnType<typeof setTimeout> | undefined;
const activeLocale = computed(() => localeOptions.find((item) => item.id === props.locale) ?? localeOptions[0]);
const navigation = computed(() => getGcsaNavigation(props.locale));
const primaryNavItems = computed(() => [
  { key: "home", to: { name: "home" }, label: props.copy.navHome, icon: House },
  { key: "download", to: { name: "home", hash: "#download" }, label: props.copy.navDownload, icon: ArrowDownToLine },
  { key: "coverage", to: { name: "home", hash: "#coverage" }, label: props.copy.navCoverage, icon: Radar },
  { key: "security", to: { name: "home", hash: "#security" }, label: props.copy.navSecurity, icon: ShieldCheck }
]);
const legalNavItems = computed(() => [
  { key: "privacy", to: { name: "privacy" }, label: props.copy.privacyPolicy, icon: LockKeyhole },
  { key: "terms", to: { name: "terms" }, label: props.copy.termsOfUse, icon: Scale },
  { key: "support", to: { name: "support" }, label: props.copy.support, icon: LifeBuoy }
]);
function handleScroll() {
  isScrolled.value = window.scrollY > 20;
  updateActiveNav();
}

function updateActiveNav() {
  if (route.name !== "home") return;

  const activationLine = window.scrollY + 120;
  const sections = ["download", "coverage", "security"];
  let current = "home";

  for (const id of sections) {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= activationLine) current = id;
  }

  activeNavKey.value = current;
}

function isPrimaryNavActive(key: string) {
  return route.name === "home" && activeNavKey.value === key;
}

function isLegalNavActive(key: string) {
  return route.name === key;
}

function setLocale(value: Locale) {
  emit("update:locale", value);
  localeOpen.value = false;
  productsOpen.value = false;
  menuOpen.value = false;
}

function toggleTheme() {
  emit("update:theme", props.theme === "dark" ? "light" : "dark");
}

function closeMenu() {
  menuOpen.value = false;
  productsOpen.value = false;
}

function openMobileMenu() {
  localeOpen.value = false;
  productsOpen.value = false;
  menuOpen.value = true;
}

function clearProductsCloseTimer() {
  if (productsCloseTimer) {
    clearTimeout(productsCloseTimer);
    productsCloseTimer = undefined;
  }
}

function openProductsFromHover() {
  if (!window.matchMedia("(hover: hover) and (min-width: 768px)").matches) return;
  clearProductsCloseTimer();
  productsOpen.value = true;
}

function scheduleProductsClose() {
  if (!window.matchMedia("(hover: hover) and (min-width: 768px)").matches) return;
  clearProductsCloseTimer();
  productsCloseTimer = setTimeout(() => {
    productsOpen.value = false;
  }, 140);
}

function toggleProducts() {
  clearProductsCloseTimer();
  localeOpen.value = false;
  productsOpen.value = !productsOpen.value;
}

function skipToContent() {
  const target = document.querySelector<HTMLElement>(props.skipTarget);
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleBrandClick() {
  if (route.name === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    menuOpen.value = false;
    localeOpen.value = false;
    productsOpen.value = false;
  }
}

watchEffect(() => {
  document.body.classList.toggle("menu-open", menuOpen.value);
});

watch(
  () => route.fullPath,
  () => requestAnimationFrame(updateActiveNav)
);

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);
  clearProductsCloseTimer();
  document.body.classList.remove("menu-open");
});
</script>

<template>
  <a class="skip-link" :href="skipTarget" @click.prevent="skipToContent">{{ copy.skipToContent }}</a>

  <header class="topbar" :class="{ scrolled: isScrolled, 'is-dark': theme === 'dark' }">
    <div class="nav-glow-line" aria-hidden="true"></div>
    <RouterLink class="brand" :to="{ name: 'home' }" aria-label="GCSA PassRecover" @click="handleBrandClick">
      <GcsaLogoIcon />
      <span class="brand-wordmark">
        <strong>GCSA</strong>
        <small>{{ copy.brand }}</small>
      </span>
    </RouterLink>
    <nav class="desktop-nav" :aria-label="copy.pageNavLabel">
      <RouterLink
        v-for="item in primaryNavItems.slice(0, 1)"
        :key="item.key"
        :to="item.to"
        :class="{ current: isPrimaryNavActive(item.key) }"
        :aria-current="isPrimaryNavActive(item.key) ? 'page' : undefined"
        @click="activeNavKey = item.key; productsOpen = false"
      >
        {{ item.label }}
      </RouterLink>
      <div
        class="ecosystem-dropdown"
        :class="{ open: productsOpen }"
        @mouseenter="openProductsFromHover"
        @mouseleave="scheduleProductsClose"
      >
        <button
          class="ecosystem-trigger"
          type="button"
          :aria-expanded="productsOpen"
          aria-controls="desktop-ecosystem-menu"
          @click="toggleProducts"
        >
          <span>{{ navigation.products }}</span>
          <svg class="ecosystem-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 4.25L6 7.75L9.5 4.25" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div v-if="productsOpen" id="desktop-ecosystem-menu" class="ecosystem-menu">
          <div class="ecosystem-menu-grid">
            <section v-for="group in navigation.productGroups" :key="group.label" class="ecosystem-group">
              <h2>{{ group.label }}</h2>
              <div class="ecosystem-links">
                <a v-for="product in group.products" :key="product.id" :href="product.href" @click="productsOpen = false">
                  <ProductIcon :id="product.id" class="ecosystem-product-icon" />
                  <span>{{ product.label }}</span>
                </a>
              </div>
            </section>
          </div>
          <a class="ecosystem-menu-all" :href="navigation.productsHref" @click="productsOpen = false">
            <span>{{ navigation.viewAllProducts }}</span>
            <ArrowRight class="ecosystem-menu-all-arrow" :size="14" aria-hidden="true" />
          </a>
        </div>
      </div>
      <RouterLink
        v-for="item in primaryNavItems.slice(1)"
        :key="item.key"
        :to="item.to"
        :class="{ current: isPrimaryNavActive(item.key) }"
        :aria-current="isPrimaryNavActive(item.key) ? 'page' : undefined"
        @click="activeNavKey = item.key; productsOpen = false"
      >
        {{ item.label }}
      </RouterLink>
      <RouterLink
        v-for="item in legalNavItems"
        :key="item.key"
        :to="item.to"
        :class="{ current: isLegalNavActive(item.key) }"
        :aria-current="isLegalNavActive(item.key) ? 'page' : undefined"
        @click="productsOpen = false"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
    <div class="header-tools">
      <button
        class="theme-toggle"
        type="button"
        :aria-label="theme === 'dark' ? copy.switchToLight : copy.switchToDark"
        :title="theme === 'dark' ? copy.switchToLight : copy.switchToDark"
        @click="toggleTheme"
      >
        <Sun v-if="theme === 'dark'" :size="17" />
        <Moon v-else :size="17" />
      </button>
      <div class="locale-switch">
        <button
          class="locale-trigger"
          type="button"
          :aria-label="copy.switchLanguage"
          :aria-expanded="localeOpen"
          @click="productsOpen = false; localeOpen = !localeOpen"
        >
          <span>{{ activeLocale.name }}</span>
          <strong>{{ activeLocale.code }}</strong>
          <svg class="locale-chevron" :class="{ open: localeOpen }" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 4.25L6 7.75L9.5 4.25" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div v-if="localeOpen" class="locale-menu" role="menu">
          <button
            v-for="item in localeOptions"
            :key="item.id"
            type="button"
            role="menuitem"
            :class="{ active: locale === item.id }"
            @click="setLocale(item.id)"
          >
            <span>{{ item.name }}</span>
            <strong>{{ item.code }}</strong>
          </button>
        </div>
      </div>
      <button
        class="mobile-menu-trigger"
        type="button"
        :aria-label="copy.openMenu"
        :aria-expanded="menuOpen"
        @click="openMobileMenu"
      >
        <span class="hamburger-lines" aria-hidden="true"><i></i><i></i><i></i></span>
      </button>
    </div>
  </header>

  <Teleport to="body">
    <div v-if="menuOpen" class="mobile-menu-layer">
      <button class="mobile-menu-scrim" type="button" :aria-label="copy.closeMenu" @click="closeMenu"></button>
      <aside
        class="mobile-menu"
        :class="{ 'is-dark': theme === 'dark' }"
        role="dialog"
        aria-modal="true"
        :aria-label="copy.mobileNavLabel"
      >
        <div class="mobile-menu-head">
          <div class="mobile-menu-brand">
            <GcsaLogoIcon />
            <span class="brand-wordmark">
              <strong>GCSA</strong>
              <small>PassRecover</small>
            </span>
          </div>
          <button class="mobile-menu-close" type="button" :aria-label="copy.closeMenu" @click="closeMenu">
            <X :size="17" />
          </button>
        </div>
        <nav class="mobile-menu-nav" :aria-label="copy.mobileNavLabel">
          <div class="mobile-nav-group">
            <RouterLink
              v-for="item in primaryNavItems.slice(0, 1)"
              :key="item.key"
              :to="item.to"
              :class="{ current: isPrimaryNavActive(item.key) }"
              :aria-current="isPrimaryNavActive(item.key) ? 'page' : undefined"
              @click="activeNavKey = item.key; closeMenu()"
            >
              <span class="mobile-nav-icon">
                <component :is="item.icon" :size="18" aria-hidden="true" />
              </span>
              <span>{{ item.label }}</span>
            </RouterLink>
            <div class="mobile-nav-products">
            <button
              class="mobile-products-trigger"
              type="button"
              :aria-expanded="productsOpen"
              aria-controls="mobile-ecosystem-menu"
              @click="toggleProducts"
            >
              <span class="mobile-nav-icon"><Boxes :size="18" aria-hidden="true" /></span>
              <span>{{ navigation.products }}</span>
              <svg class="mobile-products-chevron" :class="{ open: productsOpen }" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.25L6 7.75L9.5 4.25" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div v-if="productsOpen" id="mobile-ecosystem-menu" class="mobile-ecosystem-menu">
              <section v-for="group in navigation.productGroups" :key="group.label" class="mobile-ecosystem-group">
                <h2>{{ group.label }}</h2>
                <a v-for="product in group.products" :key="product.id" :href="product.href" @click="closeMenu">
                  <ProductIcon :id="product.id" class="ecosystem-product-icon" />
                  <span>{{ product.label }}</span>
                </a>
              </section>
              <a class="mobile-products-all" :href="navigation.productsHref" @click="closeMenu">
                <span>{{ navigation.viewAllProducts }}</span>
                <ArrowRight :size="15" aria-hidden="true" />
              </a>
            </div>
            </div>
            <RouterLink
              v-for="item in primaryNavItems.slice(1)"
              :key="item.key"
              :to="item.to"
              :class="{ current: isPrimaryNavActive(item.key) }"
              :aria-current="isPrimaryNavActive(item.key) ? 'page' : undefined"
              @click="activeNavKey = item.key; closeMenu()"
            >
              <span class="mobile-nav-icon">
                <component :is="item.icon" :size="18" aria-hidden="true" />
              </span>
              <span>{{ item.label }}</span>
            </RouterLink>
          </div>
          <div class="mobile-nav-group mobile-nav-legal">
            <RouterLink
              v-for="item in legalNavItems"
              :key="item.key"
              :to="item.to"
              :class="{ current: isLegalNavActive(item.key) }"
              :aria-current="isLegalNavActive(item.key) ? 'page' : undefined"
              @click="closeMenu"
            >
              <span class="mobile-nav-icon">
                <component :is="item.icon" :size="18" aria-hidden="true" />
              </span>
              <span>{{ item.label }}</span>
            </RouterLink>
          </div>
        </nav>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped src="./SiteHeader.css"></style>
