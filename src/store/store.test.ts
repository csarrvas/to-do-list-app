import { selectTasks, taskAdded } from '@/features/tasks/tasksSlice'
import {
  selectThemePreference,
  themeChanged,
} from '@/features/theme/themeSlice'
import { setupPersistedStore } from '@/store/store'
import { whenRehydrated } from '@/test/persist'

const loadStore = async () => {
  const app = setupPersistedStore()
  await whenRehydrated(app.persistor)
  return app
}

it('saves the tasks and the theme in localStorage', async () => {
  const { store, persistor } = await loadStore()
  store.dispatch(taskAdded({ name: 'Comprar pan', dueDate: '2026-09-26' }))
  store.dispatch(themeChanged('dark'))
  await persistor.flush()

  const saved = JSON.parse(localStorage.getItem('persist:root') ?? '{}')
  expect(Object.values(JSON.parse(saved.tasks).entities)).toEqual([
    expect.objectContaining({ name: 'Comprar pan' }),
  ])
  expect(JSON.parse(saved.theme)).toEqual({ preference: 'dark' })
})

it('restores them when the app loads again', async () => {
  const previousVisit = await loadStore()
  previousVisit.store.dispatch(
    taskAdded({ name: 'Comprar pan', dueDate: '2026-09-26' }),
  )
  previousVisit.store.dispatch(themeChanged('dark'))
  await previousVisit.persistor.flush()
  previousVisit.persistor.pause()

  const { store } = await loadStore()

  expect(selectTasks(store.getState())).toEqual([
    expect.objectContaining({ name: 'Comprar pan', completed: false }),
  ])
  expect(selectThemePreference(store.getState())).toBe('dark')
})
