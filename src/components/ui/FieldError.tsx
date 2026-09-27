import type { ComponentProps } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/utils/cn'

/** Error message for a field; link it with the field's `aria-describedby`. */
const FieldError = ({ className, children, ...props }: ComponentProps<'p'>) => {
  return (
    <p
      className={cn(
        'flex items-start gap-1.5 text-sm font-bold text-danger',
        className,
      )}
      {...props}
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  )
}

export default FieldError
