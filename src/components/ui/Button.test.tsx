import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Button from '@/components/ui/Button'

it('renders its content as a button', () => {
  render(<Button>Agregar</Button>)
  expect(screen.getByRole('button', { name: 'Agregar' })).toHaveAttribute(
    'type',
    'button',
  )
})

it('calls onClick when clicked', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Agregar</Button>)
  await user.click(screen.getByRole('button', { name: 'Agregar' }))
  expect(onClick).toHaveBeenCalledTimes(1)
})
