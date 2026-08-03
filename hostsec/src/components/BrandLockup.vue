<template>
  <span class="brand-lockup">
    <span class="brand-mark" aria-hidden="true" />
    <span class="brand-copy">
      <strong>GCSA</strong>
      <small>HostSec</small>
    </span>
  </span>
</template>

<style scoped>
.brand-lockup {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 11px;
}

.brand-mark {
  display: block;
  width: 39px;
  height: 36px;
  flex: 0 0 auto;
  background: var(--logo-icon-color);
  -webkit-mask: url('/gcsa-icon.svg') center / contain no-repeat;
  mask: url('/gcsa-icon.svg') center / contain no-repeat;
}

.brand-copy {
  display: grid;
  min-width: 0;
  gap: 2px;
}

strong {
  color: var(--logo-wordmark-color);
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.06em;
}

small {
  color: var(--muted-foreground);
  font-family: var(--font-data);
  font-size: 9px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.13em;
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
