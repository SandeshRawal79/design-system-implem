import { useParams, Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowLeft, 
  faEye, 
  faPlus, 
  faDatabase,
  faChartArea,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { phase1Services } from '../data/serviceData'

export function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>()
  
  if (!serviceId) {
    return <Navigate to="/" replace />
  }

  const service = phase1Services.find(s => s.id === serviceId)
  
  if (!service) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Service Not Found</h2>
            <p className="text-muted-foreground">
              Service with ID "{serviceId}" could not be found.
            </p>
            <Link to="/" className="inline-block mt-4">
              <Button variant="default" className="btn-gradient-primary">
                Return to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Parse service hierarchy from name
  const serviceHierarchy = service.name.split(' -> ')
  const primaryService = serviceHierarchy[serviceHierarchy.length - 1]
  const parentServices = serviceHierarchy.slice(0, -1)

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline" size="sm">
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        
        <Badge variant="secondary" className="bg-success/10 text-success">
          Phase 1 Service
        </Badge>
      </div>

      {/* Service Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono text-sm">
                  ID: {service.id}
                </Badge>
                <Badge className="bg-primary/10 text-primary">
                  <FontAwesomeIcon icon={faDatabase} className="w-3 h-3 mr-1" />
                  {service.totalRecords} Records
                </Badge>
              </div>
              <CardTitle className="text-h3-responsive text-foreground">
                {primaryService}
              </CardTitle>
            </div>
            
            <div className="flex gap-2">
              <Button className="btn-gradient-primary">
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                Create Dendrogram
              </Button>
              <Button variant="outline" className="btn-gradient-secondary">
                <FontAwesomeIcon icon={faEye} className="w-4 h-4 mr-2" />
                View Existing
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Service Hierarchy */}
      {parentServices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-h5 text-foreground flex items-center gap-2">
              <FontAwesomeIcon icon={faChartArea} className="w-4 h-4" />
              Service Hierarchy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {parentServices.map((parent, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs text-muted-foreground font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-foreground font-medium">{parent}</div>
                  </div>
                  {index < parentServices.length - 1 && (
                    <div className="w-4 h-0.5 bg-border"></div>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-medium">
                  {parentServices.length + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-primary font-semibold">{primaryService}</div>
                  <div className="text-xs text-muted-foreground">Current Service</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-h5 text-foreground">Service Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Service ID</div>
              <div className="text-lg font-mono text-foreground">{service.id}</div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Full Service Path</div>
              <div className="text-sm text-foreground leading-relaxed">{service.name}</div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Total Records</div>
              <div className="text-2xl font-bold text-primary">{service.totalRecords.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        {/* Dendrogram Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-h5 text-foreground">Dendrogram Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Create New Dendrogram</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate a new dendrogram visualization for this service's data relationships.
                </p>
                <Button className="w-full btn-gradient-primary">
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                  Create Dendrogram
                </Button>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-foreground">View Existing</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  View previously created dendrograms for this service.
                </p>
                <Button variant="outline" className="w-full btn-gradient-secondary">
                  <FontAwesomeIcon icon={faEye} className="w-4 h-4 mr-2" />
                  View Dendrograms
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h5 text-foreground">Service Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-primary">{service.totalRecords}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Records</div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-secondary">{serviceHierarchy.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Hierarchy Depth</div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-accent">
                {Math.round((service.totalRecords / phase1Services.reduce((sum, s) => sum + s.totalRecords, 0)) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">% of Total</div>
            </div>
            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <div className="text-2xl font-bold text-info">
                {phase1Services.findIndex(s => s.id === service.id) + 1}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Service Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}