import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel } from '@phosphor-icons/react'

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

      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Provision X-ray Analysis
        </h2>
        <p className="text-muted-foreground">
          Hierarchical clustering analysis across different projection types to reveal provision patterns and relationships.
        </p>
      </div>

      {/* Provision X-ray #1: Service ID/Name + Provision Type + Options */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <TreeStructure className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Provision X-ray #1
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projection = Service ID/Name + Provision Type + Options
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                Full Context
              </Badge>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="min-h-[400px] bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto">
                <TreeStructure className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Complete Service Analysis
              </h3>
              <p className="text-muted-foreground max-w-lg">
                Comprehensive dendrogram showing relationships between services, provision types, and their available options. 
                This view provides the most detailed clustering analysis including all contextual information.
              </p>
              <div className="flex gap-3 justify-center">
                <Button className="btn-gradient-primary cursor-pointer">
                  <TreeStructure className="w-4 h-4 mr-2" />
                  Generate Dendrogram
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provision X-ray #2: Provision Type + Options */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                <ChartLine className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Provision X-ray #2
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projection = Provision Type + Options
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-secondary/5 text-secondary border-secondary/20">
                Type-Focused
              </Badge>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="min-h-[400px] bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg border border-secondary/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto">
                <ChartLine className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Provision Type Analysis
              </h3>
              <p className="text-muted-foreground max-w-lg">
                Focused clustering analysis examining the relationship between provision types and their available options.
                This view abstracts away service-specific details to reveal provision patterns across the system.
              </p>
              <div className="flex gap-3 justify-center">
                <Button className="bg-secondary hover:bg-secondary/90 text-white cursor-pointer">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate Dendrogram
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provision X-ray #3: Options Only */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Funnel className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Provision X-ray #3
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projection = Options
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-accent/5 text-accent border-accent/20">
                Options-Only
              </Badge>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="min-h-[400px] bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg border border-accent/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent/15 rounded-full flex items-center justify-center mx-auto">
                <Funnel className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Options Analysis
              </h3>
              <p className="text-muted-foreground max-w-lg">
                Pure options clustering analysis showing relationships and patterns between different provision options.
                This highly focused view reveals the core option relationships without contextual noise.
              </p>
              <div className="flex gap-3 justify-center">
                <Button className="bg-accent hover:bg-accent/90 text-white cursor-pointer">
                  <Funnel className="w-4 h-4 mr-2" />
                  Generate Dendrogram
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Gear className="w-5 h-5 text-primary" />
            Analysis Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Clustering Method</h4>
              <p className="text-sm text-muted-foreground">Hierarchical Agglomerative Clustering</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Distance Metric</h4>
              <p className="text-sm text-muted-foreground">Euclidean Distance</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Linkage Criteria</h4>
              <p className="text-sm text-muted-foreground">Ward Linkage</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Total Records</h4>
              <p className="text-sm text-muted-foreground">{mockService.totalRecords.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Optimal Clusters</h4>
              <p className="text-sm text-muted-foreground">{mockService.groups}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Complexity Level</h4>
              <Badge variant="outline" className="text-accent border-accent/20">
                {mockService.complexity}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button className="btn-gradient-primary cursor-pointer">
          <TreeStructure className="w-4 h-4 mr-2" />
          Generate All Dendrograms
        </Button>
        <Button variant="outline" className="cursor-pointer">
          <Download className="w-4 h-4 mr-2" />
          Download Complete Report
        </Button>
        <Button 
          variant="ghost" 
          onClick={handleBackToPhase1}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
      </div>
    </div>
  )
}