import type { ComponentProps } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'>

/**
 * Custom checkbox. The wrapping label gives it a 44px touch target; name it
 * with `aria-label` or `aria-labelledby`.
 */
const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <label
      className={cn(
        'grid size-11 shrink-0 cursor-pointer place-items-center',
        className,
      )}
    >
      <input
        type="checkbox"
        className="peer col-start-1 row-start-1 size-5.5 cursor-pointer appearance-none rounded-md border-[1.5px] border-muted bg-surface transition-colors checked:border-accent checked:bg-accent"
        {...props}
      />
      <Check
        strokeWidth={3}
        className="pointer-events-none col-start-1 row-start-1 size-6 text-on-accent opacity-0 peer-checked:opacity-100"
      />
    </label>
  )
}

export default Checkbox
