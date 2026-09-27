import type { ComponentProps } from 'react'
import { cn } from '@/utils/cn'

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent/90',
  secondary: 'border border-line bg-surface text-ink hover:bg-field',
}

const sizes = {
  md: 'min-h-11 text-body',
  lg: 'min-h-12 text-base',
}

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 font-bold transition-colors [&_svg]:size-5 [&_svg]:shrink-0',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export default Button
