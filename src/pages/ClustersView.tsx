import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, TreeStructure, Plus, Check, X } from '@phosphor-icons/react'
import { PageLayout } from '@/components/PageLayout'

export function ClustersView() {
  const navigate = useNavigate()
  const { serviceId } = useParams<{ serviceId: string }>()

  // Data context from the snapshot
  const dataContext = {
    serviceId: '3501115',
    creator: 'Mark',
    totalClusters: 1,
    distanceThreshold: '10.0'
  }

  // Mock data for clusters with provision data
  const clustersData = [
    {
      serviceId: '3501115',
      provisionType: 'Office Visit',
      approvals: { approve: true, x1: true, x2: false, x3: true, x4: false },
      addToSet: false
    },
    {
      serviceId: '3501115', 
      provisionType: 'Consultation',
      approvals: { approve: false, x1: true, x2: true, x3: false, x4: true },
      addToSet: false
    },
    {
      serviceId: '3501115',
      provisionType: 'Routine Check-up',
      approvals: { approve: false, x1: true, x2: false, x3: true, x4: false },
      addToSet: false
    },
    {
      serviceId: '3501115',
      provisionType: 'Telemedicine',
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      addToSet: false
    },
    {
      serviceId: '3501115',
      provisionType: 'Emergency Care',
      approvals: { approve: true, x1: false, x2: true, x3: true, x4: false },
      addToSet: false
    },
    {
      serviceId: '3501115',
      provisionType: 'Deductible Service',
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      addToSet: false
    }
  ]

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const getApprovalIcon = (value: boolean | undefined) => {
    if (value === true) return <Check className="w-4 h-4 text-success" />
    if (value === false) return <X className="w-4 h-4 text-destructive" />
    return <span className="w-4 h-4 text-muted-foreground">-</span>
  }

  return (
    <PageLayout
      title="Clusters View"
      subtitle={`Service ID: ${serviceId} | Cluster Analysis`}
      showTopBackButton={true}
      backButtonLabel="Back to Dashboard"
      backButtonPath="/"
    >
      <div className="space-y-6">
        {/* Header Card with Navigation */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToDendrogram}
                  className="back-to-dashboard h-8 px-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dendrogram
                </Button>
                <TreeStructure className="w-6 h-6 text-primary" />
                <CardTitle className="text-lg">Clusters Analysis</CardTitle>
              </div>
              <Badge variant="secondary" className="text-sm">
                {clustersData.length} Provisions
              </Badge>
            </div>
          </CardHeader>
          
          {/* Data Context */}
          <CardContent className="p-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Service ID</div>
                <div className="font-semibold text-primary">{dataContext.serviceId}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Creator</div>
                <div className="font-semibold">{dataContext.creator}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Clusters</div>
                <div className="font-semibold">{dataContext.totalClusters}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Distance Threshold</div>
                <div className="font-semibold">{dataContext.distanceThreshold}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Cluster Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Distance Threshold:</span>
                <Input 
                  defaultValue={dataContext.distanceThreshold}
                  className="w-20 h-8 text-sm"
                  type="number"
                />
                <Button size="sm" variant="secondary" className="h-8 px-3">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Set Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Create ABCD Set</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Creator</label>
                <Input placeholder="Enter creator name" className="h-8 text-sm" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Set Name</label>
                <Input placeholder="Enter set name" className="h-8 text-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button 
                variant="secondary" 
                size="sm"
                disabled
                className="h-8 px-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create a set (select rows first)
              </Button>
              <div className="text-xs text-warning space-y-1">
                <div>• Select provisions to include in the set</div>
                <div>• At least one provision must be selected</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clusters Data Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Provision Clusters Data</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="responsive-table-wrapper">
              <table className="responsive-table w-full">
                <thead className="sticky-header">
                  <tr>
                    <th className="text-left p-2">
                      <Checkbox />
                    </th>
                    <th className="text-left p-2">Service ID</th>
                    <th className="text-left p-2">Provision Type</th>
                    <th className="text-center p-2">Approve</th>
                    <th className="text-center p-2">X1</th>
                    <th className="text-center p-2">X2</th>
                    <th className="text-center p-2">X3</th>
                    <th className="text-center p-2">X4</th>
                    <th className="text-center p-2">Add to Set</th>
                  </tr>
                </thead>
                <tbody>
                  {clustersData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30">
                      <td className="p-2">
                        <Checkbox />
                      </td>
                      <td className="p-2 text-sm">
                        <a href="#" className="text-primary hover:underline cursor-pointer">
                          {row.serviceId}
                        </a>
                      </td>
                      <td className="p-2 text-sm">
                        <div className="font-medium">{row.provisionType}</div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center">
                          {getApprovalIcon(row.approvals.approve)}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center">
                          {getApprovalIcon(row.approvals.x1)}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center">
                          {getApprovalIcon(row.approvals.x2)}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center">
                          {getApprovalIcon(row.approvals.x3)}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center">
                          {getApprovalIcon(row.approvals.x4)}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <Checkbox checked={row.addToSet} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}