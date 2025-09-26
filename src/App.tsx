import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Phase1Services } from './pages/Phase1Services'
import { ServiceGroups } from './pages/ServiceGroups'
import { AbcdSets } from './pages/AbcdSets'
import { AbcdPage } from './pages/AbcdPage'
import { DendrogramView } from './pages/DendrogramView'
import { ClustersView } from './pages/ClustersView'
import { ClusterDetails } from './pages/ClusterDetails'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        {/* Main Content Area - Full width for tables, optimized for 1920x1080 */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
          <div className="w-full mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/phase1-services" element={<Phase1Services />} />
              <Route path="/service-groups" element={<ServiceGroups />} />
              <Route path="/abcd-sets" element={<AbcdSets />} />
              <Route path="/abcd" element={<AbcdPage />} />
              <Route path="/dendrogram/:serviceId" element={<DendrogramView />} />
              <Route path="/clusters/:serviceId" element={<ClustersView />} />
              <Route path="/clusters/:serviceId/cluster/:clusterId" element={<ClusterDetails />} />
            </Routes>
          </div>
        </main>
        
        {/* Compact Footer */}
        <footer className="h-6 border-t border-border bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-center mt-auto">
          <p className="text-xs text-muted-foreground text-center">
            © 2024 Provision Intelligence Hub. Powered by SHC.AI
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App