import { motion } from 'framer-motion'
import clsx from 'clsx'

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  disabled,
  loading,
  icon: Icon,
  ...props 
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-300 hover:text-white',
    danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </motion.button>
  )
}

export function IconButton({ icon: Icon, className, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={clsx(
        'p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors',
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </motion.button>
  )
}
