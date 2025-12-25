import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { 
  Search, 
  Bot, 
  MessageCircle, 
  Loader2, 
  Send,
  Sparkles,
  Zap
} from 'lucide-react'
import toast from 'react-hot-toast'
import { analyzeText } from '../api'
import { useAppStore } from '../store/useAppStore'

const REQUEST_TYPES = [
  {
    id: 'fact_check',
    label: 'Fact-Check',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    description: 'Verify claims and statements',
  },
  {
    id: 'ai_detection',
    label: 'AI Detection',
    icon: Bot,
    color: 'from-purple-500 to-pink-500',
    description: 'Detect AI-generated content',
  },
  {
    id: 'general_chat',
    label: 'Ask Question',
    icon: MessageCircle,
    color: 'from-green-500 to-emerald-500',
    description: 'Get answers to any question',
  },
]

export default function AnalyzerCard({ onResult, isLoading, setIsLoading }) {
  const [text, setText] = useState('')
  const [requestType, setRequestType] = useState('fact_check')
  const [temperature, setTemperature] = useState(0.7)
  const addToHistory = useAppStore((state) => state.addToHistory)

  const mutation = useMutation({
    mutationFn: analyzeText,
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: (data) => {
      onResult(data)
      addToHistory({
        text: text.slice(0, 100),
        type: requestType,
        result: data.result?.slice(0, 200),
      })
      toast.success('Analysis complete!')
    },
    onError: (error) => {
      const message = error.response?.data?.error || error.message || 'Analysis failed'
      toast.error(message)
      onResult(null)
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    
    if (!text.trim()) {
      toast.error('Please enter some text to analyze')
      return
    }

    if (text.length > 5000) {
      toast.error('Text exceeds 5000 character limit')
      return
    }

    mutation.mutate({ text: text.trim(), requestType, temperature })
  }, [text, requestType, temperature, mutation])

  const selectedType = REQUEST_TYPES.find(t => t.id === requestType)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="card-glass p-6 md:p-8"
    >
      <form onSubmit={handleSubmit}>
        {/* Request Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Select Analysis Mode
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {REQUEST_TYPES.map((type) => (
              <motion.button
                key={type.id}
                type="button"
                onClick={() => setRequestType(type.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative p-4 rounded-xl border transition-all duration-200
                  ${requestType === type.id 
                    ? 'border-primary-500 bg-primary-500/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} 
                    flex items-center justify-center shadow-lg
                  `}>
                    <type.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-white">{type.label}</div>
                    <div className="text-xs text-gray-400">{type.description}</div>
                  </div>
                </div>
                
                {requestType === type.id && (
                  <motion.div
                    layoutId="activeType"
                    className="absolute inset-0 border-2 border-primary-500 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Enter Text to Analyze
          </label>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type the text you want to analyze..."
              rows={6}
              maxLength={5000}
              className="input-glass resize-none pr-24"
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {text.length}/5000
            </div>
          </div>
        </div>

        {/* Temperature Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">
              Response Style
            </label>
            <span className="text-sm text-primary-400 font-medium">
              {temperature < 0.4 ? 'Precise' : temperature > 0.7 ? 'Creative' : 'Balanced'}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-gradient-to-r
                [&::-webkit-slider-thumb]:from-primary-500
                [&::-webkit-slider-thumb]:to-secondary-500
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:shadow-primary-500/50
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:hover:scale-110"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>🎯 Precise</span>
              <span>⚖️ Balanced</span>
              <span>🎨 Creative</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !text.trim()}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className={`
            w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200
            flex items-center justify-center gap-3
            ${isLoading 
              ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
              : 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40'
            }
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze with AI</span>
              <Zap className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {/* Keyboard Shortcut Hint */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Press <kbd className="px-2 py-0.5 bg-white/10 rounded text-gray-400">Ctrl</kbd> + 
          <kbd className="px-2 py-0.5 bg-white/10 rounded text-gray-400 ml-1">Enter</kbd> to submit
        </p>
      </form>
    </motion.div>
  )
}
