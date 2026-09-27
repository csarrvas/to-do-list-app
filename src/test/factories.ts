import type { RootState } from '@/store/store'
import type { Task } from '@/features/tasks/types'

let nextId = 1

export const createTask = (overrides: Partial<Task> = {}): Task => ({
  id: String(nextId++),
  name: 'Comprar pan y café',
  dueDate: '2026-09-26',
  completed: false,
  ...overrides,
})

/** The tasks slice holding `tasks`, to preload a store with them */
export const createTasksState = (tasks: Task[]): RootState['tasks'] => ({
  ids: tasks.map((task) => task.id),
  entities: Object.fromEntries(tasks.map((task) => [task.id, task])),
})
