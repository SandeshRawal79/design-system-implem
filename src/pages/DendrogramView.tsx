import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel, Info, Calendar, User, Hash, Circle } from '@phosphor-icons/react'

export function DendrogramView() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  
  // State for cluster distance inputs
  const [clusterDistance1, setClusterDistance1] = useState('')
  const [clusterDistance2, setClusterDistance2] = useState('')
  const [clusterDistance3, setClusterDistance3] = useState('')
  
  // Handler for cluster distance analysis
  const handleClusterAnalysis = (dendrogramType: 1 | 2 | 3, distance: string) => {
    if (!distance || isNaN(parseFloat(distance))) {
      alert('Please enter a valid distance value')
      return
    }
    
    // Navigate to clusters view with parameters
    navigate(`/clusters/${serviceId}?dendrogram=${dendrogramType}&distance=${distance}`)
  }

  // Mock service data based on the snapshot
  const mockService = {
    id: '3501115',
    createdBy: 'Marcel Martinez',
    name: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
    createdDate: '12/12/2024',
    provisionTypes: 8,
    totalRecords: 1246,
    options: 'Telehealth, In-Person, Emergency Coverage',
    context: {
      phase: 'Phase 1 - Service Classification',
      analysisDepth: 'Deep Structure Analysis',
      dataPoints: 3742,
      relationships: 156
    }
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const handleBackToPhase1 = () => {
    navigate('/phase1-services')
  }

  return (
    <div className="space-y-6">
      {/* Page Header - Compact with better alignment */}
      <div className="page-header-compact">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="back-to-dashboard text-primary hover:text-primary/80 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">
              Dendrogram Analysis - Service #{serviceId}
            </h1>
            <span className="subtitle-separator hidden sm:inline">|</span>
            <p className="text-sm text-muted-foreground subtitle-inline">
              Generated {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Data Context Section */}
      <Card className="bg-card border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-secondary" />
            </div>
            <CardTitle className="text-lg font-semibold">Service Context & Data Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Service ID</div>
                    <div className="text-sm text-muted-foreground">{mockService.id}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2">
                  <TreeStructure className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Provision Types</div>
                    <div className="text-sm text-muted-foreground">{mockService.provisionTypes}</div>
                  </div>
                </div>
              </div>
              {/* Creator Information */}
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Created By</div>
                    <div className="text-sm text-muted-foreground">{mockService.createdBy}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Created Date</div>
                    <div className="text-sm text-muted-foreground">{mockService.createdDate}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Service Name and Options */}
            <div className="border-t border-border pt-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Service Name</div>
                  <div className="text-sm text-muted-foreground">{mockService.name}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm font-medium text-foreground">Options:</div>
                  <div className="text-sm text-muted-foreground">{mockService.options}</div>
                </div>
              </div>
            </div>
            {/* Analysis Context */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Analysis Phase</div>
                  <div className="text-sm text-muted-foreground">{mockService.context.phase}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Depth Level</div>
                  <div className="text-sm text-muted-foreground">{mockService.context.analysisDepth}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Data Points</div>
                  <div className="text-sm text-muted-foreground">{mockService.context.dataPoints.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Relationships</div>
                  <div className="text-sm text-muted-foreground">{mockService.context.relationships}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Three Dendrogram Views */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provision X-ray #1 */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TreeStructure className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Provision X-ray #1</CardTitle>
                  <p className="text-sm text-muted-foreground">Service ID/Name + Provision Type + Options</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="cursor-pointer hover:bg-muted">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer hover:bg-muted">
                  <Gear className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <TreeStructure className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Dendrogram visualization will be generated here</p>
                  <p className="text-xs mt-1">Full hierarchy: Service → Provision Type → Options</p>
                </div>
              </div>
              
              {/* Cluster Distance Control */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <label htmlFor="cluster-distance-1" className="block text-xs font-medium text-foreground mb-1">
                      See clusters at distance:
                    </label>
                    <Input
                      id="cluster-distance-1"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={clusterDistance1}
                      onChange={(e) => setClusterDistance1(e.target.value)}
                      placeholder="0.75"
                      className="text-sm h-8"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleClusterAnalysis(1, clusterDistance1)}
                    className="btn-gradient-secondary cursor-pointer table-action-btn mt-5"
                  >
                    <Circle className="w-4 h-4 mr-1" />
                    View Clusters
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="btn-gradient-primary cursor-pointer table-action-btn">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="cursor-pointer table-action-btn">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provision X-ray #2 */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <ChartLine className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Provision X-ray #2</CardTitle>
                  <p className="text-sm text-muted-foreground">Provision Type + Options</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="cursor-pointer hover:bg-muted">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer hover:bg-muted">
                  <Gear className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ChartLine className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Dendrogram visualization will be generated here</p>
                  <p className="text-xs mt-1">Mid-level hierarchy: Provision Type → Options</p>
                </div>
              </div>
              
              {/* Cluster Distance Control */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <label htmlFor="cluster-distance-2" className="block text-xs font-medium text-foreground mb-1">
                      See clusters at distance:
                    </label>
                    <Input
                      id="cluster-distance-2"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={clusterDistance2}
                      onChange={(e) => setClusterDistance2(e.target.value)}
                      placeholder="0.75"
                      className="text-sm h-8"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleClusterAnalysis(2, clusterDistance2)}
                    className="btn-gradient-secondary cursor-pointer table-action-btn mt-5"
                  >
                    <Circle className="w-4 h-4 mr-1" />
                    View Clusters
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="btn-gradient-primary cursor-pointer table-action-btn">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="cursor-pointer table-action-btn">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provision X-ray #3 */}
        <Card className="bg-card border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Funnel className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">Provision X-ray #3</CardTitle>
                  <p className="text-sm text-muted-foreground">Options</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="cursor-pointer hover:bg-muted">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="cursor-pointer hover:bg-muted">
                  <Gear className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Funnel className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Dendrogram visualization will be generated here</p>
                  <p className="text-xs mt-1">Options-focused analysis</p>
                </div>
              </div>
              
              {/* Cluster Distance Control */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <label htmlFor="cluster-distance-3" className="block text-xs font-medium text-foreground mb-1">
                      See clusters at distance:
                    </label>
                    <Input
                      id="cluster-distance-3"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={clusterDistance3}
                      onChange={(e) => setClusterDistance3(e.target.value)}
                      placeholder="0.75"
                      className="text-sm h-8"
                    />
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleClusterAnalysis(3, clusterDistance3)}
                    className="btn-gradient-secondary cursor-pointer table-action-btn mt-5"
                  >
                    <Circle className="w-4 h-4 mr-1" />
                    View Clusters
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="btn-gradient-primary cursor-pointer table-action-btn">
                  <ChartLine className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button size="sm" variant="outline" className="cursor-pointer table-action-btn">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Configuration */}
      <Card className="bg-muted/30 border border-border">
        <CardHeader className="pb-4">
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
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="cursor-pointer back-to-dashboard"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleBackToPhase1}
            className="cursor-pointer back-to-dashboard"
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