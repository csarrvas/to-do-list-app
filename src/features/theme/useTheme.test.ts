import { act } from '@testing-library/react'
import { selectThemePreference } from '@/features/theme/themeSlice'
import { useTheme } from '@/features/theme/useTheme'
import { setSystemTheme } from '@/test/matchMedia'
import { renderHookWithProviders } from '@/test/utils'

const html = document.documentElement

it('follows the system theme until the user picks one', () => {
  const { result } = renderHookWithProviders(() => useTheme())
  expect(result.current.theme).toBe('light')
  expect(html).not.toHaveClass('dark')

  act(() => setSystemTheme('dark'))

  expect(result.current.theme).toBe('dark')
  expect(html).toHaveClass('dark')
})

it('keeps the theme the user picks', () => {
  setSystemTheme('dark')
  const { result, store } = renderHookWithProviders(() => useTheme())

  act(() => result.current.toggleTheme())
  expect(result.current.theme).toBe('light')
  expect(selectThemePreference(store.getState())).toBe('light')

  act(() => setSystemTheme('light'))
  act(() => setSystemTheme('dark'))
  expect(result.current.theme).toBe('light')
  expect(html).not.toHaveClass('dark')
})

it('applies the saved theme', () => {
  renderHookWithProviders(() => useTheme(), {
    preloadedState: { theme: { preference: 'dark' } },
  })
  expect(html).toHaveClass('dark')
})
