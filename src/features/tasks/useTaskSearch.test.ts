import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { SEARCH_DELAY_MS, useTaskSearch } from '@/features/tasks/useTaskSearch'
import { createTask } from '@/test/factories'

const today = new Date(2026, 8, 26)
const bread = createTask({ name: 'Comprar pan y café' })
const exam = createTask({
  name: 'Enviar la prueba técnica',
  dueDate: '2026-09-30',
})
const tasks = [bread, exam]

const searchFor = (query: string) => {
  const hook = renderHook(() => useTaskSearch(tasks, today))
  act(() => hook.result.current.setQuery(query))
  act(() => vi.advanceTimersByTime(SEARCH_DELAY_MS))
  return hook
}

beforeEach(() => {
  vi.useFakeTimers()
})

it('filters the tasks once the user stops typing', () => {
  const { result } = renderHook(() => useTaskSearch(tasks, today))

  act(() => result.current.setQuery('pan'))
  expect(result.current).toMatchObject({ query: 'pan', results: tasks })

  act(() => vi.advanceTimersByTime(SEARCH_DELAY_MS))
  expect(result.current).toMatchObject({
    activeQuery: 'pan',
    results: [bread],
  })
})

it('shows every task as soon as the search is emptied', () => {
  const { result } = searchFor('pan')

  act(() => result.current.setQuery(''))

  expect(result.current).toMatchObject({ activeQuery: '', results: tasks })
})

it('clears the search at once', () => {
  const { result } = searchFor('pan')

  act(() => result.current.clear())

  expect(result.current).toMatchObject({ query: '', results: tasks })
})
