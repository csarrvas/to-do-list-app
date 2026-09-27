import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Button from './Button'

it('renders the label', () => {
  render(<Button label="Click me" onClick={() => {}} />)
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
})

it('calls onClick when clicked', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<Button label="Click me" onClick={onClick} />)
  await user.click(screen.getByRole('button', { name: 'Click me' }))
  expect(onClick).toHaveBeenCalledTimes(1)
})
