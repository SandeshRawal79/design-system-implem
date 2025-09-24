import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, TreeStructure, Plus, Check,
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, TreeStructure, Plus, Check, X } from '@phosphor-icons/react'
import { PageLayout } from '@/components/PageLayout'

export function ClustersView() {
    serviceId: '3501115',
  const { serviceId } = useParams<{ serviceId: string }>()

  // Data context from the snapshot
  // Mock data for clus
    serviceId: '3501115',
    creator: 'Mark',
    totalClusters: 1,
      addToSet: false
  }

  // Mock data for clusters with provision data
      addToSet: false
     
      serviceId: '3501115',
      approvals: { approve: true, x1
    },
      serviceId: '350
    },
    {

    navigate(`/dendrogram/${serviceI

      addToSet: false

    {
      serviceId: '3501115',

    <PageLayout
      subtitle={`Serv
    },
    {
        {/* Header Card wit
          <CardHeader className="pb-
              <div className="flex items-center gap-3">
                  var
    },
    {
                  Back to D
                <TreeStructure classNa
              </div>
                {clus
    },
    {
          <CardContent clas
              <div>
                <div className="font-semibold text-primary">{dataContext.servic
              <div>
    }
  ]

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

                <span className="text-sm text-muted-foregro
                  defaultValue={dataContext.distanceThreshold}
                  type="number"
                <Button size="sm" variant="secondary" className="h-
  }

  return (
    <PageLayout
          <CardHeader class
          </CardHeader>
            <div className="grid grid-cols-1 md
      showBackButton={true}
    >
                <label className=
              </div>
            <d
                variant="secondary" 
                disabled
              >
                Create 
              <div className="text-
                <div>• At l
            </div>
        </Card>
        {/* Clust
          <CardHeader className="pb-3">
          </CardHeader>
            <div classNam
                <thead className="sticky-header">
                    <th className="text-left p-2">
                    
                    <th className="text-left p-2">Provision T
                    <th className="text-center p
                    <t
                  
                </thead
          
                      <td clas
                      </td>
                        <a href="#" className="text-primary hover:underline
                   
                      <td className="p-2 text-sm">
                      </td>
                    
                   
                      <td className="p-2 text-center">
                          {getApprovalIcon(row.approvals.x1)}
                    
                   
                        </div>
                      <td className="p-2 text-center">
                    
                   
                        <div className="flex justify-center">
                        </div>
                    
                  
                  ))}
              <

      </div>
  )






















































































                        </a>




                      <td className="p-2 text-center">

                          {getApprovalIcon(row.approvals.approve)}




                          {getApprovalIcon(row.approvals.x1)}

                      </td>



















                  ))}

              </table>

          </CardContent>

      </div>
    </PageLayout>
  )
}