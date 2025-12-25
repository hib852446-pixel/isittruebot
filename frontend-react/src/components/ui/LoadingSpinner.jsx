import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`${sizes[size]} rounded-full border-2 border-primary-500/20 border-t-primary-500`}
        />
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-primary-500/10 blur animate-pulse" />
      </div>
      
      {text && (
        <p className="text-sm text-gray-400 animate-pulse">{text}</p>
      )}
    </div>
  )
}
