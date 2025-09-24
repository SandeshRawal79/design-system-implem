import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardT
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel } fro
export function DendrogramView() {
  const { serviceId } = useParams()

  }
  const handleBackToPhase1 = () 
  }

    id: serviceId || 'SVC001',
    totalRecords:
   

    <div className="page-layout-full
      <div className="flex items
   

          >
            Dashboard
          <div className="h-6 
            variant="ghost"
            className="t
            <A
          </Button>
   

        <d
            <h1 className="text-h3-responsiv
            </h1>
              <p className="text-sm text-muted-foreground">Ser
                {mockService.id}
              <sp
              <span className
              </span>
          </div>
      </div
      {/* Service Metrics */}
        <Card classNa
            <div cl
                <p className="text-sm text-muted
                 
              </div>
                <Gear className="w-5 h-5
            </div>
        </C
        <Card className="metric-card-compact">
            <div className="
                <p 
              
            

            </div>
        </Card>
        <Card className="metric-card-compact">
            <div className="flex i
                <p className="text-sm text-muted-foreground">Complexity</p>
                  {mockService.co
              </d
                <Gear className="w-5 h-5 text-accent" />
            </div>
        </Card>

      <div className="
          Provision X-ray Analysis
        <p className="text-muted-foreground">
        </p>

      <Card className
          <div cla
              <d
              
            

                  Projection 
              </div>
            <div className="flex items-center 
                Full Context
              <Button size="sm" variant="ghost" className="curs
              </But
          </div>
        <CardContent className="p-6">
            <div className="text-center space-y-4">
                <Tre
              <h3 cl
              </h3>
                Comprehensive dendrogram showing relation
              </p>
                <B
                  Genera
              <

      </Card>
      {/* Provision X-ray #2: Provision
        <CardHeader>
            <div cl
                <ChartLine className="w-5 h-5 text-secondary" />
              <div>
                  Provision X-ray #2
                <p c
                </p>
            </div>
              <Badge variant="outline" className="text-xs 
              </Badg
                <D
            </div>
        </CardH

              <div className="w-16 h-16 bg-sec
              </div>
                Provision Type Analysis
              <p cl
                This view abstracts away service-specific details to reveal
              <div className="flex gap-3 justify-center">
                  <ChartLine className="w-
                </Bu
            </div>
        </CardContent>

      <Card classNam
          <div cla
              <div class
              <
            

                  Projection = Options
              </div>
            <div cla
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
}        </Button>
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