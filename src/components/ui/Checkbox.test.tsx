import { render, screen } from '@testing-library/react'
import Checkbox from '@/components/ui/Checkbox'

it('renders an unchecked checkbox', () => {
  render(<Checkbox aria-label="Comprar pan y café" />)
  expect(
    screen.getByRole('checkbox', { name: 'Comprar pan y café' }),
  ).not.toBeChecked()
})

it('renders a checked checkbox', () => {
  render(<Checkbox aria-label="Pagar el internet" defaultChecked />)
  expect(
    screen.getByRole('checkbox', { name: 'Pagar el internet' }),
  ).toBeChecked()
})
