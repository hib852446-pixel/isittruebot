import { motion, AnimatePresence } from 'framer-motion'
import { History, X, Trash2, Search, Bot, MessageCircle } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

const typeIcons = {
  fact_check: Search,
  ai_detection: Bot,
  general_chat: MessageCircle,
}

const typeColors = {
  fact_check: 'text-blue-400',
  ai_detection: 'text-purple-400',
  general_chat: 'text-green-400',
}

export default function HistorySidebar({ isOpen, onClose }) {
  const history = useAppStore((state) => state.history)
  const clearHistory = useAppStore((state) => state.clearHistory)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 md:w-96 bg-gray-900 border-l border-white/10 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary-400" />
                <h2 className="font-semibold text-white">History</h2>
                <span className="px-2 py-0.5 text-xs bg-primary-500/20 text-primary-300 rounded-full">
                  {history.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearHistory}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* History List */}
            <div className="overflow-y-auto h-[calc(100%-64px)] p-4 space-y-3">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <History className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-500">No history yet</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Your analysis history will appear here
                  </p>
                </div>
              ) : (
                history.map((item, index) => {
                  const Icon = typeIcons[item.type] || Search
                  const color = typeColors[item.type] || 'text-gray-400'
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{item.text}...</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
