export default function Button({
  variant = 'primary',
  type = 'button',
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const classes = ['btn', `btn--${variant}`, fullWidth && 'btn--full', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
