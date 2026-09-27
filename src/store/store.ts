import { combineSlices, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  type PersistConfig,
} from 'redux-persist'
// The ESM build: the CommonJS `lib/storage` reaches the browser wrapped in
// `{ default }` through Vite's dependency optimizer
import storage from 'redux-persist/es/storage'
import { tasksSlice } from '@/features/tasks/tasksSlice'
import { themeSlice } from '@/features/theme/themeSlice'

const rootReducer = combineSlices(tasksSlice, themeSlice)

export type RootState = ReturnType<typeof rootReducer>

/**
 * Saves the state in localStorage under `persist:root`. index.html reads the
 * theme from there to apply it before the app loads.
 */
export const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage,
}

/** Store without persistence, so tests start from a known state. */
export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({ reducer: rootReducer, preloadedState })

/** The app's store, persisted between visits. */
export const setupPersistedStore = () => {
  const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // redux-persist's own actions carry functions
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

  return { store, persistor: persistStore(store) }
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
