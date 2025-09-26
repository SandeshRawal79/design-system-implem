import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MagnifyingGlass, CaretDown, CaretUp, Funnel, X, SortAscending, SortDescending, Bookmark } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

// Types for filtering and sorting
type SortField = 'id' | 'serviceName' | 'provisionType' | 'options' | 'numProv' | 'numProd' | 'numSplit'
type SortDirection = 'asc' | 'desc'
type FilterType = 'all' | 'with-approvals' | 'pending-approvals' | 'no-approvals'
type StatusFilter = 'all' | 'approved' | 'rejected' | 'pending'

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

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [provisionTypeFilter, setProvisionTypeFilter] = useState('all')

  const clusterInfo = {
    xrayProjection: 'Only Options (D)',
    dataContext: 'd=() names=Product Wide Provision',
    created: '2023-03-16 10:56:57',
    recordsInCluster: 270,
    clusterId: clusterId || '1',
    totalClusters: 6,
    distanceThreshold: 10.0
  }

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...mockClusterData]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provisionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply provision type filter
    if (provisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.provisionType === provisionTypeFilter)
    }

    // Apply approval status filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item => {
        const hasApprovals = item.approvalStatuses.includes('✓')
        const hasRejections = item.approvalStatuses.includes('✗')
        const hasPending = item.approvalStatuses.includes('-')
        
        switch (filterType) {
          case 'with-approvals':
            return hasApprovals
          case 'pending-approvals':
            return hasPending && !hasApprovals && !hasRejections
          case 'no-approvals':
            return !hasApprovals && !hasRejections
          default:
            return true
        }
      })
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const approvedCount = item.approvalStatuses.filter(s => s === '✓').length
        const rejectedCount = item.approvalStatuses.filter(s => s === '✗').length
        const pendingCount = item.approvalStatuses.filter(s => s === '-').length
        
        switch (statusFilter) {
          case 'approved':
            return approvedCount > rejectedCount && approvedCount > 0
          case 'rejected':
            return rejectedCount > approvedCount && rejectedCount > 0
          case 'pending':
            return pendingCount > 0 && approvedCount === 0 && rejectedCount === 0
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = ''
      let bValue: string | number = ''

      switch (sortField) {
        case 'id':
          aValue = parseInt(a.id)
          bValue = parseInt(b.id)
          break
        case 'serviceName':
          aValue = a.serviceName
          bValue = b.serviceName
          break
        case 'provisionType':
          aValue = a.provisionType
          bValue = b.provisionType
          break
        case 'options':
          aValue = a.options
          bValue = b.options
          break
        case 'numProv':
          aValue = parseInt(a.numProv)
          bValue = parseInt(b.numProv)
          break
        case 'numProd':
          aValue = parseInt(a.numProd)
          bValue = parseInt(b.numProd)
          break
        case 'numSplit':
          aValue = parseInt(a.numSplit)
          bValue = parseInt(b.numSplit)
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [searchTerm, sortField, sortDirection, filterType, statusFilter, provisionTypeFilter])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterType('all')
    setStatusFilter('all')
    setProvisionTypeFilter('all')
    setSortField('id')
    setSortDirection('asc')
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }

  // Get unique provision types for filter
  const uniqueProvisionTypes = Array.from(new Set(mockClusterData.map(item => item.provisionType)))

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
            <h1 className="text-2xl font-bold text-foreground">
              Provision Intelligence Hub - Cluster #{clusterInfo.clusterId} of {clusterInfo.totalClusters} Details
            </h1>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Bookmark className="h-4 w-4 mr-1" />
            Bookmark
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <SortAscending className="h-4 w-4 mr-1" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Cluster Information Cards - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {/* Left Card - Cluster Metadata */}
        <Card className="bg-card border-border">
          <CardContent className="p-0.5">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-0.5">
                <span className="text-xs font-medium text-primary">X-ray Projection:</span>
                <span className="text-xs text-foreground">{clusterInfo.xrayProjection}</span>
              </div>
              <div className="flex flex-wrap items-center gap-0.5">
                <span className="text-xs font-medium text-primary">Data context:</span>
                <span className="text-xs text-foreground font-mono">{clusterInfo.dataContext}</span>
              </div>
              <div className="flex flex-wrap items-center gap-0.5">
                <span className="text-xs font-medium text-primary">Created:</span>
                <span className="text-xs text-foreground">{clusterInfo.created}</span>
              </div>
              <div className="flex flex-wrap items-center gap-0.5">
                <span className="text-xs font-medium text-primary">Records in this Cluster:</span>
                <span className="text-xs font-bold text-accent">{clusterInfo.recordsInCluster}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Card - Cluster Status */}
        <Card className="bg-card border-border">
          <CardContent className="p-0.5">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-0.5">
                <span className="text-xs font-medium text-primary">Cluster:</span>
                <span className="text-xs font-bold text-accent">{clusterInfo.clusterId}</span>
              </div>
              <div className="flex flex-wrap items-center gap-0.5">
                <span className="text-xs font-medium text-primary">Total Clusters:</span>
                <span className="text-xs text-foreground">{clusterInfo.totalClusters}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1">
                <span className="text-xs font-medium text-primary">Distance Threshold:</span>
                <span className="text-xs font-bold text-accent">{clusterInfo.distanceThreshold}</span>
                <Button 
                  size="sm" 
                  className="btn-gradient-primary h-5 px-2 text-xs"
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
         <div className="flex flex-col xl:flex-row gap-2 px-2 items-start xl:items-center">
            {/* Search Input - Compact */}
            <div className="relative flex-shrink-0">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-8 py-1 text-xs h-8 w-48 border-border"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Quick Filter Pills - Compact */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
                className="text-xs h-7 px-2 btn-gradient-primary"
              >
                All
              </Button>
              <Button
                variant={filterType === 'with-approvals' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setFilterType('with-approvals')}
                className="text-xs h-7 px-2"
              >
                Approved
              </Button>
              <Button
                variant={filterType === 'pending-approvals' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setFilterType('pending-approvals')}
                className="text-xs h-7 px-2"
              >
                Pending
              </Button>
              <Button
                variant={filterType === 'no-approvals' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setFilterType('no-approvals')}
                className="text-xs h-7 px-2"
              >
                None
              </Button>
            </div>

            {/* Compact Filters - Dropdowns */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="w-24 h-7 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={provisionTypeFilter} onValueChange={setProvisionTypeFilter}>
                <SelectTrigger className="w-28 h-7 text-xs">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueProvisionTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Controls - Compact */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                <SelectTrigger className="w-24 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">ID</SelectItem>
                  <SelectItem value="serviceName">Name</SelectItem>
                  <SelectItem value="provisionType">Type</SelectItem>
                  <SelectItem value="options">Options</SelectItem>
                  <SelectItem value="numProv">Prov</SelectItem>
                  <SelectItem value="numProd">Prod</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="h-7 w-7 p-0"
              >
                {sortDirection === 'asc' ? <SortAscending className="h-3 w-3" /> : <SortDescending className="h-3 w-3" />}
              </Button>
            </div>

            {/* Clear & Results Count */}
            <div className="flex items-center gap-3 ml-auto flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {filteredAndSortedData.length} of {mockClusterData.length}
              </span>
            </div>
          </div>

          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Main Cluster Data</h2>
          </div>
          
          <div className="responsive-table-wrapper max-h-[calc(100vh-500px)]">
            <Table className="responsive-table">
              <TableHeader className="sticky-header">
                <TableRow>
                  <TableHead className="text-xs text-center">#</TableHead>
                  <TableHead 
                    className="text-xs cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      ABCD 1-Up
                      {getSortIcon('id')}
                    </div>
                  </TableHead>
                  <TableHead className="text-xs">Service ID</TableHead>
                  <TableHead 
                    className="text-xs cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('serviceName')}
                  >
                    <div className="flex items-center">
                      Service Name
                      {getSortIcon('serviceName')}
                    </div>
                  </TableHead>
                  <TableHead className="text-xs text-center">P</TableHead>
                  <TableHead 
                    className="text-xs cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('provisionType')}
                  >
                    <div className="flex items-center">
                      Provision Type
                      {getSortIcon('provisionType')}
                    </div>
                  </TableHead>
                  <TableHead className="text-xs text-center">O</TableHead>
                  <TableHead 
                    className="text-xs cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('options')}
                  >
                    <div className="flex items-center">
                      Options
                      {getSortIcon('options')}
                    </div>
                  </TableHead>
                  <TableHead className="text-xs text-center">PTy Type</TableHead>
                  <TableHead className="text-xs">Bencode</TableHead>
                  <TableHead className="text-xs">New Bencode</TableHead>
                  <TableHead 
                    className="text-xs text-center cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('numSplit')}
                  >
                    <div className="flex items-center justify-center">
                      Num Split
                      {getSortIcon('numSplit')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-xs text-center cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('numProv')}
                  >
                    <div className="flex items-center justify-center">
                      Num Prov
                      {getSortIcon('numProv')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-xs text-center cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort('numProd')}
                  >
                    <div className="flex items-center justify-center">
                      Num Prod
                      {getSortIcon('numProd')}
                    </div>
                  </TableHead>
                  <TableHead className="text-xs text-center">Num Cmnt</TableHead>
                  <TableHead className="text-xs text-center">Num Grp</TableHead>
                  <TableHead className="text-xs text-center">Approve</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((record, index) => (
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