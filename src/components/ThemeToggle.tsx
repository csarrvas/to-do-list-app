import { Moon, Sun } from 'lucide-react'
import IconButton from '@/components/ui/IconButton'

export type Theme = 'light' | 'dark'

type ThemeToggleProps = {
  theme: Theme
  onToggle?: () => void
  className?: string
}

/** Shows the icon of the theme it switches to. */
const ThemeToggle = ({ theme, onToggle, className }: ThemeToggleProps) => {
  const isDark = theme === 'dark'

  return (
    <IconButton
      label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
      variant="outline"
      onClick={onToggle}
      className={className}
    >
      {isDark ? <Sun /> : <Moon />}
    </IconButton>
  )
}

export default ThemeToggle
