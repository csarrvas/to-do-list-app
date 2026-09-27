import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router/dom'
import { PersistGate } from 'redux-persist/integration/react'
import '@fontsource-variable/atkinson-hyperlegible-next'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@/index.css'
import { router } from '@/router'
import { setupPersistedStore } from '@/store/store'

const { store, persistor } = setupPersistedStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* Renders once the saved tasks are loaded, so they don't flash in */}
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
