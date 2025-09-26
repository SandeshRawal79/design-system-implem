import { useState, useEffect } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
  id: string
  provisionType: string

  numProd: number
}
interface DataContext
  serviceName: string
  clusterAnalysis
  abcdTup: string
  numProv: number
  numProd: number
  numCntr: number
}

interface DataContext {
  id: string
  serviceName: string
  distanceThreshold: number
  clusterAnalysis: string
}

interface ClusterData {
  clusterNumber: string
  totalClusters: number
  
  const [distance, setDi
  const [creator, setCreat
  const [description, s
 

      totalClusters: 6,
      xrayProjection: `Provision
        id: serviceId || 'SVC-001',
        distanceThreshold: parseFloat(dist
      },
        {
  
          options: 'Standard, Comprehensive',
          numProv: 45,
          numCntr: 3
        {
          serviceName: 'Blood Pressure Check
          options: 'Routine, Follow-up',

          numCntr: 
        {
          serviceName: 'Lab Work',
          options: 'Fasting, Non-fasti
          numProv: 52,
          numCntr: 4
        {
          serviceNam
          options: 'HbA1c, Glucose'
          numProv: 29,
          numCntr: 3
        {
        
          option
         
          numCntr: 2
      ]
    
  }, [serviceId, clusterId, dendrogram, dista
  const handleUpdateDistanc
    // Navigate back t
  }
  const handleSaveSe
      crea
      des
      records: wholeClus
    // Implementation would save the ABCD set

    return <div className="flex justify-

    <div className="sp
      <div className=
          variant="o
          
        >
          Back to Cluste
        <div>
            Cluster {clusterData.clust
          <p className="text-sm text-muted
          </p>
      </div>
      <div className="
        <div classNa
          
         
                  Analys
              </CardTitle>
            <CardContent className="space-y
          options: 'HbA1c, Glucose',
          abcdTup: 'D-004',
          numProv: 29,
          numProd: 7,
          numCntr: 3
        },
        {
          id: 'REC-005',
          serviceName: 'Vision Screening',
          provisionType: 'Preventive Care',
          options: 'Basic, Comprehensive',
          abcdTup: 'A-005',
          numProv: 35,
          numProd: 9,
          numCntr: 2
        }
      ]
    }
    
    setClusterData(mockData)
  }, [serviceId, clusterId, dendrogram, distanceParam])

  const handleUpdateDistance = () => {
    console.log('Updating distance threshold to:', distance)
    // Navigate back to clusters with new distance
    navigate(`/clusters/${serviceId}?dendrogram=${dendrogram}&distance=${distance}`)
  }

  const handleSaveSet = () => {
    console.log('Saving ABCD set:', { 
      creator, 
      setName, 
      description, 
      wholeCluster,
      records: wholeCluster ? clusterData?.records : []
    })
    // Implementation would save the ABCD set
  }

  if (!clusterData) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/clusters/${serviceId}?dendrogram=${dendrogram}&distance=${distanceParam}`)}
          className="back-to-dashboard"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clusters
        </Button>
        <div>
          <h1 className="text-h3-responsive font-bold text-foreground">
                <Label htmlFor="wholeCluster" className="text-sm">
               
              
                <Label htmlFor="creator" className="text-sm font-medium">
              
              
            

              </div>
              <div className="spa
                  Set Name
                <Input
                  value={setName}
                  placeholder="Enter set name"
                />
              
                <Label htm
                </Label>
                  id="desc
                  onChang
                  className="min-h-[60px] text-
              </div>
              <Button 
                size="sm"
              >
              </Butt
          </Card>

        <div className="xl:col-span-2">
            <CardHeader className="pb-4">
                Clus
            </CardHe
              <div classNa
                 

                      <th className="t
                      <th className="text
                      <th className="text
                  </thead>
                    {clusterDat
                        <t
                        <
                          <Badge variant="outli
                          </Badge>
                        <td className="px-3 py-2 text-center text-sm">{rec
                        <td classNam
                    ))}
                </tabl
            </CardContent>
        </div>
    </div>
}






















































                  placeholder="Enter set name"







                </Label>







              </div>



                size="sm"

              >

              </Button>

          </Card>



        <div className="xl:col-span-2">





            </CardHeader>







                      <th className="text-left px-3 py-2 options-col">Options</th>





                  </thead>









                          </Badge>





                    ))}

                </table>

            </CardContent>

        </div>

    </div>

}