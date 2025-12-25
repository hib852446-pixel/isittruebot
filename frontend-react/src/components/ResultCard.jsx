import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle,
  Bot,
  Copy,
  RefreshCw,
  Clock,
  Cpu
} from 'lucide-react'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'

const VERDICT_STYLES = {
  'true': {
    icon: CheckCircle2,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    label: 'Verified True'
  },
  'false': {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    label: 'False'
  },
  'misleading': {
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    label: 'Misleading'
  },
  'unverified': {
    icon: HelpCircle,
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
    label: 'Unverifiable'
  },
  'ai_detected': {
    icon: Bot,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    label: 'AI Generated'
  },
  'human': {
    icon: CheckCircle2,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    label: 'Likely Human'
  },
}

function detectVerdict(text) {
  const lower = text.toLowerCase()
  if (lower.includes('likely ai') || lower.includes('ai generated') || lower.includes('ai-generated')) {
    return 'ai_detected'
  }
  if (lower.includes('likely human') || lower.includes('human written')) {
    return 'human'
  }
  if (lower.includes('true') && !lower.includes('false') && !lower.includes('partially')) {
    return 'true'
  }
  if (lower.includes('false') && !lower.includes('true')) {
    return 'false'
  }
  if (lower.includes('misleading') || lower.includes('partially')) {
    return 'misleading'
  }
  return 'unverified'
}

export default function ResultCard({ result, onClear }) {
  const verdict = detectVerdict(result?.result || '')
  const style = VERDICT_STYLES[verdict] || VERDICT_STYLES.unverified
  const VerdictIcon = style.icon

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result?.result || '')
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const formatType = (type) => {
    const types = {
      'fact_check': '✓ Fact-Check',
      'ai_detection': '🤖 AI Detection',
      'general_chat': '💬 General Chat'
    }
    return types[type] || type
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card-glass overflow-hidden"
    >
      {/* Header with Verdict */}
      <div className={`px-6 py-4 ${style.bg} border-b ${style.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center`}>
              <VerdictIcon className={`w-5 h-5 ${style.color}`} />
            </div>
            <div>
              <h3 className={`font-semibold ${style.color}`}>{style.label}</h3>
              <p className="text-sm text-gray-400">{formatType(result?.type)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Copy result"
            >
              <Copy className="w-4 h-4 text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClear}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="New analysis"
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Result Content */}
      <div className="p-6">
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-gray-300">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-gray-300">{children}</ol>,
              li: ({ children }) => <li className="text-gray-300">{children}</li>,
              h1: ({ children }) => <h1 className="text-xl font-bold text-white mb-3">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-bold text-white mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-bold text-white mb-2">{children}</h3>,
              a: ({ children, href }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" 
                   className="text-primary-400 hover:text-primary-300 underline">{children}</a>
              ),
              code: ({ children }) => (
                <code className="px-1.5 py-0.5 bg-white/10 rounded text-sm text-primary-300">{children}</code>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-primary-500 pl-4 italic text-gray-400">{children}</blockquote>
              ),
            }}
          >
            {result?.result || 'No result available'}
          </ReactMarkdown>
        </div>

        {/* Metadata */}
        {result?.timestamp && (
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(result.timestamp).toLocaleString()}</span>
            </div>
            {result?.model && (
              <div className="flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                <span>{result.model}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
