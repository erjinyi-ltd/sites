<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import {
  Apple,
  ArrowDownToLine,
  CheckCircle2,
  Cpu,
  DatabaseZap,
  FileCheck2,
  FileArchive,
  FileLock2,
  History,
  LockKeyhole,
  MonitorDown,
  Network,
  Radar,
  ShieldCheck,
  SlidersHorizontal,
  TerminalSquare
} from "@lucide/vue";
import { GcsaLogo } from "gcsa-ui";
import SiteFooter from "../components/SiteFooter.vue";
import SiteHeader from "../components/SiteHeader.vue";
import { homeMessages } from "../i18n/home";
import { localeOptions, siteChromeCopy, type Locale, type Theme } from "../i18n/chrome";

type Platform = "windows" | "macos";
type ReleaseId = "windows-installer" | "windows-portable" | "macos";

type Release = {
  id: ReleaseId;
  platform: Platform;
  name: string;
  detail: string;
  variant: string;
  version: string;
  arch: string;
  packageType: string;
  filename: string;
  href: string;
  size: string;
  recommended?: boolean;
};

type WindowsReleaseAsset = {
  filename?: unknown;
  sizeBytes?: unknown;
};

type WindowsReleaseManifest = {
  version?: unknown;
  installer?: WindowsReleaseAsset;
  portable?: WindowsReleaseAsset;
};

const fallbackReleases: Release[] = [
  {
    id: "windows-installer",
    platform: "windows",
    name: "Windows",
    detail: "Windows 10/11 x64 installer for most users",
    variant: "Installer",
    version: "1.0.1",
    arch: "x64",
    packageType: "EXE installer",
    filename: "GCSA PassRecover_1.0.1_x64-setup.exe",
    href: "/downloads/GCSA%20PassRecover_1.0.1_x64-setup.exe",
    size: "25.95 MB",
    recommended: true
  },
  {
    id: "windows-portable",
    platform: "windows",
    name: "Windows",
    detail: "Extract and run without installation",
    variant: "Portable",
    version: "1.0.1",
    arch: "x64",
    packageType: "ZIP portable",
    filename: "GCSA-PassRecover_1.0.1_windows-x64.zip",
    href: "/downloads/GCSA-PassRecover_1.0.1_windows-x64.zip",
    size: "172.80 MB"
  },
  {
    id: "macos",
    platform: "macos",
    name: "macOS",
    detail: "macOS Apple Silicon DMG",
    variant: "Installer",
    version: "1.0.1",
    arch: "Apple Silicon",
    packageType: "DMG installer",
    filename: "GCSA PassRecover_1.0.1_aarch64.dmg",
    href: "/downloads/GCSA%20PassRecover_1.0.1_aarch64.dmg",
    size: "135.41 MB"
  }
];

const platformOptions: Array<{ id: Platform; name: string }> = [
  { id: "windows", name: "Windows" },
  { id: "macos", name: "macOS" }
];

function readInitialLocale(): Locale {
  try {
    const savedLocale = localStorage.getItem("gcsa-site-locale");
    return localeOptions.some((item) => item.id === savedLocale) ? (savedLocale as Locale) : "zh-CN";
  } catch {
    return "zh-CN";
  }
}

function readInitialTheme(): Theme {
  try {
    return localStorage.getItem("gcsa-site-theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

const moduleIcons = [FileArchive, FileLock2, DatabaseZap, Network];
const scenarioIcons = [FileCheck2, Radar, ShieldCheck];
const workflowIcons = [FileCheck2, SlidersHorizontal, Cpu, History];
const activePlatform = ref<Platform>("windows");
const releases = ref<Release[]>(fallbackReleases);
const locale = ref<Locale>(readInitialLocale());
const theme = ref<Theme>(readInitialTheme());

const t = computed(() => homeMessages[locale.value]);
const chrome = computed(() => siteChromeCopy[locale.value]);
const localizedReleases = computed(() =>
  releases.value.map((release) => {
    if (release.id === "windows-installer") {
      return { ...release, variant: t.value.windowsInstallerVariant, detail: t.value.windowsInstallerDetail, packageType: t.value.windowsInstallerPackage };
    }
    if (release.id === "windows-portable") {
      return { ...release, variant: t.value.windowsPortableVariant, detail: t.value.windowsPortableDetail, packageType: t.value.windowsPortablePackage };
    }
    return { ...release, variant: t.value.macosInstallerVariant, detail: t.value.macosInstallerDetail, packageType: t.value.macosInstallerPackage };
  })
);
const activeRelease = computed(
  () => localizedReleases.value.find((item) => item.platform === activePlatform.value && item.recommended)
    ?? localizedReleases.value.find((item) => item.platform === activePlatform.value)
    ?? localizedReleases.value[0]
);
const modules = computed(() => t.value.modules.map((item, index) => ({ ...item, icon: moduleIcons[index] })));
const scenarios = computed(() => t.value.scenarios.map((item, index) => ({ ...item, icon: scenarioIcons[index] })));
const workflow = computed(() => t.value.workflow.map((item, index) => ({ ...item, icon: workflowIcons[index] })));

function formatFileSize(sizeBytes: number): string {
  return `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`;
}

function validReleaseFilename(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9 ._()-]+$/u.test(value);
}

function releaseHref(filename: string): string {
  return `/downloads/${encodeURIComponent(filename)}`;
}

async function loadWindowsReleaseManifest() {
  try {
    const response = await fetch("/downloads/windows-latest.json", { cache: "no-store" });
    if (!response.ok) return;

    const manifest = await response.json() as WindowsReleaseManifest;
    if (typeof manifest.version !== "string" || !/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/u.test(manifest.version)) return;
    if (!validReleaseFilename(manifest.installer?.filename) || !validReleaseFilename(manifest.portable?.filename)) return;

    const installerSize = typeof manifest.installer.sizeBytes === "number" && manifest.installer.sizeBytes > 0
      ? formatFileSize(manifest.installer.sizeBytes)
      : undefined;
    const portableSize = typeof manifest.portable.sizeBytes === "number" && manifest.portable.sizeBytes > 0
      ? formatFileSize(manifest.portable.sizeBytes)
      : undefined;

    releases.value = releases.value.map((release) => {
      if (release.id === "windows-installer") {
        return {
          ...release,
          version: manifest.version as string,
          filename: manifest.installer?.filename as string,
          href: releaseHref(manifest.installer?.filename as string),
          size: installerSize ?? release.size
        };
      }
      if (release.id === "windows-portable") {
        return {
          ...release,
          version: manifest.version as string,
          filename: manifest.portable?.filename as string,
          href: releaseHref(manifest.portable?.filename as string),
          size: portableSize ?? release.size
        };
      }
      return release;
    });
  } catch {
    // Keep the built-in release metadata when the server manifest is unavailable.
  }
}

onMounted(loadWindowsReleaseManifest);

watchEffect(() => {
  document.documentElement.lang = locale.value === "en" ? "en" : locale.value;
  document.title = t.value.title;
  localStorage.setItem("gcsa-site-locale", locale.value);
});

watchEffect(() => {
  const dark = theme.value === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = theme.value;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", dark ? "#000205" : "#f7f9fb");
  localStorage.setItem("gcsa-site-theme", theme.value);
});
</script>

<template>
  <main id="top" class="site-shell">
    <SiteHeader
      v-model:locale="locale"
      v-model:theme="theme"
      :copy="chrome"
      skip-target="#main-content"
    />

    <section id="main-content" class="hero" tabindex="-1">
      <div class="hero-copy">
        <p class="eyebrow">{{ t.eyebrow }}</p>
        <h1>{{ t.heroTitle }}</h1>
        <p class="lead">
          {{ t.lead }}
        </p>
        <div class="proof-line">
          <span></span>
          {{ t.proofLine }}
        </div>
        <div class="hero-actions">
          <a class="primary-action" :href="activeRelease.href" :download="activeRelease.filename">
            <ArrowDownToLine :size="19" />
            {{ t.downloadActive }} {{ activeRelease.name }}
          </a>
          <a class="secondary-action" href="#coverage">
            <ShieldCheck :size="18" />
            {{ t.coverageAction }}
          </a>
        </div>
        <div class="platform-switch" :aria-label="t.platformLabel">
          <button
            v-for="platform in platformOptions"
            :key="platform.id"
            :class="{ selected: activePlatform === platform.id }"
            type="button"
            @click="activePlatform = platform.id"
          >
            {{ platform.name }}
          </button>
        </div>
      </div>

      <aside class="console-panel" :aria-label="t.panelLabel">
        <div class="panel-head">
          <span></span>
          <span></span>
          <span></span>
          <strong>{{ t.consoleTitle }}</strong>
        </div>
        <div class="panel-mark">
          <GcsaLogo :show-wordmark="false" size="lg" root-class="panel-logo" />
          <div>
            <strong>GCSA</strong>
            <span>{{ t.consoleSubtitle }}</span>
          </div>
        </div>
        <div class="terminal-lines">
          <p><TerminalSquare :size="16" /> {{ t.consoleTarget }}</p>
          <p><Cpu :size="16" /> {{ t.consoleDevice }}</p>
          <p><LockKeyhole :size="16" /> {{ t.consolePolicy }}</p>
        </div>
        <div class="progress-card">
          <div>
            <span>{{ t.candidateRules }}</span>
            <strong>48.2M</strong>
          </div>
          <div>
            <span>{{ t.jobStatus }}</span>
            <strong>{{ t.jobRunning }}</strong>
          </div>
        </div>
        <div class="pulse-row">
          <span
            v-for="index in 18"
            :key="index"
            :style="{ animationDelay: `${(index - 1) * 65}ms` }"
          ></span>
        </div>
        <div class="panel-matrix">
          <span
            v-for="index in 28"
            :key="index"
            :style="{ animationDelay: `${(index - 1) * 70}ms` }"
          ></span>
        </div>
      </aside>
    </section>

    <section class="stats-band" :aria-label="t.metricsLabel">
      <article v-for="item in t.stats" :key="item.label" class="stat-card">
        <strong>{{ item.value }}</strong>
        <div>
          <span>{{ item.label }}</span>
          <p>{{ item.text }}</p>
        </div>
      </article>
    </section>

    <section id="download" class="download-band">
      <div class="section-title">
        <p>{{ t.downloadEyebrow }}</p>
        <h2>{{ t.downloadTitle }}</h2>
      </div>
      <div class="download-grid">
        <a
          v-for="release in localizedReleases"
          :key="release.id"
          class="download-card"
          :class="{ 'download-card-recommended': release.recommended }"
          :href="release.href"
          :download="release.filename"
        >
          <div class="download-card-head">
            <span class="download-icon">
              <MonitorDown v-if="release.platform === 'windows'" :size="28" />
              <Apple v-else :size="28" />
            </span>
            <span class="download-badges">
              <span v-if="release.recommended" class="download-recommended">{{ t.downloadRecommended }}</span>
              <span class="download-version">{{ t.downloadVersionLabel }} {{ release.version }}</span>
            </span>
          </div>
          <div class="download-card-title">
            <strong>{{ release.name }} · {{ release.variant }}</strong>
            <span>{{ release.detail }}</span>
          </div>
          <dl class="download-meta">
            <div>
              <dt>{{ t.downloadPackageLabel }}</dt>
              <dd>{{ release.packageType }}</dd>
            </div>
            <div>
              <dt>{{ t.downloadArchLabel }}</dt>
              <dd>{{ release.arch }}</dd>
            </div>
            <div>
              <dt>{{ t.downloadSizeLabel }}</dt>
              <dd>{{ release.size }}</dd>
            </div>
          </dl>
          <div class="download-cta">
            <ArrowDownToLine :size="18" />
            {{ t.downloadCta }}
          </div>
        </a>
      </div>
    </section>

    <section class="content-section scenario-section">
      <div class="section-title wide-title">
        <p>{{ t.scenarioEyebrow }}</p>
        <h2>{{ t.scenarioTitle }}</h2>
      </div>
      <div class="scenario-grid">
        <article v-for="item in scenarios" :key="item.title" class="scenario-card">
          <component :is="item.icon" :size="28" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section id="coverage" class="content-section">
      <div class="section-title">
        <p>{{ t.coverageEyebrow }}</p>
        <h2>{{ t.coverageTitle }}</h2>
      </div>
      <div class="module-grid">
        <article v-for="item in modules" :key="item.title" class="module-card">
          <component :is="item.icon" :size="26" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="workflow-section">
      <div class="section-title wide-title">
        <p>{{ t.workflowEyebrow }}</p>
        <h2>{{ t.workflowTitle }}</h2>
      </div>
      <div class="workflow-track">
        <article v-for="(item, index) in workflow" :key="item.title" class="workflow-card">
          <span class="workflow-index">{{ String(index + 1).padStart(2, "0") }}</span>
          <div class="workflow-title">
            <component :is="item.icon" :size="24" />
            <h3>{{ item.title }}</h3>
          </div>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section id="security" class="security-section">
      <div>
        <p class="eyebrow">{{ t.securityEyebrow }}</p>
        <h2>{{ t.securityTitle }}</h2>
        <p>
          {{ t.securityText }}
        </p>
      </div>
      <ul>
        <li v-for="item in t.safeguards" :key="item">
          <CheckCircle2 :size="18" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </section>

    <SiteFooter :locale="locale" />
  </main>
</template>

<style scoped src="./HomePage.css"></style>
