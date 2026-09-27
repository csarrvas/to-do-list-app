import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useDebouncedState } from '@/hooks/useDebouncedState'

beforeEach(() => {
  vi.useFakeTimers()
})

it('updates the debounced value once the value stops changing', () => {
  const { result } = renderHook(() => useDebouncedState('', 300))

  act(() => result.current.setValue('p'))
  act(() => vi.advanceTimersByTime(200))
  act(() => result.current.setValue('pan'))
  act(() => vi.advanceTimersByTime(299))
  expect(result.current).toMatchObject({ value: 'pan', debouncedValue: '' })

  act(() => vi.advanceTimersByTime(1))
  expect(result.current.debouncedValue).toBe('pan')
})

it('updates both values at once when asked', () => {
  const { result } = renderHook(() => useDebouncedState('pan', 300))

  act(() => result.current.setValueImmediately(''))

  expect(result.current).toMatchObject({ value: '', debouncedValue: '' })
})
