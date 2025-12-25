import { motion } from 'framer-motion'
import { Heart, Github, Twitter, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <span className="text-xl font-bold text-white">IsItTrue</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              AI-powered fact-checking and content verification platform. 
              Verify claims, detect AI-generated content, and get answers with confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'API', 'Pricing', 'Documentation'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Hiba
          </p>
          
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5 text-gray-400 hover:text-white" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
            </motion.a>
          </div>

          <p className="text-gray-500 text-sm">
            © 2025 IsItTrue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
