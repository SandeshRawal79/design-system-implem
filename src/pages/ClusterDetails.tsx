import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MagnifyingGlass, CaretDown, CaretUp, Funnel, X, SortAscending, SortDescending, CheckCircle, XCircle, Clock } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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

// Component to render approval status indicators with design system compliance
function ApprovalStatusIndicators({ statuses }: { statuses: string[] }) {
  return (
    <div className="flex items-center gap-1 justify-center" role="group" aria-label="Approval status indicators">
      {statuses.map((status, index) => {
        let icon;
        let colorClass;
        let ariaLabel;
        
        if (status === '✓') {
          icon = <CheckCircle className="h-3 w-3" aria-hidden="true" />;
          colorClass = "text-success bg-success/10 border-success/30 hover:bg-success/20";
          ariaLabel = `Approved step ${index + 1}`;
        } else if (status === '✗') {
          icon = <XCircle className="h-3 w-3" aria-hidden="true" />;
          colorClass = "text-destructive bg-destructive/10 border-destructive/30 hover:bg-destructive/20";
          ariaLabel = `Rejected step ${index + 1}`;
        } else {
          icon = <Clock className="h-3 w-3" aria-hidden="true" />;
          colorClass = "text-muted-foreground bg-muted border-border hover:bg-muted/80";
          ariaLabel = `Pending step ${index + 1}`;
        }
        
        return (
          <span
            key={index}
            className={`inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full border transition-colors duration-200 cursor-default ${colorClass}`}
            role="status"
            aria-label={ariaLabel}
            title={ariaLabel}
          >
            {icon}
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
    <div className="page-layout-full-width font-['Proxima_Nova',sans-serif]">
      {/* Page Header with Back Button and Title - Design System Compliant */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/clusters/${serviceId}`)}
            className="back-to-dashboard h-9 px-4 font-medium text-sm text-foreground border-border hover:bg-muted focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clusters
          </Button>
          
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              Provision Intelligence Hub - Cluster #{clusterInfo.clusterId} of {clusterInfo.totalClusters} Details
            </h1>
          </div>
        </div>
      </div>

      {/* Compact Cluster Information Cards - Design System Compliant */}
      <Card className="bg-card border-border p-2 mb-6">
        <CardContent className="p-0">
          <div className="flex flex-wrap items-start gap-x-8 gap-y-3">
            <div className="flex-shrink-0">
              <span className="font-semibold text-foreground text-sm">X-ray Projection:</span>
              <p className="text-muted-foreground text-sm mt-0.5">{clusterInfo.xrayProjection}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-semibold text-foreground text-sm">Data context:</span>
              <p className="text-muted-foreground text-sm mt-0.5">{clusterInfo.dataContext}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-semibold text-foreground text-sm">Created:</span>
              <p className="text-muted-foreground text-sm mt-0.5">{clusterInfo.created}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-semibold text-foreground text-sm">Records in this Cluster:</span>
              <p className="font-bold text-sm mt-0.5 text-success">{clusterInfo.recordsInCluster}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-semibold text-foreground text-sm">Cluster:</span>
              <p className="font-bold text-sm mt-0.5 text-primary">{clusterInfo.clusterId}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="font-semibold text-foreground text-sm">Total Clusters:</span>
              <p className="font-bold text-sm mt-0.5 text-secondary">{clusterInfo.totalClusters}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground text-sm">Distance Threshold:</span>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={distanceThreshold}
                  onChange={(e) => setDistanceThreshold(e.target.value)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-20 h-8 text-sm border-border font-bold text-accent focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Button 
                  size="sm" 
                  className="h-8 px-4 btn-gradient-primary text-sm font-medium focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => {
                    console.log('Update distance threshold to:', distanceThreshold)
                    // Here you would typically make an API call to update the threshold
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Main Cluster Data Table - Design System Compliant */}
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-0">
          {/* Enhanced Filter and Search Controls - Single Row Layout */}
          <div className="flex flex-col xl:flex-row gap-3 px-4 py-4 items-start xl:items-center w-full border-b border-border bg-muted/30">
            {/* Search Input - Enhanced design system compliance */}
            <div className="relative w-full xl:w-auto xl:flex-1 xl:max-w-sm">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2 h-9 w-full border-border text-sm font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </Button>
              )}
            </div>

            {/* Quick Filter Pills - Design System Colors */}
            <div className="flex items-center gap-2 w-full xl:w-auto xl:flex-shrink-0">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
                className={`h-8 px-3 font-medium text-xs transition-all ${
                  filterType === 'all' 
                    ? 'btn-gradient-primary text-primary-foreground' 
                    : 'border-border text-foreground hover:bg-muted hover:text-foreground'
                } flex-1 xl:flex-none focus:ring-2 focus:ring-primary focus:ring-offset-1`}
              >
                All
              </Button>
              <Button
                variant={filterType === 'with-approvals' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('with-approvals')}
                className={`h-8 px-3 font-medium text-xs transition-all ${
                  filterType === 'with-approvals' 
                    ? 'bg-success text-white hover:bg-success/90' 
                    : 'border-border text-foreground hover:bg-muted hover:text-foreground'
                } flex-1 xl:flex-none focus:ring-2 focus:ring-success focus:ring-offset-1`}
              >
                Approved
              </Button>
              <Button
                variant={filterType === 'pending-approvals' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('pending-approvals')}
                className={`h-8 px-3 font-medium text-xs transition-all ${
                  filterType === 'pending-approvals' 
                    ? 'bg-warning text-white hover:bg-warning/90' 
                    : 'border-border text-foreground hover:bg-muted hover:text-foreground'
                } flex-1 xl:flex-none focus:ring-2 focus:ring-warning focus:ring-offset-1`}
              >
                Pending
              </Button>
              <Button
                variant={filterType === 'no-approvals' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('no-approvals')}
                className={`h-8 px-3 font-medium text-xs transition-all ${
                  filterType === 'no-approvals' 
                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' 
                    : 'border-border text-foreground hover:bg-muted hover:text-foreground'
                } flex-1 xl:flex-none focus:ring-2 focus:ring-destructive focus:ring-offset-1`}
              >
                None
              </Button>
            </div>

            {/* Advanced Filters - Design System Compliant */}
            <div className="flex items-center gap-2 w-full xl:w-auto xl:flex-shrink-0">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="w-full xl:w-36 h-8 text-xs font-medium border-border focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="font-['Proxima_Nova',sans-serif]">
                  <SelectItem value="all" className="text-sm">All Status</SelectItem>
                  <SelectItem value="approved" className="text-sm">Approved</SelectItem>
                  <SelectItem value="rejected" className="text-sm">Rejected</SelectItem>
                  <SelectItem value="pending" className="text-sm">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={provisionTypeFilter} onValueChange={setProvisionTypeFilter}>
                <SelectTrigger className="w-full xl:w-40 h-8 text-xs font-medium border-border focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="font-['Proxima_Nova',sans-serif]">
                  <SelectItem value="all" className="text-sm">All Types</SelectItem>
                  {uniqueProvisionTypes.map(type => (
                    <SelectItem key={type} value={type} className="text-sm">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Controls - Enhanced */}
            <div className="flex items-center gap-2 w-full xl:w-auto xl:flex-shrink-0">
              <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                <SelectTrigger className="w-full xl:w-32 h-8 text-xs font-medium border-border focus:ring-2 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-['Proxima_Nova',sans-serif]">
                  <SelectItem value="id" className="text-sm">ID</SelectItem>
                  <SelectItem value="serviceName" className="text-sm">Name</SelectItem>
                  <SelectItem value="provisionType" className="text-sm">Type</SelectItem>
                  <SelectItem value="options" className="text-sm">Options</SelectItem>
                  <SelectItem value="numProv" className="text-sm">Prov</SelectItem>
                  <SelectItem value="numProd" className="text-sm">Prod</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="h-8 w-8 p-0 border-border hover:bg-muted focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                {sortDirection === 'asc' ? 
                  <SortAscending className="h-4 w-4 text-foreground" /> : 
                  <SortDescending className="h-4 w-4 text-foreground" />
                }
              </Button>
            </div>

            {/* Clear Filters & Results Count */}
            <div className="flex items-center gap-4 w-full xl:w-auto xl:ml-auto xl:flex-shrink-0 justify-between xl:justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-muted text-sm font-medium focus:ring-2 focus:ring-primary focus:ring-offset-1"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
              <Badge variant="outline" className="text-xs font-medium px-2 py-1 bg-muted/50 text-muted-foreground border-border">
                {filteredAndSortedData.length} of {mockClusterData.length} records
              </Badge>
            </div>
          </div>

          {/* Table Header */}
          <div className="px-4 py-3 bg-card border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Main Cluster Data</h2>
          </div>
          
          {/* Table using provided shadcn-style structure */}
          <div className="max-h-[calc(100vh-520px)] overflow-y-auto">
            <table data-slot="table" className="w-full caption-bottom text-sm">
              <thead data-slot="table-header" className="[&_tr]:border-b">
                <tr data-slot="table-row" className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">#</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" 
                      onClick={() => handleSort('id')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('id'); }}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start cursor-pointer"
                    >
                      <div className="flex items-center">ABCD 1-Up<i className="fas fa-sort text-muted-foreground ml-2"></i></div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">Service ID</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" 
                      onClick={() => handleSort('serviceName')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('serviceName'); }}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start cursor-pointer"
                    >
                      <div className="flex items-center">Service Name<i className="fas fa-sort text-muted-foreground ml-2"></i></div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">P</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" 
                      onClick={() => handleSort('provisionType')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('provisionType'); }}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start cursor-pointer"
                    >
                      <div className="flex items-center">Provision Type<i className="fas fa-sort text-muted-foreground ml-2"></i></div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">O</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" 
                      onClick={() => handleSort('options')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('options'); }}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start cursor-pointer"
                    >
                      <div className="flex items-center">Options<i className="fas fa-sort text-muted-foreground ml-2"></i></div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">PTy Type</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">Bencode</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">New Bencode</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" 
                      onClick={() => handleSort('numSplit')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('numSplit'); }}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start cursor-pointer"
                    >
                      <div className="flex items-center">Num Split<i className="fas fa-sort text-muted-foreground ml-2"></i></div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" 
                      onClick={() => handleSort('numProv')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('numProv'); }}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start cursor-pointer"
                    >
                      <div className="flex items-center">Num Prov<i className="fas fa-sort text-muted-foreground ml-2"></i></div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" 
                      onClick={() => handleSort('numProd')}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('numProd'); }}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start cursor-pointer"
                    >
                      <div className="flex items-center">Num Prod<i className="fas fa-sort text-muted-foreground ml-2"></i></div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">Num Cmnt</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">Num Grp</div>
                    </button>
                  </th>
                  <th data-slot="table-head" className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    <button data-slot="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start">
                      <div className="flex items-center">Approve</div>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody data-slot="table-body" className="[&_tr:last-child]:border-0">
                {filteredAndSortedData.map((record, index) => (
                  <tr key={record.id} data-slot="table-row" className="data-[state=selected]:bg-muted border-b hover:bg-muted/30 transition-colors">
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4">
                      <button 
                        data-slot="button" 
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md gap-1.5 has-[>svg]:px-2.5 p-1 h-6 w-6 hover:bg-muted/50"
                        onClick={() => console.log('Navigate to ABCD details:', record.id)}
                      >
                        {record.id}
                      </button>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs font-bold text-info">{record.serviceId}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-scroll text-primary"></i>
                        <span className="font-medium text-foreground">{record.serviceName}</span>
                      </div>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs text-muted-foreground">-</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4">
                      <span className="text-xs font-medium text-foreground">{record.provisionType}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs text-muted-foreground">-</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4">
                      <span className="text-xs font-bold text-accent">{record.options}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs text-muted-foreground">-</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4">
                      <span className="text-xs text-muted-foreground">{record.bencode || '-'}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4">
                      <span className="text-xs text-muted-foreground">{record.newBencode || '-'}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs font-bold text-secondary">{record.numSplit}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs font-bold text-primary">{record.numProv}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs font-bold text-success">{record.numProd}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs text-muted-foreground">{record.numCmnt || '-'}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <span className="text-xs text-muted-foreground">{record.numGrp || '-'}</span>
                    </td>
                    <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap py-4 text-center">
                      <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                    </td>
                  </tr>
                ))}
                {filteredAndSortedData.length === 0 && (
                  <tr data-slot="table-row" className="hover:bg-transparent border-b">
                    <td colSpan={17} data-slot="table-cell" className="h-24 p-2 text-center text-muted-foreground align-middle">
                      <div className="flex flex-col items-center gap-3 py-8">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/30">
                          <MagnifyingGlass className="h-6 w-6 text-muted-foreground/60" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">No records found</p>
                          <p className="text-xs text-muted-foreground">Try adjusting your search or filter criteria</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}