import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MagnifyingGlass, X, CaretUp, CaretDown } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

interface ServiceRecord {
  id: string
  name: string
  totalRecords: number
}

// Types for sorting
type SortField = 'id' | 'name' | 'totalRecords'
type SortDirection = 'asc' | 'desc'

export function Phase1Services() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [isTableCollapsed, setIsTableCollapsed] = useState(false)
  
  // Mock data based on the screenshot - 50 services total
  const services: ServiceRecord[] = [
    { id: '3501115', name: 'PCP Office/Outpatient Visit and Consultation -> Professional Services', totalRecords: 50 },
    { id: '3501117', name: 'Specialist Office/Outpatient Visit and Consultation -> Professional Services', totalRecords: 132 },
    { id: '3501121', name: 'Physician Office/Outpatient Visit and Consultation -> Professional Services', totalRecords: 95 },
    { id: '3501123', name: 'Surgery -> Professional Services', totalRecords: 83 },
    { id: '3501127', name: 'Diagnostic Services -> Professional Services', totalRecords: 10 },
    { id: '3501129', name: 'Allergy Testing -> Diagnostic Services -> Professional Services', totalRecords: 122 },
    { id: '3501131', name: 'Maternity -> Professional Services', totalRecords: 29 },
    { id: '3501133', name: 'Maternity for Dependent Daughters -> Maternity -> Professional Services', totalRecords: 7 },
    { id: '3501135', name: 'Allergy Extracts -> Professional Services', totalRecords: 60 },
    { id: '3501137', name: 'Spinal Manipulations -> Professional Services', totalRecords: 150 },
    { id: '3501139', name: 'Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 2 },
    { id: '3501141', name: 'Occupational Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 187 },
    { id: '3501143', name: 'Speech Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 131 },
    { id: '3501145', name: 'Physical Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 45 },
    { id: '3501147', name: 'Respiratory Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 23 },
    { id: '3501149', name: 'Cardiac Rehabilitation -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 18 },
    { id: '3501151', name: 'Mental Health Services -> Professional Services', totalRecords: 78 },
    { id: '3501153', name: 'Substance Abuse Treatment -> Mental Health Services -> Professional Services', totalRecords: 34 },
    { id: '3501155', name: 'Psychological Testing -> Mental Health Services -> Professional Services', totalRecords: 67 },
    { id: '3501157', name: 'Psychiatric Services -> Mental Health Services -> Professional Services', totalRecords: 89 },
    { id: '3501159', name: 'Emergency Services -> Professional Services', totalRecords: 156 },
    { id: '3501161', name: 'Urgent Care Services -> Emergency Services -> Professional Services', totalRecords: 234 },
    { id: '3501163', name: 'Ambulance Services -> Emergency Services -> Professional Services', totalRecords: 45 },
    { id: '3501165', name: 'Laboratory Services -> Diagnostic Services -> Professional Services', totalRecords: 298 },
    { id: '3501167', name: 'Pathology Services -> Laboratory Services -> Diagnostic Services -> Professional Services', totalRecords: 87 },
    { id: '3501169', name: 'Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 423 },
    { id: '3501171', name: 'Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 312 },
    { id: '3501173', name: 'Nuclear Medicine -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 56 },
    { id: '3501175', name: 'Ultrasound Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 189 },
    { id: '3501177', name: 'CT Scan Services -> Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 145 },
    { id: '3501179', name: 'MRI Services -> Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 98 },
    { id: '3501181', name: 'X-Ray Services -> Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 267 },
    { id: '3501183', name: 'Mammography Services -> Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 76 },
    { id: '3501185', name: 'Cardiology Services -> Professional Services', totalRecords: 123 },
    { id: '3501187', name: 'Electrocardiogram -> Cardiology Services -> Professional Services', totalRecords: 89 },
    { id: '3501189', name: 'Echocardiogram -> Cardiology Services -> Professional Services', totalRecords: 67 },
    { id: '3501191', name: 'Stress Testing -> Cardiology Services -> Professional Services', totalRecords: 45 },
    { id: '3501193', name: 'Holter Monitoring -> Cardiology Services -> Professional Services', totalRecords: 34 },
    { id: '3501195', name: 'Pulmonology Services -> Professional Services', totalRecords: 78 },
    { id: '3501197', name: 'Pulmonary Function Testing -> Pulmonology Services -> Professional Services', totalRecords: 56 },
    { id: '3501199', name: 'Sleep Studies -> Pulmonology Services -> Professional Services', totalRecords: 43 },
    { id: '3501201', name: 'Gastroenterology Services -> Professional Services', totalRecords: 101 },
    { id: '3501203', name: 'Endoscopy Services -> Gastroenterology Services -> Professional Services', totalRecords: 87 },
    { id: '3501205', name: 'Colonoscopy Services -> Gastroenterology Services -> Professional Services', totalRecords: 134 },
    { id: '3501207', name: 'Dermatology Services -> Professional Services', totalRecords: 89 },
    { id: '3501209', name: 'Skin Biopsy -> Dermatology Services -> Professional Services', totalRecords: 45 },
    { id: '3501211', name: 'Ophthalmology Services -> Professional Services', totalRecords: 78 },
    { id: '3501213', name: 'Eye Examination -> Ophthalmology Services -> Professional Services', totalRecords: 156 },
    { id: '3501215', name: 'Orthopedic Services -> Professional Services', totalRecords: 234 },
    { id: '3501217', name: 'Joint Replacement -> Orthopedic Services -> Professional Services', totalRecords: 67 },
    { id: '3501219', name: 'Sports Medicine -> Orthopedic Services -> Professional Services', totalRecords: 89 }
  ]

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...services]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.totalRecords.toString().includes(searchTerm.toLowerCase())
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
        case 'totalRecords':
          aValue = a.totalRecords
          bValue = b.totalRecords
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [services, searchTerm, sortField, sortDirection])

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

  return (
    <div className="flex flex-col font-['Proxima_Nova',sans-serif] min-h-0">

      {/* Services Table */}
      <Collapsible open={!isTableCollapsed} onOpenChange={(open) => setIsTableCollapsed(!open)}>
        <Card className="bg-card border-border shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
          <CardContent className="p-0 flex flex-col h-full min-h-0">
            {/* Table Header with Search and Controls */}
            <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
              {/* Left Section: Title and Badge */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                  Phase 1 Services
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
                    placeholder="Search services..."
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
                    {filteredAndSortedData.length}/{services.length}
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
              {/* Table Container - Constrained width for Phase 1 Services */}
              {!isTableCollapsed && (
                <>
                  <div className="max-h-96 overflow-auto">
                    <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                      <colgroup>
                        <col style={{ width: '120px' }} />
                        <col style={{ width: 'auto' }} />
                        <col style={{ width: '140px' }} />
                        <col style={{ width: '160px' }} />
                      </colgroup>
                      <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                        <tr>
                          <th className="text-left px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('id')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Service ID
                              {getSortIcon('id')}
                            </div>
                          </th>
                          <th className="text-left px-3 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('name')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Service Name
                              {getSortIcon('name')}
                            </div>
                          </th>
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSort('totalRecords')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Total Records
                              {getSortIcon('totalRecords')}
                            </div>
                          </th>
                          <th className="text-center px-3 py-3 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>See Dendrogram</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedData.map((service, index) => (
                          <tr key={service.id} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                            <td className="px-3 py-3 align-middle">
                              <span className="font-mono font-medium text-primary" style={{ fontSize: 'var(--font-body)' }}>
                                {service.id}
                              </span>
                            </td>
                            <td className="px-3 py-3 align-top">
                              <div className="max-w-full">
                                <span className="font-medium text-foreground break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={service.name}>
                                  {service.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <span className="font-bold text-secondary" style={{ fontSize: 'var(--font-body)' }}>
                                {service.totalRecords.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-center align-middle">
                              <Button 
                                size="sm" 
                                className="btn-gradient-primary font-medium focus:ring-1 focus:ring-ring transition-colors"
                                style={{ height: 'var(--button-sm)', fontSize: 'var(--font-body)' }}
                                onClick={() => navigate(`/dendrogram/${service.id}`)}
                              >
                                Create/View
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {filteredAndSortedData.length === 0 && (
                          <tr>
                            <td colSpan={4} className="text-center py-8 text-muted-foreground">
                              <div className="flex flex-col items-center gap-2">
                                <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                                <div>
                                  <p className="font-semibold">No services found</p>
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