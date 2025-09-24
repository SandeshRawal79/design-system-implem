import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, TreeStructure, Plus, Check, X } from '@phosphor-icons/react'
import { PageLayout } from '@/components/PageLayout'

export function ClustersView() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()

  // Data context from the snapshot
  const dataContext = {
    serviceId: '3501115',
    serviceName: 'Office Visits',
    creator: 'Mark',
    totalClusters: 1,
    distanceThreshold: 0.5,
    addToSet: false
  }

  // Mock data for clusters with provision data
  const clustersData = [
    {
      serviceId: '3501115',
      serviceName: 'Office Visits',
      provisionType: 'Single',
      options: 'Consults, Routine Check-ups',
      approvals: { approve: true, x1: false },
      addToSet: false
    }
  ]

  const getApprovalIcon = (approved: boolean) => {
    return approved ? (
      <Check className="w-4 h-4 text-success" />
    ) : (
      <X className="w-4 h-4 text-destructive" />
    )
  }

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  return (
    <PageLayout
      title="Clusters View"
      subtitle={`Service ID: ${serviceId || dataContext.serviceId}`}
      showTopBackButton={true}
      backButtonLabel="Back to Dashboard"
      backButtonPath="/"
    >
      <div className="space-y-6">
        {/* Header Card with Service Details and Controls */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToDendrogram}
                  className="btn-gradient-secondary h-8"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Dendrogram
                </Button>
                <TreeStructure className="w-5 h-5 text-primary" />
                <span className="font-semibold">Clustering Analysis</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="font-semibold text-primary">{dataContext.serviceName}</div>
                <div className="text-sm text-muted-foreground">Service: {dataContext.serviceId}</div>
              </div>
              <div>
                <div className="font-semibold">Creator: {dataContext.creator}</div>
                <div className="text-sm text-muted-foreground">Total Clusters: {dataContext.totalClusters}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Distance Threshold</label>
                <Input
                  className="mt-1"
                  defaultValue={dataContext.distanceThreshold}
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                />
              </div>
              <div className="flex items-end">
                <Button size="sm" variant="secondary" className="h-8 w-full">
                  <Plus className="w-4 h-4 mr-1" />
                  Create New Cluster
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clusters Data Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Clusters Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="responsive-table-wrapper">
              <table className="responsive-table">
                <thead className="sticky-header">
                  <tr>
                    <th className="text-left p-2">Service ID/Name</th>
                    <th className="text-left p-2">Provision Type</th>
                    <th className="text-left p-2">Options</th>
                    <th className="text-center p-2">Approve</th>
                    <th className="text-center p-2">X1</th>
                    <th className="text-center p-2">Add to Set</th>
                  </tr>
                </thead>
                <tbody>
                  {clustersData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <a href="#" className="text-primary hover:underline">
                          {row.serviceName} ({row.serviceId})
                        </a>
                      </td>
                      <td className="p-2 text-sm">
                        {row.provisionType}
                      </td>
                      <td className="p-2 text-sm">
                        {row.options}
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
                          <Checkbox
                            checked={row.addToSet}
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Additional Information */}
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">
                <div>• At least one cluster must be approved to proceed</div>
                <div>• X1 represents secondary validation status</div>
                <div>• Use "Add to Set" to include clusters in analysis sets</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}