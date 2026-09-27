import { useEffect, useState } from 'react'

/**
 * State with a debounced copy: `debouncedValue` catches up with `value` once
 * it stops changing for `delay` ms.
 */
export const useDebouncedState = <T>(initialValue: T, delay: number) => {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  /** Updates both copies without waiting, e.g. to clear a search */
  const setValueImmediately = (nextValue: T) => {
    setValue(nextValue)
    setDebouncedValue(nextValue)
  }

  return { value, debouncedValue, setValue, setValueImmediately }
}
