import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, TreeStructure, Plus, Check, X } from '@phosphor-icons/react'
import { PageLayout } from '@/components/PageLayout'

export function ClustersView() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const [searchParams] = useSearchParams()

  // Data from the snapshot
  const dataContext = {
    id: '3501115',
    name: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
    created: '2025-08-24 03:48:15',
    creator: 'Mark'
  }

  const xrayProjection = 'Only Options (D)'
  const totalClusters = 1
  const totalRecords = 50
  const distanceThreshold = '10.0'

  // Mock cluster data matching the snapshot
  const clusterData = [
    {
      abcd1Up: '3828',
      serviceId: '3501115',
      serviceName: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
      provisionType: 'Copay',
      options: 'Yes 20 Dollars, per Visit',
      approvals: { approve: true, x1: true, x2: false, x3: true, x4: false },
      setsInNow: '1',
      addToSet: false
    },
    {
      abcd1Up: '3829',
      serviceId: '3501115',
      serviceName: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
      provisionType: 'Telemedicine Vendor Copay',
      options: 'Yes 5 Dollars, per Visit',
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      setsInNow: '',
      addToSet: false
    },
    {
      abcd1Up: '3908',
      serviceId: '3501115',
      serviceName: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
      provisionType: 'Copay',
      options: 'Yes 25 Dollars Apply Only 1 Copayment, per Date of Service, per Provider',
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      setsInNow: '1',
      addToSet: false
    },
    {
      abcd1Up: '3918',
      serviceId: '3501115',
      serviceName: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
      provisionType: 'Telemedicine Vendor Coinsurance',
      options: 'Yes 100 Percent',
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      setsInNow: '',
      addToSet: false
    },
    {
      abcd1Up: '4231',
      serviceId: '3501115',
      serviceName: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
      provisionType: 'Coinsurance - Insurer',
      options: 'Yes Subject to Program Coinsurance for Home Visits otherwise 100 Percent',
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      setsInNow: '',
      addToSet: false
    },
    {
      abcd1Up: '4240',
      serviceId: '3501115',
      serviceName: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
      provisionType: 'Deductible',
      options: 'No',
      approvals: { approve: false, x1: true, x2: false, x3: false, x4: false },
      setsInNow: '1',
      addToSet: false
    },
    {
      abcd1Up: '4571',
      serviceId: '3501115',
      serviceName: 'PCP Office/Outpatient Visit and Consultation -> Professional Services',
      provisionType: 'Copay',
      options: 'Yes 30 Dollars, per Visit',
      approvals: { approve: false, x1: true, x2: false, x3: true, x4: false },
      setsInNow: '1',
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
    return <span className="text-muted-foreground">-</span>
  }

  return (
    <PageLayout
      title="Provision Intelligence Hub - Cluster Analysis"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Header Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Data Context */}
          <Card className="bg-blue-50 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-blue-900">Data context:</div>
                <div className="text-xs text-blue-800 space-y-1">
                  <div>id={dataContext.id}, name={dataContext.name}</div>
                  <div>Created: {dataContext.created}, By: {dataContext.creator}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* X-ray Projection */}
          <Card className="bg-green-50 border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-green-900">X-ray Projection: {xrayProjection}</div>
                <div className="text-sm text-green-800">Total Clusters: {totalClusters}</div>
                <div className="text-sm text-green-800">Total Records: {totalRecords}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-green-800">Distance Threshold:</span>
                  <Input 
                    value={distanceThreshold} 
                    className="w-20 h-6 text-xs border-green-300"
                    readOnly
                  />
                  <Button size="sm" className="h-6 text-xs px-2 bg-green-600 hover:bg-green-700">
                    Update
                  </Button>
                </div>
                <Button 
                  variant="link" 
                  className="text-blue-600 hover:text-blue-800 text-xs p-0 h-auto"
                  onClick={handleBackToDendrogram}
                >
                  ← Back to 3-dendrograms view
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create Set */}
          <Card className="bg-yellow-100 border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-yellow-900">Creator:*</label>
                  <Input placeholder="Enter creator name" className="h-8 text-sm border-yellow-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-yellow-900">Set Name:*</label>
                  <Input placeholder="Enter set name" className="h-8 text-sm border-yellow-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-yellow-900">Description:*</label>
                  <Textarea 
                    placeholder="Enter description (max 500 chars)" 
                    className="h-16 text-sm border-yellow-300 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-sm h-8"
                    disabled
                  >
                    Create a set (select rows first)
                  </Button>
                  <div className="text-xs text-yellow-700 space-y-1">
                    <div>Select an existing set to add rows to it</div>
                    <div>Select set first...</div>
                  </div>
                  <Button 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm h-8"
                    disabled
                  >
                    Add rows to set (select rows first)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cluster Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Cluster 1 of 1 ({totalRecords} records)
              </CardTitle>
              <div className="flex items-center gap-2">
                <Checkbox id="whole-cluster" />
                <label htmlFor="whole-cluster" className="text-sm font-medium">
                  Whole cluster
                </label>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="responsive-table-wrapper">
              <table className="responsive-table w-full">
                <thead className="sticky-header">
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left p-2 text-xs font-semibold">ABCD 1-Up</th>
                    <th className="text-left p-2 text-xs font-semibold">Service ID</th>
                    <th className="text-left p-2 text-xs font-semibold">Service Name</th>
                    <th className="text-left p-2 text-xs font-semibold">Provision Type</th>
                    <th className="text-left p-2 text-xs font-semibold">Options</th>
                    <th className="text-center p-2 text-xs font-semibold">Approve</th>
                    <th className="text-center p-2 text-xs font-semibold"># sets in now</th>
                    <th className="text-center p-2 text-xs font-semibold">Add to set</th>
                  </tr>
                </thead>
                <tbody>
                  {clusterData.map((row, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-2">
                        <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer">
                          {row.abcd1Up}
                        </a>
                      </td>
                      <td className="p-2 text-sm">{row.serviceId}</td>
                      <td className="p-2 text-sm max-w-xs">
                        <div className="truncate" title={row.serviceName}>
                          {row.serviceName}
                        </div>
                      </td>
                      <td className="p-2 text-sm">{row.provisionType}</td>
                      <td className="p-2 text-sm max-w-sm">
                        <div className="truncate" title={row.options}>
                          {row.options}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {getApprovalIcon(row.approvals.approve)}
                          <span className="text-muted-foreground">-</span>
                          {getApprovalIcon(row.approvals.x1)}
                          {getApprovalIcon(row.approvals.x2)}
                          <span className="text-muted-foreground">-</span>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        {row.setsInNow && (
                          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
                            {row.setsInNow}
                          </a>
                        )}
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