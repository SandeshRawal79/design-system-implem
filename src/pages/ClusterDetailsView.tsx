import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
  options: string
  numProv: number
  numCntr: number

  id: string
  distanceTh
}
interface ClusterData {
  totalClusters: 
  context: DataCo
}
export function C
  const [searchPa
 

  const [clusterData, s
  const [cre
  const [description,
  const [searchTerm, setSea

 

      xrayProjection: `
        id: serviceId |
  totalClusters: number
  xrayProjection: string
  context: DataContext
  records: ClusterRecord[]
}

export function ClusterDetails() {
  const { serviceId, clusterId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const dendrogram = searchParams.get('dendrogram')
  const distanceParam = searchParams.get('distance')
  
  const [clusterData, setClusterData] = useState<ClusterData | null>(null)
  const [distance, setDistance] = useState(distanceParam || '0.5')
  const [creator, setCreator] = useState('')
  const [setName, setSetName] = useState('')
  const [description, setDescription] = useState('')
  const [wholeCluster, setWholeCluster] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    // Mock data for demonstration
    const mockData: ClusterData = {
      clusterNumber: clusterId || '1',
      totalClusters: 6,
      xrayProjection: `Provision Intelligence Hub - Service Analysis for ${serviceId}`,
      context: {
        id: serviceId || 'SVC-001',
        serviceName: 'Primary Care Services',
  }
  const handleSaveSet = () => {
      cr
      descriptio
      rec
    // Implementation wo

    const matchesSearch = record.serviceNam
                         record.options.toLow
    const matchesFilter = f
    return matchesSear

    return <div clas

    <div 
      <div className="fl
          variant="outline" 
          onClick={() => navigate(`
        >
          Back to Clusters
        <div>
            Cluster {
          <p classNa
          
      </d
      {/* Content Grid *
        {/* Left Column - Controls
          {/* Distance Threshold Card 
            <CardHeader className="pb-4">
            </CardHeader>
              <div cla
                  Thre
                <Inp
          
         
                />
              <Button onClick={handleUpdateD
              </Button>
          </Card>
          {/* Save as ABCD 
            <CardHeade
            </CardHea
              <div c
          
         
                <Label h
                </Label>
              
                <Label htmlFor="creator" c
                </Label>
                  id="
                  onC
                  cl
         
       
     
    
                  value={set
                  placeholder="Enter set name"

              
                <Label htmlFor="description" className="text
                </Label>
                  id="description"
   

              </div>
              <Button 
               
              >
              </But
          </Card>

      
            <CardHeader className="pb-4">
   

              <div className="grid grid-cols-1 md:grid-cols-2 gap
                  placeholder="Search services..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
    
                  </SelectTrigger>
    
                    <SelectItem value="Ro
          

            
              <div className="responsive-table-wrapper">
   

          
                      <th class
                    
                  </thead>
                
                        <td 
                    
                          </Badge>
                        <td className="
         
                        <td className="px-3 py-2
                    ))}
                <
            <
        </div>
    </div>
}










































































































































































