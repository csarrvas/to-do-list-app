import {
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { NewTask, Task } from '@/features/tasks/types'

const tasksAdapter = createEntityAdapter<Task>()
const { selectAll } = tasksAdapter.getSelectors()

/** Pending tasks first, each group by due date. Ties keep the order of creation. */
const compareTasks = (a: Task, b: Task) =>
  Number(a.completed) - Number(b.completed) ||
  a.dueDate.localeCompare(b.dueDate)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    taskAdded: {
      reducer: (state, action: PayloadAction<Task>) => {
        tasksAdapter.addOne(state, action.payload)
      },
      prepare: ({ name, dueDate }: NewTask) => ({
        payload: { id: nanoid(), name: name.trim(), dueDate, completed: false },
      }),
    },
    taskToggled: (state, action: PayloadAction<Task['id']>) => {
      const task = state.entities[action.payload]
      if (task) task.completed = !task.completed
    },
    taskDeleted: tasksAdapter.removeOne,
  },
  selectors: {
    selectTasks: createSelector([selectAll], (tasks) =>
      tasks.toSorted(compareTasks),
    ),
    selectPendingCount: (state) =>
      selectAll(state).filter((task) => !task.completed).length,
  },
})

export const { taskAdded, taskToggled, taskDeleted } = tasksSlice.actions
export const { selectTasks, selectPendingCount } = tasksSlice.selectors
