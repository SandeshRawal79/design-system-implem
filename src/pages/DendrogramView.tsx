import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel } from '@phosphor-icons/react'

export function DendrogramView() {
  const navigate = useNavigate()

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const handleBackToPhase1 = () => {
    navigate('/phase1-services')
  }

  // Mock service data
  const mockService = {
    id: 'SVC-001',
    name: 'User Authentication Service',
    totalRecords: 45672,
    provisionTypes: 8,
    uniqueOptions: 15
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost"
            onClick={handleBackToDashboard}
            className="text-primary hover:text-primary/80 cursor-pointer"
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
          <h1 className="text-h3-responsive font-bold text-foreground">
            Provision X-ray Analysis
          </h1>
          <p className="text-sm text-muted-foreground">Service: 
            <span className="font-semibold text-foreground ml-1">
              {mockService.id}
            </span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="font-medium text-primary">
              {mockService.name}
            </span>
          </p>
        </div>
      </div>

      {/* Service Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold text-foreground">{mockService.totalRecords.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TreeStructure className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Provision Types</p>
                <p className="text-2xl font-bold text-foreground">{mockService.provisionTypes}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Funnel className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="metric-card-compact">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unique Options</p>
                <p className="text-2xl font-bold text-foreground">{mockService.uniqueOptions}</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <ChartLine className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Three Dendrogram Views */}
      <div className="grid grid-cols-1 gap-6">
        {/* Provision X-ray #1 */}
        <Card className="intelligence-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TreeStructure className="w-5 h-5 text-primary" />
                </div>
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
                <Badge variant="secondary">Full Context</Badge>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Gear className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <TreeStructure className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Dendrogram Placeholder
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                Comprehensive dendrogram showing relationships between Service ID/Name, Provision Type, and Options
              </p>
              <div className="flex gap-2">
                <Button className="btn-gradient-primary cursor-pointer">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate Analysis
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provision X-ray #2 */}
        <Card className="intelligence-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Funnel className="w-5 h-5 text-secondary" />
                </div>
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
                <Badge variant="secondary">Type Focus</Badge>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Gear className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Funnel className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Dendrogram Placeholder
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                Focused dendrogram analyzing relationships between Provision Types and their Options
              </p>
              <div className="flex gap-2">
                <Button className="btn-gradient-primary cursor-pointer">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate Analysis
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provision X-ray #3 */}
        <Card className="intelligence-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <ChartLine className="w-5 h-5 text-accent" />
                </div>
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
                <Badge variant="secondary">Options Only</Badge>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer">
                  <Gear className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <ChartLine className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Dendrogram Placeholder
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                Simplified dendrogram showing relationships and patterns within Options only
              </p>
              <div className="flex gap-2">
                <Button className="btn-gradient-primary cursor-pointer">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate Analysis
                </Button>
                <Button variant="outline" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Configuration */}
      <Card className="bg-muted/30">
        <CardHeader>
          <h4 className="text-lg font-semibold text-foreground">Analysis Configuration</h4>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-foreground uppercase tracking-wide">Clustering Parameters</h5>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="text-foreground font-medium">Ward Linkage</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="text-foreground font-medium">Euclidean</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Threshold:</span>
                  <span className="text-foreground font-medium">0.75</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-foreground uppercase tracking-wide">Visualization Options</h5>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="text-foreground font-medium">SVG Vector</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Export:</span>
                  <span className="text-foreground font-medium">PNG, PDF, SVG</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Zoom:</span>
                  <span className="text-foreground font-medium">Interactive</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Button 
          variant="outline" 
          className="cursor-pointer"
        >
          <Download className="w-4 h-4 mr-2" />
          Export All
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