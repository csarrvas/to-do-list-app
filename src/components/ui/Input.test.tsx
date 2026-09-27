import { render, screen } from '@testing-library/react'
import Input from '@/components/ui/Input'

it('renders a text field', () => {
  render(<Input aria-label="Nombre" placeholder="¿Qué necesitas hacer?" />)
  expect(screen.getByRole('textbox', { name: 'Nombre' })).toHaveAttribute(
    'placeholder',
    '¿Qué necesitas hacer?',
  )
})

it('can be marked as invalid', () => {
  render(<Input aria-label="Nombre" aria-invalid />)
  expect(screen.getByRole('textbox', { name: 'Nombre' })).toBeInvalid()
})
