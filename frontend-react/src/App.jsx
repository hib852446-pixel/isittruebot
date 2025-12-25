import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import AnalyzerCard from './components/AnalyzerCard'
import ResultCard from './components/ResultCard'
import Features from './components/Features'
import Footer from './components/Footer'
import BackgroundEffects from './components/BackgroundEffects'
import HistorySidebar from './components/HistorySidebar'

function App() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // Keyboard shortcut: Ctrl+Enter to submit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault()
        setShowHistory(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />
      
      {/* History Sidebar */}
      <HistorySidebar isOpen={showHistory} onClose={() => setShowHistory(false)} />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header onHistoryClick={() => setShowHistory(true)} />
        
        <main className="container mx-auto px-4 py-8">
          <Hero />
          
          <div className="max-w-4xl mx-auto space-y-8">
            <AnalyzerCard 
              onResult={setResult} 
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            
            <AnimatePresence mode="wait">
              {result && (
                <ResultCard 
                  result={result} 
                  onClear={() => setResult(null)} 
                />
              )}
            </AnimatePresence>
          </div>
          
          <Features />
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default App
