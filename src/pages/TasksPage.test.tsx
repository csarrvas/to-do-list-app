import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import type { Task } from '@/features/tasks/types'
import { selectThemePreference } from '@/features/theme/themeSlice'
import TasksPage from '@/pages/TasksPage'
import { createTask, createTasksState } from '@/test/factories'
import { renderWithProviders } from '@/test/utils'

const bread = createTask({ name: 'Comprar pan y café', dueDate: '2026-09-26' })
const exam = createTask({
  name: 'Enviar la prueba técnica',
  dueDate: '2026-09-30',
})
const license = createTask({
  name: 'Renovar la licencia',
  dueDate: '2026-09-24',
})

const renderPage = (tasks: Task[] = []) => {
  const user = userEvent.setup()
  const result = renderWithProviders(<TasksPage />, {
    preloadedState: { tasks: createTasksState(tasks) },
  })
  return { user, ...result }
}

const summary = () => screen.getByRole('status').textContent

// Only the date is fixed: Testing Library waits on real timers, so the search
// debounce runs for real here (its timing is covered in useTaskSearch.test)
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 8, 26, 10))
})

it('invites to add the first task when there are none', () => {
  renderPage()
  expect(
    screen.getByRole('heading', { name: 'Aún no tienes tareas' }),
  ).toBeInTheDocument()
  expect(summary()).toBe('Sin tareas por ahora')
})

it('adds tasks to the list', async () => {
  const { user } = renderPage()

  await user.type(screen.getByLabelText('Nombre'), 'Comprar pan y café')
  await user.click(screen.getByRole('button', { name: 'Agregar' }))

  expect(
    screen.getByRole('checkbox', { name: 'Comprar pan y café' }),
  ).toHaveAccessibleDescription('Hoy, 26 de septiembre')
  expect(summary()).toBe('1 de 1 pendiente')
})

it('does not add a task without a name', async () => {
  const { user } = renderPage()

  await user.click(screen.getByRole('button', { name: 'Agregar' }))

  expect(
    screen.getByText('Escribe un nombre para la tarea.'),
  ).toBeInTheDocument()
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
})

it('completes tasks and moves them to the end of the list', async () => {
  const { user } = renderPage([bread, exam])
  const checkbox = screen.getByRole('checkbox', { name: 'Comprar pan y café' })

  await user.click(checkbox)

  expect(checkbox).toBeChecked()
  expect(checkbox).toHaveAccessibleDescription('Completada, 26 de septiembre')
  expect(screen.getAllByRole('listitem')[1]).toContainElement(checkbox)
  expect(summary()).toBe('1 de 2 pendiente')

  await user.click(checkbox)
  expect(checkbox).not.toBeChecked()
  expect(summary()).toBe('2 de 2 pendientes')
})

it('deletes tasks', async () => {
  const { user } = renderPage([bread, exam])

  await user.click(
    screen.getByRole('button', { name: 'Eliminar «Comprar pan y café»' }),
  )

  expect(
    screen.queryByRole('checkbox', { name: 'Comprar pan y café' }),
  ).not.toBeInTheDocument()
  expect(summary()).toBe('1 de 1 pendiente')
})

it('searches by name or date once the user stops typing', async () => {
  const { user } = renderPage([bread, exam, license])
  const search = screen.getByRole('searchbox', { name: 'Buscar tareas' })

  await user.type(search, 'pan')
  expect(screen.getAllByRole('listitem')).toHaveLength(3)

  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1))
  expect(
    screen.getByRole('checkbox', { name: 'Comprar pan y café' }),
  ).toBeInTheDocument()

  // Emptying the field shows every task without waiting
  await user.clear(search)
  expect(screen.getAllByRole('listitem')).toHaveLength(3)

  await user.type(search, '30/09')
  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1))
  expect(
    screen.getByRole('checkbox', { name: 'Enviar la prueba técnica' }),
  ).toBeInTheDocument()
})

it('says when nothing matches and clears the search', async () => {
  const { user } = renderPage([bread, exam])
  const search = screen.getByRole('searchbox', { name: 'Buscar tareas' })

  await user.type(search, 'gimnasio')

  const list = screen.getByRole('region', { name: 'Lista de tareas' })
  expect(
    await within(list).findByRole('heading', {
      name: 'Ninguna tarea coincide con «gimnasio»',
    }),
  ).toBeInTheDocument()
  expect(summary()).toBe('2 de 2 pendientes')

  await user.click(
    within(list).getByRole('button', { name: 'Limpiar búsqueda' }),
  )

  expect(search).toHaveValue('')
  expect(search).toHaveFocus()
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
})

it('switches between the light and dark themes', async () => {
  const { user, store } = renderPage()

  await user.click(screen.getByRole('button', { name: 'Activar tema oscuro' }))
  expect(document.documentElement).toHaveClass('dark')
  expect(selectThemePreference(store.getState())).toBe('dark')

  await user.click(screen.getByRole('button', { name: 'Activar tema claro' }))
  expect(document.documentElement).not.toHaveClass('dark')
})
