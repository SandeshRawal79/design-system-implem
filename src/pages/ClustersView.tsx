import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Check, X, CaretUp, CaretDown, MagnifyingGlass, SortAscending, SortDescending, Plus } from '@phosphor-icons/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// Types for filtering and sorting
type SortField = 'abcd_1up' | 'service_id' | 'service_name' | 'provision_type' | 'options'
type SortDirection = 'asc' | 'desc'
type FilterType = 'all' | 'with-approvals' | 'pending-approvals' | 'no-approvals'

interface RecordData {
  abcd_1up: number
  service_id: number
  service_name: string
  provision_type: string
  options: string
  approved: boolean
  sets_in_now: number
  add_to_set: boolean
  approvalStatuses: string[]
}

interface ClusterData {
  cluster_number: number
  record_count: number
  records: RecordData[]
}

export function ClustersView() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [clusters, setClusters] = useState<ClusterData[]>([])
  const [selectedCluster] = useState<number>(1) // Default to cluster 1
  const [wholeCluster, setWholeCluster] = useState<boolean>(false)
  const [creator, setCreator] = useState<string>('')
  const [setName, setSetName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [distance, setDistance] = useState<string>('10.0')
  
  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('abcd_1up')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterType, setFilterType] = useState<FilterType>('all')
  
  // Dialog state for Create Set Panel
  const [isCreateSetDialogOpen, setIsCreateSetDialogOpen] = useState(false)
  
  // Table collapse state
  const [isTableCollapsed, setIsTableCollapsed] = useState(false)

  // Extract query parameters
  const dendrogram = searchParams.get('dendrogram') || '1'
  const distanceParam = searchParams.get('distance') || '10'

  useEffect(() => {
    // Generate approval statuses for demonstration
    const generateApprovalStatuses = () => {
      const statuses = ['✓', '✗', '-'];
      return Array.from({ length: 5 }, () => statuses[Math.floor(Math.random() * statuses.length)]);
    };

    // Simulate loading cluster data - Updated to match ClusterDetails structure
    const mockClusters: ClusterData[] = [
      {
        cluster_number: 1,
        record_count: 6,
        records: [
          {
            abcd_1up: 2493,
            service_id: 30001337,
            service_name: "Spinal Manipulations -> Professional Services",
            provision_type: "Copay",
            options: "Yes 60 Dollars, per Day, per Provider",
            approved: false,
            sets_in_now: 0,
            add_to_set: false,
            approvalStatuses: generateApprovalStatuses()
          },
          {
            abcd_1up: 2605,
            service_id: 60098801,
            service_name: "Pathology/Laboratory -> Diagnostic Services -> Professional Services",
            provision_type: "Copay",
            options: "Yes 60 Dollars, per Day, per Provider",
            approved: false,
            sets_in_now: 0,
            add_to_set: false,
            approvalStatuses: generateApprovalStatuses()
          },
          {
            abcd_1up: 2780,
            service_id: 60098796,
            service_name: "Diagnostic Medical -> Diagnostic Services -> Professional Services",
            provision_type: "Copay",
            options: "Yes 60 Dollars, per Day, per Provider",
            approved: false,
            sets_in_now: 0,
            add_to_set: false,
            approvalStatuses: generateApprovalStatuses()
          },
          {
            abcd_1up: 5123,
            service_id: 269432098,
            service_name: "Advanced Imaging -> Diagnostic Services -> Professional Services",
            provision_type: "Copay",
            options: "Yes 250 Dollars, per Day, per Provider",
            approved: false,
            sets_in_now: 0,
            add_to_set: false,
            approvalStatuses: generateApprovalStatuses()
          },
          {
            abcd_1up: 3418,
            service_id: 269433047,
            service_name: "Standard Imaging -> Diagnostic Services -> Professional Services",
            provision_type: "Copay",
            options: "Yes 60 Dollars, per Day, per Provider",
            approved: false,
            sets_in_now: 0,
            add_to_set: false,
            approvalStatuses: generateApprovalStatuses()
          },
          {
            abcd_1up: 3480,
            service_id: 1276354238,
            service_name: "Urgent Care -> Professional Services",
            provision_type: "Copay",
            options: "Yes 40 Dollars, per Day, per Provider",
            approved: false,
            sets_in_now: 0,
            add_to_set: false,
            approvalStatuses: generateApprovalStatuses()
          }
        ]
      },
      {
        cluster_number: 2,
        record_count: 20,
        records: [
          {
            abcd_1up: 2292,
            service_id: 3001141,
            service_name: "Occupational Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services",
            provision_type: "Copay",
            options: "Yes 15 Dollars, per Date of Service, per Provider",
            approved: false,
            sets_in_now: 0,
            add_to_set: false,
            approvalStatuses: generateApprovalStatuses()
          }
        ]
      }
    ]
    setClusters(mockClusters)
    setDistance(distanceParam)
  }, [distanceParam])

  const handleBackToDendrogram = () => {
    navigate(`/dendrogram/${serviceId}`)
  }

  const handleCheckboxChange = (recordIndex: number) => {
    setClusters(prevClusters =>
      prevClusters.map(cluster =>
        cluster.cluster_number === selectedCluster
          ? {
              ...cluster,
              records: cluster.records.map((record, index) =>
                index === recordIndex ? { ...record, add_to_set: !record.add_to_set } : record
              )
            }
          : cluster
      )
    )
  }

  const handleWholeClusterChange = () => {
    const newWholeClusterState = !wholeCluster
    setWholeCluster(newWholeClusterState)
    
    setClusters(prevClusters =>
      prevClusters.map(cluster =>
        cluster.cluster_number === selectedCluster
          ? {
              ...cluster,
              records: cluster.records.map(record => ({
                ...record,
                add_to_set: newWholeClusterState
              }))
            }
          : cluster
      )
    )
  }

  const selectedClusterData = clusters.find(c => c.cluster_number === selectedCluster)

  // Component to render approval status indicators
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

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!selectedClusterData) return []
    
    let filtered = [...selectedClusterData.records]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.abcd_1up.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(searchTerm.toLowerCase())
      )
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
        default:
          aValue = a.abcd_1up
          bValue = b.abcd_1up
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [selectedClusterData, searchTerm, filterType, sortField, sortDirection])

  // Sorting helpers
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
      <SortAscending className="h-3 w-3 ml-1" /> : 
      <SortDescending className="h-3 w-3 ml-1" />
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterType('all')
    setSortField('abcd_1up')
    setSortDirection('asc')
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      {/* Compact Data Context and X-ray Projection Card - Following ClusterDetails structure */}
      <Card className="bg-card border-border mb-4 shadow-sm mx-8 flex-shrink-0">
        <CardContent className="px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* X-ray Projection */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground leading-tight" style={{ fontSize: 'var(--font-body)' }}>X-ray Projection:</span>
              <span className="text-muted-foreground leading-none" style={{ fontSize: 'var(--font-body)' }} title="Provision Type + Options (C+D)">
                Provision Type + Options (C+D)
              </span>
            </div>
            
            {/* Data Context */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground leading-tight" style={{ fontSize: 'var(--font-body)' }}>Data Context:</span>
              <span className="text-muted-foreground leading-none" style={{ fontSize: 'var(--font-body)' }} title="Service Group: Phase 1 Cycle 1 (50 services)">
                Service Group: Phase 1 Cycle 1 (50 services)
              </span>
            </div>
            
            {/* Distance Threshold Controls */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-body)' }}>Distance Threshold:</span>
              <Input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                step="0.1"
                min="0"
                max="100"
                className="w-20 border-border font-bold text-accent focus:ring-1 focus:ring-ring transition-colors"
                style={{ height: 'var(--button-sm)', fontSize: 'var(--font-body)' }}
              />
              <Button 
                size="sm" 
                className="px-4 btn-gradient-primary font-medium focus:ring-1 focus:ring-ring transition-colors"
                style={{ height: 'var(--button-sm)', fontSize: 'var(--font-body)' }}
                onClick={() => {
                  console.log('Update distance threshold to:', distance)
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cluster Table */}
      <Collapsible open={!isTableCollapsed} onOpenChange={(open) => setIsTableCollapsed(!open)}>
        <Card className="bg-card border-border shadow-sm mx-8 flex flex-col min-h-0 overflow-hidden">
          <CardContent className="p-0 flex flex-col h-full min-h-0">
            {/* Table Header with Filter Controls */}
            <div className="flex items-center gap-4 px-3 py-2 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
              {/* Left Section: Title, Badge, and Collapse Control */}
              <div className="flex items-center gap-3">
                <h3 
                  className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors" 
                  style={{ fontSize: 'var(--font-h6)' }}
                  onClick={() => navigate(`/clusters/${serviceId}/cluster/${selectedCluster}`)}
                >
                  Cluster {selectedCluster} of 279 ({selectedClusterData?.record_count || 0} records)
                </h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                  {filteredAndSortedData.length} records
                </Badge>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="whole-cluster"
                    checked={wholeCluster}
                    onCheckedChange={handleWholeClusterChange}
                  />
                  <Label htmlFor="whole-cluster" className="text-sm cursor-pointer">
                    Whole cluster
                  </Label>
                </div>
              </div>

              {/* Filter Controls Section */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Search Input */}
                <div className="relative flex-1 min-w-64 max-w-80">
                  <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search records..."
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

                {/* Quick Status Filters */}
                <div className="flex items-center gap-1">
                  {['all', 'with-approvals', 'pending-approvals', 'no-approvals'].map((type) => (
                    <Button
                      key={type}
                      variant={filterType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterType(type as FilterType)}
                      className={`${
                        filterType === type 
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

                {/* Results & Actions */}
                <div className="flex items-center gap-2 ml-auto">
                  <Badge variant="outline" className="px-2 py-0.5 bg-muted/50 border-border" style={{ fontSize: 'var(--font-body)' }}>
                    {filteredAndSortedData.length}/{selectedClusterData?.records.length || 0}
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
                  
                  {/* Create Set Button */}
                  <Dialog open={isCreateSetDialogOpen} onOpenChange={setIsCreateSetDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="px-3 bg-warning hover:bg-warning/90 text-white font-medium focus:ring-1 focus:ring-ring transition-colors"
                        style={{ height: 'var(--button-sm)', fontSize: 'var(--font-body)' }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Create Set
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle style={{ fontSize: 'var(--font-h5)' }}>Create New Set</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label className="text-sm font-semibold">Creator:*</Label>
                          <Input
                            placeholder="Enter creator name"
                            value={creator}
                            onChange={(e) => setCreator(e.target.value)}
                            className="mt-1"
                            style={{ height: 'var(--button-md)', fontSize: 'var(--font-body)' }}
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-semibold">Set Name:*</Label>
                          <Input
                            placeholder="Enter set name"
                            value={setName}
                            onChange={(e) => setSetName(e.target.value)}
                            className="mt-1"
                            style={{ height: 'var(--button-md)', fontSize: 'var(--font-body)' }}
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm font-semibold">Description:*</Label>
                          <Textarea
                            placeholder="Enter description (max 500 chars)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 h-20"
                            maxLength={500}
                            style={{ fontSize: 'var(--font-body)' }}
                          />
                          <div className="text-xs text-muted-foreground mt-1">{description.length}/500 characters</div>
                        </div>
                        
                        <div className="flex gap-2 pt-4">
                          <Button 
                            className="bg-warning hover:bg-warning/90 text-white flex-1"
                            style={{ height: 'var(--button-md)', fontSize: 'var(--font-body)' }}
                            onClick={() => {
                              console.log('Add selected rows to set')
                              setIsCreateSetDialogOpen(false)
                            }}
                          >
                            Add selected rows to set
                          </Button>
                          <Button 
                            className="bg-primary hover:bg-primary/90 text-white flex-1"
                            style={{ height: 'var(--button-md)', fontSize: 'var(--font-body)' }}
                            onClick={() => {
                              console.log('Create new set with selected rows')
                              setIsCreateSetDialogOpen(false)
                            }}
                          >
                            Create new set
                          </Button>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <Button 
                            variant="outline"
                            className="w-full"
                            style={{ height: 'var(--button-md)', fontSize: 'var(--font-body)' }}
                            onClick={() => {
                              console.log('Select an existing set')
                            }}
                          >
                            Select an existing set to add rows to
                          </Button>
                          <div className="text-xs text-muted-foreground text-center mt-1">Choose from existing sets</div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="link" 
                    size="sm"
                    className="p-0 h-auto text-primary hover:underline"
                    style={{ fontSize: 'var(--font-body)' }}
                    onClick={() => navigate(`/dendrogram/${serviceId}`)}
                  >
                    ← Back to dendrograms
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
              {/* Table Container - Fixed height with sticky header */}
              {!isTableCollapsed && (
                <div className="max-h-112 overflow-auto">
                  <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)', minWidth: '100%' }}>
                    <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                      <tr>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('abcd_1up')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            ABCD 1-Up
                            {getSortIcon('abcd_1up')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('service_id')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service ID
                            {getSortIcon('service_id')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('service_name')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service Name
                            {getSortIcon('service_name')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('provision_type')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Provision Type
                            {getSortIcon('provision_type')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('options')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Options
                            {getSortIcon('options')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Approve</th>
                        <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}># sets in now</th>
                        <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Add to set</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedData.map((record, index) => (
                        <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                          <td className="px-2 py-2 align-middle">
                            <Button variant="link" className="p-0 h-auto text-primary underline font-bold" style={{ fontSize: 'var(--font-body)' }}>
                              {record.abcd_1up}
                            </Button>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}>{record.service_id}</span>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <div className="max-w-full">
                              <span className="font-medium text-foreground break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={record.service_name}>
                                {record.service_name}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.provision_type}>
                              {record.provision_type}
                            </span>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <span className="font-medium text-accent break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={record.options}>
                              {record.options}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="font-bold text-primary" style={{ fontSize: 'var(--font-body)' }}>{record.sets_in_now}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <Checkbox
                              checked={record.add_to_set}
                              onCheckedChange={() => handleCheckboxChange(index)}
                            />
                          </td>
                        </tr>
                      ))}
                      {filteredAndSortedData.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-center py-8 text-muted-foreground">
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
              )}
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    </div>
  )
}