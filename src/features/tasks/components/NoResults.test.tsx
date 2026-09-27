import { render, screen } from '@testing-library/react'
import NoResults from '@/features/tasks/components/NoResults'

it('mentions the query and offers to clear the search', () => {
  render(<NoResults query="gimnasio" />)
  expect(
    screen.getByRole('heading', {
      name: 'Ninguna tarea coincide con «gimnasio»',
    }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'Limpiar búsqueda' }),
  ).toBeInTheDocument()
})
