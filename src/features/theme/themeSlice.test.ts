import {
  selectThemePreference,
  themeChanged,
} from '@/features/theme/themeSlice'
import { setupStore } from '@/store/store'

it('follows the system until the user picks a theme', () => {
  const store = setupStore()
  expect(selectThemePreference(store.getState())).toBeNull()

  store.dispatch(themeChanged('dark'))
  expect(selectThemePreference(store.getState())).toBe('dark')
})
