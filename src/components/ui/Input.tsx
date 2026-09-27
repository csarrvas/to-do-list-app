import type { ComponentProps } from 'react'
import { cn } from '@/utils/cn'

/** Text-like field. Set `aria-invalid` to show the error state. */
const Input = ({ className, ...props }: ComponentProps<'input'>) => {
  return (
    <input
      className={cn(
        'h-12 w-full min-w-0 appearance-none rounded-xl border border-line bg-field px-3.5 text-ink placeholder:text-muted aria-invalid:border-danger aria-invalid:ring-1 aria-invalid:ring-danger',
        className,
      )}
      {...props}
    />
  )
}

export default Input
