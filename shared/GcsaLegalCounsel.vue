<script>
import GcsaLegalCounselLogo from './GcsaLegalCounselLogo.vue'
import { getGcsaLegalCounsel } from './gcsaLegalCounsel'

export default {
  name: 'GcsaLegalCounsel',
  components: { GcsaLegalCounselLogo },
  props: {
    locale: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: null,
      previousBodyOverflow: '',
    }
  },
  computed: {
    copy() {
      return getGcsaLegalCounsel(this.locale)
    },
    activeProfile() {
      return this.activeIndex === null ? null : this.copy.profiles[this.activeIndex]
    },
  },
  watch: {
    activeIndex(index, previousIndex) {
      if (index !== null && previousIndex === null) {
        this.previousBodyOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', this.handleKeydown)
      }
      else if (index === null && previousIndex !== null) {
        this.unlockPage()
      }
    },
    locale() {
      this.closeProfile(false)
    },
  },
  beforeUnmount() {
    if (this.activeIndex !== null) this.unlockPage()
  },
  methods: {
    triggerId(index) {
      return `gcsa-counsel-${this.locale}-${index}`
    },
    dialogTitleId(index) {
      return `gcsa-counsel-dialog-${this.locale}-${index}`
    },
    introductionLabel(name) {
      return this.copy.viewIntroduction.replace('{name}', name)
    },
    openProfile(index) {
      this.activeIndex = index
      this.$nextTick(() => this.$refs.closeButton?.focus())
    },
    closeProfile(restoreFocus = true) {
      const index = this.activeIndex
      this.activeIndex = null
      if (restoreFocus && index !== null) {
        this.$nextTick(() => document.getElementById(this.triggerId(index))?.focus())
      }
    },
    handleKeydown(event) {
      if (event.key !== 'Escape' || this.activeIndex === null) return
      event.preventDefault()
      this.closeProfile()
    },
    unlockPage() {
      document.body.style.overflow = this.previousBodyOverflow
      window.removeEventListener('keydown', this.handleKeydown)
    },
  },
}
</script>

<template>
  <section class="gcsa-counsel" :aria-labelledby="`gcsa-counsel-heading-${locale}`">
    <h2 :id="`gcsa-counsel-heading-${locale}`">{{ copy.heading }}</h2>
    <nav class="gcsa-counsel__grid" :aria-label="copy.navigationLabel">
      <button
        v-for="(profile, index) in copy.profiles"
        :id="triggerId(index)"
        :key="profile.name"
        type="button"
        class="gcsa-counsel__card"
        :aria-label="introductionLabel(profile.name)"
        :title="introductionLabel(profile.name)"
        @click="openProfile(index)"
      >
        <span class="gcsa-counsel__logo" aria-hidden="true">
          <GcsaLegalCounselLogo :index="index" />
        </span>
        <span class="gcsa-counsel__name">
          <span>{{ profile.name }}</span>
          <svg viewBox="0 0 8 9" aria-hidden="true">
            <path d="M3.315 1.061 6.631 4.376 3.315 7.691" />
          </svg>
        </span>
      </button>
    </nav>
  </section>

  <Teleport to="body">
    <Transition name="gcsa-counsel-modal">
      <div
        v-if="activeProfile && activeIndex !== null"
        class="gcsa-counsel-dialog"
        role="presentation"
        @click.self="closeProfile()"
      >
        <section
          class="gcsa-counsel-dialog__panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="dialogTitleId(activeIndex)"
        >
          <header>
            <div class="gcsa-counsel-dialog__brand">
              <span class="gcsa-counsel-dialog__logo" aria-hidden="true">
                <GcsaLegalCounselLogo :index="activeIndex" detailed />
              </span>
              <div class="gcsa-counsel-dialog__titles">
                <p class="gcsa-counsel-dialog__location">{{ activeProfile.location }}</p>
                <h2 :id="dialogTitleId(activeIndex)">{{ activeProfile.name }}</h2>
                <p v-if="activeProfile.secondaryName" class="gcsa-counsel-dialog__secondary">
                  {{ activeProfile.secondaryName }}
                </p>
              </div>
            </div>
            <button
              ref="closeButton"
              type="button"
              class="gcsa-counsel-dialog__close"
              :aria-label="copy.close"
              :title="copy.close"
              @click="closeProfile()"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div class="gcsa-counsel-dialog__content">
            <p class="gcsa-counsel-dialog__summary">{{ activeProfile.summary }}</p>

            <div class="gcsa-counsel-dialog__facts">
              <section>
                <h3>{{ copy.office }}</h3>
                <p>{{ activeProfile.office }}</p>
              </section>
              <section>
                <h3>{{ copy.practiceFocus }}</h3>
                <ul>
                  <li v-for="item in activeProfile.focus" :key="item">{{ item }}</li>
                </ul>
              </section>
            </div>

            <section class="gcsa-counsel-dialog__about">
              <h3>{{ copy.aboutFirm }}</h3>
              <p v-for="paragraph in activeProfile.about" :key="paragraph">{{ paragraph }}</p>
            </section>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.gcsa-counsel {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.gcsa-counsel > h2 {
  margin: 0 0 12px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 500;
}

.gcsa-counsel__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.gcsa-counsel__card {
  display: flex;
  min-width: 0;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--card) 94%, transparent);
  box-shadow: 0 16px 42px color-mix(in srgb, #000 9%, transparent);
  color: var(--foreground);
  cursor: pointer;
  font: inherit;
  text-align: center;
  transition: color 180ms ease, border-color 180ms ease, background 180ms ease, transform 180ms ease;
}

.gcsa-counsel__card:hover,
.gcsa-counsel__card:focus-visible {
  border-color: color-mix(in srgb, var(--primary) 46%, var(--border));
  background: color-mix(in srgb, var(--primary) 9%, var(--card));
  color: var(--primary);
  transform: translateY(-1px);
}

.gcsa-counsel__logo {
  display: grid;
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  place-items: center;
}

.gcsa-counsel__logo img,
.gcsa-counsel__logo svg {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.gcsa-counsel__name {
  display: block;
  min-width: 0;
  flex: 1;
  font-size: 13px;
  line-height: 1.35;
  text-align: center;
}

.gcsa-counsel__name svg {
  display: inline-block;
  width: 8px;
  height: 9px;
  fill: none;
  opacity: 0.6;
  stroke: currentColor;
  stroke-linecap: square;
  stroke-width: 1.5;
  vertical-align: -1px;
}

.gcsa-counsel-dialog {
  position: fixed;
  z-index: 9999;
  inset: 0;
  display: grid;
  overflow: auto;
  padding: clamp(16px, 4vw, 48px);
  background: rgba(3, 4, 7, 0.78);
  backdrop-filter: blur(8px);
  place-items: center;
}

.gcsa-counsel-dialog__panel {
  position: relative;
  display: flex;
  width: min(780px, 100%);
  max-height: calc(100dvh - 32px);
  flex-direction: column;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  border-radius: 18px;
  background: var(--background);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.38);
  color: var(--foreground);
}

.gcsa-counsel-dialog__panel::before {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 12%;
  left: 12%;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary) 65%, transparent), transparent);
  content: '';
  pointer-events: none;
}

.gcsa-counsel-dialog__panel > header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: clamp(24px, 5vw, 42px);
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 12%, var(--card)), var(--card));
}

.gcsa-counsel-dialog__brand {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  gap: 16px;
}

.gcsa-counsel-dialog__logo {
  display: grid;
  width: 56px;
  height: 56px;
  flex: 0 0 56px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--primary) 22%, transparent);
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  place-items: center;
}

.gcsa-counsel-dialog__logo > svg,
.gcsa-counsel-dialog__logo > img {
  display: block;
  width: 100%;
  height: 100%;
  padding: 4px;
  object-fit: contain;
}

.gcsa-counsel-dialog__titles {
  min-width: 0;
  flex: 1;
}

.gcsa-counsel-dialog__location,
.gcsa-counsel-dialog__panel h2,
.gcsa-counsel-dialog__secondary,
.gcsa-counsel-dialog__summary,
.gcsa-counsel-dialog__facts p,
.gcsa-counsel-dialog__about p {
  margin: 0;
}

.gcsa-counsel-dialog__location,
.gcsa-counsel-dialog__facts h3,
.gcsa-counsel-dialog__about h3 {
  color: var(--primary);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.gcsa-counsel-dialog__panel h2 {
  margin-top: 8px;
  font-size: clamp(21px, 3.2vw, 32px);
  font-weight: 600;
  line-height: 1.25;
}

.gcsa-counsel-dialog__secondary {
  margin-top: 8px;
  color: var(--muted-foreground);
  font-size: 14px;
}

.gcsa-counsel-dialog__close {
  display: grid;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  color: var(--foreground);
  cursor: pointer;
  place-items: center;
  transition: color 180ms ease;
}

.gcsa-counsel-dialog__close:hover {
  color: var(--primary);
  background: transparent;
}

.gcsa-counsel-dialog__close:focus-visible {
  color: var(--primary);
  outline: 1px solid currentColor;
  outline-offset: 2px;
}

.gcsa-counsel-dialog__close svg {
  width: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 1.7;
}

.gcsa-counsel-dialog__content {
  display: grid;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  gap: 30px;
  padding: clamp(24px, 5vw, 42px);
  scrollbar-color: color-mix(in srgb, var(--primary) 45%, transparent) transparent;
  scrollbar-width: thin;
}

.gcsa-counsel-dialog__content::-webkit-scrollbar {
  width: 4px;
}

.gcsa-counsel-dialog__content::-webkit-scrollbar-track {
  background: transparent;
}

.gcsa-counsel-dialog__content::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary) 45%, transparent);
}

.gcsa-counsel-dialog__summary {
  color: var(--foreground);
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.7;
}

.gcsa-counsel-dialog__facts {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 16px;
}

.gcsa-counsel-dialog__facts > section {
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--card) 92%, transparent);
}

.gcsa-counsel-dialog__facts h3,
.gcsa-counsel-dialog__about h3 {
  margin: 0 0 12px;
}

.gcsa-counsel-dialog__facts p,
.gcsa-counsel-dialog__about p {
  color: var(--muted-foreground);
  font-size: 13px;
  line-height: 1.75;
}

.gcsa-counsel-dialog__facts ul {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.gcsa-counsel-dialog__facts li {
  padding: 5px 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary) 11%, transparent);
  color: var(--foreground);
  font-size: 12px;
}

.gcsa-counsel-dialog__about {
  padding-top: 4px;
}

.gcsa-counsel-dialog__about p + p {
  margin-top: 14px;
}

.gcsa-counsel-modal-enter-active,
.gcsa-counsel-modal-leave-active {
  transition: opacity 180ms ease;
}

.gcsa-counsel-modal-enter-active .gcsa-counsel-dialog__panel,
.gcsa-counsel-modal-leave-active .gcsa-counsel-dialog__panel {
  transition: opacity 180ms ease, transform 180ms ease;
}

.gcsa-counsel-modal-enter-from,
.gcsa-counsel-modal-leave-to,
.gcsa-counsel-modal-enter-from .gcsa-counsel-dialog__panel,
.gcsa-counsel-modal-leave-to .gcsa-counsel-dialog__panel {
  opacity: 0;
}

.gcsa-counsel-modal-enter-from .gcsa-counsel-dialog__panel,
.gcsa-counsel-modal-leave-to .gcsa-counsel-dialog__panel {
  transform: translateY(10px) scale(0.985);
}

@media (max-width: 760px) {
  .gcsa-counsel {
    order: 4;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    padding-top: 24px;
  }

  .gcsa-counsel > h2 {
    margin-bottom: 2px;
  }

  .gcsa-counsel__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .gcsa-counsel__card {
    min-height: 0;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    padding: 9px 10px;
    border-radius: 8px;
    box-shadow: none;
    text-align: center;
  }

  .gcsa-counsel__logo {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
  }

  .gcsa-counsel__logo img,
  .gcsa-counsel__logo svg {
    width: 40px;
    height: 40px;
  }

  .gcsa-counsel__name {
    display: block;
    width: 100%;
    flex: none;
    font-size: 12px;
    line-height: 1.35;
    text-align: center;
  }

  .gcsa-counsel__name svg {
    display: inline-block;
    margin-left: 4px;
  }

  .gcsa-counsel-dialog {
    align-items: center;
    padding: 16px;
    place-items: center;
  }

  .gcsa-counsel-dialog__panel {
    width: min(640px, 100%);
    height: 80dvh;
    max-height: 720px;
    border: 1px solid color-mix(in srgb, var(--primary) 28%, transparent);
    border-radius: 18px 18px 14px 14px;
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--primary) 12%, transparent), transparent 28%),
      linear-gradient(165deg, color-mix(in srgb, var(--card) 98%, #0a1016), var(--background));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 28px 72px rgba(0, 0, 0, 0.55);
  }

  .gcsa-counsel-dialog__panel > header {
    align-items: flex-start;
    gap: 12px;
    padding: 18px 18px 15px;
    border-bottom-color: color-mix(in srgb, var(--primary) 12%, var(--border));
    background: color-mix(in srgb, var(--background) 70%, transparent);
  }

  .gcsa-counsel-dialog__brand {
    gap: 14px;
  }

  .gcsa-counsel-dialog__logo {
    width: 56px;
    height: 56px;
    flex-basis: 56px;
    border-radius: 12px;
  }

  .gcsa-counsel-dialog__location {
    margin-bottom: 5px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1.15;
  }

  .gcsa-counsel-dialog__panel h2 {
    margin-top: 0;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
  }

  .gcsa-counsel-dialog__secondary {
    margin-top: 5px;
    font-size: 13px;
    line-height: 1.35;
  }

  .gcsa-counsel-dialog__close {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
    border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--background) 55%, transparent);
    color: var(--muted-foreground);
  }

  .gcsa-counsel-dialog__close:hover {
    background: color-mix(in srgb, var(--primary) 9%, var(--background));
  }

  .gcsa-counsel-dialog__close svg {
    width: 14px;
  }

  .gcsa-counsel-dialog__content {
    display: block;
    padding: 17px 18px 20px;
  }

  .gcsa-counsel-dialog__summary {
    margin-bottom: 17px;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.65;
  }

  .gcsa-counsel-dialog__facts {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 18px;
  }

  .gcsa-counsel-dialog__facts > section {
    padding: 12px 14px;
    border-color: color-mix(in srgb, var(--primary) 16%, transparent);
    border-radius: 12px;
    background: color-mix(in srgb, var(--primary) 5%, transparent);
  }

  .gcsa-counsel-dialog__facts h3 {
    margin-bottom: 7px;
    color: var(--muted-foreground);
    font-size: 11px;
    letter-spacing: 0.06em;
    line-height: 1.15;
    text-transform: none;
  }

  .gcsa-counsel-dialog__facts p {
    color: var(--foreground);
    font-size: 14px;
    line-height: 1.55;
  }

  .gcsa-counsel-dialog__facts ul {
    gap: 6px;
  }

  .gcsa-counsel-dialog__facts li {
    padding: 2px 9px;
    border: 1px solid color-mix(in srgb, var(--primary) 28%, transparent);
    border-radius: 6px;
    background: color-mix(in srgb, var(--primary) 10%, transparent);
    color: var(--primary);
    font-size: 11px;
    font-weight: 600;
  }

  .gcsa-counsel-dialog__about {
    display: grid;
    gap: 13px;
    padding-top: 2px;
  }

  .gcsa-counsel-dialog__about h3 {
    margin: 0;
    color: var(--primary);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.15;
    text-transform: none;
  }

  .gcsa-counsel-dialog__about p {
    color: var(--foreground);
    font-size: 14px;
    line-height: 1.8;
  }

  .gcsa-counsel-dialog__about p + p {
    margin-top: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gcsa-counsel__card,
  .gcsa-counsel-dialog__close,
  .gcsa-counsel-modal-enter-active,
  .gcsa-counsel-modal-leave-active,
  .gcsa-counsel-modal-enter-active .gcsa-counsel-dialog__panel,
  .gcsa-counsel-modal-leave-active .gcsa-counsel-dialog__panel {
    transition: none;
  }
}
</style>
