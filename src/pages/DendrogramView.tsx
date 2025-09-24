import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Gear, Eye } from '@phosphor-icons/react'

export function DendrogramView() {
  const navigate = useNavigate()
  const { serviceId } = useParams()

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const handleBackToPhase1 = () => {
    navigate('/phase1-services')
  }

  // Mock service data - in a real app, this would be fetched based on serviceId
  const mockService = {
    id: serviceId || 'SVC001',
    name: 'User Authentication Service',
    totalRecords: 15420,
    groups: 8,
    complexity: 'High'
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
              <p className="text-sm text-muted-foreground">Service Name:</p>
              <span className="text-sm font-medium text-foreground">
                {mockService.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockService.totalRecords.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Gear className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Service Groups</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockService.groups}
                </p>
              </div>
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Complexity</p>
                <p className="text-2xl font-bold text-accent">
                  {mockService.complexity}
                </p>
              </div>
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Gear className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dendrogram Visualization Card */}
      <Card className="min-h-[600px] mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-foreground">
              Dendrogram Visualization
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Interactive View
              </Badge>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Gear className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Gear className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Dendrogram Analysis Ready
              </h3>
              <p className="text-muted-foreground max-w-md">
                Interactive visualization showing hierarchical relationships between different provision groups and service dependencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="btn-gradient-primary cursor-pointer">
                  Generate Visualization
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Configure Parameters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Analysis Information */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">Analysis Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Clustering Method:</span>
                <span className="ml-2 font-medium text-foreground">Hierarchical</span>
              </div>
              <div>
                <span className="text-muted-foreground">Distance Metric:</span>
                <span className="ml-2 font-medium text-foreground">Euclidean</span>
              </div>
              <div>
                <span className="text-muted-foreground">Linkage Criteria:</span>
                <span className="ml-2 font-medium text-foreground">Ward</span>
              </div>
              <div>
                <span className="text-muted-foreground">Optimal Clusters:</span>
                <span className="ml-2 font-medium text-foreground">{mockService.groups}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" className="cursor-pointer">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleBackToPhase1}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
        <Button className="btn-gradient-primary cursor-pointer">
          Export Analysis
        </Button>
      </div>
    </div>
  )
}