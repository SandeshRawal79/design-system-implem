import { useState } from 'react'
import { ArrowLeft, MagnifyingGlass, Funnel, Eye, Download, ArrowClockwise, CaretDown } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
    timestamp: "2025-08-22 04:22:25"
  },
  {
    id: 5,
    creator: "Dheeraj",
    name: "Z No Change CD 5",
    setCount: 104,
    description: "Type=Copay, options=No",
    abcdTup: 245,
    serviceId: 0,
    serviceName: "Product Wide Provision",
    provisionType: "Copay",
    options: "No",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:27"
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

export function AbcdSets() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [creatorFilter, setCreatorFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [descriptionFilter, setDescriptionFilter] = useState('')
  const [filteredSets, setFilteredSets] = useState(mockAbcdSets)

  const handleSearch = () => {
    const filtered = mockAbcdSets.filter(set => {
      const matchesSearch = searchTerm === '' || 
        set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        set.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        set.creator.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCreator = creatorFilter === '' || set.creator.toLowerCase().includes(creatorFilter.toLowerCase())
      const matchesName = nameFilter === '' || set.name.toLowerCase().includes(nameFilter.toLowerCase())
      const matchesDescription = descriptionFilter === '' || set.description.toLowerCase().includes(descriptionFilter.toLowerCase())
      
      return matchesSearch && matchesCreator && matchesName && matchesDescription
    })
    setFilteredSets(filtered)
  }

  const handleFilterChange = (field: string, value: string) => {
    switch(field) {
      case 'creator':
        setCreatorFilter(value)
        break
      case 'name':
        setNameFilter(value)
        break
      case 'description':
        setDescriptionFilter(value)
        break
    }
    
    // Auto-search when filters change
    setTimeout(() => handleSearch(), 100)
  }

  const getProvisionTypeBadge = (type: string) => {
    const colors = {
      'Coverage': 'bg-blue-100 text-blue-800 border-blue-200',
      'Deductible': 'bg-green-100 text-green-800 border-green-200', 
      'Coinsurance - Insurer': 'bg-purple-100 text-purple-800 border-purple-200',
      'Copay': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="cursor-pointer hover:bg-muted"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-h3-responsive font-semibold text-foreground">
              ABCD Sets - All Sets View
            </h1>
            <p className="text-body text-muted-foreground mt-1">
              Showing: {filteredSets.length} of {mockAbcdSets.length} sets
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <ArrowClockwise size={16} className="mr-2" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="cursor-pointer"
          >
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h5 font-semibold">
            Filter on set features & view "first ABCD" in set for reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Global Search */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlass size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search across all fields..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 cursor-pointer"
                />
              </div>
            </div>
            <Button 
              onClick={handleSearch}
              className="btn-gradient-primary cursor-pointer"
            >
              <MagnifyingGlass size={16} className="mr-2" />
              Search
            </Button>
          </div>

          {/* Column Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-caption font-medium text-foreground">Creator Filter</label>
              <Input
                placeholder="Filter by creator..."
                value={creatorFilter}
                onChange={(e) => handleFilterChange('creator', e.target.value)}
                className="cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-caption font-medium text-foreground">Name Filter</label>
              <Input
                placeholder="Filter by name..."
                value={nameFilter}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-caption font-medium text-foreground">Description Filter</label>
              <Input
                placeholder="Filter by description..."
                value={descriptionFilter}
                onChange={(e) => handleFilterChange('description', e.target.value)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground font-semibold text-center w-12">#</TableHead>
                  <TableHead className="text-primary-foreground font-semibold min-w-24">Creator</TableHead>
                  <TableHead className="text-primary-foreground font-semibold min-w-32">Name</TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-center w-20">Set Count</TableHead>
                  <TableHead className="text-primary-foreground font-semibold min-w-48">Description</TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-center w-20">ABCD Tup</TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-center w-20">Service ID</TableHead>
                  <TableHead className="text-primary-foreground font-semibold min-w-32">Service Name</TableHead>
                  <TableHead className="text-primary-foreground font-semibold min-w-32">Provision Type</TableHead>
                  <TableHead className="text-primary-foreground font-semibold min-w-40">Options</TableHead>
                  <TableHead className="text-primary-foreground font-semibold min-w-24">Approvals Needed</TableHead>
                  <TableHead className="text-primary-foreground font-semibold min-w-32">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSets.map((set, index) => (
                  <TableRow 
                    key={set.id} 
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => {
                      // Handle row click - could navigate to set details
                      console.log('Selected set:', set.id)
                    }}
                  >
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{set.creator}</TableCell>
                    <TableCell>
                      <span className="text-info font-medium cursor-pointer hover:underline">
                        {set.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{set.setCount}</TableCell>
                    <TableCell>
                      <span className="text-info cursor-pointer hover:underline">
                        {set.description}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{set.abcdTup}</TableCell>
                    <TableCell className="text-center">{set.serviceId}</TableCell>
                    <TableCell>{set.serviceName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`cursor-pointer ${getProvisionTypeBadge(set.provisionType)}`}>
                        {set.provisionType}
                      </Badge>
                    </TableCell>
                    <TableCell>{set.options}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {set.approvalsNeeded.map((approval, idx) => (
                          <Badge 
                            key={idx} 
                            variant="destructive" 
                            className="text-xs mr-1 cursor-pointer"
                          >
                            {approval}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-caption text-muted-foreground">
                      {set.timestamp}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Footer */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between text-caption text-muted-foreground">
            <span>Total ABCD Sets: {filteredSets.length}</span>
            <span>
              Total Set Count: {filteredSets.reduce((sum, set) => sum + set.setCount, 0).toLocaleString()}
            </span>
            <span>
              Total ABCD Tuples: {filteredSets.reduce((sum, set) => sum + set.abcdTup, 0).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}