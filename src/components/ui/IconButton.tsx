import type { ComponentProps } from 'react'
import { cn } from '@/utils/cn'

const variants = {
  outline: 'border border-line bg-surface text-ink hover:bg-field',
  ghost: 'text-muted hover:bg-field hover:text-ink',
}

type IconButtonProps = ComponentProps<'button'> & {
  /** Accessible name, since the button only shows an icon */
  label: string
  variant?: keyof typeof variants
}

const IconButton = ({
  label,
  variant = 'ghost',
  type = 'button',
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        'inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-colors [&_svg]:size-5',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

export default IconButton
