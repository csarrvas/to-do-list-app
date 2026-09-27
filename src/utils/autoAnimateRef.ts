import autoAnimate from '@formkit/auto-animate'

/**
 * Ref callback that animates an element's children as they are added,
 * removed or moved (and does nothing with prefers-reduced-motion).
 *
 * Used instead of the library's `useAutoAnimate` because that hook doesn't
 * clean up when React detaches the element: StrictMode attaches refs twice,
 * and the two registrations cancel each other's move animations.
 */
export const autoAnimateRef = (element: HTMLElement | null) => {
  if (!element) return
  const controller = autoAnimate(element)
  return () => controller.destroy?.()
}
