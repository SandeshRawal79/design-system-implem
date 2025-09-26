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
            }text-sm text-sm`}
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
  const [distanceThreshold, setDistanceThreshold] = useState('10.0')

  const clusterInfo = {
    xrayProjection: 'Only Options (D)',
    dataContext: 'id=0 names=Product Wide Provision Product Wide Provision',
    created: '2023-03-16 10:56:57',
    recordsInCluster: 270,
    clusterId: clusterId || '1',
    totalClusters: 6
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
      {/* Compact Cluster Information Cards - Single Row Layout */}
      <Card className="bg-card border-border p-2 mb-4">
        <CardContent className="p-0">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
            <div className="flex-shrink-0">
              <span className="font-medium text-foreground text-sm">X-ray Projection:</span>
              <p className="text-muted-foreground text-sm">{clusterInfo.xrayProjection}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-medium text-foreground text-sm">Data context:</span>
              <p className="text-muted-foreground text-sm">{clusterInfo.dataContext}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-medium text-foreground text-sm">Created:</span>
              <p className="text-muted-foreground text-sm">{clusterInfo.created}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-medium text-foreground text-sm">Records in this Cluster:</span>
              <p className="font-semibold text-sm" style={{ color: '#43812C' }}>{clusterInfo.recordsInCluster}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-medium text-foreground text-sm">Cluster:</span>
              <p className="font-semibold text-sm" style={{ color: '#474A9E' }}>{clusterInfo.clusterId}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-medium text-foreground text-sm">Total Clusters:</span>
              <p className="font-semibold text-sm" style={{ color: '#1F8A7A' }}>{clusterInfo.totalClusters}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground text-sm">Distance Threshold:</span>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={distanceThreshold}
                  onChange={(e) => setDistanceThreshold(e.target.value)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-20 h-6 text-sm border-border font-semibold"
                  style={{ color: '#F48436' }}
                />
                <Button 
                  size="sm" 
                  className="h-6 px-3 btn-gradient-primary text-sm"
                  onClick={() => {
                    console.log('Update distance threshold to:', distanceThreshold)
                    // Here you would typically make an API call to update the threshold
                  }}
                >Update</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Main Cluster Data Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
         <div className="flex flex-col xl:flex-row gap-2 px-2 py-2 items-start xl:items-center w-full">
            {/* Search Input - Full width on mobile, expanded width on desktop */}
            <div className="relative w-full xl:w-auto xl:flex-1 xl:max-w-sm">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-8 py-1 h-8 w-full border-border text-sm"
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

            {/* Quick Filter Pills - Full width on mobile */}
            <div className="flex items-center gap-1 w-full xl:w-auto xl:flex-shrink-0">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
                className="h-7 px-2 btn-gradient-primary flex-1 xl:flex-none text-sm"
              >All</Button>
              <Button
                variant={filterType === 'with-approvals' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setFilterType('with-approvals')}
                className="h-7 px-2 flex-1 xl:flex-none text-sm"
              >Approved</Button>
              <Button
                variant={filterType === 'pending-approvals' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setFilterType('pending-approvals')}
                className="h-7 px-2 flex-1 xl:flex-none text-sm"
              >Pending</Button>
              <Button
                variant={filterType === 'no-approvals' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setFilterType('no-approvals')}
                className="h-7 px-2 flex-1 xl:flex-none text-sm"
              >None</Button>
            </div>

            {/* Compact Filters - Full width on mobile */}
            <div className="flex items-center gap-2 w-full xl:w-auto xl:flex-shrink-0">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="w-full xl:w-32 h-7 text-xs">
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
                <SelectTrigger className="w-full xl:w-36 h-7 text-xs">
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

            {/* Sort Controls - Full width on mobile */}
            <div className="flex items-center gap-1 w-full xl:w-auto xl:flex-shrink-0">
              <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                <SelectTrigger className="w-full xl:w-28 h-7 text-xs flex-1 xl:flex-none">
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
                className="h-7 w-7 p-0 flex-shrink-0"
              >
                {sortDirection === 'asc' ? <SortAscending className="h-3 w-3" /> : <SortDescending className="h-3 w-3" />}
              </Button>
            </div>

            {/* Clear & Results Count */}
            <div className="flex items-center gap-3 w-full xl:w-auto xl:ml-auto xl:flex-shrink-0 justify-between xl:justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 px-2 text-muted-foreground hover:text-foreground text-sm"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
              <span className="text-muted-foreground whitespace-nowrap text-sm">
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
                  <TableHead className="text-xs text-center text-sm">#</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-sm"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center text-sm">
                      ABCD 1-Up
                      {getSortIcon('id')}
                    </div>
                  </TableHead>
                  <TableHead className="text-sm">Service ID</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-sm"
                    onClick={() => handleSort('serviceName')}
                  >
                    <div className="flex items-center text-sm">
                      Service Name
                      {getSortIcon('serviceName')}
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-sm">P</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-sm"
                    onClick={() => handleSort('provisionType')}
                  >
                    <div className="flex items-center text-sm">
                      Provision Type
                      {getSortIcon('provisionType')}
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-sm">O</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 text-sm"
                    onClick={() => handleSort('options')}
                  >
                    <div className="flex items-center text-sm">
                      Options
                      {getSortIcon('options')}
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-sm">PTy Type</TableHead>
                  <TableHead className="text-sm">Bencode</TableHead>
                  <TableHead className="text-sm">New Bencode</TableHead>
                  <TableHead 
                    className="text-center cursor-pointer hover:bg-muted/50 text-sm"
                    onClick={() => handleSort('numSplit')}
                  >
                    <div className="flex items-center justify-center text-sm">
                      Num Split
                      {getSortIcon('numSplit')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-center cursor-pointer hover:bg-muted/50 text-sm"
                    onClick={() => handleSort('numProv')}
                  >
                    <div className="flex items-center justify-center text-sm">
                      Num Prov
                      {getSortIcon('numProv')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-center cursor-pointer hover:bg-muted/50 text-sm"
                    onClick={() => handleSort('numProd')}
                  >
                    <div className="flex items-center justify-center text-sm">
                      Num Prod
                      {getSortIcon('numProd')}
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-sm">Num Cmnt</TableHead>
                  <TableHead className="text-center text-sm">Num Grp</TableHead>
                  <TableHead className="text-center text-sm">Approve</TableHead>
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
                        className="h-auto p-0 text-info hover:text-info/80 text-sm"
                        onClick={() => {}}
                      >
                        {record.id}
                      </Button>
                    </TableCell>
                    <TableCell className="text-sm font-semibold" style={{ color: '#0174B2' }}>{record.serviceId}</TableCell>
                    <TableCell className="text-sm">{record.serviceName}</TableCell>
                    <TableCell className="text-xs text-center">-</TableCell>
                    <TableCell className="text-sm">{record.provisionType}</TableCell>
                    <TableCell className="text-xs text-center">-</TableCell>
                    <TableCell className="font-medium text-sm" style={{ color: '#F48436' }}>{record.options}</TableCell>
                    <TableCell className="text-center text-sm">-</TableCell>
                    <TableCell className="text-sm">{record.bencode}</TableCell>
                    <TableCell className="text-sm">{record.newBencode}</TableCell>
                    <TableCell className="text-center text-sm" style={{ color: '#1F8A7A', fontWeight: '600' }}>{record.numSplit}</TableCell>
                    <TableCell className="text-center text-sm" style={{ color: '#474A9E', fontWeight: '600' }}>{record.numProv}</TableCell>
                    <TableCell className="text-center text-sm" style={{ color: '#43812C', fontWeight: '600' }}>{record.numProd}</TableCell>
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
  );
}