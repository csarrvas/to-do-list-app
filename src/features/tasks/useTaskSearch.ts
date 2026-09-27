import { filterTasks } from '@/features/tasks/search'
import type { Task } from '@/features/tasks/types'
import { useDebouncedState } from '@/hooks/useDebouncedState'

export const SEARCH_DELAY_MS = 300

/**
 * Filters `tasks` by name or date. The list waits until the user stops
 * typing; emptying the search shows every task at once.
 */
export const useTaskSearch = (tasks: Task[], today: Date) => {
  const { value, debouncedValue, setValue, setValueImmediately } =
    useDebouncedState('', SEARCH_DELAY_MS)
  const activeQuery = debouncedValue.trim()

  const setQuery = (query: string) => {
    if (query.trim()) setValue(query)
    else setValueImmediately(query)
  }

  return {
    /** What the search field shows */
    query: value,
    /** What the results are filtered by */
    activeQuery,
    results: filterTasks(tasks, activeQuery, today),
    setQuery,
    clear: () => setValueImmediately(''),
  }
}
