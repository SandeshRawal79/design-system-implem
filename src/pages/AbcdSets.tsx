import { useState, useMemo, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MagnifyingGlass, X, CaretUp, CaretDown, SortAscending, SortDescending } from '@phosphor-icons/react'

interface AbcdSet {
  id: number
  creator: string
  name: string
  setCount: number
  description: string
  abcdTup: number
  serviceId: number
  serviceName: string
  provisionType: string
  options: string
  approvalsNeeded: string[]
  timestamp: string
}

interface AbcdSetMember {
  abcd_1up: number
  service_id: number
  service_name: string
  provision_type: string
  options: string
  num_provisions: number
  num_products: number
  num_clients: number
  num_groups: number
  approvalStatuses: string[]
}

// Types for filtering and sorting
type SortField = 'id' | 'creator' | 'name' | 'setCount' | 'abcdTup' | 'serviceName' | 'provisionType' | 'timestamp'
type SortDirection = 'asc' | 'desc'
type FilterType = 'all' | 'with-approvals' | 'pending-approvals' | 'no-approvals'

// Generate random approval statuses
const generateApprovalStatuses = () => {
  const statuses = ['✓', '✗', '-'];
  return Array.from({ length: 5 }, () => statuses[Math.floor(Math.random() * statuses.length)]);
};

// ApprovalStatusIndicators for 5 teams
const TEAM_NAMES = ["SH", "HPO", "PM&D", "Legal", "Finance"];
function ApprovalStatusIndicators({ approvalsNeeded }: { approvalsNeeded: string[] }) {
  return (
    <div className="flex items-center justify-center gap-0.5 font-mono text-sm" role="group" aria-label="Approval status indicators">
      {TEAM_NAMES.map((team, index) => {
        const isNeeded = approvalsNeeded.includes(team);
        let displaySymbol = isNeeded ? "✓" : "X";
        let colorClass = isNeeded ? "text-success font-bold" : "text-destructive font-bold";
        let ariaLabel = isNeeded ? `Approval needed from ${team}` : `No approval needed from ${team}`;
        return (
          <span
            key={team}
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

// Mock data for ABCD Sets
const mockAbcdSets: AbcdSet[] = [
  {
    id: 1,
    creator: "Dheeraj",
    name: "Z No Change CD 1",
    setCount: 1053,
    description: "Type=Coverage, options=Yes",
    abcdTup: 1922,
    serviceId: 0,
    serviceName: "Product Wide Provision",
    provisionType: "Coverage",
    options: "Yes",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:19"
  },
  {
    id: 2,
    creator: "Dheeraj",
    name: "Z No Change CD 2", 
    setCount: 796,
    description: "Type=Coverage, options=No",
    abcdTup: 972,
    serviceId: 0,
    serviceName: "Product Wide Provision",
    provisionType: "Coverage",
    options: "No",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:22"
  },
  {
    id: 3,
    creator: "Dheeraj",
    name: "Z No Change CD 3",
    setCount: 322,
    description: "Type=Deductible, options=No", 
    abcdTup: 1459,
    serviceId: 0,
    serviceName: "Product Wide Provision",
    provisionType: "Deductible",
    options: "No",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:24"
  },
  {
    id: 4,
    creator: "Dheeraj",
    name: "Z No Change CD 4",
    setCount: 321,
    description: "Type=Coinsurance - Insurer, options=Yes 100 Percent",
    abcdTup: 386,
    serviceId: 0,
    serviceName: "Product Wide Provision",
    provisionType: "Coinsurance - Insurer",
    options: "Yes 100 Percent",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:26"
  },
  {
    id: 5,
    creator: "Dheeraj",
    name: "Z No Change CD 5",
    setCount: 288,
    description: "Type=Copayment, options=No",
    abcdTup: 892,
    serviceId: 0,
    serviceName: "Product Wide Provision",
    provisionType: "Copayment",
    options: "No",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:28"
  },
  {
    id: 6,
    creator: "Dheeraj",
    name: "Z No Change CD 6",
    setCount: 95,
    description: "Type=Coinsurance - Insurer, options=Yes 80 Percent up to Out-of-Pocket 100 Percent thereafter",
    abcdTup: 529,
    serviceId: 0,
    serviceName: "Product Wide Provision", 
    provisionType: "Coinsurance - Insurer",
    options: "Yes 80 Percent up to Out-of-Pocket 100 Percent thereafter",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:27"
  },
  {
    id: 7,
    creator: "Dheeraj",
    name: "Z No Change CD 7",
    setCount: 93,
    description: "Type=Coinsurance - Insurer, options=Yes 80 Percent",
    abcdTup: 136,
    serviceId: 0,
    serviceName: "Product Wide Provision",
    provisionType: "Coinsurance - Insurer",
    options: "Yes 80 Percent",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:27"
  }
]

// Generate members for a given ABCD Set
const generateSetMembers = (setId: number): AbcdSetMember[] => {
  const baseSet = mockAbcdSets.find(s => s.id === setId)
  if (!baseSet) return []
  
  // Generate random number of members based on set count
  const memberCount = Math.min(baseSet.setCount, 15) // Limit for demo
  
  return Array.from({ length: memberCount }, (_, i) => ({
    abcd_1up: 10000 + setId * 1000 + i,
    service_id: baseSet.serviceId + Math.floor(Math.random() * 3),
    service_name: baseSet.serviceName,
    provision_type: baseSet.provisionType,
    options: i % 3 === 0 ? baseSet.options : 
             i % 3 === 1 ? "Similar Option Variant" : "Alternative Configuration",
    num_provisions: Math.floor(Math.random() * 500) + 10,
    num_products: Math.floor(Math.random() * 50) + 1,
    num_clients: Math.floor(Math.random() * 20) + 1,
    num_groups: Math.floor(Math.random() * 30) + 1,
    approvalStatuses: generateApprovalStatuses()
  }))
}

export function AbcdSets() {
  // State for filtering and sorting main table
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [provisionTypeFilter, setProvisionTypeFilter] = useState('all')
  
  // State for members table
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null)
  const [setMembers, setSetMembers] = useState<AbcdSetMember[]>([])
  const [showMembers, setShowMembers] = useState(false)
  
  // State for collapsible tables
  const [isMainTableCollapsed, setIsMainTableCollapsed] = useState(false)
  const [isMembersCollapsed, setIsMembersCollapsed] = useState(false)

  // State for members table filtering
  const [membersSearchTerm, setMembersSearchTerm] = useState('')
  const [membersSortField, setMembersSortField] = useState<'abcd_1up' | 'service_id' | 'service_name' | 'provision_type' | 'options' | 'num_provisions' | 'num_products' | 'num_clients' | 'num_groups'>('abcd_1up')
  const [membersSortDirection, setMembersSortDirection] = useState<SortDirection>('asc')
  const [membersFilterType, setMembersFilterType] = useState<FilterType>('all')

  // Refs for scrolling
  const membersRef = useRef<HTMLDivElement>(null)

  // Filter and sort main data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...mockAbcdSets]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.id.toString().includes(searchTerm.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provisionType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply provision type filter
    if (provisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.provisionType === provisionTypeFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = ''
      let bValue: string | number = ''

      switch (sortField) {
        case 'id':
          aValue = a.id
          bValue = b.id
          break
        case 'creator':
          aValue = a.creator
          bValue = b.creator
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'setCount':
          aValue = a.setCount
          bValue = b.setCount
          break
        case 'abcdTup':
          aValue = a.abcdTup
          bValue = b.abcdTup
          break
        case 'serviceName':
          aValue = a.serviceName
          bValue = b.serviceName
          break
        case 'provisionType':
          aValue = a.provisionType
          bValue = b.provisionType
          break
        case 'timestamp':
          aValue = a.timestamp
          bValue = b.timestamp
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [searchTerm, sortField, sortDirection, filterType, provisionTypeFilter])

  // Filter and sort members data
  const filteredAndSortedMembers = useMemo(() => {
    let filtered = [...setMembers]

    // Apply search filter
    if (membersSearchTerm) {
      filtered = filtered.filter(item =>
        item.abcd_1up.toString().includes(membersSearchTerm.toLowerCase()) ||
        item.service_name.toLowerCase().includes(membersSearchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(membersSearchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(membersSearchTerm.toLowerCase())
      )
    }

    // Apply approval status filter
    if (membersFilterType !== 'all') {
      filtered = filtered.filter(item => {
        const hasApprovals = item.approvalStatuses.includes('✓')
        const hasRejections = item.approvalStatuses.includes('✗')
        const hasPending = item.approvalStatuses.includes('-')
        
        switch (membersFilterType) {
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

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = ''
      let bValue: string | number = ''

      switch (membersSortField) {
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

      if (aValue < bValue) return membersSortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return membersSortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [setMembers, membersSearchTerm, membersSortField, membersSortDirection, membersFilterType])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleMembersSort = (field: typeof membersSortField) => {
    if (membersSortField === field) {
      setMembersSortDirection(membersSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setMembersSortField(field)
      setMembersSortDirection('asc')
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterType('all')
    setProvisionTypeFilter('all')
    setSortField('id')
    setSortDirection('asc')
  }

  const clearMembersFilters = () => {
    setMembersSearchTerm('')
    setMembersFilterType('all')
    setMembersSortField('abcd_1up')
    setMembersSortDirection('asc')
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }

  const getMembersSortIcon = (field: typeof membersSortField) => {
    if (membersSortField !== field) return null
    return membersSortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }

  // Handle clicking on clickable elements to show members
  const handleElementClick = (setId: number) => {
    if (selectedSetId === setId && showMembers) {
      // If already showing members for this set, hide them
      setShowMembers(false)
      setSelectedSetId(null)
      setSetMembers([])
    } else {
      // Show members for this set
      setSelectedSetId(setId)
      setSetMembers(generateSetMembers(setId))
      setShowMembers(true)
      setIsMembersCollapsed(false)
      
      // Reset filters for new data
      clearMembersFilters()
      
      // Scroll to members table after a brief delay
      setTimeout(() => {
        membersRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest' 
        })
      }, 100)
    }
  }

  // Get unique provision types for filter
  const uniqueProvisionTypes = Array.from(new Set(mockAbcdSets.map(item => item.provisionType)))

  const getProvisionTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'Coverage': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Deductible': return 'bg-green-100 text-green-800 border-green-300'
      case 'Coinsurance - Insurer': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Copayment': return 'bg-orange-100 text-orange-800 border-orange-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="flex flex-col font-['Proxima_Nova',sans-serif] px-8 py-6">
      {/* Main ABCD Sets Table */}
      <Collapsible open={!isMainTableCollapsed} onOpenChange={(open) => setIsMainTableCollapsed(!open)}>
        <Card className="bg-card border-border shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
          <CardContent className="p-0 flex flex-col h-full min-h-0">
            {/* Table Header with Controls */}
            <div className="flex items-center gap-4 px-3 py-2 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
              {/* Left Section: Title and Badge */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                  ABCD Sets
                </h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                  {filteredAndSortedData.length} sets
                </Badge>
              </div>

              {/* Filter Controls */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Search Input */}
                <div className="relative flex-1 min-w-64 max-w-80">
                  <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search ABCD sets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-7 pr-7 border-border placeholder:text-muted-foreground focus:ring-1 focus:ring-ring transition-colors"
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0 hover:bg-muted transition-colors"
                      style={{ height: 'var(--button-xs)', width: 'var(--button-xs)' }}
                      onClick={() => setSearchTerm('')}
                    >
                      <X className="h-2 w-2 text-muted-foreground" />
                    </Button>
                  )}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-1">
                  <Select value={provisionTypeFilter} onValueChange={setProvisionTypeFilter}>
                    <SelectTrigger className="w-40 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All Types</SelectItem>
                      {uniqueProvisionTypes.map((type) => (
                        <SelectItem key={type} value={type} style={{ fontSize: 'var(--font-body)' }}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                    <SelectTrigger className="w-32 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id" style={{ fontSize: 'var(--font-body)' }}>ID</SelectItem>
                      <SelectItem value="name" style={{ fontSize: 'var(--font-body)' }}>Name</SelectItem>
                      <SelectItem value="setCount" style={{ fontSize: 'var(--font-body)' }}>Count</SelectItem>
                      <SelectItem value="timestamp" style={{ fontSize: 'var(--font-body)' }}>Date</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2 border-border focus:ring-1 focus:ring-ring transition-colors hover:bg-muted"
                    style={{ height: 'var(--button-sm)' }}
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortDirection === 'asc' ? 
                      <SortAscending className="h-3 w-3" /> : 
                      <SortDescending className="h-3 w-3" />
                    }
                  </Button>
                </div>

                {/* Results & Clear */}
                <div className="flex items-center gap-2 ml-auto">
                  <Badge variant="outline" className="px-2 py-0.5 bg-muted/50 border-border" style={{ fontSize: 'var(--font-body)' }}>
                    {filteredAndSortedData.length}/{mockAbcdSets.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="px-2 text-muted-foreground hover:text-foreground hover:bg-muted focus:ring-1 focus:ring-ring transition-colors"
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  >
                    <X className="h-2 w-2 mr-1" />
                    Clear
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMainTableCollapsed(!isMainTableCollapsed)}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1"
                    style={{ height: 'var(--button-sm)' }}
                  >
                    {isMainTableCollapsed ? <CaretDown className="h-3 w-3" /> : <CaretUp className="h-3 w-3" />}
                    {isMainTableCollapsed ? 'Expand' : 'Collapse'}
                  </Button>
                </div>
              </div>
            </div>
            
            <CollapsibleContent className="flex flex-col h-full min-h-0">
              {/* Table Container */}
              {!isMainTableCollapsed && (
                <div className="max-h-165 overflow-auto">
                  <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                    <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                      <tr>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('id')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            ID
                            {getSortIcon('id')}
                          </div>
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('creator')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Creator
                            {getSortIcon('creator')}
                          </div>
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('name')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            ABCD Set Name
                            {getSortIcon('name')}
                          </div>
                        </th>
                        <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('setCount')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Set Count
                            {getSortIcon('setCount')}
                          </div>
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" style={{ fontSize: 'var(--font-body)' }}>
                          Description
                        </th>
                        <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('abcdTup')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            ABCD 1up
                            {getSortIcon('abcdTup')}
                          </div>
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('serviceName')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service Name
                            {getSortIcon('serviceName')}
                          </div>
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('provisionType')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Provision Type
                            {getSortIcon('provisionType')}
                          </div>
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground bg-card" style={{ fontSize: 'var(--font-body)' }}>
                          Options
                        </th>
                        <th className="text-center px-3 py-3 font-medium text-muted-foreground bg-card" style={{ fontSize: 'var(--font-body)' }}>
                          Approvals Needed
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('timestamp')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Timestamp
                            {getSortIcon('timestamp')}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedData.map((record, index) => (
                        <tr key={record.id} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                          <td className="px-3 py-3 align-middle">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-primary underline hover:text-primary-foreground hover:bg-primary font-bold transition-colors cursor-pointer"
                              style={{ fontSize: 'var(--font-body)' }}
                              onClick={() => handleElementClick(record.id)}
                              title="Click to show/hide set members"
                            >
                              {record.id}
                            </Button>
                          </td>
                          <td className="px-3 py-3 align-middle">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-info underline cursor-pointer font-medium transition-colors"
                              style={{ fontSize: 'var(--font-body)' }}
                              onClick={() => handleElementClick(record.id)}
                            >
                              {record.creator}
                            </Button>
                          </td>
                          <td className="px-3 py-3 align-top">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-info hover:text-info/80 cursor-pointer font-medium transition-colors break-words leading-tight"
                              style={{ fontSize: 'var(--font-body)' }}
                              onClick={() => handleElementClick(record.id)}
                              title={record.name}
                            >
                              {record.name}
                            </Button>
                          </td>
                          <td className="px-3 py-3 text-center align-middle">
                            <Badge variant="secondary" className="cursor-pointer font-bold" onClick={() => handleElementClick(record.id)} style={{ fontSize: 'var(--font-body)' }}>
                              {record.setCount.toLocaleString()}
                            </Badge>
                          </td>
                          <td className="px-3 py-3 align-top">
                            <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.description}>{record.description}</span>
                          </td>
                          <td className="px-3 py-3 text-center align-middle">
                            <Badge variant="outline" className="cursor-pointer font-bold" onClick={() => handleElementClick(record.id)} style={{ fontSize: 'var(--font-body)' }}>
                              {record.abcdTup.toLocaleString()}
                            </Badge>
                          </td>
                          <td className="px-3 py-3 align-top">
                            <div className="max-w-full">
                              <span className="font-medium text-foreground break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={record.serviceName}>
                                {record.serviceName}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-3 align-top">
                            <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.provisionType}>
                              {record.provisionType}
                            </span>
                          </td>
                          <td className="px-3 py-3 align-top">
                            <span className="font-medium text-accent break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.options}>{record.options}</span>
                          </td>
                          <td className="px-3 py-3 align-middle">
                            <ApprovalStatusIndicators approvalsNeeded={record.approvalsNeeded} />
                          </td>
                          <td className="px-3 py-3 align-middle">
                            <span className="text-muted-foreground font-medium" style={{ fontSize: 'var(--font-body)' }}>{record.timestamp}</span>
                          </td>
                        </tr>
                      ))}
                      {filteredAndSortedData.length === 0 && (
                        <tr>
                          <td colSpan={11} className="text-center py-8 text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                              <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                              <div>
                                <p className="font-semibold">No ABCD sets found</p>
                                <p className="text-xs">Try adjusting your search or filter criteria</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>

      {/* Members Table */}
      {showMembers && (
        <Collapsible open={!isMembersCollapsed} onOpenChange={(open) => setIsMembersCollapsed(!open)}>
          <Card ref={membersRef} className="bg-card border-border shadow-sm mt-4 flex flex-col">
            <CardContent className="p-0 flex flex-col h-full">
              {/* Members Table Header */}
              <div className="flex items-center gap-4 px-3 py-2 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
                {/* Left Section: Title and Badge */}
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                    Members of ABCD Set {selectedSetId}
                  </h3>
                  <Badge variant="outline" className="px-2 py-0.5 bg-info/10 text-info border-info/20">
                    {filteredAndSortedMembers.length} members found
                  </Badge>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-64 max-w-80">
                    <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search members..."
                      value={membersSearchTerm}
                      onChange={(e) => setMembersSearchTerm(e.target.value)}
                      className="pl-7 pr-7 border-border placeholder:text-muted-foreground focus:ring-1 focus:ring-ring transition-colors"
                      style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                    />
                    {membersSearchTerm && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0 hover:bg-muted transition-colors"
                        style={{ height: 'var(--button-xs)', width: 'var(--button-xs)' }}
                        onClick={() => setMembersSearchTerm('')}
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
                        variant={membersFilterType === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMembersFilterType(type as FilterType)}
                        className={`${
                          membersFilterType === type 
                            ? type === 'with-approvals' ? 'bg-success text-success-foreground hover:bg-success/90'
                              : type === 'pending-approvals' ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                              : type === 'no-approvals' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'border-border text-foreground hover:bg-muted'
                        } focus:ring-1 focus:ring-ring transition-colors`}
                        style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                      >
                        {type === 'all' ? 'All' 
                          : type === 'with-approvals' ? 'With Approvals'
                          : type === 'pending-approvals' ? 'Pending'
                          : 'None'}
                      </Button>
                    ))}
                  </div>

                  {/* Results & Clear */}
                  <div className="flex items-center gap-2 ml-auto">
                    <Badge variant="outline" className="px-2 py-0.5 bg-muted/50 border-border" style={{ fontSize: 'var(--font-body)' }}>
                      {filteredAndSortedMembers.length}/{setMembers.length}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearMembersFilters}
                      className="px-2 text-muted-foreground hover:text-foreground hover:bg-muted focus:ring-1 focus:ring-ring transition-colors"
                      style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                    >
                      <X className="h-2 w-2 mr-1" />
                      Clear
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1"
                        style={{ height: 'var(--button-sm)' }}
                      >
                        {isMembersCollapsed ? <CaretDown className="h-3 w-3" /> : <CaretUp className="h-3 w-3" />}
                        {isMembersCollapsed ? 'Expand' : 'Collapse'}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </div>
              
              <CollapsibleContent className="flex flex-col h-full min-h-0">
                {/* Members Table */}
                {!isMembersCollapsed && (
                  <div className="max-h-96 overflow-auto">
                    <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                      <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                        <tr>
                          <th className="text-left px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('abcd_1up')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              ABCD 1-Up
                              {getMembersSortIcon('abcd_1up')}
                            </div>
                          </th>
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('service_id')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Service ID
                              {getMembersSortIcon('service_id')}
                            </div>
                          </th>
                          <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('service_name')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Service Name
                              {getMembersSortIcon('service_name')}
                            </div>
                          </th>
                          <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('provision_type')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Provision Type
                              {getMembersSortIcon('provision_type')}
                            </div>
                          </th>
                          <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('options')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Options
                              {getMembersSortIcon('options')}
                            </div>
                          </th>
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('num_provisions')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Provisions
                              {getMembersSortIcon('num_provisions')}
                            </div>
                          </th>
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('num_products')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Products
                              {getMembersSortIcon('num_products')}
                            </div>
                          </th>
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('num_clients')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Clients
                              {getMembersSortIcon('num_clients')}
                            </div>
                          </th>
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('num_groups')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Groups
                              {getMembersSortIcon('num_groups')}
                            </div>
                          </th>
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedMembers.map((record, index) => (
                          <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                            <td className="px-3 py-3 align-middle">
                              <Button variant="link" className="p-0 h-auto text-primary underline hover:text-primary-foreground hover:bg-primary font-bold transition-colors" style={{ fontSize: 'var(--font-body)' }}>
                                {record.abcd_1up}
                              </Button>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}>{record.service_id}</span>
                            </td>
                            <td className="px-3 py-3 align-top">
                              <div className="max-w-full">
                                <span className="font-medium text-foreground break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={record.service_name}>
                                  {record.service_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 align-top">
                              <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.provision_type}>
                                {record.provision_type}
                              </span>
                            </td>
                            <td className="px-3 py-3 align-top">
                              <span className="font-medium text-accent break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.options}>
                                {record.options}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <span className="font-bold text-primary" style={{ fontSize: 'var(--font-body)' }}>{record.num_provisions.toLocaleString()}</span>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <span className="font-bold text-success" style={{ fontSize: 'var(--font-body)' }}>{record.num_products.toLocaleString()}</span>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <span className="text-info font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_clients?.toLocaleString() || '-'}</span>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <span className="text-warning font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_groups?.toLocaleString() || '-'}</span>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <ApprovalStatusIndicators approvalsNeeded={record.approvalStatuses} />
                            </td>
                          </tr>
                        ))}
                        {filteredAndSortedMembers.length === 0 && (
                          <tr>
                            <td colSpan={10} className="text-center py-8 text-muted-foreground">
                              <div className="flex flex-col items-center gap-2">
                                <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                                <div>
                                  <p className="font-semibold">No members found</p>
                                  <p className="text-xs">Try adjusting your search or filter criteria</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      )}
    </div>
  )
}