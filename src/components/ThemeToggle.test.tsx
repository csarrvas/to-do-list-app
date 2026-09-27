import { render, screen } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'

it('offers the dark theme while the light one is active', () => {
  render(<ThemeToggle theme="light" />)
  expect(
    screen.getByRole('button', { name: 'Activar tema oscuro' }),
  ).toBeInTheDocument()
})

it('offers the light theme while the dark one is active', () => {
  render(<ThemeToggle theme="dark" />)
  expect(
    screen.getByRole('button', { name: 'Activar tema claro' }),
  ).toBeInTheDocument()
})
