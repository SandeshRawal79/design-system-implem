import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { MagnifyingGlass, CaretDown, CaretUp, X } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type SortField = 'abcd_1up' | 'service_id' | 'service_name' | 'provision_type' | 'options' | 'num_splits' | 'num_provisions' | 'num_products' | 'num_clients' | 'num_groups'
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

// Generate mock approval statuses
function generateApprovalStatuses(): string[] {
  const statuses = ['✓', '✗', '⏸']
  const length = Math.floor(Math.random() * 5) + 3 // 3-7 statuses
  return Array.from({ length }, () => statuses[Math.floor(Math.random() * statuses.length)])
}

// Mock data
const mockClusterData: ClusterRecord[] = [
  {
    abcd_1up: 2021,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Initial Cov Period Spec Tier Copay NonPref",
    options: "Yes Brand Drug 50 Dollars Generic Drug 50 Dollars Brand Drug if Generic Drug Available 50 Dollars",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 182,
    num_products: 8,
    num_clients: 5,
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
    num_products: 3,
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
    num_provisions: 21,
    num_products: 11,
    num_clients: 7,
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
    num_products: 15,
    num_clients: 4,
    num_groups: 18,
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
    num_provisions: 42,
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
  }
]

function ApprovalStatusIndicators({ statuses }: { statuses: string[] }) {
  return (
    <div className="flex items-center justify-center gap-0.5 font-mono text-sm" role="group" aria-label="Approval status indicators">
      {statuses.map((status, index) => {
        let colorClass = ''
        let ariaLabel = ''
        let displaySymbol = status
        
        if (status === '✓') {
          colorClass = 'text-success bg-success/10'
          ariaLabel = 'Approved'
        } else if (status === '✗') {
          colorClass = 'text-destructive bg-destructive/10'
          ariaLabel = 'Rejected'
        } else {
          colorClass = 'text-warning bg-warning/10'
          ariaLabel = 'Pending'
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
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortField, setSortField] = useState<SortField>('abcd_1up')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const clusterInfo = {
    xrayProjection: 'Only Options (D)',
    dataContext: 'id=0 names=Product Wide Provision Product Wide Provision',
    created: '2023-03-16 10:56:57',
    recordsInCluster: 225,
    clusterId: clusterId || '1',
    totalClusters: 1,
    distanceThreshold: 10,
    dendrogramId: "15001"
  }

  // Filtering and sorting logic
  const filteredAndSortedData = useMemo(() => {
    let filtered = mockClusterData

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.provision_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.options.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.abcd_1up.toString().includes(searchTerm) ||
        record.service_id.toString().includes(searchTerm)
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(record => {
        const hasApproved = record.approvalStatuses.includes('✓')
        const hasRejected = record.approvalStatuses.includes('✗')
        const hasPending = record.approvalStatuses.includes('⏸')
        
        switch (statusFilter) {
          case 'approved':
            return hasApproved && !hasRejected && !hasPending
          case 'rejected':
            return hasRejected
          case 'pending':
            return hasPending && !hasApproved && !hasRejected
          default:
            return true
        }
      })
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      // Handle string comparisons
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [searchTerm, statusFilter, sortField, sortDirection])

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
    setStatusFilter('all')
    setSortField('abcd_1up')
    setSortDirection('asc')
  }

  return (
    <div className="cluster-details-1920 h-full flex flex-col">
      <Card className="flex-1 min-h-0 shadow-sm border-border">
        <CardContent className="p-4 flex flex-col h-full">
          {/* Filter Bar */}
          <div className="flex items-center gap-3 pb-4 border-b border-border filter-bar flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-7 pl-7 text-xs border-border focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
              <SelectTrigger className="w-28 h-7 text-xs border-border hover:bg-muted focus:ring-1 focus:ring-primary">
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
              <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                <SelectTrigger className="w-32 h-7 text-xs border-border hover:bg-muted focus:ring-1 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abcd_1up" className="text-xs">ABCD 1-Up</SelectItem>
                  <SelectItem value="service_id" className="text-xs">Service ID</SelectItem>
                  <SelectItem value="service_name" className="text-xs">Service Name</SelectItem>
                  <SelectItem value="provision_type" className="text-xs">Provision Type</SelectItem>
                  <SelectItem value="options" className="text-xs">Options</SelectItem>
                  <SelectItem value="num_splits" className="text-xs">Splits</SelectItem>
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
                  <CaretUp className="h-3 w-3" /> : 
                  <CaretDown className="h-3 w-3" />
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
          
          {/* Table */}
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