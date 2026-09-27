import ThemeToggle from '@/features/theme/components/ThemeToggle'
import type { Theme } from '@/features/theme/themeSlice'
import { formatLongDate, toDateKey } from '@/utils/date'

type HeaderProps = {
  today: Date
  theme: Theme
  onToggleTheme: () => void
}

const Header = ({ today, theme, onToggleTheme }: HeaderProps) => {
  return (
    <header className="flex items-start justify-between gap-4 lg:items-end">
      <div>
        <h1 className="font-display text-4xl leading-none font-extrabold tracking-tight lg:text-display">
          Tareas
        </h1>
        <p className="mt-1 text-body text-muted lg:mt-2.5 lg:text-body-lg">
          <time dateTime={toDateKey(today)}>{formatLongDate(today)}</time>
        </p>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}

export default Header
