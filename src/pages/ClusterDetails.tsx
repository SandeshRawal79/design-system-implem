import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

// Generate random approval statuses for demonstration
const generateApprovalStatuses = () => {
  const statuses = ['✓', '✗', '-'];
  return Array.from({ length: 5 }, () => statuses[Math.floor(Math.random() * statuses.length)]);
};

const mockClusterData = [
  { id: '493', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8773', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✗', '-', '-', '-', '✗'] },
  { id: '575', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8780', bencode: '', newBencode: '', numSplit: '0', numProv: '2', numProd: '2', numCmnt: '', numGrp: '', approvalStatuses: ['✓', '✗', '-', '✓', '-'] },
  { id: '585', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '9057', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['-', '✓', '✓', '-', '✗'] },
  { id: '620', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '9241', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✗', '-', '-', '-', '✗'] },
  { id: '628', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '9367', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✓', '✓', '-', '✗', '-'] },
  { id: '662', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8157', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['-', '-', '✓', '✓', '✗'] },
  { id: '665', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '9392', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✗', '✓', '-', '-', '✓'] },
  { id: '732', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8770', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✗', '-', '-', '-', '✗'] },
  { id: '745', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8523', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✓', '✓', '✓', '✗', '-'] },
  { id: '757', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8476', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['-', '✗', '✓', '✓', '-'] },
  { id: '759', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8997', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✗', '-', '-', '-', '✗'] },
  { id: '763', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8782', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✓', '-', '✗', '✓', '-'] },
  { id: '772', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8143', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['-', '✓', '✓', '-', '✗'] },
  { id: '780', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '9015', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✗', '-', '-', '-', '✗'] },
  { id: '781', serviceId: '0', serviceName: 'Product Wide Provision', provisionType: 'Coverage Code Id', options: '8480', bencode: '', newBencode: '', numSplit: '0', numProv: '1', numProd: '1', numCmnt: '', numGrp: '', approvalStatuses: ['✓', '✓', '✗', '-', '✓'] },
]

// Component to render approval status indicators
function ApprovalStatusIndicators({ statuses }: { statuses: string[] }) {
  return (
    <div className="flex items-center gap-1 justify-center">
      {statuses.map((status, index) => {
        let badgeVariant: "default" | "destructive" | "secondary" = "secondary";
        let statusColor = "text-muted-foreground";
        
        if (status === '✓') {
          badgeVariant = "default";
          statusColor = "text-green-600";
        } else if (status === '✗') {
          badgeVariant = "destructive";
          statusColor = "text-red-600";
        }
        
        return (
          <span
            key={index}
            className={`inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full ${
              status === '✓' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : status === '✗'
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}
          >
            {status}
          </span>
        );
      })}
    </div>
  );
}

export function ClusterDetails() {
  const { serviceId, clusterId } = useParams()
  const navigate = useNavigate()

  const clusterInfo = {
    xrayProjection: 'Only Options (D)',
    dataContext: 'd=() names=Product Wide Provision',
    created: '2023-03-16 10:56:57',
    recordsInCluster: 270,
    clusterId: clusterId || '1',
    totalClusters: 6,
    distanceThreshold: 10.0
  }

  return (
    <div className="page-layout-full-width">
      {/* Page Header with Back Button and Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/clusters/${serviceId}`)}
            className="back-to-dashboard"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clusters
          </Button>
          
          <div>
            <h1 className="text-h2-responsive font-bold text-foreground">
              Provision Intelligence Hub - Cluster #{clusterInfo.clusterId} of {clusterInfo.totalClusters} Details
            </h1>
          </div>
        </div>
      </div>

      {/* Cluster Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Left Card - Cluster Metadata */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-primary">X-ray Projection:</span>
                <span className="text-sm text-foreground ml-2">{clusterInfo.xrayProjection}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-primary">Data context:</span>
                <span className="text-sm text-foreground ml-2">{clusterInfo.dataContext}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-primary">Created:</span>
                <span className="text-sm text-foreground ml-2">{clusterInfo.created}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-primary">Records in this Cluster:</span>
                <span className="text-sm font-bold text-accent ml-2">{clusterInfo.recordsInCluster}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Card - Cluster Status */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-primary">Cluster:</span>
                <span className="text-sm font-bold text-accent ml-2">{clusterInfo.clusterId}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-primary">Total Clusters:</span>
                <span className="text-sm text-foreground ml-2">{clusterInfo.totalClusters}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">Distance Threshold:</span>
                <span className="text-sm font-bold text-accent">{clusterInfo.distanceThreshold}</span>
                <Button 
                  size="sm" 
                  className="btn-gradient-primary h-6 px-2 text-xs"
                  onClick={() => {}}
                >
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Cluster Data Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Main Cluster Data</h2>
          </div>
          
          <div className="responsive-table-wrapper max-h-[calc(100vh-400px)]">
            <Table className="responsive-table">
              <TableHeader className="sticky-header">
                <TableRow>
                  <TableHead className="text-xs text-center">#</TableHead>
                  <TableHead className="text-xs">ABCD 1-Up</TableHead>
                  <TableHead className="text-xs">Service ID</TableHead>
                  <TableHead className="text-xs">Service Name</TableHead>
                  <TableHead className="text-xs text-center">P</TableHead>
                  <TableHead className="text-xs">Provision Type</TableHead>
                  <TableHead className="text-xs text-center">O</TableHead>
                  <TableHead className="text-xs">Options</TableHead>
                  <TableHead className="text-xs text-center">PTy Type</TableHead>
                  <TableHead className="text-xs">Bencode</TableHead>
                  <TableHead className="text-xs">New Bencode</TableHead>
                  <TableHead className="text-xs text-center">Num Split</TableHead>
                  <TableHead className="text-xs text-center">Num Prov</TableHead>
                  <TableHead className="text-xs text-center">Num Prod</TableHead>
                  <TableHead className="text-xs text-center">Num Cmnt</TableHead>
                  <TableHead className="text-xs text-center">Num Grp</TableHead>
                  <TableHead className="text-xs text-center">Approve</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClusterData.map((record, index) => (
                  <TableRow key={record.id} className="hover:bg-muted/50">
                    <TableCell className="text-xs text-center font-medium text-primary">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-xs">
                      <Button 
                        variant="link" 
                        className="h-auto p-0 text-xs text-info hover:text-info/80"
                        onClick={() => {}}
                      >
                        {record.id}
                      </Button>
                    </TableCell>
                    <TableCell className="text-xs">{record.serviceId}</TableCell>
                    <TableCell className="text-xs">{record.serviceName}</TableCell>
                    <TableCell className="text-xs text-center">-</TableCell>
                    <TableCell className="text-xs">{record.provisionType}</TableCell>
                    <TableCell className="text-xs text-center">-</TableCell>
                    <TableCell className="text-xs font-medium">{record.options}</TableCell>
                    <TableCell className="text-xs text-center">-</TableCell>
                    <TableCell className="text-xs">{record.bencode}</TableCell>
                    <TableCell className="text-xs">{record.newBencode}</TableCell>
                    <TableCell className="text-xs text-center">{record.numSplit}</TableCell>
                    <TableCell className="text-xs text-center">{record.numProv}</TableCell>
                    <TableCell className="text-xs text-center">{record.numProd}</TableCell>
                    <TableCell className="text-xs text-center">{record.numCmnt}</TableCell>
                    <TableCell className="text-xs text-center">{record.numGrp}</TableCell>
                    <TableCell className="text-xs text-center">
                      <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}