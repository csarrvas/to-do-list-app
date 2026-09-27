import type { Persistor } from 'redux-persist'

/** Resolves once redux-persist has loaded the saved state */
export const whenRehydrated = (persistor: Persistor) =>
  new Promise<void>((resolve) => {
    const check = () => {
      if (!persistor.getState().bootstrapped) return
      unsubscribe()
      resolve()
    }
    const unsubscribe = persistor.subscribe(check)
    check()
  })
