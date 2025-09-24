import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel } from '@phosphor-icons/react'
import { useParams, useNavigate } from 'react-router-dom'

export function DendrogramView() {
  const { serviceId } = useParams()
  const navigate = useNavigate()

  const handleBackToPhase1 = () => {
    navigate('/phase1-services')
  }

  // Service data from Provision X-ray
  const serviceData = {
    id: serviceId || '3501115',
    name: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
    totalRecords: 2847,
    complexity: 'High',
    groups: 12,
    created: '2025-08-24 03:48:15',
    createdBy: 'Mark'
  }

  return (
    <div className="page-layout-full-width space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="page-header-compact">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="back-to-dashboard cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="h-6 w-px bg-border" />
          <Button 
            variant="ghost"
            onClick={handleBackToPhase1}
            className="text-primary hover:text-primary/80 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Phase1 Services
          </Button>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <h1 className="text-h3-responsive font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Provision X-ray
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">Service: 
            <span className="font-semibold text-foreground ml-1">
              {serviceData.id}
            </span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="font-medium text-primary">
              {serviceData.name}
            </span>
          </p>
        </div>
      </div>

      {/* Data Context Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              <span className="font-semibold">Data context:</span> id={serviceData.id}, name={serviceData.name}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Created:</span> {serviceData.created}, <span className="font-semibold">By:</span> {serviceData.createdBy}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Service Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold text-foreground">{serviceData.totalRecords.toLocaleString()}</p>
              </div>
              <Eye className="w-5 h-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Service Groups</p>
                <p className="text-2xl font-bold text-foreground">{serviceData.groups}</p>
              </div>
              <TreeStructure className="w-5 h-5 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Complexity</p>
                <p className="text-2xl font-bold text-foreground">{serviceData.complexity}</p>
              </div>
              <Gear className="w-5 h-5 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Provision X-ray Analysis
        </h2>
        <p className="text-muted-foreground">
          Three-dimensional analysis of provision patterns and service dependencies
        </p>
      </div>

      {/* Provision X-ray #1: Service ID/Name + Provision Type + Options */}
      <Card className="intelligence-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TreeStructure className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Provision X-ray #1
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projection = Service ID/Name + Provision Type + Options
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Full Context
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
                <TreeStructure className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Dendrogram #1: Full Service Context
              </h3>
              <p className="text-muted-foreground max-w-md">
                Comprehensive dendrogram showing relationships between services, provision types, and configuration options.
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
        </CardContent>
      </Card>

      {/* Provision X-ray #2: Provision Type + Options */}
      <Card className="intelligence-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChartLine className="w-5 h-5 text-secondary" />
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Provision X-ray #2
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projection = Provision Type + Options
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Type Analysis
              </Badge>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <ChartLine className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Dendrogram #2: Provision Type Analysis
              </h3>
              <p className="text-muted-foreground max-w-md">
                This view abstracts away service-specific details to reveal patterns in provision types and their associated options.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="btn-gradient-secondary cursor-pointer">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate Analysis
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Provision X-ray #3: Options */}
      <Card className="intelligence-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Funnel className="w-5 h-5 text-accent" />
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Provision X-ray #3
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projection = Options
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Options Focus
              </Badge>
              <Button size="sm" variant="ghost" className="cursor-pointer">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Funnel className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Dendrogram #3: Options Analysis
              </h3>
              <p className="text-muted-foreground max-w-md">
                Pure options clustering to identify common configuration patterns across all services and provision types.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="btn-gradient-primary cursor-pointer">
                  <Funnel className="w-4 h-4 mr-2" />
                  Analyze Options
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  View Patterns
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <h4 className="font-medium text-foreground mb-4">Analysis Parameters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-3">
              <h5 className="font-medium text-foreground">Clustering Method</h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Algorithm:</span>
                  <span className="font-medium text-foreground">Hierarchical</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="font-medium text-foreground">Euclidean</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Linkage:</span>
                  <span className="font-medium text-foreground">Ward</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium text-foreground">Data Scope</h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Records:</span>
                  <span className="font-medium text-foreground">{serviceData.totalRecords.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Groups:</span>
                  <span className="font-medium text-foreground">{serviceData.groups}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complexity:</span>
                  <span className="font-medium text-foreground">{serviceData.complexity}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium text-foreground">Output Options</h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium text-foreground">Interactive SVG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Export:</span>
                  <span className="font-medium text-foreground">PNG, PDF, JSON</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zoom:</span>
                  <span className="font-medium text-foreground">Enabled</span>
                </div>
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