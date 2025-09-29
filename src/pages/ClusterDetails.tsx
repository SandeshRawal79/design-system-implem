import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MagnifyingGlass, X, CaretUp, CaretDown, SortAscending, SortDescending } from '@phosphor-icons/react'

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

// Mock data using the provided cluster details data - Extended dataset for scrolling demonstration
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
    approvalStatuses: generateApprovalStatuses(),
    similarity_score: "95.2"
  },
  {
    abcd_1up: 2002,
    service_id: 15002,
    service_name: "State Legend Drugs",
    provision_type_1up: null,
    provision_type: "Anti Cancer Deductible",
    options: "Only Options (D)",
    num_provisions: 8412,
    num_products: 4207,
    is_single_split_with_no_change: null,
    num_clients: 850,
    num_groups: 3310,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses(),
    similarity_score: "92.8"
  }
];

const ApprovalStatusIndicators = ({ statuses }: { statuses: string[] }) => (
  <div className="flex gap-1 justify-center">
    {statuses.map((status, index) => (
      <span
        key={index}
        className={`inline-block w-4 h-4 text-center text-xs font-bold rounded ${
          status === '✓' ? 'bg-success/10 text-success' :
          status === '✗' ? 'bg-destructive/10 text-destructive' :
          'bg-muted text-muted-foreground'
        }`}
      >
        {status}
      </span>
    ))}
  </div>
);

export function ClusterDetails() {
  const { clusterId, serviceId } = useParams()
  
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('abcd_1up')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [provisionTypeFilter, setProvisionTypeFilter] = useState<string>('all')
  
  // State for similar records
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null)
  const [similarRecords, setSimilarRecords] = useState<any[]>([])
  const [showSimilarRecords, setShowSimilarRecords] = useState(false)
  
  // State for exact same CD records
  const [exactSameCDRecords, setExactSameCDRecords] = useState<any[]>([])
  const [showExactSameCDRecords, setShowExactSameCDRecords] = useState(false)
  const [isSimilarRecordsOpen, setIsSimilarRecordsOpen] = useState(true)
  const [isExactSameCDRecordsOpen, setIsExactSameCDRecordsOpen] = useState(true)

  // Filter states for similar records table
  const [similarSearchTerm, setSimilarSearchTerm] = useState('')
  const [similarSortField, setSimilarSortField] = useState<SortField>('abcd_1up')
  const [similarSortDirection, setSimilarSortDirection] = useState<SortDirection>('asc')
  const [similarFilterType, setSimilarFilterType] = useState<FilterType>('all')
  const [similarStatusFilter, setSimilarStatusFilter] = useState<StatusFilter>('all')
  const [similarProvisionTypeFilter, setSimilarProvisionTypeFilter] = useState('all')

  // Filter states for exact same CD records table
  const [exactSearchTerm, setExactSearchTerm] = useState('')
  const [exactSortField, setExactSortField] = useState<SortField>('abcd_1up')
  const [exactSortDirection, setExactSortDirection] = useState<SortDirection>('asc')
  const [exactFilterType, setExactFilterType] = useState<FilterType>('all')
  const [exactStatusFilter, setExactStatusFilter] = useState<StatusFilter>('all')
  const [exactProvisionTypeFilter, setExactProvisionTypeFilter] = useState('all')

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...mockClusterData]

    if (searchTerm) {
      filtered = filtered.filter(item =>
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
          aValue = a.num_splits || 0
          bValue = b.num_splits || 0
          break
        case 'num_clients':
          aValue = a.num_clients || 0
          bValue = b.num_clients || 0
          break
        case 'num_groups':
          aValue = a.num_groups || 0
          bValue = b.num_groups || 0
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

  // Filter and sort similar records
  const filteredAndSortedSimilarRecords = useMemo(() => {
    let filtered = [...similarRecords]

    // Apply search filter
    if (similarSearchTerm) {
      filtered = filtered.filter(item =>
        item.abcd_1up.toString().toLowerCase().includes(similarSearchTerm.toLowerCase()) ||
        item.service_name.toLowerCase().includes(similarSearchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(similarSearchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(similarSearchTerm.toLowerCase())
      )
    }

    // Apply provision type filter
    if (similarProvisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.provision_type === similarProvisionTypeFilter)
    }

    // Apply approval status filter
    if (similarFilterType !== 'all') {
      filtered = filtered.filter(item => {
        const hasApprovals = item.approvalStatuses.includes('✓')
        const hasRejections = item.approvalStatuses.includes('✗')
        const hasPending = item.approvalStatuses.includes('-')
        
        switch (similarFilterType) {
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
    if (similarStatusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const approvedCount = item.approvalStatuses.filter(s => s === '✓').length
        const rejectedCount = item.approvalStatuses.filter(s => s === '✗').length
        const pendingCount = item.approvalStatuses.filter(s => s === '-').length
        
        switch (similarStatusFilter) {
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

      switch (similarSortField) {
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

      if (aValue < bValue) return similarSortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return similarSortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [similarRecords, similarSearchTerm, similarSortField, similarSortDirection, similarFilterType, similarStatusFilter, similarProvisionTypeFilter])

  // Filter and sort exact same CD records
  const filteredAndSortedExactRecords = useMemo(() => {
    let filtered = [...exactSameCDRecords]

    // Apply search filter
    if (exactSearchTerm) {
      filtered = filtered.filter(item =>
        item.abcd_1up.toString().toLowerCase().includes(exactSearchTerm.toLowerCase()) ||
        item.service_name.toLowerCase().includes(exactSearchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(exactSearchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(exactSearchTerm.toLowerCase())
      )
    }

    // Apply provision type filter
    if (exactProvisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.provision_type === exactProvisionTypeFilter)
    }

    // Apply approval status filter
    if (exactFilterType !== 'all') {
      filtered = filtered.filter(item => {
        const hasApprovals = item.approvalStatuses.includes('✓')
        const hasRejections = item.approvalStatuses.includes('✗')
        const hasPending = item.approvalStatuses.includes('-')
        
        switch (exactFilterType) {
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
    if (exactStatusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const approvedCount = item.approvalStatuses.filter(s => s === '✓').length
        const rejectedCount = item.approvalStatuses.filter(s => s === '✗').length
        const pendingCount = item.approvalStatuses.filter(s => s === '-').length
        
        switch (exactStatusFilter) {
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

      switch (exactSortField) {
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

      if (aValue < bValue) return exactSortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return exactSortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [exactSameCDRecords, exactSearchTerm, exactSortField, exactSortDirection, exactFilterType, exactStatusFilter, exactProvisionTypeFilter])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSimilarSort = (field: SortField) => {
    if (similarSortField === field) {
      setSimilarSortDirection(similarSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSimilarSortField(field)
      setSimilarSortDirection('asc')
    }
  }

  const handleExactSort = (field: SortField) => {
    if (exactSortField === field) {
      setExactSortDirection(exactSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setExactSortField(field)
      setExactSortDirection('asc')
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

  const clearSimilarFilters = () => {
    setSimilarSearchTerm('')
    setSimilarFilterType('all')
    setSimilarStatusFilter('all')
    setSimilarProvisionTypeFilter('all')
    setSimilarSortField('abcd_1up')
    setSimilarSortDirection('asc')
  }

  const clearExactFilters = () => {
    setExactSearchTerm('')
    setExactFilterType('all')
    setExactStatusFilter('all')
    setExactProvisionTypeFilter('all')
    setExactSortField('abcd_1up')
    setExactSortDirection('asc')
  }

  const getSortIcon = (field: SortField, currentSortField: SortField, currentSortDirection: SortDirection) => {
    if (currentSortField !== field) return null
    return currentSortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }
  
  // Simulate finding similar records by clicking on the # column to show similar records
  const findSimilarRecords = (abcdId: number) => {
    if (selectedRecordId === abcdId) {
      setSelectedRecordId(null)
      setSimilarRecords([])
      setExactSameCDRecords([])
      setShowSimilarRecords(false)
      setShowExactSameCDRecords(false)
    } else {
      // Show both tables for this row and reset their filters
      setSelectedRecordId(abcdId)
      setSimilarRecords(mockClusterData.slice(0, 3))
      setExactSameCDRecords(mockClusterData.slice(0, 2))
      setShowSimilarRecords(true)
      setShowExactSameCDRecords(true)
      
      // Reset filters for both tables
      clearSimilarFilters()
      clearExactFilters()
    }
  }

  // Simulate finding exact same CD records
  const findExactSameCDRecords = (recordId: number) => {
    setSelectedRecordId(recordId);
    setExactSameCDRecords(mockClusterData.slice(0, 3));
    setShowExactSameCDRecords(true);
    setIsExactSameCDRecordsOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between bg-background">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cluster Details</h1>
        </div>
      </div>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Cluster Records</h2>
            
            {/* Search and filters */}
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => findSimilarRecords(15001)}>
                Find Similar Records
              </Button>
              <Button onClick={() => findExactSameCDRecords(15001)}>
                Find Exact CD Records
              </Button>
            </div>

            {/* Records table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap col-index bg-card" style={{ fontSize: 'var(--font-body)' }}>#</th>
                    <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-abcd bg-card" onClick={() => handleSort('abcd_1up')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        ABCD 1-Up
                        {getSortIcon('abcd_1up', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-service-id bg-card" onClick={() => handleSort('service_id')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Service ID
                        {getSortIcon('service_id', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors col-service-name bg-card" onClick={() => handleSort('service_name')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Service Name
                        {getSortIcon('service_name', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors col-provision-type bg-card" onClick={() => handleSort('provision_type')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Provision Type
                        {getSortIcon('provision_type', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-options bg-card" onClick={() => handleSort('options')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Options
                        {getSortIcon('options', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-splits bg-card" onClick={() => handleSort('num_splits')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Splits
                        {getSortIcon('num_splits', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-provisions bg-card" onClick={() => handleSort('num_provisions')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Provisions
                        {getSortIcon('num_provisions', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-products bg-card" onClick={() => handleSort('num_products')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Products
                        {getSortIcon('num_products', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-clients bg-card" onClick={() => handleSort('num_clients')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Clients
                        {getSortIcon('num_clients', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-groups bg-card" onClick={() => handleSort('num_groups')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Groups
                        {getSortIcon('num_groups', sortField, sortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap col-approval bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedData.map((record, index) => (
                    <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                      <td className="px-2 py-2 text-left col-index align-middle" style={{ fontSize: 'var(--font-body)' }}>
                        <Button 
                          variant="ghost" 
                          className={`p-1 h-auto text-primary underline hover:text-primary-foreground hover:bg-primary font-bold transition-colors ${
                            selectedRecordId === record.abcd_1up && (showSimilarRecords || showExactSameCDRecords) ? 'bg-primary text-primary-foreground' : ''
                          }`}
                          style={{ fontSize: 'var(--font-body)' }}
                          onClick={() => handleRowNumberClick(record.abcd_1up)}
                          title="Click to show/hide similar records and exact same CD records"
                        >
                          {index + 1}
                        </Button>
                      </td>
                      <td className="px-2 py-2 col-abcd align-middle">
                        <Button variant="link" className="p-0 h-auto text-primary underline font-bold" style={{ fontSize: 'var(--font-body)' }}>
                          {record.abcd_1up}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        <span className="font-bold text-info">{record.service_id}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-foreground">{record.service_name}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-foreground">{record.provision_type}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-accent">{record.options}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="font-bold text-success">{record.num_provisions.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="font-bold text-success">{record.num_products.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Similar Records Table */}
      {showSimilarRecords && selectedRecordId && (
        <Card className="bg-card border-border shadow-sm mt-4 mx-8">
          <CardContent className="p-0">
            {/* Similar Records Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                  Similar Records for ABCD {selectedRecordId}
                </h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-info/10 text-info border-info/20">
                  {filteredAndSortedSimilarRecords.length}/{similarRecords.length} records
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSimilarRecords(false)
                  setShowExactSameCDRecords(false)
                  setSelectedRecordId(null)
                  setSimilarRecords([])
                  setExactSameCDRecords([])
                }}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Similar Records Filter Controls */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/10 flex-wrap filter-bar flex-shrink-0">
              {/* Search Input */}
              <div className="relative flex-1 min-w-48 max-w-64">
                <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search similar records..."
                  value={similarSearchTerm}
                  onChange={(e) => setSimilarSearchTerm(e.target.value)}
                  className="pl-7 pr-7 border-border placeholder:text-muted-foreground focus:ring-1 focus:ring-ring transition-colors"
                  style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                />
                {similarSearchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0 hover:bg-muted transition-colors"
                    style={{ height: 'var(--button-xs)', width: 'var(--button-xs)' }}
                    onClick={() => setSimilarSearchTerm('')}
                  >
                    <X className="h-2 w-2 text-muted-foreground" />
                  </Button>
                )}
              </div>

              {/* Quick Status Filters */}
              <div className="flex items-center gap-1">
                {['all', 'with-approvals', 'pending-approvals', 'no-approvals'].map((type) => (
                  <Button
                    key={type}
                    variant={similarFilterType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSimilarFilterType(type as FilterType)}
                    className={`${
                      similarFilterType === type 
                        ? type === 'with-approvals' ? 'bg-success text-success-foreground hover:bg-success/90'
                          : type === 'pending-approvals' ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                          : type === 'no-approvals' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-border text-foreground hover:bg-muted'
                    } focus:ring-1 focus:ring-ring transition-colors`}
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  >
                    {type === 'all' ? 'All' 
                      : type === 'with-approvals' ? 'With ✓'
                      : type === 'pending-approvals' ? 'Pending'
                      : 'None'}
                  </Button>
                ))}
              </div>

              {/* Advanced Filters */}
              <div className="flex items-center gap-1">
                <Select value={similarStatusFilter} onValueChange={(value) => setSimilarStatusFilter(value as StatusFilter)}>
                  <SelectTrigger className="w-20 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All</SelectItem>
                    <SelectItem value="approved" style={{ fontSize: 'var(--font-body)' }}>✓</SelectItem>
                    <SelectItem value="rejected" style={{ fontSize: 'var(--font-body)' }}>✗</SelectItem>
                    <SelectItem value="pending" style={{ fontSize: 'var(--font-body)' }}>-</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={similarSortField} onValueChange={(value) => setSimilarSortField(value as SortField)}>
                  <SelectTrigger className="w-32 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abcd_1up" style={{ fontSize: 'var(--font-body)' }}>ABCD</SelectItem>
                    <SelectItem value="service_name" style={{ fontSize: 'var(--font-body)' }}>Name</SelectItem>
                    <SelectItem value="num_provisions" style={{ fontSize: 'var(--font-body)' }}>Prov</SelectItem>
                    <SelectItem value="num_products" style={{ fontSize: 'var(--font-body)' }}>Prod</SelectItem>
                    <SelectItem value="num_groups" style={{ fontSize: 'var(--font-body)' }}>Groups</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="px-2 border-border focus:ring-1 focus:ring-ring transition-colors hover:bg-muted"
                  style={{ height: 'var(--button-sm)' }}
                  onClick={() => setSimilarSortDirection(similarSortDirection === 'asc' ? 'desc' : 'asc')}
                >
                  {similarSortDirection === 'asc' ? 
                    <SortAscending className="h-3 w-3" /> : 
                    <SortDescending className="h-3 w-3" />
                  }
                </Button>
              </div>

              {/* Clear Filters */}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSimilarFilters}
                className="px-2 text-muted-foreground hover:text-foreground hover:bg-muted focus:ring-1 focus:ring-ring transition-colors"
                style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
              >
                <X className="h-2 w-2 mr-1" />
                Clear
              </Button>
            </div>
            
            {/* Similar Records Table */}
            <div className="max-h-96 overflow-auto">
              <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                <colgroup>
                  <col className="col-index" />
                  <col className="col-abcd" />
                  <col className="col-service-id" />
                  <col className="col-service-name" />
                  <col className="col-provision-type" />
                  <col className="col-options" />
                  <col className="col-provisions" />
                  <col className="col-products" />
                  <col className="col-clients" />
                  <col className="col-groups" />
                  <col className="col-similarity" />
                  <col className="col-approval" />
                </colgroup>
                <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                  <tr>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap col-index bg-card" style={{ fontSize: 'var(--font-body)' }}>#</th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('abcd_1up')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        ABCD 1-Up
                        {getSortIcon('abcd_1up', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('service_id')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Service ID
                        {getSortIcon('service_id', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('service_name')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Service Name
                        {getSortIcon('service_name', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('provision_type')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Provision Type
                        {getSortIcon('provision_type', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('options')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Options
                        {getSortIcon('options', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('num_provisions')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Provisions
                        {getSortIcon('num_provisions', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('num_products')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Products
                        {getSortIcon('num_products', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('num_clients')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Clients
                        {getSortIcon('num_clients', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSimilarSort('num_groups')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Groups
                        {getSortIcon('num_groups', similarSortField, similarSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Similarity</th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedSimilarRecords.map((record, index) => (
                    <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                      <td className="px-2 py-2 text-left col-index align-middle" style={{ fontSize: 'var(--font-body)' }}>
                        <span className="font-bold text-muted-foreground">{index + 1}</span>
                      </td>
                      <td className="px-2 py-2">
                        <Button variant="link" className="p-0 h-auto text-primary hover:underline font-bold" style={{ fontSize: 'var(--font-body)' }}>
                          {record.abcd_1up}
                        </Button>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}>{record.service_id}</span>
                      </td>
                      <td className="px-2 py-2 align-top">
                        <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.service_name}>
                          {record.service_name}
                        </span>
                      </td>
                      <td className="px-2 py-2 align-top">
                        <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.provision_type}>
                          {record.provision_type}
                        </span>
                      </td>
                      <td className="px-2 py-2 align-top">
                        <span className="font-medium text-accent break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.options}>
                          {record.options}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span className="font-bold text-primary" style={{ fontSize: 'var(--font-body)' }}>{record.num_provisions.toLocaleString()}</span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span className="font-bold text-success" style={{ fontSize: 'var(--font-body)' }}>{record.num_products.toLocaleString()}</span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span className="text-info font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_clients?.toLocaleString() || '-'}</span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span className="text-warning font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_groups?.toLocaleString() || '-'}</span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <Badge 
                          variant="outline" 
                          className={`font-bold ${
                            parseFloat(record.similarity_score) >= 95 ? 'bg-success/10 text-success border-success/20' :
                            parseFloat(record.similarity_score) >= 90 ? 'bg-warning/10 text-warning border-warning/20' :
                            'bg-info/10 text-info border-info/20'
                          }`}
                        >
                          {record.similarity_score}%
                        </Badge>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                      </td>
                    </tr>
                  ))}
                  {filteredAndSortedSimilarRecords.length === 0 && (
                    <tr>
                      <td colSpan={12} className="text-center py-8 text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                          <div>
                            <p className="font-semibold">No similar records found</p>
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
      )}
      
      {/* Exact Same CD Records Table */}
      {showExactSameCDRecords && selectedRecordId && (
        <Card className="bg-card border-border shadow-sm mt-4 mx-8">
          <CardContent className="p-0">
            {/* Exact Same CD Records Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                  Exact Same CD Records (Based on Selected ABCD) for ABCD {selectedRecordId}
                </h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-success/10 text-success border-success/20">
                  {filteredAndSortedExactRecords.length}/{exactSameCDRecords.length} exact matches
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSimilarRecords(false)
                  setShowExactSameCDRecords(false)
                  setSelectedRecordId(null)
                  setSimilarRecords([])
                  setExactSameCDRecords([])
                }}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Exact Same CD Records Filter Controls */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/10 flex-wrap filter-bar flex-shrink-0">
              {/* Search Input */}
              <div className="relative flex-1 min-w-48 max-w-64">
                <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search exact CD records..."
                  value={exactSearchTerm}
                  onChange={(e) => setExactSearchTerm(e.target.value)}
                  className="pl-7 pr-7 border-border placeholder:text-muted-foreground focus:ring-1 focus:ring-ring transition-colors"
                  style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                />
                {exactSearchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0 hover:bg-muted transition-colors"
                    style={{ height: 'var(--button-xs)', width: 'var(--button-xs)' }}
                    onClick={() => setExactSearchTerm('')}
                  >
                    <X className="h-2 w-2 text-muted-foreground" />
                  </Button>
                )}
              </div>

              {/* Quick Status Filters */}
              <div className="flex items-center gap-1">
                {['all', 'with-approvals', 'pending-approvals', 'no-approvals'].map((type) => (
                  <Button
                    key={type}
                    variant={exactFilterType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setExactFilterType(type as FilterType)}
                    className={`${
                      exactFilterType === type 
                        ? type === 'with-approvals' ? 'bg-success text-success-foreground hover:bg-success/90'
                          : type === 'pending-approvals' ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                          : type === 'no-approvals' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-border text-foreground hover:bg-muted'
                    } focus:ring-1 focus:ring-ring transition-colors`}
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  >
                    {type === 'all' ? 'All' 
                      : type === 'with-approvals' ? 'With ✓'
                      : type === 'pending-approvals' ? 'Pending'
                      : 'None'}
                  </Button>
                ))}
              </div>

              {/* Advanced Filters */}
              <div className="flex items-center gap-1">
                <Select value={exactStatusFilter} onValueChange={(value) => setExactStatusFilter(value as StatusFilter)}>
                  <SelectTrigger className="w-20 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All</SelectItem>
                    <SelectItem value="approved" style={{ fontSize: 'var(--font-body)' }}>✓</SelectItem>
                    <SelectItem value="rejected" style={{ fontSize: 'var(--font-body)' }}>✗</SelectItem>
                    <SelectItem value="pending" style={{ fontSize: 'var(--font-body)' }}>-</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={exactSortField} onValueChange={(value) => setExactSortField(value as SortField)}>
                  <SelectTrigger className="w-32 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abcd_1up" style={{ fontSize: 'var(--font-body)' }}>ABCD</SelectItem>
                    <SelectItem value="service_name" style={{ fontSize: 'var(--font-body)' }}>Name</SelectItem>
                    <SelectItem value="num_provisions" style={{ fontSize: 'var(--font-body)' }}>Prov</SelectItem>
                    <SelectItem value="num_products" style={{ fontSize: 'var(--font-body)' }}>Prod</SelectItem>
                    <SelectItem value="num_groups" style={{ fontSize: 'var(--font-body)' }}>Groups</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="px-2 border-border focus:ring-1 focus:ring-ring transition-colors hover:bg-muted"
                  style={{ height: 'var(--button-sm)' }}
                  onClick={() => setExactSortDirection(exactSortDirection === 'asc' ? 'desc' : 'asc')}
                >
                  {exactSortDirection === 'asc' ? 
                    <SortAscending className="h-3 w-3" /> : 
                    <SortDescending className="h-3 w-3" />
                  }
                </Button>
              </div>

              {/* Clear Filters */}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearExactFilters}
                className="px-2 text-muted-foreground hover:text-foreground hover:bg-muted focus:ring-1 focus:ring-ring transition-colors"
                style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
              >
                <X className="h-2 w-2 mr-1" />
                Clear
              </Button>
            </div>
            
            {/* Exact Same CD Records Table */}
            <div className="max-h-96 overflow-auto">
              <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                <colgroup>
                  <col className="col-index" />
                  <col className="col-abcd" />
                  <col className="col-service-id" />
                  <col className="col-service-name" />
                  <col className="col-provision-type" />
                  <col className="col-options" />
                  <col className="col-provisions" />
                  <col className="col-products" />
                  <col className="col-clients" />
                  <col className="col-groups" />
                  <col className="col-match-type" />
                  <col className="col-approval" />
                </colgroup>
                <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                  <tr>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap col-index bg-card" style={{ fontSize: 'var(--font-body)' }}>#</th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('abcd_1up')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        ABCD 1-Up
                        {getSortIcon('abcd_1up', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('service_id')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Service ID
                        {getSortIcon('service_id', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('service_name')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Service Name
                        {getSortIcon('service_name', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('provision_type')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Provision Type
                        {getSortIcon('provision_type', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('options')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center">
                        Options
                        {getSortIcon('options', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('num_provisions')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Provisions
                        {getSortIcon('num_provisions', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('num_products')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Products
                        {getSortIcon('num_products', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('num_clients')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Clients
                        {getSortIcon('num_clients', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card cursor-pointer hover:text-foreground transition-colors" onClick={() => handleExactSort('num_groups')} style={{ fontSize: 'var(--font-body)' }}>
                      <div className="flex items-center justify-center">
                        Groups
                        {getSortIcon('num_groups', exactSortField, exactSortDirection)}
                      </div>
                    </th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Match Type</th>
                    <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedExactRecords.map((record, index) => (
                    <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                      <td className="px-2 py-2 text-left col-index align-middle" style={{ fontSize: 'var(--font-body)' }}>
                        <span className="font-bold text-muted-foreground">{index + 1}</span>
                      </td>
                      <td className="px-2 py-2">
                        <Button variant="link" className="p-0 h-auto text-primary hover:underline font-bold" style={{ fontSize: 'var(--font-body)' }}>
                          {record.abcd_1up}
                        </Button>
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}>{record.service_id}</span>
                      </td>
                      <td className="px-2 py-2 align-top">
                        <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.service_name}>
                          {record.service_name}
                        </span>
                      </td>
                      <td className="px-2 py-2 align-top">
                        <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.provision_type}>
                          {record.provision_type}
                        </span>
                      </td>
                      <td className="px-2 py-2 align-top">
                        <span className="font-medium text-accent break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.options}>
                          {record.options}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span className="font-bold text-primary" style={{ fontSize: 'var(--font-body)' }}>{record.num_provisions.toLocaleString()}</span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span className="font-bold text-success" style={{ fontSize: 'var(--font-body)' }}>{record.num_products.toLocaleString()}</span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span className="text-info font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_clients?.toLocaleString() || '-'}</span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <span className="text-warning font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_groups?.toLocaleString() || '-'}</span>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <Badge 
                          variant="outline" 
                          className="bg-success/10 text-success border-success/20 font-bold"
                        >
                          Exact CD Match
                        </Badge>
                      </td>
                      <td className="px-2 py-2 text-center align-middle">
                        <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                      </td>
                    </tr>
                  ))}
                  {filteredAndSortedExactRecords.length === 0 && (
                    <tr>
                      <td colSpan={12} className="text-center py-8 text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                          <div>
                            <p className="font-semibold">No exact CD records found</p>
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
      )}
    </div>
  );
}