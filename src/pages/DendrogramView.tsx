import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText, Layers, Settings } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

export function DendrogramView() {
  const navigate = useNavigate()
  const { serviceId } = useParams()

  // Mock service data (would normally be fetched based on serviceId)
  const mockService = {
    id: serviceId || '3501115',
    name: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
    totalRecords: 50
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const handleBackToPhase1 = () => {
    navigate('/phase1-services')
  }

  return (
    <div className="page-layout-full-width">
      {/* Page Header with Back Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleBackToDashboard}
            className="back-to-dashboard cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="h-6 w-px bg-border" />
          <Button
            variant="ghost"
            onClick={handleBackToPhase1}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Phase 1 Services
          </Button>
        </div>
      </div>

      {/* Page Title and Service Info */}
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h1 className="text-h3-responsive font-bold text-foreground mb-2">
              Dendrogram Analysis
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground">Service ID:</p>
              <Badge variant="secondary" className="font-mono">
                {mockService.id}
              </Badge>
              <span className="subtitle-separator">|</span>
              <p className="text-sm text-muted-foreground">Records:</p>
              <Badge variant="outline">
                {mockService.totalRecords}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Service Name Card */}
        <Card className="mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              Service Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground leading-relaxed">
              {mockService.name}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Provision X-ray Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-base font-semibold text-foreground">
                Provision X-ray 1
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              ProjectionService IDName + Provision Type + Options
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="secondary" className="text-xs">
                  Ready
                </Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Components:</span>
                <span className="text-foreground font-medium">3 layers</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-secondary" />
              </div>
              <CardTitle className="text-base font-semibold text-foreground">
                Provision X-ray 2
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Provision Type + Options
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="secondary" className="text-xs">
                  Ready
                </Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Components:</span>
                <span className="text-foreground font-medium">2 layers</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="text-base font-semibold text-foreground">
                Provision X-ray 3
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Options
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="secondary" className="text-xs">
                  Ready
                </Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Components:</span>
                <span className="text-foreground font-medium">1 layer</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dendrogram Visualization Placeholder */}
      <Card className="min-h-[600px]">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-foreground">
              Dendrogram Visualization
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Interactive View
              </Badge>
              <Button size="sm" variant="outline" className="cursor-pointer">
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Layers className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Dendrogram Analysis Ready
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-6">
              This visualization will display the hierarchical structure and relationships 
              between different provision types and options for service {mockService.id}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="btn-gradient-primary cursor-pointer">
                Generate Visualization
              </Button>
              <Button variant="outline" className="cursor-pointer">
                View Raw Data
              </Button>
            </div>
            <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> The interactive dendrogram will be rendered here once data processing is complete.
                This analysis includes {mockService.totalRecords} records across multiple provision layers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        <div className="flex gap-3">
          <Button variant="outline" className="cursor-pointer">
            Download Report
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Share Analysis
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleBackToPhase1} className="cursor-pointer">
            Back to Services
          </Button>
          <Button className="btn-gradient-primary cursor-pointer">
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  )
}