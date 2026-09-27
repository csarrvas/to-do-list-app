import { render, screen } from '@testing-library/react'
import TaskList from '@/features/tasks/components/TaskList'
import { getSampleTasks } from '@/features/tasks/sampleTasks'

it('renders one item per task', () => {
  const today = new Date(2026, 8, 26)
  render(<TaskList tasks={getSampleTasks(today)} today={today} />)
  expect(screen.getAllByRole('listitem')).toHaveLength(5)
})
