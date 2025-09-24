import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTit
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/che
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, TreeStructure, Plus, Check, X } from '@phosphor-icons/react'
  const dataContext = {

    creator: 'Mark'

  const totalClusters = 1
  const distanceThreshold = '10.0'

    {
      serviceId: '35011
      provisionTyp
      approvals: { approve: true, x1: true, x2: false, x3: true, x4: false },
      addToSet: false
    {
   

      approvals: { approve: false, x1: true
      addToSet: false
    {
      serviceId: '3501115',

      approvals: { approve: false, x1: true,
      addToSet: false
    {
      serviceId: '3501
      provisionType: 'Telem
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      addToSet: false
    {
      serviceId: '3501115',
      provisionType: 
      approvals: { ap
    },
    {
      serviceId: '3501
      provisionType: 'Deduc
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      addToSet: false
    {
      serviceId: '3501115',
      provisionType:
      approvals: { ap
    },
    {
  const handleBackToDe
  }
  const handleBackToDashboard = () => {
  }
  const getApprovalIcon = (value: boolean | undefined) => {
    if (value === false) return <X className="w-4 h-4 text-destructive" />
  }
  return (
    },
    {
        {/* Header Car
          {/* Data Context 
            <CardContent className="p-4">
                <div className="text-sm font-semibold t
                  <div>id={dataCo
                </div>
            </CardCo

    },
    {
                <div c
                <div classN
                  <Input 
                    className="w-20 h-6 text-
                  />
                    Update
                </di
                  var
      
     
              </div>
          </Card>
          {/* Create Set */}
            <CardContent className
                <div
                  <Input placeholder="Enter creator name" className="h-8 text-s
                <div 
                  <In
      
     
                    cl
                </div>
                  <Button 
                    disabled
                    Create a set (select ro
                  <div className="text-xs text-yellow-700 space-y-1">
                    <
                  <Bu
    }
  ]

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

              </div>
          </CardHeader>
            <div className="responsive-table-wrapper">
                <thead className="sticky-header">
  }

  return (
    <PageLayout
                  </tr>
      showBackButton={true}
    >
                        <a href="
                        </a>
                      <td className="p-2 text-sm">{row.serviceI
                        <div c
                        </div>
                      <td className="p-2 
                        <div className="t
                        </div>
                      <td className="p-2 text-center">
                          {getApprovalIcon(row.approvals.approve)}
                          {getApprovalIcon(row.approvals.x1)}
                      
              </div>
                        {r
                 

                      <td classNam
                      </td>
                  ))}
              </table>
          </CardContent>
      </div>
  )


















              </div>










                </div>





















                  </div>






                </div>



        </div>













































































      </div>
    </PageLayout>
  )
}