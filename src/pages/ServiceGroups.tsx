import React, { useState, useMemo, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MagnifyingGlass, X, CaretUp, CaretDown, SortAscending, SortDescending } from '@phosphor-icons/react'

interface ServiceGroup {
  id: number
  name: string
  description: string
  assignee: string
  members: number
  created: string
  membersList?: Member[]
}

interface Member {
  id: number
  serviceId: string
  serviceName: string
}

// Types for sorting
type SortField = 'id' | 'name' | 'description' | 'assignee' | 'members' | 'created'
type SortDirection = 'asc' | 'desc'
type MemberSortField = 'id' | 'serviceId' | 'serviceName'

// Generate mock member data for a service group
const generateMembersList = (groupId: number, memberCount: number): Member[] => {
  const baseServiceIds = ['3501145', '6016734', '7891023', '4567890', '1234567', '9876543', '5555555', '7777777']
  const serviceNames = [
    'Physical Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services',
    'Home Health -> Other Services',
    'Outpatient Services -> Diagnostic Imaging -> MRI Services',
    'Pharmacy Services -> Prescription Drug Coverage -> Generic Medications',
    'Mental Health Services -> Counseling and Therapy -> Individual Therapy',
    'Emergency Services -> Urgent Care -> Walk-in Clinic Services',
    'Dental Services -> Preventive Care -> Routine Cleanings',
    'Vision Services -> Eye Exams -> Annual Vision Screening'
  ]
  
  return Array.from({ length: memberCount }, (_, i) => ({
    id: i + 1,
    serviceId: baseServiceIds[i % baseServiceIds.length],
    serviceName: serviceNames[i % serviceNames.length]
  }))
}

export function ServiceGroups() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [isTableCollapsed, setIsTableCollapsed] = useState(false)
  const [assigneeFilter, setAssigneeFilter] = useState('all')
  
  // State for members list
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)
  const [membersList, setMembersList] = useState<Member[]>([])
  const [showMembersList, setShowMembersList] = useState(false)
  const [isMembersCollapsed, setIsMembersCollapsed] = useState(false)
  const membersRef = useRef<HTMLDivElement>(null)
  
  // Members table filtering and sorting
  const [membersSearchTerm, setMembersSearchTerm] = useState('')
  const [membersSortField, setMembersSortField] = useState<MemberSortField>('id')
  const [membersSortDirection, setMembersSortDirection] = useState<SortDirection>('asc')

  // Mock data based on the screenshot - with membersList
  const serviceGroups: ServiceGroup[] = [
    {
      id: 1,
      name: "Cycle 1 service group",
      description: "This is the set of services in the first cycle (50, though 3 are not yet added).",
      assignee: "Dheeraj",
      members: 2,
      created: "2025-09-08 20:13"
    },
    {
      id: 35,
      name: "test",
      description: "test",
      assignee: "SR test",
      members: 1,
      created: "2025-09-22 13:21"
    },
    {
      id: 36,
      name: "demo",
      description: "test",
      assignee: "SR test",
      members: 1,
      created: "2025-09-22 13:23"
    },
    {
      id: 34,
      name: "Test",
      description: "Testing",
      assignee: "MH demo",
      members: 2,
      created: "2025-09-18 17:03"
    },
    {
      id: 37,
      name: "test",
      description: "test",
      assignee: "sr test sample",
      members: 1,
      created: "2025-09-22 14:29"
    },
    {
      id: 38,
      name: "Phase 1 Cycle 1",
      description: "This is the first 50 services for the Phase 1 work",
      assignee: "BAs",
      members: 50,
      created: "2025-09-24 19:46"
    },
    {
      id: 39,
      name: "Phase 1 Cycle 2",
      description: "This is the second set of services in the Phase 1 2025 Q4 work.",
      assignee: "BAs",
      members: 80,
      created: "2025-09-24 19:49"
    }
  ]

  // Get unique assignees for filter dropdown
  const uniqueAssignees = useMemo(() => {
    const assignees = serviceGroups.map(group => group.assignee)
    return [...new Set(assignees)].sort()
  }, [serviceGroups])

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...serviceGroups]

    // Apply assignee filter first
    if (assigneeFilter !== 'all') {
      filtered = filtered.filter(item => item.assignee === assigneeFilter)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.members.toString().includes(searchTerm.toLowerCase()) ||
        item.created.toLowerCase().includes(searchTerm.toLowerCase())
      )
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
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'description':
          aValue = a.description
          bValue = b.description
          break
        case 'assignee':
          aValue = a.assignee
          bValue = b.assignee
          break
        case 'members':
          aValue = a.members
          bValue = b.members
          break
        case 'created':
          aValue = a.created
          bValue = b.created
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [serviceGroups, searchTerm, sortField, sortDirection, assigneeFilter])

  // Filter and sort members list
  const filteredAndSortedMembers = useMemo(() => {
    let filtered = [...membersList]

    // Apply search filter
    if (membersSearchTerm) {
      filtered = filtered.filter(member =>
        member.id.toString().toLowerCase().includes(membersSearchTerm.toLowerCase()) ||
        member.serviceId.toLowerCase().includes(membersSearchTerm.toLowerCase()) ||
        member.serviceName.toLowerCase().includes(membersSearchTerm.toLowerCase())
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = ''
      let bValue: string | number = ''

      switch (membersSortField) {
        case 'id':
          aValue = a.id
          bValue = b.id
          break
        case 'serviceId':
          aValue = a.serviceId
          bValue = b.serviceId
          break
        case 'serviceName':
          aValue = a.serviceName
          bValue = b.serviceName
          break
        default:
          return 0
      }

      if (aValue < bValue) return membersSortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return membersSortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [membersList, membersSearchTerm, membersSortField, membersSortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleMembersSort = (field: MemberSortField) => {
    if (membersSortField === field) {
      setMembersSortDirection(membersSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setMembersSortField(field)
      setMembersSortDirection('asc')
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSortField('id')
    setSortDirection('asc')
    setAssigneeFilter('all')
  }

  const clearMembersFilters = () => {
    setMembersSearchTerm('')
    setMembersSortField('id')
    setMembersSortDirection('asc')
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }

  const getMembersSortIcon = (field: MemberSortField) => {
    if (membersSortField !== field) return null
    return membersSortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }

  const handleModify = (groupId: number) => {
    console.log('Modify group:', groupId)
  }

  const handleCreateView = (groupId: number) => {
    console.log('Create/View group:', groupId)
  }

  // Handle clicking on ID, Group Name, or Description to show members list
  const handleShowMembers = (groupId: number) => {
    const group = serviceGroups.find(g => g.id === groupId)
    if (!group) return

    if (selectedGroupId === groupId && showMembersList) {
      // If already showing members for this group, hide them
      setShowMembersList(false)
      setSelectedGroupId(null)
      setMembersList([])
    } else {
      // Show members for this group
      setSelectedGroupId(groupId)
      setMembersList(generateMembersList(groupId, group.members))
      setShowMembersList(true)
      setIsMembersCollapsed(false)
      
      // Reset filters for new data
      clearMembersFilters()
      
      // Scroll to Members table after a brief delay to allow rendering
      setTimeout(() => {
        membersRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest' 
        })
      }, 100)
    }
  }

  return (
    <div className="space-y-6">
      {/* Service Groups Table - Constrained width, not full width like ClusterDetails */}
      <Card className="bg-card border-border shadow-sm flex flex-col overflow-hidden max-w-9xl mx-auto">
        <CardContent className="p-0 flex flex-col h-full min-h-0">
          {/* Table Header with Filter Controls */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
            {/* Search and Controls */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* Search Input */}
              <div className="relative flex-1 min-w-64 max-w-80">
                <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search service groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 pr-7 border-border placeholder:text-muted-foreground focus:ring-1 focus:ring-ring transition-colors"
                  style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                />
                {searchTerm && (
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
                )}
              </div>

              {/* Assignee Filter */}
              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-40 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All Assignees</SelectItem>
                  {uniqueAssignees.map((assignee) => (
                    <SelectItem key={assignee} value={assignee} style={{ fontSize: 'var(--font-body)' }}>{assignee}</SelectItem>
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
                  <SelectItem value="assignee" style={{ fontSize: 'var(--font-body)' }}>Assignee</SelectItem>
                  <SelectItem value="members" style={{ fontSize: 'var(--font-body)' }}>Members</SelectItem>
                  <SelectItem value="created" style={{ fontSize: 'var(--font-body)' }}>Created</SelectItem>
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

              {/* Results & Clear */}
              <div className="flex items-center gap-2 ml-auto">
                <Badge variant="outline" className="px-2 py-0.5 bg-muted/50 border-border" style={{ fontSize: 'var(--font-body)' }}>
                  {filteredAndSortedData.length}/{serviceGroups.length}
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
              </div>
            </div>
          </div>
          
          {/* Table Container with constrained height and scrolling */}
          <div className="max-h-96 overflow-auto">
            <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
              <colgroup>
                <col style={{ width: '80px' }} />
                <col style={{ width: '200px' }} />
                <col style={{ minWidth: '300px' }} />
                <col style={{ width: '150px' }} />
                <col style={{ width: '100px' }} />
                <col style={{ width: '140px' }} />
                <col style={{ width: '90px' }} />
                <col style={{ width: '120px' }} />
              </colgroup>
              <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                <tr>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('id')} style={{ fontSize: 'var(--font-body)' }}>
                    <div className="flex items-center">
                      ID
                      {getSortIcon('id')}
                    </div>
                  </th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('name')} style={{ fontSize: 'var(--font-body)' }}>
                    <div className="flex items-center">
                      Group Name
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('description')} style={{ fontSize: 'var(--font-body)' }}>
                    <div className="flex items-center">
                      Description
                      {getSortIcon('description')}
                    </div>
                  </th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('assignee')} style={{ fontSize: 'var(--font-body)' }}>
                    <div className="flex items-center">
                      Assignee
                      {getSortIcon('assignee')}
                    </div>
                  </th>
                  <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('members')} style={{ fontSize: 'var(--font-body)' }}>
                    <div className="flex items-center justify-center">
                      Members
                      {getSortIcon('members')}
                    </div>
                  </th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('created')} style={{ fontSize: 'var(--font-body)' }}>
                    <div className="flex items-center">
                      Created
                      {getSortIcon('created')}
                    </div>
                  </th>
                  <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Modify</th>
                  <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>See Dendrogram</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((record, index) => (
                  <tr key={record.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-3 align-middle">
                      <span 
                        className="text-left text-primary hover:underline font-bold cursor-pointer" 
                        style={{ fontSize: 'var(--font-body)' }}
                        onClick={() => handleShowMembers(record.id)}
                      >
                        {record.id}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <span 
                        className="text-left text-primary hover:underline font-bold cursor-pointer" 
                        style={{ fontSize: 'var(--font-body)' }}
                        onClick={() => handleShowMembers(record.id)}
                      >
                        {record.name}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <span 
                        className="text-left text-primary hover:underline font-bold cursor-pointer" 
                        style={{ fontSize: 'var(--font-body)' }} 
                        title={record.description}
                        onClick={() => handleShowMembers(record.id)}
                      >
                        {record.description}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-body)' }}>{record.assignee}</span>
                    </td>
                    <td className="px-3 py-3 text-center align-middle">
                      <Badge variant="secondary" className="cursor-pointer">
                        {record.members}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <span className="text-muted-foreground" style={{ fontSize: 'var(--font-body)' }}>{record.created}</span>
                    </td>
                    <td className="px-3 py-3 text-center align-middle">
                      <Button
                        onClick={() => handleModify(record.id)}
                        variant="secondary"
                        size="sm"
                        className="font-medium cursor-pointer"
                        style={{ fontSize: 'var(--font-body)' }}
                      >
                        Modify
                      </Button>
                    </td>
                    <td className="px-3 py-3 text-center align-middle">
                      <Button
                        onClick={() => handleCreateView(record.id)}
                        size="sm"
                        className="btn-gradient-primary text-xs px-3 whitespace-nowrap cursor-pointer"
                        style={{ height: 'var(--button-sm)' }}
                      >
                        Create/View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredAndSortedData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                        <div>
                          <p className="font-semibold">No service groups found</p>
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

      {/* Members List Table */}
      {showMembersList && (
        <Collapsible open={!isMembersCollapsed} onOpenChange={(open) => setIsMembersCollapsed(!open)}>
          <Card ref={membersRef} className="bg-card border-border shadow-sm mt-4 flex flex-col overflow-hidden max-w-9xl mx-auto">
            <CardContent className="p-0 flex flex-col h-full min-h-0">
              {/* Members Table Header with Filter Controls */}
              <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
                {/* Left Section: Title and Badge */}
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                    Members of Group ID={selectedGroupId}: {serviceGroups.find(g => g.id === selectedGroupId)?.name}
                  </h3>
                  <Badge variant="outline" className="px-2 py-0.5 bg-info/10 text-info border-info/20">
                    {filteredAndSortedMembers.length} members
                  </Badge>
                </div>

                {/* Filter Controls Section */}
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

                  <Select value={membersSortField} onValueChange={(value) => setMembersSortField(value as MemberSortField)}>
                    <SelectTrigger className="w-32 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id" style={{ fontSize: 'var(--font-body)' }}>#</SelectItem>
                      <SelectItem value="serviceId" style={{ fontSize: 'var(--font-body)' }}>Service Id</SelectItem>
                      <SelectItem value="serviceName" style={{ fontSize: 'var(--font-body)' }}>Service Name</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2 border-border focus:ring-1 focus:ring-ring transition-colors hover:bg-muted"
                    style={{ height: 'var(--button-sm)' }}
                    onClick={() => setMembersSortDirection(membersSortDirection === 'asc' ? 'desc' : 'asc')}
                  >
                    {membersSortDirection === 'asc' ? 
                      <SortAscending className="h-3 w-3" /> : 
                      <SortDescending className="h-3 w-3" />
                    }
                  </Button>

                  {/* Results & Clear */}
                  <div className="flex items-center gap-2 ml-auto">
                    <Badge variant="outline" className="px-2 py-0.5 bg-muted/50 border-border" style={{ fontSize: 'var(--font-body)' }}>
                      {filteredAndSortedMembers.length}/{membersList.length}
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
                        style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                      >
                        {isMembersCollapsed ? <CaretDown className="h-3 w-3" /> : <CaretUp className="h-3 w-3" />}
                        {isMembersCollapsed ? 'Expand' : 'Collapse'}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </div>
              
              <CollapsibleContent>
                {/* Members Table Container with scrolling */}
                <div className="max-h-96 overflow-auto">
                  <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                    <colgroup>
                      <col style={{ width: '80px' }} />
                      <col style={{ width: '150px' }} />
                      <col style={{ minWidth: '400px' }} />
                    </colgroup>
                    <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                      <tr>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('id')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            #
                            {getMembersSortIcon('id')}
                          </div>
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('serviceId')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service Id
                            {getMembersSortIcon('serviceId')}
                          </div>
                        </th>
                        <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleMembersSort('serviceName')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service Name
                            {getMembersSortIcon('serviceName')}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedMembers.map((member, index) => (
                        <tr key={member.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="px-3 py-3 align-middle">
                            <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-body)' }}>{member.id}</span>
                          </td>
                          <td className="px-3 py-3 align-middle">
                            <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-body)' }}>{member.serviceId}</span>
                          </td>
                          <td className="px-3 py-3 align-middle">
                            <span className="text-foreground" style={{ fontSize: 'var(--font-body)' }} title={member.serviceName}>
                              {member.serviceName}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredAndSortedMembers.length === 0 && (
                        <tr>
                          <td colSpan={3} className="text-center py-8 text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                              <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                              <div>
                                <p className="font-semibold">No members found</p>
                                <p className="text-xs">Try adjusting your search criteria</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      )}
    </div>
  )
}