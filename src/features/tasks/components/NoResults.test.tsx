import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import NoResults from '@/features/tasks/components/NoResults'

it('mentions the query and offers to clear the search', async () => {
  const user = userEvent.setup()
  const onClear = vi.fn()
  render(<NoResults query="gimnasio" onClear={onClear} />)

  expect(
    screen.getByRole('heading', {
      name: 'Ninguna tarea coincide con «gimnasio»',
    }),
  ).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
  expect(onClear).toHaveBeenCalledTimes(1)
})
