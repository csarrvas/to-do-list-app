import { createRef } from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TaskSearch, {
  type TaskSearchHandle,
} from '@/features/tasks/components/TaskSearch'

it('renders an empty search field', () => {
  render(<TaskSearch value="" onChange={() => {}} />)
  expect(screen.getByRole('search')).toBeInTheDocument()
  expect(
    screen.getByRole('searchbox', { name: 'Buscar tareas' }),
  ).toHaveAttribute('placeholder', 'Buscar por nombre o fecha')
  expect(
    screen.queryByRole('button', { name: 'Limpiar búsqueda' }),
  ).not.toBeInTheDocument()
})

it('reports what the user types', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<TaskSearch value="" onChange={onChange} />)

  await user.type(screen.getByRole('searchbox'), 'p')

  expect(onChange).toHaveBeenCalledWith('p')
})

it('clears the query and keeps the focus in the field', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<TaskSearch value="gimnasio" onChange={onChange} />)

  await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))

  expect(onChange).toHaveBeenCalledWith('')
  expect(screen.getByRole('searchbox')).toHaveFocus()
})

it('lets the parent focus the field', () => {
  const ref = createRef<TaskSearchHandle>()
  render(<TaskSearch ref={ref} value="" onChange={() => {}} />)

  act(() => ref.current?.focus())

  expect(screen.getByRole('searchbox')).toHaveFocus()
})
