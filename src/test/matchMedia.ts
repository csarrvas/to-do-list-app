// jsdom has no matchMedia. This fake only answers the dark scheme query and
// lets tests change the system theme.
const DARK_SCHEME = '(prefers-color-scheme: dark)'

let prefersDark = false
const listeners = new Set<() => void>()

export const matchMedia = (query: string) =>
  ({
    media: query,
    get matches() {
      return query === DARK_SCHEME && prefersDark
    },
    addEventListener: (_type: 'change', listener: () => void) => {
      listeners.add(listener)
    },
    removeEventListener: (_type: 'change', listener: () => void) => {
      listeners.delete(listener)
    },
  }) as unknown as MediaQueryList

/** Changes the system theme and notifies the subscribers */
export const setSystemTheme = (theme: 'light' | 'dark') => {
  prefersDark = theme === 'dark'
  listeners.forEach((listener) => listener())
}

export const resetSystemTheme = () => {
  prefersDark = false
  listeners.clear()
}
