import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MagnifyingGlass, CaretDown, CaretUp, Funnel, X, SortAscending, SortDescending } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

// Types for filtering and sorting
type SortField = 'abcd_1up' | 'service_id' | 'service_name' | 'provision_type' | 'options' | 'num_provisions' | 'num_products' | 'num_splits' | 'num_clients' | 'num_groups'
type SortDirection = 'asc' | 'desc'
type FilterType = 'all' | 'with-approvals' | 'pending-approvals' | 'no-approvals'
type StatusFilter = 'all' | 'approved' | 'rejected' | 'pending'

// Generate random approval statuses for demonstration
const generateApprovalStatuses = () => {
  const statuses = ['✓', '✗', '-'];
  return Array.from({ length: 5 }, () => statuses[Math.floor(Math.random() * statuses.length)]);
};

// Mock data using the provided cluster details data - First 10 records
const mockClusterData = [
  {
    abcd_1up: 2001,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Anti Cancer Deductible",
    options: "Does Not Apply",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 8412,
    num_products: 4207,
    num_clients: 953,
    num_groups: 3310,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2019,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Anti Cancer Deductible",
    options: "No",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 4,
    num_products: 2,
    num_clients: 1,
    num_groups: 1,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2028,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Initial Cov Period Spec Tier Copay NonPref",
    options: "Yes Brand Drug 50 Dollars Generic Drug 50 Dollars Brand Drug if Generic Drug Available 50 Dollars",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 16,
    num_products: 2,
    num_clients: 2,
    num_groups: 11,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2036,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Coins - Member Form",
    options: "Yes Brand Drug 40 Percent of Allowed Charge Generic Drug 40 Percent of Allowed Charge Brand Drug if Generic Drug Available 40 Percent of Allowed Charge",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 88,
    num_products: 11,
    num_clients: 8,
    num_groups: 20,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2043,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Coins - Member Form",
    options: "Yes Brand Drug 60 Percent of Allowed Charge Generic Drug 60 Percent of Allowed Charge Brand Drug if Generic Drug Available 60 Percent of Allowed Charge",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 56,
    num_products: 7,
    num_clients: 4,
    num_groups: 8,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2046,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Copay Form",
    options: "No",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 30,
    num_products: 15,
    num_clients: 11,
    num_groups: 31,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2048,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Copay NonForm",
    options: "No",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 17,
    num_products: 9,
    num_clients: 7,
    num_groups: 23,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2058,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Copay NonForm",
    options: "Yes Brand Drug 250 Dollars Generic Drug 250 Dollars Brand Drug if Generic Drug Available 250 Dollars",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 220,
    num_products: 31,
    num_clients: 15,
    num_groups: 54,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2060,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Max Copay Form",
    options: "Yes Brand Drug 250 Dollars, per Days Range One Generic Drug 250 Dollars, per Days Range One Brand Drug if Generic Drug Available 250 Dollars, per Days Range One Brand Drug 500 Dollars, per Days Range Two Generic Drug 500 Dollars, per Days Range Two Brand Drug if Generic Drug Available 500 Dollars, per Days Range Two",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 14,
    num_products: 1,
    num_clients: 1,
    num_groups: 2,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2071,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Max Copay Form",
    options: "Yes Brand Drug 700 Dollars Generic Drug 700 Dollars Brand Drug if Generic Drug Available 700 Dollars",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 36,
    num_products: 9,
    num_clients: 1,
    num_groups: 2,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
]

// Component to render approval status indicators in compact format to save column space
function ApprovalStatusIndicators({ statuses }: { statuses: string[] }) {
  return (
    <div className="flex items-center justify-center gap-0.5 font-mono text-sm" role="group" aria-label="Approval status indicators">
      {statuses.map((status, index) => {
        let displaySymbol;
        let colorClass;
        let ariaLabel;
        
        if (status === '✓') {
          displaySymbol = '✓';
          colorClass = "text-success font-bold";
          ariaLabel = `Approved step ${index + 1}`;
        } else if (status === '✗') {
          displaySymbol = 'X';
          colorClass = "text-destructive font-bold";
          ariaLabel = `Rejected step ${index + 1}`;
        } else {
          displaySymbol = '-';
          colorClass = "text-muted-foreground font-bold";
          ariaLabel = `Pending step ${index + 1}`;
        }
        
        return (
          <span
            key={index}
            className={`inline-flex items-center justify-center w-4 text-center cursor-default transition-colors duration-200 ${colorClass}`}
            role="status"
            aria-label={ariaLabel}
            title={ariaLabel}
          >
            {displaySymbol}
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
    dataContext: 'id=0 names=Product Wide Provision Product Wide Provision',
    created: '2023-03-16 10:56:57',
    recordsInCluster: 225,
    clusterId: clusterId || '1',
    totalClusters: 1,
    distanceThreshold: 10,
    dendrogramId: "15001",
    dendrogramType: "d",
    dendrogramTypeName: "Only Options (D)"
  }

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('abcd_1up')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [provisionTypeFilter, setProvisionTypeFilter] = useState('all')
  const [distanceThreshold, setDistanceThreshold] = useState(clusterInfo.distanceThreshold.toString())

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...mockClusterData]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.abcd_1up.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply provision type filter
    if (provisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.provision_type === provisionTypeFilter)
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
        case 'abcd_1up':
          aValue = a.abcd_1up
          bValue = b.abcd_1up
          break
        case 'service_id':
          aValue = a.service_id
          bValue = b.service_id
          break
        case 'service_name':
          aValue = a.service_name
          bValue = b.service_name
          break
        case 'provision_type':
          aValue = a.provision_type
          bValue = b.provision_type
          break
        case 'options':
          aValue = a.options
          bValue = b.options
          break
        case 'num_provisions':
          aValue = a.num_provisions
          bValue = b.num_provisions
          break
        case 'num_products':
          aValue = a.num_products
          bValue = b.num_products
          break
        case 'num_splits':
          aValue = a.num_splits
          bValue = b.num_splits
          break
        case 'num_clients':
          aValue = a.num_clients
          bValue = b.num_clients
          break
        case 'num_groups':
          aValue = a.num_groups
          bValue = b.num_groups
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
    setSortField('abcd_1up')
    setSortDirection('asc')
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }

  // Get unique provision types for filter
  const uniqueProvisionTypes = Array.from(new Set(mockClusterData.map(item => item.provision_type)))

  return (
    <div className="min-h-screen flex flex-col font-['Proxima_Nova',sans-serif] cluster-details-1920">
      {/* Optimized Page Header for 1920x1080 - Minimal vertical space */}
      <div className="flex items-center justify-between mb-4 py-2 page-header">
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/clusters/${serviceId}`)}
            className="h-8 px-3 font-medium text-xs text-foreground border-border hover:bg-muted focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
          >
            <ArrowLeft className="h-3 w-3 mr-2" />
            Back to Clusters
          </Button>
          
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">
              Cluster #{clusterInfo.clusterId} of {clusterInfo.totalClusters} Details - {clusterInfo.xrayProjection}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {clusterInfo.recordsInCluster} records • Created {clusterInfo.created}
            </p>
          </div>
        </div>
      </div>

      {/* Ultra-Compact Cluster Information Bar for 1920x1080 */}
      <Card className="bg-card border-border mb-4 shadow-sm">
        <CardContent className="px-4 py-2 cluster-info-bar">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">Data Context:</span>
              <span className="text-muted-foreground truncate max-w-xs">{clusterInfo.dataContext}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground">Distance Threshold:</span>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={distanceThreshold}
                  onChange={(e) => setDistanceThreshold(e.target.value)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-16 h-6 text-xs border-border font-bold text-accent focus:ring-1 focus:ring-primary"
                />
                <Button 
                  size="sm" 
                  className="h-6 px-3 btn-gradient-primary text-xs font-medium focus:ring-1 focus:ring-primary"
                  onClick={() => {
                    console.log('Update distance threshold to:', distanceThreshold)
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Main Data Table - Optimized for 1920x1080 viewing */}
      <Card className="bg-card border-border shadow-sm flex-1 flex flex-col min-h-0">
        <CardContent className="p-0 flex flex-col flex-1 min-h-0">
          {/* Ultra-Compact Filter Controls - Single Row for 1920x1080 */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/20 flex-wrap filter-bar">
            {/* Search Input - Optimized width */}
            <div className="relative flex-1 min-w-64 max-w-80">
              <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-7 h-7 w-full border-border text-xs placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0 hover:bg-muted"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-2 w-2 text-muted-foreground" />
                </Button>
              )}
            </div>

            {/* Quick Status Filters - Ultra-compact for 1920x1080 */}
            <div className="flex items-center gap-1">
              {['all', 'with-approvals', 'pending-approvals', 'no-approvals'].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(type as FilterType)}
                  className={`h-7 px-2 text-xs font-medium transition-all ${
                    filterType === type 
                      ? type === 'all' ? 'btn-gradient-primary' 
                        : type === 'with-approvals' ? 'bg-success text-white hover:bg-success/90'
                        : type === 'pending-approvals' ? 'bg-warning text-white hover:bg-warning/90'
                        : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                      : 'border-border text-foreground hover:bg-muted'
                  } focus:ring-1 focus:ring-primary`}
                >
                  {type === 'all' ? 'All' 
                    : type === 'with-approvals' ? 'Approved'
                    : type === 'pending-approvals' ? 'Pending'
                    : 'None'}
                </Button>
              ))}
            </div>

            {/* Advanced Filters - Compact Selects */}
            <div className="flex items-center gap-1">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="w-24 h-7 text-xs border-border focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All</SelectItem>
                  <SelectItem value="approved" className="text-xs">✓</SelectItem>
                  <SelectItem value="rejected" className="text-xs">✗</SelectItem>
                  <SelectItem value="pending" className="text-xs">-</SelectItem>
                </SelectContent>
              </Select>

              <Select value={provisionTypeFilter} onValueChange={setProvisionTypeFilter}>
                <SelectTrigger className="w-32 h-7 text-xs border-border focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Types</SelectItem>
                  {uniqueProvisionTypes.map(type => (
                    <SelectItem key={type} value={type} className="text-xs">{type.substring(0, 20)}...</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                <SelectTrigger className="w-20 h-7 text-xs border-border focus:ring-1 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abcd_1up" className="text-xs">ABCD</SelectItem>
                  <SelectItem value="service_id" className="text-xs">Service ID</SelectItem>
                  <SelectItem value="service_name" className="text-xs">Name</SelectItem>
                  <SelectItem value="provision_type" className="text-xs">Type</SelectItem>
                  <SelectItem value="options" className="text-xs">Options</SelectItem>
                  <SelectItem value="num_provisions" className="text-xs">Prov</SelectItem>
                  <SelectItem value="num_products" className="text-xs">Prod</SelectItem>
                  <SelectItem value="num_clients" className="text-xs">Clients</SelectItem>
                  <SelectItem value="num_groups" className="text-xs">Groups</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="h-7 w-7 p-0 border-border hover:bg-muted focus:ring-1 focus:ring-primary"
              >
                {sortDirection === 'asc' ? 
                  <SortAscending className="h-3 w-3" /> : 
                  <SortDescending className="h-3 w-3" />
                }
              </Button>
            </div>

            {/* Results & Clear */}
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-muted text-xs focus:ring-1 focus:ring-primary"
              >
                <X className="h-2 w-2 mr-1" />
                Clear
              </Button>
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-muted/50 border-border">
                {filteredAndSortedData.length}/{mockClusterData.length}
              </Badge>
            </div>
          </div>
          
          {/* Table Container - Maximized for 1920x1080 with optimized column widths */}
          {/* Column Width Strategy:
              - Service Name & Provision Type: 280px each (1920px) for extensive service descriptions
              - Options: 500px (1920px) to accommodate complex option strings like drug formulary details
              - Numeric columns: Optimized for readability while conserving space
              - Total table width: ~1600px, using majority of 1856px content area (1920 - 64px margins)
          */}
          <div className="flex-1 min-h-0 overflow-auto table-container">
            <table className="w-full text-xs border-collapse cluster-details-table">
              <colgroup>
                <col className="col-index" />
                <col className="col-abcd" />
                <col className="col-service-id" />
                <col className="col-service-name" />
                <col className="col-provision-type" />
                <col className="col-options" />
                <col className="col-splits" />
                <col className="col-provisions" />
                <col className="col-products" />
                <col className="col-clients" />
                <col className="col-groups" />
                <col className="col-approval" />
              </colgroup>
              <thead className="sticky top-0 bg-card border-b border-border z-10">
                <tr>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap col-index">#</th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-abcd" onClick={() => handleSort('abcd_1up')}>
                    <div className="flex items-center">
                      ABCD 1-Up
                      {getSortIcon('abcd_1up')}
                    </div>
                  </th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-service-id" onClick={() => handleSort('service_id')}>
                    <div className="flex items-center">
                      Service ID
                      {getSortIcon('service_id')}
                    </div>
                  </th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors col-service-name" onClick={() => handleSort('service_name')}>
                    <div className="flex items-center">
                      Service Name
                      {getSortIcon('service_name')}
                    </div>
                  </th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors col-provision-type" onClick={() => handleSort('provision_type')}>
                    <div className="flex items-center">
                      Provision Type
                      {getSortIcon('provision_type')}
                    </div>
                  </th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-options" onClick={() => handleSort('options')}>
                    <div className="flex items-center">
                      Options
                      {getSortIcon('options')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-splits" onClick={() => handleSort('num_splits')}>
                    <div className="flex items-center justify-center">
                      Splits
                      {getSortIcon('num_splits')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-provisions" onClick={() => handleSort('num_provisions')}>
                    <div className="flex items-center justify-center">
                      Provisions
                      {getSortIcon('num_provisions')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-products" onClick={() => handleSort('num_products')}>
                    <div className="flex items-center justify-center">
                      Products
                      {getSortIcon('num_products')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-clients" onClick={() => handleSort('num_clients')}>
                    <div className="flex items-center justify-center">
                      Clients
                      {getSortIcon('num_clients')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-groups" onClick={() => handleSort('num_groups')}>
                    <div className="flex items-center justify-center">
                      Groups
                      {getSortIcon('num_groups')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap col-approval">Approval</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((record, index) => (
                  <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                    <td className="px-2 py-2 text-left col-index align-middle">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </td>
                    <td className="px-2 py-2 col-abcd align-middle">
                      <Button variant="link" className="p-0 h-auto text-primary hover:underline text-xs font-bold">
                        {record.abcd_1up}
                      </Button>
                    </td>
                    <td className="px-2 py-2 text-center col-service-id align-middle">
                      <span className="font-bold text-info">{record.service_id}</span>
                    </td>
                    <td className="px-2 py-2 col-service-name align-top">
                      <div className="flex items-start gap-1">
                        <span className="font-medium text-foreground break-words leading-tight" title={record.service_name}>
                          {record.service_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-2 col-provision-type align-top">
                      <span className="font-medium text-foreground break-words leading-tight" title={record.provision_type}>
                        {record.provision_type}
                      </span>
                    </td>
                    <td className="px-2 py-2 col-options align-top">
                      <span className="font-medium text-accent break-words leading-tight block" title={record.options}>
                        {record.options}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center col-splits align-middle">
                      <span className="font-bold text-secondary">{record.num_splits}</span>
                    </td>
                    <td className="px-2 py-2 text-center col-provisions align-middle">
                      <span className="font-bold text-primary">{record.num_provisions.toLocaleString()}</span>
                    </td>
                    <td className="px-2 py-2 text-center col-products align-middle">
                      <span className="font-bold text-success">{record.num_products.toLocaleString()}</span>
                    </td>
                    <td className="px-2 py-2 text-center col-clients align-middle">
                      <span className="text-info font-bold">{record.num_clients?.toLocaleString() || '-'}</span>
                    </td>
                    <td className="px-2 py-2 text-center col-groups align-middle">
                      <span className="text-warning font-bold">{record.num_groups?.toLocaleString() || '-'}</span>
                    </td>
                    <td className="px-2 py-2 text-center col-approval align-middle">
                      <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                    </td>
                  </tr>
                ))}
                {filteredAndSortedData.length === 0 && (
                  <tr>
                    <td colSpan={12} className="text-center py-8 text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                        <div>
                          <p className="font-semibold">No records found</p>
                          <p className="text-xs">Try adjusting your search or filter criteria</p>
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