import { create } from 'zustand'

export const useAppStore = create((set, get) => ({
  // Theme
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Analysis history
  history: [],
  addToHistory: (item) => set((state) => ({
    history: [
      { ...item, id: Date.now(), timestamp: new Date().toISOString() },
      ...state.history.slice(0, 49) // Keep last 50 items
    ]
  })),
  clearHistory: () => set({ history: [] }),
  
  // Current analysis
  currentAnalysis: null,
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  
  // Loading state
  isAnalyzing: false,
  setIsAnalyzing: (loading) => set({ isAnalyzing: loading }),
  
  // Health status
  isHealthy: null,
  setHealthStatus: (status) => set({ isHealthy: status }),
}))
