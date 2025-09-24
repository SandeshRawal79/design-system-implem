import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Phase1Services } from './pages/Phase1Services'
import { ServiceGroups } from './pages/ServiceGroups'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="px-8 py-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/phase1-services" element={<Phase1Services />} />
            <Route path="/service-groups" element={<ServiceGroups />} />
          </Routes>
        </main>
        
        <footer className="h-6 border-t border-border bg-white px-8 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Provision Intelligence Hub. Powered by SHC.AI
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App