import indexHtml from '/index.html?raw'
import { themeChanged } from '@/features/theme/themeSlice'
import { setupPersistedStore } from '@/store/store'
import { setSystemTheme } from '@/test/matchMedia'
import { whenRehydrated } from '@/test/persist'

// index.html sets the theme before the app loads. These tests keep it in
// sync with the way redux-persist saves the state.
const themeScript = /<script>([\s\S]*?)<\/script>/.exec(indexHtml)?.[1] ?? ''
const runThemeScript = () => new Function(themeScript)()

const html = document.documentElement

it('applies the theme saved by the app', async () => {
  const { store, persistor } = setupPersistedStore()
  await whenRehydrated(persistor)
  store.dispatch(themeChanged('dark'))
  await persistor.flush()

  runThemeScript()

  expect(html).toHaveClass('dark')
})

it('follows the system theme when none is saved', () => {
  setSystemTheme('dark')
  runThemeScript()
  expect(html).toHaveClass('dark')
})

it('keeps the light theme by default', () => {
  runThemeScript()
  expect(html).not.toHaveClass('dark')
})
