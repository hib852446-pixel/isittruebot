import { motion } from 'framer-motion'
import { Sparkles, Activity, Github, History } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { checkHealth } from '../api'

export default function Header({ onHistoryClick }) {
  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
    refetchInterval: 30000,
  })

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl blur opacity-30 -z-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">IsItTrue</h1>
              <p className="text-xs text-gray-400">AI Fact Checker</p>
            </div>
          </motion.div>

          {/* Status & Version */}
          <div className="flex items-center gap-4">
            {/* History Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHistoryClick}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="View History (Ctrl+H)"
            >
              <History className="w-5 h-5 text-gray-400 hover:text-white" />
            </motion.button>

            {/* Health Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Activity className={`w-4 h-4 ${health?.status === 'healthy' ? 'text-green-400' : 'text-gray-400'}`} />
              <span className="text-sm text-gray-300">
                {health?.status === 'healthy' ? 'Online' : 'Checking...'}
              </span>
            </div>

            {/* Version Badge */}
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30">
              <span className="text-sm font-medium text-primary-300">v4.0</span>
            </div>

            {/* GitHub Link */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5 text-gray-400 hover:text-white" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
