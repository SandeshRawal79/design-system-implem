import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Graph, Info, Hash, Users, TreeStructure } from '@phosphor-icons/react'

export function Clusters() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const location = useLocation()
  
  // Get distance from URL parameters
  const searchParams = new URLSearchParams(location.search)
  const distance = searchParams.get('distance') || '0.5'

  // Mock cluster data based on the distance threshold
  const mockClusters = [
    {
      id: 1,
      name: 'Telehealth Services',
      size: 23,
      distance: parseFloat(distance),
      description: 'Remote consultation and virtual care provisions',
      members: [
        'Video Consultation - Specialist',
        'Remote Monitoring - Chronic Care',
        'Telehealth Follow-up - Primary Care'
      ],
      characteristics: ['Virtual', 'Technology-enabled', 'Remote access']
    },
    {
      id: 2,
      name: 'Emergency Care',
      size: 18,
      distance: parseFloat(distance),
      description: 'Urgent and emergency medical services',
      members: [
        'Emergency Room Visit',
        'Urgent Care - After Hours',
        'Emergency Consultation'
      ],
      characteristics: ['Immediate', 'Critical care', '24/7 availability']
    },
    {
      id: 3,
      name: 'Routine Office Visits',
      size: 31,
      distance: parseFloat(distance),
      description: 'Standard in-person consultations and checkups',
      members: [
        'Annual Physical Exam',
        'Follow-up Visit - Chronic Condition',
        'Preventive Care Consultation'
      ],
      characteristics: ['In-person', 'Scheduled', 'Preventive']
    }
  ]

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToDendrogram}
            className="text-primary hover:text-primary/80 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dendrogram
          </Button>
          <div className="text-xl font-semibold text-foreground">
            Clusters at Distance {distance} - Service #{serviceId}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Generated {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Cluster Analysis Summary */}
      <Card className="bg-white border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Graph className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="text-lg">Cluster Analysis Summary</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Distance Threshold</div>
                <div className="text-sm text-muted-foreground">{distance}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TreeStructure className="w-4 h-4 text-secondary" />
              <div>
                <div className="text-sm font-medium text-foreground">Clusters Found</div>
                <div className="text-sm text-muted-foreground">{mockClusters.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <div>
                <div className="text-sm font-medium text-foreground">Total Items</div>
                <div className="text-sm text-muted-foreground">{mockClusters.reduce((sum, cluster) => sum + cluster.size, 0)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">Clustering Method</div>
                <div className="text-sm text-muted-foreground">Ward Linkage</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clusters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockClusters.map((cluster) => (
          <Card key={cluster.id} className="bg-white border border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{cluster.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Cluster {cluster.id}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {cluster.size} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">{cluster.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Members</h4>
                    <div className="space-y-1">
                      {cluster.members.slice(0, 3).map((member, index) => (
                        <div key={index} className="text-xs text-muted-foreground pl-2 border-l-2 border-muted">
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Characteristics</h4>
                    <div className="flex flex-wrap gap-1">
                      {cluster.characteristics.map((char, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <Button size="sm" variant="outline" className="w-full cursor-pointer">
                  <Info className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
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
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dendrogram
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="cursor-pointer">
            <Graph className="w-4 h-4 mr-2" />
            Try Different Distance
          </Button>
          <Button className="btn-gradient-primary cursor-pointer">
            <TreeStructure className="w-4 h-4 mr-2" />
            Export Clusters
          </Button>
        </div>
      </div>
    </div>
  )
}