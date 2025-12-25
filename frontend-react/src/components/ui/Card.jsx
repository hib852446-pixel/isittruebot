import clsx from 'clsx'

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl',
        hover && 'hover:border-white/20 hover:bg-white/10 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={clsx('px-6 py-4 border-b border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={clsx('p-6', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={clsx('px-6 py-4 border-t border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  )
}
