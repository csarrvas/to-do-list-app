import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import { matchMedia, resetSystemTheme } from '@/test/matchMedia'

window.matchMedia = matchMedia

afterEach(() => {
  vi.useRealTimers()
  resetSystemTheme()
  localStorage.clear()
  document.documentElement.className = ''
})
