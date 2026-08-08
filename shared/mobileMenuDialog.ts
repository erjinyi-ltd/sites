const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusableElements(dialog: HTMLElement) {
  return Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => {
    const style = window.getComputedStyle(element)
    return style.display !== 'none' && style.visibility !== 'hidden'
  })
}

export function focusMobileMenu(dialog: HTMLElement | null) {
  if (!dialog) return
  const preferredTarget = dialog.querySelector<HTMLElement>('.gcsa-mobile-menu__close')
  ;(preferredTarget ?? getFocusableElements(dialog)[0])?.focus()
}

export function handleMobileMenuKeydown(
  event: KeyboardEvent,
  dialog: HTMLElement | null,
  close: () => void,
) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key !== 'Tab' || !dialog) return
  const focusable = getFocusableElements(dialog)
  if (focusable.length === 0) {
    event.preventDefault()
    return
  }

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}
