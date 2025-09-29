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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setStatusFilter('all');
    setProvisionTypeFilter('all');
  };
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
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
      // Show both tables for this row
      setSelectedRecordId(abcdId)
      setSimilarRecords(mockClusterData.slice(0, 3))
      setExactSameCDRecords(mockClusterData.slice(0, 2))
      setShowSimilarRecords(true)
      setShowExactSameCDRecords(true)
      // Reset collapsible state to open when showing new records
      setIsSimilarRecordsOpen(true)
      setIsExactSameCDRecordsOpen(true)
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
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">ABCD</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Service ID</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Service Name</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Provision Type</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Options</th>
                    <th className="text-center px-4 py-2 font-medium text-muted-foreground">Provisions</th>
                    <th className="text-center px-4 py-2 font-medium text-muted-foreground">Products</th>
                    <th className="text-center px-4 py-2 font-medium text-muted-foreground">Approvals</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record, index) => (
                    <tr key={record.service_id} className="border-b border-border hover:bg-muted/30">
                      <td className="px-4 py-2">
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
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
            <Collapsible open={isSimilarRecordsOpen} onOpenChange={setIsSimilarRecordsOpen}>
              {/* Collapsible Trigger */}
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <CaretDown className={`h-4 w-4 transition-transform ${isSimilarRecordsOpen ? 'rotate-0' : '-rotate-90'}`} />
                    <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                      Similar Records for ABCD {selectedRecordId}
                    </h3>
                    <Badge variant="outline" className="ml-2 px-2 py-0.5 bg-info/10 text-info border-info/20">
                      {similarRecords.length} records
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
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
              </CollapsibleTrigger>
              
              {/* Collapsible Similar Records Table */}
              <CollapsibleContent>
                <div className="max-h-96 overflow-auto">
                  <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                    <thead className="sticky top-0 bg-card border-b-2 border-muted z-10 shadow-sm">
                      <tr>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>#</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>ABCD 1-Up</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Service ID</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card" style={{ fontSize: 'var(--font-body)' }}>Service Name</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card" style={{ fontSize: 'var(--font-body)' }}>Provision Type</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card" style={{ fontSize: 'var(--font-body)' }}>Options</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Provisions</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Products</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Clients</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Groups</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Similarity</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                      </tr>
                    </thead>
                    <tbody>
                      {similarRecords.map((record, index) => (
                        <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                          <td className="px-2 py-2 text-left align-middle" style={{ fontSize: 'var(--font-body)' }}>
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
                            <span className="text-accent break-words leading-tight" style={{ fontSize: 'var(--font-body)' }}>
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
                    </tbody>
                  </table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}
      
      {/* Exact Same CD Records Table */}
      {showExactSameCDRecords && selectedRecordId && (
        <Card className="bg-card border-border shadow-sm mt-4 mx-8">
          <CardContent className="p-0">
            <Collapsible open={isExactSameCDRecordsOpen} onOpenChange={setIsExactSameCDRecordsOpen}>
              {/* Collapsible Trigger */}
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20 cursor-pointer hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <CaretDown className={`h-4 w-4 transition-transform ${isExactSameCDRecordsOpen ? 'rotate-0' : '-rotate-90'}`} />
                    <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                      Exact Same Coverage Definition (CD) for ABCD {selectedRecordId}
                    </h3>
                    <Badge variant="outline" className="ml-2 px-2 py-0.5 bg-success/10 text-success border-success/20">
                      {exactSameCDRecords.length} records
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
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
              </CollapsibleTrigger>
              
              {/* Collapsible Exact Same CD Records Table */}
              <CollapsibleContent>
                <div className="max-h-96 overflow-auto">
                  <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                    <thead className="sticky top-0 bg-card border-b-2 border-muted z-10 shadow-sm">
                      <tr>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>#</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>ABCD 1-Up</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Service ID</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card" style={{ fontSize: 'var(--font-body)' }}>Service Name</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card" style={{ fontSize: 'var(--font-body)' }}>Provision Type</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground bg-card" style={{ fontSize: 'var(--font-body)' }}>Options</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Provisions</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Products</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Clients</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Groups</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Match Type</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exactSameCDRecords.map((record, index) => (
                        <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                          <td className="px-2 py-2 text-left align-middle" style={{ fontSize: 'var(--font-body)' }}>
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
                            <span className="text-accent break-words leading-tight" style={{ fontSize: 'var(--font-body)' }}>
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
                    </tbody>
                  </table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}
    </div>
  );
}