import { render, screen } from '@testing-library/react'
import CalendarSheet from '@/features/tasks/components/CalendarSheet'

it('shows the month and the day of the date', () => {
  render(<CalendarSheet date={new Date(2026, 8, 26)} />)
  expect(screen.getByText('sep')).toBeInTheDocument()
  expect(screen.getByText('26')).toBeInTheDocument()
})

it('renders a blank sheet without a date', () => {
  const { container } = render(<CalendarSheet size="lg" />)
  expect(container.firstChild).toBeInTheDocument()
  expect(container.textContent).toBe('')
})
