import { cn } from '@/utils/cn'
import { formatMonthShort } from '@/utils/date'

const sizes = {
  md: {
    sheet: 'w-12 rounded-lg bg-field lg:w-13',
    band: 'h-4.5 text-xs leading-4.5',
  },
  lg: { sheet: 'size-16 rounded-xl bg-surface', band: 'h-5' },
}

type CalendarSheetProps = {
  /** Without a date it renders a blank sheet, used as an illustration */
  date?: Date
  muted?: boolean
  size?: keyof typeof sizes
}

/** Calendar sheet with the month on the band and the day below. Decorative. */
const CalendarSheet = ({
  date,
  muted = false,
  size = 'md',
}: CalendarSheetProps) => {
  return (
    <div
      aria-hidden
      className={cn(
        'flex shrink-0 flex-col overflow-hidden border border-line text-center',
        sizes[size].sheet,
      )}
    >
      <span
        className={cn(
          'font-bold',
          sizes[size].band,
          muted ? 'bg-line text-muted' : 'bg-accent text-on-accent',
        )}
      >
        {date && formatMonthShort(date)}
      </span>
      {date && (
        <span
          className={cn(
            'font-display text-2xl leading-7.5 font-extrabold',
            muted ? 'text-done' : 'text-ink',
          )}
        >
          {date.getDate()}
        </span>
      )}
    </div>
  )
}

export default CalendarSheet
