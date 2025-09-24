import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Gear, Eye, Tree
export function DendrogramView() {
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel } from '@phosphor-icons/react'

export function DendrogramView() {
  const navigate = useNavigate()

  const mockService = {
    name: 'User A
   

  return (
      {/* Page Header */}
   

            className=
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
          <h1 clas
            variant="ghost"
            onClick={handleBackToDashboard}
            className="text-primary hover:text-primary/80 cursor-pointer"
           
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
      <div className="grid gri
        <Card class
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-primary/10
                </div>
                  <
              
              
            

                <Button size=
                </Button>
                  <Gear className="w-4 h-4" />
              </div>
          </CardHeader>
            <div cl
                <TreeStructure className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
              </h3>
                Comprehensive dendrogram showing relationships between Service ID/Name, Provision T
              <div className="flex gap-2">
                  <C
                </
                  <Downl
               

        </Card>
        {/* Provision X-ray #2 */}
          <CardHeader>
              <div 
                  <Funnel className="w-5 h-5 text-secondary" />
                <div>
                    
                  <p className="text-sm text-muted-foreground">
                  </p>
              </div>
                <B
                  <Eye c
               

            </div>
          <CardContent className="p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded
              </div
                Dendrogram Placeholder
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
              </p>
                <Button className="btn-gradient-primary cursor-pointer">
                  Generate Analysis
                <But
                  
              </div>
          </Car


            <div className="flex ite
                <div className="w-10 h-10 bg-a
                </div>
                  <CardTitle className="text
                  </Ca
                    Projection = Options
                </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="cursor-
                </Butt
                  <Ge
              </div>
          </CardHeader>
            <div className="mi
                <ChartLine className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
              </h3>
                Simpli
              <div c
                  <ChartLine className="w-4 h-4 mr-2" /
                </Button>
                  <Download className="w-4 h-4 mr-2" />
                </Button>
            </div>
        </Card>

      <Card className="bg
          <h4 classN
        <CardConte
            <div classN
              <div className="space-y-1
                  <span className="text-muted-foreground">Method:</span>
                </div>
                  <span className="text-muted-foreground">Distance
                </di
                  <span className="text-muted-foreground">Threshold:</spa
                </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                  
                </div>
                  <span className="text-muted-foreground">Export:</span>
                  <ChartLine className="w-4 h-4 mr-2" />
                  <span className="
                </Button>
            </div>
        </CardContent>

      <div className="fle
              </div>
            </div>
          Export All
        <Button

        >
          Back to Services
        <Button classN
        </Button>
    </div>
}




















            </div>





              </div>





              </p>




                </Button>





            </div>


























































      <Card className="bg-muted/30">





            <div className="space-y-3">

              <div className="space-y-1">



                </div>



                </div>



                </div>
              </div>


            <div className="space-y-3">





                </div>





                  <span className="text-muted-foreground">Zoom:</span>

                </div>

            </div>

        </CardContent>






          className="cursor-pointer"



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