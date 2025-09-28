import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Phase1Services } from './pages/Phase1Services'
import { ServiceGroups } from './pages/ServiceGroups'
import { AbcdSets } from './pages/AbcdSets'
import { AbcdPage } from './pages/AbcdPage'
import { DendrogramView } from './pages/DendrogramView'
import { ClustersView } from './pages/ClustersView'
import { ClusterDetails } from './pages/ClusterDetails'

function AppContent() {
  const location = useLocation()
  
  // Check if we're on a cluster details page to pass cluster info to header
  const isClusterDetailsPage = location.pathname.includes('/clusters/') && location.pathname.includes('/cluster/')
  
  // Extract cluster info from URL if on cluster details page
  const clusterInfo = isClusterDetailsPage ? {
    clusterId: location.pathname.split('/cluster/')[1] || '1',
    totalClusters: 1,
    xrayProjection: 'Only Options (D)',
    recordsInCluster: 225,
    created: '2023-03-16 10:56:57',
    serviceId: location.pathname.split('/clusters/')[1]?.split('/cluster/')[0] || ''
  } : undefined

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header clusterInfo={clusterInfo} />
      
      {/* Main Content Area - Full width for tables, optimized for 1920x1080 with exact 32px outer margin */}
      <main className="flex-1 px-8 py-6 lg:py-8">
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
      
      {/* Compact Footer with exact specifications */}
      <footer className="border-t border-border bg-white px-8 flex items-center justify-center mt-auto" style={{ height: '24px' }}>
        <p className="text-muted-foreground text-center" style={{ fontSize: 'var(--font-caption)' }}>
          © 2024 Provision Intelligence Hub. Powered by SHC.AI
        </p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App