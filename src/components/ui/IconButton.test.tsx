import { render, screen } from '@testing-library/react'
import { Trash2 } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'

it('uses the label as the accessible name', () => {
  render(
    <IconButton label="Eliminar">
      <Trash2 />
    </IconButton>,
  )
  expect(screen.getByRole('button', { name: 'Eliminar' })).toBeInTheDocument()
})
