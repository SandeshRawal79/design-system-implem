import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Gear, Eye, TreeStructure, ChartLine, Funnel, Info, Calendar, User, Hash } from '@phosphor-icons/react'


  const navigate = useNavigate()
    id: '3501115',

  // Mock service data based on the snapshot
  const mockService = {
    createdBy: 'Ma
    name: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',

    provisionTypes: 8,
      {/* Page Header 
        <div className="flex items-
            variant="g
            className="text-primary hover:text-primary/80 cursor-pointer"
   

          <Button 
            onCli
   

        </div>
        <div className="text-rig
   

          
          </p>
      </div>
      {/* Data Context Section */}
        <CardHeader className="pb-3">
            <div c
            </div>
              <CardTitle className="text-lg
            </div>
        </C
          <div className="space-y-4">
            <div clas
              <div 
                  <Hash className="w-4 h-4 text-
                  
                  </div>
                
                  <TreeStructure className="w-4 h-4 text-primary mt-0.5 f
           
                  </div>
              </div>
              {/* C
              

                    <div className="
                </div>
                <div className="flex
               
                    <div className="text-sm font-medium text-for
                </div>
            </div>
            {/* Ana
              
              
      </div>

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
                <div className="w-10 h-10 bg-primary/10 rounded
                </div>
                  <Car
                    Se
                </di
              <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                <Button size="sm" variant="gh
                </Button>
            </div>
          <CardContent className="p-6">
              <div classN
              </div>
                Fu
              <p classN
              </p>
                <Button size="sm" className="btn-gradient-primary cursor-pointer">
                  Generate
                <Button size="sm" variant="outline" className="cur
                  Ex
              </div>
          </CardContent>

        <Card className="bg-white border border-border">
            <div className="flex items-center justify-between">
                <d
                </div>
                  <CardTitle className="text-lg">Provision X-ray #2</CardTitle>
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

              </p>
                <Button size="sm" className="btn-gradien
                  Gene
                <Button size="sm" variant="outline" className="
                  Export
              </div>
          </CardContent>

        <Card classNa
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-accent/10 rounded-
                </div>
                  <Car
                    Op
                </di
              <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                <Button size="sm" variant="gh
                </Button>
            </div>
          <CardContent className="p-6">
              <div classN
              </div>
                Op
              <p classN
              </p>
                <Button size="sm" className="btn-gradient-primary cursor-pointer">
                  Generate
                <Button size="sm" variant="outline" className
                  Ex
              </div>
          </CardContent>
      </div>
      {/* Analysis Configuration */}
        <CardHeader>
        </CardHead
          <div className="grid grid-cols-1
              <h4 className="font-semibold text-foreground">Analysis Settings</h4>
                <div className="flex justify-between ite
                  <span cl
                <div clas
                  <span className="text-foreground font-medium">Euclidean</span
                <div className="flex justify-between it
                  <span 
              </div>
            <div cla
              <div
                  <span 
               

                </div>
                  <span className="text-muted-foreground
                </div>
            </div>
        </CardContent>

      <div className="flex justify-between items-center pt-4">
          <Button 
            onClick={
          >
            Back to Dashboard
          <Button 
            onClick={h
          >
            Back to 
        </div>
          <Download className="w-4 h-4 mr-2" />
        </Button>
    </div>
}





























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