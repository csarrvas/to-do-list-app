import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Header from '@/components/Header'

it('renders the title, the current date and the theme toggle', async () => {
  const user = userEvent.setup()
  const onToggleTheme = vi.fn()
  render(
    <Header
      today={new Date(2026, 8, 26)}
      theme="light"
      onToggleTheme={onToggleTheme}
    />,
  )

  expect(
    screen.getByRole('heading', { level: 1, name: 'Tareas' }),
  ).toBeInTheDocument()
  expect(screen.getByText('Sábado 26 de septiembre')).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Activar tema oscuro' }))
  expect(onToggleTheme).toHaveBeenCalledTimes(1)
})
