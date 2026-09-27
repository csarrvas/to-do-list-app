import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useToday } from '@/hooks/useToday'

it('returns today and moves on to the next day at midnight', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2026, 8, 26, 23, 59))

  const { result } = renderHook(() => useToday())
  expect(result.current).toEqual(new Date(2026, 8, 26))

  act(() => vi.advanceTimersByTime(60_000))
  expect(result.current).toEqual(new Date(2026, 8, 27))
})
