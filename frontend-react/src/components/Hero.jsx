import { motion } from 'framer-motion'
import { Search, Shield, Bot } from 'lucide-react'

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center py-16 md:py-24"
    >
      {/* Floating Icons */}
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-4 top-0 md:left-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 opacity-60"
        >
          <Search className="w-6 h-6 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-8 md:right-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25 opacity-60"
        >
          <Shield className="w-6 h-6 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-1/4 -top-4 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 opacity-50"
        >
          <Bot className="w-5 h-5 text-white" />
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              Powered by Gemini 2.5 Flash
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Verify </span>
            <span className="gradient-text">Everything</span>
            <br />
            <span className="text-white">With </span>
            <span className="gradient-text">AI</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Fact-check claims, detect AI-generated content, and get answers to your questions
            with our advanced AI-powered analysis engine.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { label: 'Accuracy', value: '98%' },
              { label: 'Languages', value: '30+' },
              { label: 'Response Time', value: '<3s' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
