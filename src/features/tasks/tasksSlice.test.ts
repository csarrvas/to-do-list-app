import {
  selectPendingCount,
  selectTasks,
  taskAdded,
  taskDeleted,
  taskToggled,
} from '@/features/tasks/tasksSlice'
import { setupStore } from '@/store/store'
import { createTask, createTasksState } from '@/test/factories'

it('adds pending tasks with trimmed names and unique ids', () => {
  const store = setupStore()
  store.dispatch(taskAdded({ name: '  Comprar pan  ', dueDate: '2026-09-26' }))
  store.dispatch(
    taskAdded({ name: 'Pagar el internet', dueDate: '2026-09-26' }),
  )

  const [bread, internet] = selectTasks(store.getState())
  expect(bread).toEqual({
    id: expect.any(String),
    name: 'Comprar pan',
    dueDate: '2026-09-26',
    completed: false,
  })
  expect(internet.name).toBe('Pagar el internet')
  expect(internet.id).not.toBe(bread.id)
})

it('toggles a task between pending and completed', () => {
  const task = createTask()
  const store = setupStore({ tasks: createTasksState([task]) })

  store.dispatch(taskToggled(task.id))
  expect(selectTasks(store.getState())[0].completed).toBe(true)

  store.dispatch(taskToggled(task.id))
  expect(selectTasks(store.getState())[0].completed).toBe(false)
})

it('ignores tasks that no longer exist', () => {
  const store = setupStore({ tasks: createTasksState([createTask()]) })
  const state = store.getState()
  store.dispatch(taskToggled('missing'))
  expect(store.getState()).toEqual(state)
})

it('deletes a task', () => {
  const bread = createTask({ name: 'Comprar pan' })
  const internet = createTask({ name: 'Pagar el internet' })
  const store = setupStore({ tasks: createTasksState([bread, internet]) })

  store.dispatch(taskDeleted(bread.id))

  expect(selectTasks(store.getState())).toEqual([internet])
})

it('lists pending tasks first, each group by due date', () => {
  const tasks = [
    createTask({ name: 'A', dueDate: '2026-09-30' }),
    createTask({ name: 'B', dueDate: '2026-09-25', completed: true }),
    createTask({ name: 'C', dueDate: '2026-09-24' }),
    createTask({ name: 'D', dueDate: '2026-09-26' }),
    createTask({ name: 'E', dueDate: '2026-09-23', completed: true }),
    createTask({ name: 'F', dueDate: '2026-09-26' }),
  ]
  const store = setupStore({ tasks: createTasksState(tasks) })

  expect(selectTasks(store.getState()).map((task) => task.name)).toEqual([
    'C',
    'D',
    'F',
    'A',
    'E',
    'B',
  ])
})

it('counts the pending tasks', () => {
  const store = setupStore({
    tasks: createTasksState([
      createTask(),
      createTask({ completed: true }),
      createTask(),
    ]),
  })
  expect(selectPendingCount(store.getState())).toBe(2)
})
