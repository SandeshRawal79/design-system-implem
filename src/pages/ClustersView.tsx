import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Users, ChartBar, TreeStructure } from '@phosphor-icons/react'
import { PageLayout } from '@/components/PageLayout'

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
      avgDistance: 0.28
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
      name: 'Administrative Services',
      size: 189,
      items: ['Urgent Care', 'After-hours Coverage', 'Emergency Consultations'],
      cohesion: 0.72,
      avgDistance: 0.42
    },
    {
      id: 4,
      name: 'Specialty Referrals',
      size: 267,
      items: ['Cardiology Referrals', 'Dermatology Referrals', 'Orthopedics Referrals'],
      cohesion: 0.91,
      avgDistance: 0.28
    },
    {
      id: 5,
      name: 'Preventive Care',
      size: 178,
      items: ['Annual Physicals', 'Vaccinations', 'Health Screenings'],
      cohesion: 0.88,
      avgDistance: 0.35
    }
  ]

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const getCohesionBadgeVariant = (cohesion: number) => {
    if (cohesion >= 0.8) return 'default' as const
    if (cohesion >= 0.6) return 'secondary' as const
    return 'outline' as const
  }

  const getCohesionColor = (cohesion: number) => {
    if (cohesion >= 0.8) return 'text-green-600'
    if (cohesion >= 0.6) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <PageLayout
      title={`Clusters Analysis`}
      subtitle={`Service ${serviceId} | Distance threshold: ${distance}`}
      showBackButton={true}
    >
      {/* Summary Card */}
      <Card className="bg-white border border-border mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Cluster Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {mockClusters.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Clusters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {mockClusters.reduce((sum, cluster) => sum + cluster.size, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {distance}
              </div>
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
            <Card key={cluster.id} className="bg-white border border-border hover:border-primary/30 transition-colors cursor-pointer">
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
      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleBackToDendrogram}
            className="cursor-pointer"
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
    </PageLayout>
  )
}