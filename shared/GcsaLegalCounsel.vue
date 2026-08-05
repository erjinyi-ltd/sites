<script>
import { getGcsaLegalCounsel } from './gcsaLegalCounsel'

export default {
  name: 'GcsaLegalCounsel',
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
          <img v-if="index === 0" src="/gcsa-legal-fn.png" alt="" width="40" height="40" />
          <svg v-else-if="index === 1" viewBox="0 0 80 80">
            <path fill="#891316" d="M50.097 27.427h-3.613c-.972 0-1.388.417-1.388 1.852v20.84c0 1.111.092 1.991 1.343 1.991h3.612V56H33.565v-3.89h4.167c1.111 0 1.205-.972 1.205-1.99V28.677L28.424 56H25.46l-4.445-13.384c1.682.016 5.213-.064 5.88-.509.149.556.71 1.898.973 2.5.309-.988 1.27-3.213 2.64-4.213 1.713-1.25 3.75-3.103 3.75-7.734 0-.88-.37-2.732-.37-3.38 0-.52 1.544-3.736 2.316-5.28h13.893v3.427Zm27.739 8.567h-3.427c-.046-1.157-.36-3.89-1.25-5.556-1.111-2.084-3.427-2.594-4.03-2.594h-1.388c-.74 0-1.065.277-1.065.787v21.58c0 .926.74 1.9 1.435 1.9h3.52V56H55.56v-3.89h3.705c1.111 0 1.297-.973 1.297-1.668V28.354c0-.649-.324-.927-1.02-.927h-6.76V24h25.053v11.994ZM22.913 24.047c2.316 0 10.234.926 10.235 8.706 0 7.78-8.012 8.567-10.235 8.567h-2.5l-1.298-3.426c.309 0 1.251 0 2.918-.37 2.084-.464 3.89-1.668 3.89-5.187 0-3.705-3.102-4.955-4.908-4.955h-6.206v22.136c0 1.203.139 2.592 1.204 2.592h4.214v3.844H3V52.11h3.103c1.574 0 1.99-1.435 1.99-2.592V29.142c0-.973-.786-1.76-1.944-1.76H3.093v-3.335h19.82Z" />
          </svg>
          <svg v-else viewBox="0 0 80 80">
            <path fill="#888" d="M56.358 19c8.523 0 16.27 6.212 16.27 14.911 0 8.7-9.055 14.914-16.334 14.914H44.575v11.719H32.68v-10.12c1.657 0 6.034-.266 9.41-1.953 3.906-1.953 6.391-4.795 7.28-6.393h4.793c4.794 0 7.457-4.439 7.457-8.345 0-4.26-3.373-7.633-7.457-7.633h-4.26c-1.99-3.835-6.8-6.449-8.99-7.1h15.445Zm-14.09 23.611H32.68V25.567h9.588v17.044Z" />
            <path fill="#0D3C96" d="M20.25 60.369V25.924h8.346c7.101 0 10.297 4.44 10.297 8.345 0 3.906-3.373 7.635-7.634 7.635h-4.261l-4.44 7.102h9.944c9.41 0 17.577-8.168 17.577-15.447 0-7.28-6.57-14.559-17.577-14.559H8v41.369h12.25Z" />
          </svg>
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
            <div>
              <p class="gcsa-counsel-dialog__location">{{ activeProfile.location }}</p>
              <h2 :id="dialogTitleId(activeIndex)">{{ activeProfile.name }}</h2>
              <p v-if="activeProfile.secondaryName" class="gcsa-counsel-dialog__secondary">
                {{ activeProfile.secondaryName }}
              </p>
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
  min-height: 58px;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--card) 94%, transparent);
  box-shadow: 0 16px 42px color-mix(in srgb, #000 9%, transparent);
  color: var(--foreground);
  cursor: pointer;
  font: inherit;
  text-align: left;
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
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  place-items: center;
}

.gcsa-counsel__logo img,
.gcsa-counsel__logo svg {
  display: block;
  max-width: 40px;
  max-height: 40px;
  object-fit: contain;
}

.gcsa-counsel__name {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  line-height: 1.4;
}

.gcsa-counsel__name svg {
  width: 8px;
  height: 9px;
  flex: 0 0 auto;
  fill: none;
  opacity: 0.6;
  stroke: currentColor;
  stroke-linecap: square;
  stroke-width: 1.5;
}

.gcsa-counsel-dialog {
  position: fixed;
  z-index: 9999;
  inset: 0;
  display: grid;
  overflow: auto;
  padding: clamp(16px, 4vw, 48px);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  place-items: center;
}

.gcsa-counsel-dialog__panel {
  width: min(780px, 100%);
  max-height: calc(100dvh - 32px);
  overflow: auto;
  border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
  border-radius: 18px;
  background: var(--background);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.38);
  color: var(--foreground);
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
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--background);
  color: var(--foreground);
  cursor: pointer;
  place-items: center;
  transition: color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.gcsa-counsel-dialog__close:hover,
.gcsa-counsel-dialog__close:focus-visible {
  border-color: var(--primary);
  color: var(--primary);
  transform: rotate(4deg);
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
  gap: 30px;
  padding: clamp(24px, 5vw, 42px);
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
  .gcsa-counsel__grid {
    grid-template-columns: 1fr;
  }

  .gcsa-counsel-dialog__facts {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 460px) {
  .gcsa-counsel-dialog {
    align-items: end;
    padding: 0;
  }

  .gcsa-counsel-dialog__panel {
    max-height: 92dvh;
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
    border-radius: 18px 18px 0 0;
  }

  .gcsa-counsel-dialog__panel > header {
    gap: 14px;
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
