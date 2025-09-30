import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MagnifyingGlass, X, CaretUp, CaretDown } from '@phosphor-icons/react'

interface ServiceGroup {
  id: number
  name: string
  description: string
  assignee: string
  members: number
  created: string
}

// Types for sorting
type SortField = 'id' | 'name' | 'description' | 'assignee' | 'members' | 'created'
type SortDirection = 'asc' | 'desc'

export function ServiceGroups() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [isTableCollapsed, setIsTableCollapsed] = useState(false)

  // Mock data based on the screenshot
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
    }
  ]

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...serviceGroups]

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
  }, [serviceGroups, searchTerm, sortField, sortDirection])

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
    setSortField('id')
    setSortDirection('asc')
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <CaretUp className="h-3 w-3 ml-1" /> : 
      <CaretDown className="h-3 w-3 ml-1" />
  }

  const [assigneeFilter, setAssigneeFilter] = useState('all')

  const handleModify = (groupId: number) => {
    console.log('Modify group:', groupId)
  }

  const handleCreateView = (groupId: number) => {
    console.log('Create/View group:', groupId)
  }

  return (
    <div className="flex flex-col font-['Proxima_Nova',sans-serif] min-h-0">

      {/* Service Groups Table */}
      <Collapsible open={!isTableCollapsed} onOpenChange={(open) => setIsTableCollapsed(!open)}>
        <Card className="bg-card border-border shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
          <CardContent className="p-0 flex flex-col h-full min-h-0">
            {/* Table Header with Search and Controls */}
            <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
              {/* Left Section: Title and Badge */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                  Service Groups
                </h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                  {filteredAndSortedData.length} records
                </Badge>
              </div>

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
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0 hover:bg-muted transition-colors"
                      style={{ height: 'var(--button-xs)', width: 'var(--button-xs)' }}
                      onClick={() => setSearchTerm('')}
                    >
                      <X className="h-2 w-2 text-muted-foreground" />
                    </Button>
                  )}
                </div>

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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsTableCollapsed(!isTableCollapsed)}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1"
                    style={{ height: 'var(--button-sm)' }}
                  >
                    {isTableCollapsed ? <CaretDown className="h-3 w-3" /> : <CaretUp className="h-3 w-3" />}
                    {isTableCollapsed ? 'Expand' : 'Collapse'}
                  </Button>
                </div>
              </div>
            </div>
            
            <CollapsibleContent className="flex flex-col h-full min-h-0">
              {/* Table Container - Constrained width for Service Groups */}
              {!isTableCollapsed && (
                <>
                  <div className="max-h-165 overflow-auto">
                    <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                      <colgroup>
                        <col style={{ width: '80px' }} />
                        <col style={{ width: '200px' }} />
                        <col style={{ width: 'auto' }} />
                        <col style={{ width: '140px' }} />
                        <col style={{ width: '100px' }} />
                        <col style={{ width: '140px' }} />
                        <col style={{ width: '100px' }} />
                        <col style={{ width: '140px' }} />
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
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedData.map((group, index) => (
                          <tr key={group.id} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                            <td className="px-3 py-3 align-middle">
                              <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-body)' }}>
                                {group.id}
                              </span>
                            </td>
                            <td className="px-3 py-3 align-top">
                              <div className="max-w-full">
                                <span className="text-info hover:text-info/80 cursor-pointer font-medium transition-colors break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={group.name}>
                                  {group.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 align-top">
                              <div className="max-w-full">
                                <span className="text-info hover:text-info/80 cursor-pointer transition-colors break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={group.description}>
                                  {group.description}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 align-middle">
                              <span className="text-foreground" style={{ fontSize: 'var(--font-body)' }}>
                                {group.assignee}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <Badge variant="secondary" className="cursor-pointer">
                                {group.members}
                              </Badge>
                            </td>
                            <td className="px-3 py-3 align-middle">
                              <span className="text-muted-foreground text-sm" style={{ fontSize: 'var(--font-body)' }}>
                                {group.created}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <Button
                                onClick={() => handleModify(group.id)}
                                variant="ghost"
                                size="sm"
                                className="text-success hover:text-success/80 hover:bg-success/10 font-medium transition-colors"
                                style={{ height: 'var(--button-sm)', fontSize: 'var(--font-body)' }}
                              >
                                Modify
                              </Button>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <Button
                                onClick={() => handleCreateView(group.id)}
                                size="sm"
                                className="btn-gradient-primary font-medium focus:ring-1 focus:ring-ring transition-colors"
                                style={{ height: 'var(--button-sm)', fontSize: 'var(--font-body)' }}
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
                                  <p className="text-xs">Try adjusting your search criteria</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    </div>
  )
}