import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import ThemeToggle from '@/features/theme/components/ThemeToggle'

it('offers the dark theme while the light one is active', () => {
  render(<ThemeToggle theme="light" onToggle={() => {}} />)
  expect(
    screen.getByRole('button', { name: 'Activar tema oscuro' }),
  ).toBeInTheDocument()
})

it('offers the light theme while the dark one is active', () => {
  render(<ThemeToggle theme="dark" onToggle={() => {}} />)
  expect(
    screen.getByRole('button', { name: 'Activar tema claro' }),
  ).toBeInTheDocument()
})

it('asks to switch the theme when clicked', async () => {
  const user = userEvent.setup()
  const onToggle = vi.fn()
  render(<ThemeToggle theme="light" onToggle={onToggle} />)

  await user.click(screen.getByRole('button', { name: 'Activar tema oscuro' }))

  expect(onToggle).toHaveBeenCalledTimes(1)
})
