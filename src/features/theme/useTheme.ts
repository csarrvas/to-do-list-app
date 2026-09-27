import { useEffect, useSyncExternalStore } from 'react'
import {
  selectThemePreference,
  themeChanged,
  type Theme,
} from '@/features/theme/themeSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const DARK_SCHEME = '(prefers-color-scheme: dark)'

const subscribeToSystemTheme = (onChange: () => void) => {
  const query = window.matchMedia(DARK_SCHEME)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getSystemTheme = (): Theme =>
  window.matchMedia(DARK_SCHEME).matches ? 'dark' : 'light'

/**
 * The active theme: the one the user picked or, until then, the system's.
 * Keeps the `dark` class of <html>, which switches the color tokens, in sync.
 */
export const useTheme = () => {
  const dispatch = useAppDispatch()
  const preference = useAppSelector(selectThemePreference)
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
  )
  const theme = preference ?? systemTheme

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () =>
    dispatch(themeChanged(theme === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
