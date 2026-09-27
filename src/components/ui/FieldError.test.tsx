import { render, screen } from '@testing-library/react'
import FieldError from '@/components/ui/FieldError'

it('renders the error message', () => {
  render(<FieldError>Elige una fecha.</FieldError>)
  expect(screen.getByText('Elige una fecha.')).toBeInTheDocument()
})
