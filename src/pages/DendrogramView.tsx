import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel, Info, Calendar, User, Hash } from '@phosphor-icons/react'

export function DendrogramView() {
  const navigate = useNavigate()
  const { serviceId } = useParams()

  // Mock service data based on the snapshot
  const mockService = {
    id: '3501115',
    name: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
    totalRecords: 50,
    provisionTypes: 8,
    uniqueOptions: 15,
    created: '2025-08-24 03:48:15',
    createdBy: 'Mark',
    description: 'Primary Care Provider office visits and outpatient consultations categorized under professional services'
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const handleBackToPhase1 = () => {
    navigate('/phase1-services')
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
          <p className="text-sm text-muted-foreground">Service ID: 
            <span className="font-semibold text-foreground ml-1">
              {mockService.id}
            </span>
          </p>
        </div>
      </div>

      {/* Data Context Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg text-foreground mb-1">Data Context</CardTitle>
              <p className="text-sm text-muted-foreground">Service snapshot and metadata information</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Service Details Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Service Information */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Hash className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Service ID</div>
                    <div className="text-sm font-semibold text-foreground">{mockService.id}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TreeStructure className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Service Name</div>
                    <div className="text-sm font-medium text-foreground leading-5">{mockService.name}</div>
                  </div>
                </div>
              </div>

              {/* Creation Details */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Created</div>
                    <div className="text-sm font-medium text-foreground">{mockService.created}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Created By</div>
                    <div className="text-sm font-medium text-foreground">{mockService.createdBy}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Summary */}
            <div className="pt-2 border-t border-border/50">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <ChartLine className="w-3 h-3 mr-1" />
                    {mockService.totalRecords} Records
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    <Funnel className="w-3 h-3 mr-1" />
                    {mockService.provisionTypes} Provision Types
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    <TreeStructure className="w-3 h-3 mr-1" />
                    {mockService.uniqueOptions} Unique Options
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Three Dendrogram Views */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provision X-ray #1 */}
        <Card className="bg-white border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TreeStructure className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Provision X-ray #1</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Service ID/Name + Provision Type + Options
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
            <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <TreeStructure className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Full Hierarchy Dendrogram
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                Comprehensive dendrogram showing relationships between Service ID/Name, Provision Type, and Options
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="btn-gradient-primary cursor-pointer">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provision X-ray #2 */}
        <Card className="bg-white border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Funnel className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Provision X-ray #2</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Provision Type + Options
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
            <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Funnel className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Type-Option Dendrogram
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                Focused dendrogram analyzing relationships between Provision Types and their Options
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="btn-gradient-primary cursor-pointer">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provision X-ray #3 */}
        <Card className="bg-white border border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <ChartLine className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Provision X-ray #3</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Options Only
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
            <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <ChartLine className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Options Dendrogram
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                Simplified dendrogram focusing exclusively on Option relationships and patterns
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="btn-gradient-primary cursor-pointer">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Configuration */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Dendrogram Configuration</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Analysis Settings</h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="text-foreground font-medium">Ward Linkage</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="text-foreground font-medium">Euclidean</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Threshold:</span>
                  <span className="text-foreground font-medium">0.75</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Export Options</h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="text-foreground font-medium">PNG/SVG/PDF</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Resolution:</span>
                  <span className="text-foreground font-medium">300 DPI</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="text-foreground font-medium">A4 Landscape</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
            onClick={handleBackToPhase1}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </div>
        <Button className="btn-gradient-primary cursor-pointer">
          <Download className="w-4 h-4 mr-2" />
          Export All Analysis
        </Button>
      </div>
    </div>
  )
}