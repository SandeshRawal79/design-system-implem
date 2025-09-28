import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { MagnifyingGlass, CaretDown, CaretUp, X, SortAscending, SortDescending } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Types for filtering and sorting
type SortField = 'abcd_1up' | 'service_id' | 'service_name' | 'provision_type' | 'options' | 'num_provisions' | 'num_products' | 'num_splits' | 'num_clients' | 'num_groups'
type FilterType = 'all' | 'with-approvals' | 'pending-approvals' | 'no-approvals'
type StatusFilter = 'all' | 'approved' | 'rejected' | 'pending'

// Mock data interface
interface ClusterRecord {
  abcd_1up: number
  service_id: number
  service_name: string
  provision_type_1up: string | null
  provision_type: string
  options: string
  num_splits: number
  is_single_split_with_no_change: boolean | null
  num_provisions: number
  num_products: number
  num_clients: number
  num_groups: number
  splits: unknown[]
  phase_included_in_bm: number
  approver_groups_needed_bm: number
  approvals_given_bm: number
  approvals_done_by_abcd_set_1up: string | null
  member_of_sets: string | null
  approvalStatuses: string[]
}

const generateApprovalStatuses = () => {
  const statuses = ['✓', '✗', '-']
  return Array.from({ length: 5 }, () => statuses[Math.floor(Math.random() * statuses.length)])
}

const mockClusterData: ClusterRecord[] = [
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
    num_products: 4,
    num_clients: 953,
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
    num_products: 8,
    num_clients: 2,
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
    abcd_1up: 2036,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Coins - Member Form",
    options: "Yes Brand Drug 40 Percent of Allowed Charge Generic Drug 40 Percent of Allowed Charge Brand Drug if Generic Drug Available 40 Percent of Allowed Charge",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 182,
    num_products: 11,
    num_clients: 5,
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
    num_products: 9,
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
    num_splits: 2,
    is_single_split_with_no_change: null,
    num_provisions: 34,
    num_products: 15,
    num_clients: 8,
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
    num_products: 6,
    num_clients: 7,
    num_groups: 12,
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
    num_splits: 1,
    is_single_split_with_no_change: null,
    num_provisions: 89,
    num_products: 31,
    num_clients: 12,
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
    num_products: 7,
    num_clients: 1,
    num_groups: 3,
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
    num_provisions: 28,
    num_products: 9,
    num_clients: 6,
    num_groups: 2,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  }
]

// Component to render approval status indicators in compact format
function ApprovalStatusIndicators({ statuses }: { statuses: string[] }) {
  return (
    <div className="flex items-center justify-center gap-0.5 font-mono text-sm" role="group" aria-label="Approval status indicators">
      {statuses.map((status, index) => {
        let displaySymbol = status
        let colorClass = ''
        let ariaLabel = ''
        
        if (status === '✓') {
          colorClass = "text-success font-bold"
          ariaLabel = `Approved step ${index + 1}`
        } else if (status === '✗') {
          colorClass = "text-destructive font-bold"
          ariaLabel = `Rejected step ${index + 1}`
        } else {
          colorClass = "text-muted-foreground font-bold"
          ariaLabel = `Pending step ${index + 1}`
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
        )
      })}
    </div>
  )
}

export function ClusterDetails() {
  const { serviceId, clusterId } = useParams()

  const clusterInfo = {
    xrayProjection: 'Only Options (D)',
    dataContext: 'id=0 names=Product Wide Provision Product Wide Provision',
    created: '2023-03-16 10:56:57',
    recordsInCluster: 225,
    clusterId: clusterId || '1',
    totalClusters: 1,
    distanceThreshold: 10,
    dendrogramId: "15001",
    dendrogramType: "d"
  }

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [provisionTypeFilter, setProvisionTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortField, setSortField] = useState<SortField>('abcd_1up')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = mockClusterData

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.abcd_1up.toString().includes(searchTerm)
      )
    }

    // Apply provision type filter
    if (provisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => {
        switch (provisionTypeFilter) {
          case 'copay':
            return item.provision_type.toLowerCase().includes('copay')
          case 'deductible':
            return item.provision_type.toLowerCase().includes('deductible')
          case 'coins':
            return item.provision_type.toLowerCase().includes('coins')
          default:
            return true
        }
      })
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const approvedCount = item.approvalStatuses.filter(status => status === '✓').length
        const rejectedCount = item.approvalStatuses.filter(status => status === '✗').length
        const pendingCount = item.approvalStatuses.filter(status => status === '-').length

        switch (statusFilter) {
          case 'approved':
            return approvedCount > 0 && rejectedCount === 0
          case 'rejected':
            return rejectedCount > 0
          case 'pending':
            return pendingCount > 0 && approvedCount === 0 && rejectedCount === 0
          default:
            return true
        }
      })
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number = ''
      let bValue: string | number = ''

      switch (sortField) {
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
        default:
          aValue = a[sortField] || 0
          bValue = b[sortField] || 0
          break
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      
      return sortDirection === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue)
    })

    return sorted
  }, [searchTerm, provisionTypeFilter, statusFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }

  const clearFilters = () => {
    setSearchTerm('')
    setProvisionTypeFilter('all')
    setStatusFilter('all')
  }

  return (
    <div className="cluster-details-1920 page-layout-full-width">
      <Card className="h-full flex flex-col border-border bg-card shadow-sm">
        <CardHeader className="pb-4 border-b border-border bg-card">
          <CardTitle className="text-h3-responsive font-bold text-foreground">
            Cluster {clusterId} Details
          </CardTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-muted-foreground font-medium">X-ray Projection:</span>
              <p className="text-foreground font-semibold">{clusterInfo.xrayProjection}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground font-medium">Records:</span>
              <p className="text-foreground font-semibold">{clusterInfo.recordsInCluster}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground font-medium">Service ID:</span>
              <p className="text-foreground font-semibold">{serviceId}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground font-medium">Created:</span>
              <p className="text-foreground font-semibold">{clusterInfo.created}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4 min-h-0">
          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 mb-4 filter-bar">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 h-7 text-xs border-border focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Provision Type Filter */}
            <Select value={provisionTypeFilter} onValueChange={setProvisionTypeFilter}>
              <SelectTrigger className="w-36 h-7 text-xs border-border focus:ring-1 focus:ring-primary">
                <SelectValue placeholder="Provision Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Types</SelectItem>
                <SelectItem value="copay" className="text-xs">Copay</SelectItem>
                <SelectItem value="deductible" className="text-xs">Deductible</SelectItem>
                <SelectItem value="coins" className="text-xs">Coins</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(value: StatusFilter) => setStatusFilter(value)}>
              <SelectTrigger className="w-32 h-7 text-xs border-border focus:ring-1 focus:ring-primary">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">All Status</SelectItem>
                <SelectItem value="approved" className="text-xs">Approved</SelectItem>
                <SelectItem value="rejected" className="text-xs">Rejected</SelectItem>
                <SelectItem value="pending" className="text-xs">Pending</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Controls */}
            <div className="flex items-center gap-1">
              <Select value={sortField} onValueChange={(value: SortField) => setSortField(value)}>
                <SelectTrigger className="w-28 h-7 text-xs border-border focus:ring-1 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abcd_1up" className="text-xs">ABCD</SelectItem>
                  <SelectItem value="service_id" className="text-xs">Service ID</SelectItem>
                  <SelectItem value="service_name" className="text-xs">Service</SelectItem>
                  <SelectItem value="provision_type" className="text-xs">Type</SelectItem>
                  <SelectItem value="options" className="text-xs">Options</SelectItem>
                  <SelectItem value="num_provisions" className="text-xs">Provisions</SelectItem>
                  <SelectItem value="num_products" className="text-xs">Products</SelectItem>
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
          
          {/* Table Container */}
          <div className="flex-1 min-h-0 overflow-auto table-container">
            <table className="w-full border-collapse cluster-details-table" style={{ fontSize: 'var(--font-caption)' }}>
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
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap col-index" style={{ fontSize: 'var(--font-label)' }}>#</th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-abcd" onClick={() => handleSort('abcd_1up')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center">
                      ABCD 1-Up
                      {getSortIcon('abcd_1up')}
                    </div>
                  </th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-service-id" onClick={() => handleSort('service_id')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center">
                      Service ID
                      {getSortIcon('service_id')}
                    </div>
                  </th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors col-service-name" onClick={() => handleSort('service_name')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center">
                      Service Name
                      {getSortIcon('service_name')}
                    </div>
                  </th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors col-provision-type" onClick={() => handleSort('provision_type')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center">
                      Provision Type
                      {getSortIcon('provision_type')}
                    </div>
                  </th>
                  <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-options" onClick={() => handleSort('options')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center">
                      Options
                      {getSortIcon('options')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-splits" onClick={() => handleSort('num_splits')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center justify-center">
                      Splits
                      {getSortIcon('num_splits')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-provisions" onClick={() => handleSort('num_provisions')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center justify-center">
                      Provisions
                      {getSortIcon('num_provisions')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-products" onClick={() => handleSort('num_products')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center justify-center">
                      Products
                      {getSortIcon('num_products')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-clients" onClick={() => handleSort('num_clients')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center justify-center">
                      Clients
                      {getSortIcon('num_clients')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-groups" onClick={() => handleSort('num_groups')} style={{ fontSize: 'var(--font-label)' }}>
                    <div className="flex items-center justify-center">
                      Groups
                      {getSortIcon('num_groups')}
                    </div>
                  </th>
                  <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap col-approval" style={{ fontSize: 'var(--font-label)' }}>Approval</th>
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
                      <div className="max-w-full">
                        <span className="font-medium text-foreground break-words leading-tight block" title={record.service_name}>
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
  )
}