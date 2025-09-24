import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, TreeStructure, Users, ChartBar, Info, Hash, MagnifyingGlass } from '@phosphor-icons/react'

export function ClustersView() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const [searchParams] = useSearchParams()
  const distance = searchParams.get('distance') || '0.5'

  // Mock clusters data
  const mockClusters = [
    {
      id: 1,
      name: 'Primary Care Services',
      size: 423,
      items: ['Office Visits', 'Consultations', 'Routine Check-ups'],
      cohesion: 0.85,
      avgDistance: 0.23
    },
    {
      id: 2,
      name: 'Telehealth Services',
      size: 312,
      items: ['Virtual Consultations', 'Remote Monitoring', 'Digital Follow-ups'],
      cohesion: 0.78,
      avgDistance: 0.31
    },
    {
      id: 3,
      name: 'Emergency Services',
      size: 189,
      items: ['Urgent Care', 'After-hours Coverage', 'Emergency Consultations'],
      cohesion: 0.92,
      avgDistance: 0.18
    },
    {
      id: 4,
      name: 'Specialized Procedures',
      size: 156,
      items: ['Diagnostic Services', 'Treatment Planning', 'Specialty Referrals'],
      cohesion: 0.71,
      avgDistance: 0.42
    },
    {
      id: 5,
      name: 'Administrative Services',
      size: 89,
      items: ['Documentation', 'Billing Coordination', 'Insurance Processing'],
      cohesion: 0.65,
      avgDistance: 0.48
    }
  ]

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const getCohesionColor = (cohesion: number) => {
    if (cohesion >= 0.8) return 'text-success'
    if (cohesion >= 0.7) return 'text-warning'
    return 'text-destructive'
  }

  const getCohesionBadgeVariant = (cohesion: number) => {
    if (cohesion >= 0.8) return 'default'
    if (cohesion >= 0.7) return 'secondary'
    return 'destructive'
  }

  return (
    <div className="space-y-6">
      {/* Page Header - Compact with better alignment */}
      <div className="page-header-compact">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="back-to-dashboard text-primary hover:text-primary/80 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">
              Cluster Analysis - Service #{serviceId}
            </h1>
            <span className="subtitle-separator hidden sm:inline">|</span>
            <p className="text-sm text-muted-foreground subtitle-inline">
              Distance Threshold: {distance}
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Summary */}
      <Card className="bg-card border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-info" />
            </div>
            <CardTitle className="text-lg font-semibold">Cluster Analysis Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{mockClusters.length}</div>
              <div className="text-sm text-muted-foreground">Clusters Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {mockClusters.reduce((sum, cluster) => sum + cluster.size, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{distance}</div>
              <div className="text-sm text-muted-foreground">Distance Threshold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {(mockClusters.reduce((sum, cluster) => sum + cluster.cohesion, 0) / mockClusters.length).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Cohesion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clusters List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Identified Clusters</h3>
          <Badge variant="secondary" className="text-muted-foreground">
            {mockClusters.length} clusters
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mockClusters.map((cluster) => (
            <Card key={cluster.id} className="bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer interactive-element">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{cluster.name}</h4>
                      <p className="text-sm text-muted-foreground">Cluster #{cluster.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getCohesionBadgeVariant(cluster.cohesion)}>
                      {(cluster.cohesion * 100).toFixed(0)}% cohesion
                    </Badge>
                    <Badge variant="outline">
                      {cluster.size} items
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">Cluster Items</div>
                    <div className="flex flex-wrap gap-2">
                      {cluster.items.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-border">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cluster Size:</span>
                      <span className="text-sm font-medium text-foreground">{cluster.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cohesion:</span>
                      <span className={`text-sm font-medium ${getCohesionColor(cluster.cohesion)}`}>
                        {(cluster.cohesion * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Distance:</span>
                      <span className="text-sm font-medium text-foreground">{cluster.avgDistance.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="cursor-pointer back-to-dashboard"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleBackToDendrogram}
            className="cursor-pointer back-to-dashboard"
          >
            <TreeStructure className="w-4 h-4 mr-2" />
            Back to Dendrogram
          </Button>
        </div>
        <Button className="btn-gradient-primary cursor-pointer">
          <ChartBar className="w-4 h-4 mr-2" />
          Export Analysis
        </Button>
      </div>
    </div>
  )
}