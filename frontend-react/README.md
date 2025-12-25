# React Frontend for IsItTrue

A modern, professional React frontend for the IsItTrue AI-powered fact-checking application.

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animations
- **React Query** - Server state management
- **Zustand** - Client state management
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Beautiful icons
- **React Markdown** - Render markdown responses

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd frontend-react
npm install
```

### Development

```bash
# Start the dev server (connects to Flask backend on port 5000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

Build output will be in the `dist` folder.

## Project Structure

```
frontend-react/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── index.js          # API client with axios
│   ├── components/
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Hero.jsx          # Hero section
│   │   ├── AnalyzerCard.jsx  # Main input form
│   │   ├── ResultCard.jsx    # Analysis results
│   │   ├── Features.jsx      # Feature showcase
│   │   ├── Footer.jsx        # Footer
│   │   └── BackgroundEffects.jsx
│   ├── store/
│   │   └── useAppStore.js    # Zustand store
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Features

- 🎨 Modern glassmorphism UI design
- ✨ Smooth animations with Framer Motion
- 🌙 Dark mode by default
- 📱 Fully responsive design
- ⚡ Fast development with Vite HMR
- 🔄 Auto API health checking
- 📋 Copy results to clipboard
- 🎯 Three analysis modes:
  - Fact-Check
  - AI Detection
  - General Chat

## API Integration

The frontend connects to the Flask backend API:

- `POST /api/analyze` - Main analysis endpoint
- `GET /api/health` - Health check
- `POST /api/detect-type` - Auto-detect request type

Configure the proxy in `vite.config.js` to point to your backend.
