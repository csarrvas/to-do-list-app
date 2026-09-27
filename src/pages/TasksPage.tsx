import { useId, useRef } from 'react'
import Header from '@/components/Header'
import EmptyTasks from '@/features/tasks/components/EmptyTasks'
import NoResults from '@/features/tasks/components/NoResults'
import TaskForm from '@/features/tasks/components/TaskForm'
import TaskList from '@/features/tasks/components/TaskList'
import TaskSearch, {
  type TaskSearchHandle,
} from '@/features/tasks/components/TaskSearch'
import TaskSummary from '@/features/tasks/components/TaskSummary'
import {
  selectPendingCount,
  selectTasks,
  taskAdded,
  taskDeleted,
  taskToggled,
} from '@/features/tasks/tasksSlice'
import { useTaskSearch } from '@/features/tasks/useTaskSearch'
import { useTheme } from '@/features/theme/useTheme'
import { useToday } from '@/hooks/useToday'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toDateKey } from '@/utils/date'

const TasksPage = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)
  const pendingCount = useAppSelector(selectPendingCount)
  const today = useToday()
  const { theme, toggleTheme } = useTheme()
  const search = useTaskSearch(tasks, today)
  const searchRef = useRef<TaskSearchHandle>(null)
  const listHeadingId = useId()

  const clearSearch = () => {
    search.clear()
    // The button goes away with the empty result; continue in the search
    searchRef.current?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-5 pb-12 sm:px-6 lg:max-w-300 lg:px-8 lg:pt-11 lg:pb-16">
      <Header today={today} theme={theme} onToggleTheme={toggleTheme} />

      {/* One column on mobile. On desktop the form takes the left column and
          the search, summary and list the right one */}
      <main className="mt-1 grid gap-4 lg:mt-10 lg:grid-cols-[22.5rem_minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr] lg:gap-x-14">
        {/* Below the date on mobile; next to the search on desktop, where
            the negative margin narrows the gap between them */}
        <TaskSummary
          total={tasks.length}
          pending={pendingCount}
          className="lg:col-start-3 lg:row-start-1 lg:-ml-9 lg:self-center"
        />
        <TaskForm
          defaultDueDate={toDateKey(today)}
          onAdd={(task) => dispatch(taskAdded(task))}
          className="lg:sticky lg:top-8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start"
        />
        <TaskSearch
          ref={searchRef}
          value={search.query}
          onChange={search.setQuery}
          className="lg:col-start-2 lg:row-start-1"
        />
        {/* On mobile the list sits a bit closer to the search that filters it */}
        <section
          aria-labelledby={listHeadingId}
          className="-mt-1 lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:mt-0"
        >
          <h2 id={listHeadingId} className="sr-only">
            Lista de tareas
          </h2>
          {tasks.length === 0 ? (
            <EmptyTasks />
          ) : search.results.length === 0 ? (
            <NoResults query={search.activeQuery} onClear={clearSearch} />
          ) : (
            <TaskList
              tasks={search.results}
              today={today}
              onToggle={(id) => dispatch(taskToggled(id))}
              onDelete={(id) => dispatch(taskDeleted(id))}
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default TasksPage
