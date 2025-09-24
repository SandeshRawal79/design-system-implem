import { Header } from './components/Header'
import { DashboardMetrics } from './components/DashboardMetrics'
import { IntelligenceCatalog } from './components/IntelligenceCatalog'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-8 py-8 max-w-7xl mx-auto">
        <DashboardMetrics />
        <IntelligenceCatalog />
      </main>
      
      <footer className="h-6 border-t border-border bg-white px-8 flex items-center justify-center">
        <p className="text-xs text-muted-foreground">
          © 2024 Provision Intelligence Hub. Powered by SHC.AI
        </p>
      </footer>
    </div>
  )
}

export default App