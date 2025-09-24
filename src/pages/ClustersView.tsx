import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/butto
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, TreeStructure, Plus, Check, X } from '@phosphor-icons/react'
import { PageLayout } from '@/components/PageLayout'

  // Data context from the snaps
  const { serviceId } = useParams<{ serviceId: string }>()
    serviceName: 'Office Visits'

    distanceThreshold: 0.5,
  const dataContext = {
    serviceId: '3501115',
    serviceName: 'Office Visits',
    {
    totalClusters: 1,
      provisionType: 'Singl
    addToSet: false
   

  // Mock data for clusters with provision data
  const clustersData = [
  }
  return (
      title="Clusters View"
      showTopBackButton={true}
      backButtonPath="/"
      <div className="space-y-6">
        <Card>
     
  ]

                  className="btn-gradient-secondar
                  <Arro
                </Button>
         
            </div>
     
   

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  return (
    <PageLayout
              </div>
          </CardContent>
      showBackButton={true}
        <Card>
    >
          <CardContent>
              <table className="responsive-table">
              
                    <th className="text
                    <th className="text-center p-2">Approve</th
                    <th className="text-center p-2">Add
                </thead
                  {clustersData.map
                      <td c
                          {row.serviceName} ({row.
                      </td>
                 
                      <td className="p-2 text-sm">
                      </td>
                        <
                        </div>
                      <td className="p-2 text-center">
              </div>
            </div>
                       
                            checked={row
                          />
                   
                  ))}
              </table>

            <div cl
                <div>• At least one cluster must be approved to proceed</div>
                <div>• Use "Add to Set" to include clusters in analysis sets</div>
            </div>
        </Card>
    </PageLayout>
}
















        </Card>



          <CardHeader className="pb-3">

          </CardHeader>



                <thead className="sticky-header">
















                      </td>
                      <td className="p-2 text-sm">

                      </td>



                      <td className="p-2 text-center">


                        </div>

                      <td className="p-2 text-center">
                        <div className="flex justify-center">

                        </div>

                      <td className="p-2 text-center">






                      </td>

                  ))}

              </table>










          </CardContent>

      </div>
    </PageLayout>
  )
}