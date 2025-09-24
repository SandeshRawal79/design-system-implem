import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel } from '@phosphor-icons/react'
  const navigate = useNavigate()

  }
  // Service data from Provision X-
  const navigate = useNavigate()

  const handleBackToPhase1 = () => {
    navigate('/phase1-services')
  }

  // Mock service data
  const mockService = {
            onClick={() => nav
          >
            Dashboard
          <div classNam
            va
   

          

          <div className=
              <span className="text-white text-xs font-bo
            <h1 className="text-h3-responsive
            </h1>
          <p className="text
              {serviceData.id}
            <span className="mx-2 text-muted-foreground"
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
            <div className="flex items-
            <div className="flex items-center justify-between">
                <p 
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold text-foreground">{mockService.totalRecords.toLocaleString()}</p>
                  Pr
              </div>
            <div c
                Full Con
              <
              </Button>
          </div>
        <CardContent className="p-6">
            <div cl
                <TreeStructure className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
              </h3>
                Comprehensive dendrogram showing relationships bet
              <div
                  Genera
               
                </Button>
            </div>
        </CardContent>

      <Card className="intelligence-card">
          <div className="flex items-center justify-between">
              <Chart
                <CardTitle className="text-xl font-sem
                </
                  Projec
              <
            

              <Button size="
              </Button>
          </div>
        <CardContent className="p-
            <
                <ChartLine className="w-8 h-8
              <h3 className="text-lg font-semibold text-foreground">
            
            

                  <ChartLine className="w-4 h-4 mr-2" />
                </Button>
                  Ex
              </div>
          </div>
      </Card>
      {/* Provision
        <CardHeader>
            <div className="flex ite
              <div>
                  Provision X-ray #3
                <p className="text-sm text-muted-foreground">
                </p>
            </div>
              <Bad
              </Badge>
                <Eye className="w-4 h-4" />
            </div>
        </CardHeader>
          <div className="min-h-[400px] bg-muted/20 rounded-lg border-2 bor
              <div className="w-16 h-16 bg-a
              </div>
                De
              <p
              </p>
                <Button className="bt
                  Analyze Options
                <Button variant="outline" className
                </Button>
            </div>
        </CardConten

      <Card className="bg-muted/30">
          <h4 class
            <div className="space-y-3">
              <div className="space-y-1">
                  
                </div>
                  <span className="text-muted-foreground">Distance:</spa
                </div>
                  <span c
                </div>
            </div>
              <h5 classNa
                <div
                  
                
                  <spa
             

              </div>
            <div className="space-y-3">
              <div c
                  <span className="text-muted-foreground">For
                </div>
                  <span className="text-muted-foreground">Expo
                </d
                  <span className="text-muted-foreground">Zoom:</span>
                </div>
            </div>
        </CardContent>

      <div className
          <Download 
        </Button>
          variant="ghost" 
          className="cursor-pointer"
          <ArrowLeft classNam
        </Button>
          Export Analysis
      </div>
  )

















































































































































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