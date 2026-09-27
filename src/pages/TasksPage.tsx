import { useId, useState } from 'react'
import Header from '@/components/Header'
import TaskForm from '@/features/tasks/components/TaskForm'
import TaskList from '@/features/tasks/components/TaskList'
import TaskSearch from '@/features/tasks/components/TaskSearch'
import TaskSummary from '@/features/tasks/components/TaskSummary'
import { getSampleTasks } from '@/features/tasks/sampleTasks'
import { toDateKey } from '@/utils/date'

const TasksPage = () => {
  const [today] = useState(() => new Date())
  const listHeadingId = useId()
  const tasks = getSampleTasks(today)
  const pendingCount = tasks.filter((task) => !task.completed).length

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-5 pb-12 sm:px-6 lg:max-w-300 lg:px-8 lg:pt-11 lg:pb-16">
      <Header today={today} theme="light" />

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
          className="lg:sticky lg:top-8 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start"
        />
        <TaskSearch className="lg:col-start-2 lg:row-start-1" />
        {/* On mobile the list sits a bit closer to the search that filters it */}
        <section
          aria-labelledby={listHeadingId}
          className="-mt-1 lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:mt-0"
        >
          <h2 id={listHeadingId} className="sr-only">
            Lista de tareas
          </h2>
          <TaskList tasks={tasks} today={today} />
        </section>
      </main>
    </div>
  )
}

export default TasksPage
