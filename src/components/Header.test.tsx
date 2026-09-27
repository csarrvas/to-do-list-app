import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

it('renders the title, the current date and the theme toggle', () => {
  render(<Header today={new Date(2026, 8, 26)} theme="light" />)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Tareas' }),
  ).toBeInTheDocument()
  expect(screen.getByText('Sábado 26 de septiembre')).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: 'Activar tema oscuro' }),
  ).toBeInTheDocument()
})
