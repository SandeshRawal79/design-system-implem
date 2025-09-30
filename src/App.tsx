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
import { TableHeaderProvider } from './contexts/TableHeaderContext'

function AppContent() {
  const location = useLocation()
  
  // Check if we're on a cluster details page to pass cluster info to header
  const isClusterDetailsPage = location.pathname.includes('/clusters/') && location.pathname.includes('/cluster/')
  
  // Check if we're on the ABCD page to show the dashboard title
  const isAbcdPage = location.pathname === '/abcd'
  
  // Check if we're on Phase1Services page to show the ABCD Dashboard title
  const isPhase1ServicesPage = location.pathname === '/phase1-services'
  
  // Check if we're on Service Groups page to show the Service Groups title
  const isServiceGroupsPage = location.pathname === '/service-groups'
  
  // Extract cluster info from URL if on cluster details page
  const clusterInfo = isClusterDetailsPage ? {
    clusterId: location.pathname.split('/cluster/')[1] || '1',
    totalClusters: 1,
    xrayProjection: 'Only Options (D)',
    recordsInCluster: 25,
    created: '2023-03-16 10:56:57',
    serviceId: location.pathname.split('/clusters/')[1]?.split('/cluster/')[0] || ''
  } : undefined
  
  // Set page title for different pages
  const pageTitle = (() => {
    if (isAbcdPage || isPhase1ServicesPage) return 'ABCD Dashboard (Phase 1 Services)'
    if (isServiceGroupsPage) return 'Service Groups'
    return undefined
  })()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header clusterInfo={clusterInfo} pageTitle={pageTitle} />
      
      {/* Main Content Area */}
      <main className="flex-1 py-6 lg:py-8">
        {/* Conditional layout - Full width for ClusterDetails, constrained for others */}
        {isClusterDetailsPage ? (
          <Routes>
            <Route path="/clusters/:serviceId/cluster/:clusterId" element={<ClusterDetails />} />
          </Routes>
        ) : (
          <div className="max-w-screen-2xl mx-auto px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/phase1-services" element={<Phase1Services />} />
              <Route path="/service-groups" element={<ServiceGroups />} />
              <Route path="/abcd-sets" element={<AbcdSets />} />
              <Route path="/abcd" element={<AbcdPage />} />
              <Route path="/dendrogram/:serviceId" element={<DendrogramView />} />
              <Route path="/clusters/:serviceId" element={<ClustersView />} />
            </Routes>
          </div>
        )}
      </main>
      
      {/* Compact Footer with exact specifications and dynamic layout constraint */}
      <footer className="border-t border-border bg-white mt-auto" style={{ height: '24px' }}>
        <div className={`${isClusterDetailsPage ? 'px-8' : 'max-w-screen-2xl mx-auto px-8'} flex items-center justify-center h-full`}>
          <p className="text-muted-foreground text-center" style={{ fontSize: 'var(--font-caption)' }}>
            © 2024 Provision Intelligence Hub. Powered by SHC.AI
          </p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <TableHeaderProvider>
        <AppContent />
      </TableHeaderProvider>
    </Router>
  )
}

export default App