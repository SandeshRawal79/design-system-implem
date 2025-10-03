import React from 'react'
import { createRoot } from 'react-dom/client'
import "@github/spark/spark"
import { ErrorFallback } from './ErrorFallback.tsx'
import "./main.css"
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')

const root = createRoot(container)

root.render(<App />)