import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNavigate, useParams } from 'react
export function DendrogramView() {
import { useNavigate, useParams } from 'react-router-dom'

export function DendrogramView() {
  const navigate = useNavigate()



    navigate('/phase1-s

    <div className="page-layout-full-width">
      <div className
   

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const handleBackToPhase1 = () => {
    navigate('/phase1-services')
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
      <div 
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
      </div>
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground">Service ID:</p>
              <Badge variant="secondary" className="font-mono">
                {mockService.id}
              </Badge>
              <span className="subtitle-separator">|</span>
              <p className="text-sm text-muted-foreground">Records:</p>
              </CardTitle>
                {mockService.totalRecords}
          <CardContent
            </div>
                
              
        
                <span className="
            </div>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-all du
            <div className="f
                <Setting
              <CardTitl
              </CardTit
          </CardHeader>
            <p className="text-s
            </p>
              <div class
               
            

                <span className="text-fo
            </div>
        </Card>

      <Card className="min-h-[600px]">
          <div className="flex items-center justify-between">
              Dendrogram Visualization
            <div cla
                Interactive View
              <Button size="sm" v
              </Button>
          </div>
        <CardContent cl
            <div classN
            </div>
              Dendrogram Analysis Ready
            <p c
              between different provisi
            <div className="flex flex-col sm:flex-row gap-3"
                Generate Visualization
              <Button variant="outline" className="cursor-point
              </Button>
            <div classNa
                <str
              </p>
          </div>
      </Card>
      {/* Action But
        <div class
            Download Rep
          <Butt

        <div className="flex gap-3">
            Back to Services
          <Button className="btn-gradient-primary cur
          </Button>
      </div>
  )



























































































































