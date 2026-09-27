import type { PropsWithChildren, ReactElement } from 'react'
import { render, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore, type AppStore, type RootState } from '@/store/store'

type ProviderOptions = {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

const createWrapper =
  (store: AppStore) =>
  ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  )

/** Renders with a fresh Redux store, returned to inspect or dispatch to */
export const renderWithProviders = (
  ui: ReactElement,
  { preloadedState, store = setupStore(preloadedState) }: ProviderOptions = {},
) => ({ store, ...render(ui, { wrapper: createWrapper(store) }) })

export const renderHookWithProviders = <Result,>(
  hook: () => Result,
  { preloadedState, store = setupStore(preloadedState) }: ProviderOptions = {},
) => ({ store, ...renderHook(hook, { wrapper: createWrapper(store) }) })
