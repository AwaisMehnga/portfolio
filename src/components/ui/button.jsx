const buttonBaseClasses =
  'inline-flex h-auto items-center justify-center rounded-button border text-center text-button font-medium no-underline transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const buttonVariants = {
  default:
    'border-ink bg-ink text-surface hover:border-brand hover:bg-brand-soft hover:text-brand hover:shadow-[0_0_0_4px_rgba(236,46,58,0.25)]',
  secondary:
    'border-border bg-surface text-ink hover:border-brand hover:bg-brand-soft hover:text-brand hover:shadow-[0_0_0_4px_rgba(236,46,58,0.25)]',
  outline:
    'border-border bg-transparent text-ink hover:border-brand hover:bg-brand-soft hover:text-brand',
  ghost: 'border-transparent bg-transparent text-ink hover:border-brand/30 hover:bg-brand-soft hover:text-brand',
}

const buttonSizes = {
  default: 'px-8 py-4',
  lg: 'px-8 py-4 max-[991px]:px-4 max-[991px]:py-2',
  sm: 'px-4 py-2.5 text-chip',
  icon: 'h-11 w-11 p-0',
}

function Button({
  as = 'button',
  variant = 'default',
  size = 'default',
  className = '',
  ...htmlProps
}) {
  const Comp = as
  const variantClass = buttonVariants[variant] ?? buttonVariants.default
  const sizeClass = buttonSizes[size] ?? buttonSizes.default
  const classes = [buttonBaseClasses, variantClass, sizeClass, className].filter(Boolean).join(' ')
  const componentProps = Comp === 'button' ? { type: 'button', ...htmlProps } : htmlProps

  return <Comp className={classes} {...componentProps} />
}

export default Button
