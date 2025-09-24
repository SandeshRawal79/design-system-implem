import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
  const { serviceId } = useParams()

  // Mock clusters data
    {
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
    {
    },
    }
      id: 2,
      name: 'Telehealth Services',
      size: 312,
      items: ['Virtual Consultations', 'Remote Monitoring', 'Digital Follow-ups'],
      cohesion: 0.78,
      avgDistance: 0.31
    },
    {
      id: 3,
      name: 'Administrative Servi
      size: 189,
      items: ['Urgent Care', 'After-hours Coverage', 'Emergency Consultations'],
      cohesion: 0.92,
  ]
    },
    n
      id: 4,
      name: 'Specialized Procedures',
      size: 156,
      items: ['Diagnostic Services', 'Treatment Planning', 'Specialty Referrals'],
      cohesion: 0.71,
      avgDistance: 0.42
    },

      id: 5,
      name: 'Administrative Services',
      size: 89,
      items: ['Documentation', 'Billing Coordination', 'Insurance Processing'],
      cohesion: 0.65,
      {/* Page Header -
    }
   

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
   

  const handleBackToDashboard = () => {
    navigate('/')
   

              <div className="text-2xl font-bold t
              </div>
            </div>
        </CardContent>


          <h3 className="text-lg font-semibold text-foreg
            {mockClusters.length} cluster
        </div>
        <div className="
   

          
                    </div>
                      <h4
                    </div>
                  <div className="flex items-cent
                  
                    <Badge v
                    </Badge>
                </div>
           
                    <div className="text-sm font-m
                     
                   
                      ))}
                  </div>
                
              
                    </div>
                      <span className="text-sm text-mut
                        {(cluster.cohesion
              
              
            

            </Card>
        </div>

      <div className="flex justify-between items-ce
          <Button 
            onClick={handleBackToDashboard}
          >
            Back to Dashboard
          <Butto
            onClick={
          >
            Back to Dendrogram
        </div>
          <ChartBar className="w-4 h-4 mr-2" />
        </Button>
    </div>
}











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
    </div>
  )
}