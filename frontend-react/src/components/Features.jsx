import { motion } from 'framer-motion'
import { 
  Search, 
  Shield, 
  Bot, 
  Globe, 
  Zap, 
  Lock,
  Image,
  Mic
} from 'lucide-react'

const FEATURES = [
  {
    icon: Search,
    title: 'Fact-Checking',
    description: 'Verify claims, rumors, and statements with AI-powered analysis',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Bot,
    title: 'AI Detection',
    description: 'Identify AI-generated text with high accuracy',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Support for 30+ languages with automatic detection',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Image,
    title: 'Image Analysis',
    description: 'Detect AI-generated images and extract text',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Mic,
    title: 'Audio Processing',
    description: 'Transcribe and verify audio content',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Zap,
    title: 'Fast & Accurate',
    description: 'Get results in seconds with high reliability',
    color: 'from-indigo-500 to-violet-500',
  },
]

export default function Features() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Powerful <span className="gradient-text">Features</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Everything you need to verify information and detect AI content
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            {/* Icon */}
            <div className={`
              w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} 
              flex items-center justify-center mb-4 shadow-lg
              group-hover:scale-110 transition-transform duration-300
            `}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {feature.description}
            </p>

            {/* Hover Glow Effect */}
            <div className={`
              absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} 
              opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10
            `} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
