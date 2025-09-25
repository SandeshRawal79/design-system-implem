import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSearch, 
  faSort, 
  faSortUp, 
  faSortDown,
  faEye,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { phase1Services, searchServices, sortServices, SortField, SortDirection } from '../data/serviceData'

export function ServiceDashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Filter and sort services
  const filteredServices = useMemo(() => {
    const searched = searchServices(searchQuery)
    return sortServices(searched, sortField, sortDirection)
  }, [searchQuery, sortField, sortDirection])

  // Calculate total records
  const totalRecords = useMemo(() => {
    return phase1Services.reduce((total, service) => total + service.totalRecords, 0)
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <FontAwesomeIcon icon={faSort} className="w-3 h-3 text-muted-foreground ml-1" />
    }
    return (
      <FontAwesomeIcon 
        icon={sortDirection === 'asc' ? faSortUp : faSortDown} 
        className="w-3 h-3 text-primary ml-1" 
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="text-center space-y-2">
        <h1 className="text-h1-responsive font-bold text-foreground">
          ABCD Dashboard (Phase 1 Services)
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="bg-success/10 text-success px-3 py-1">
            <span className="status-active inline-block w-2 h-2 bg-success rounded-full mr-2"></span>
            {filteredServices.length} services found
          </Badge>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-md mx-auto">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" 
            />
            <Input
              placeholder="Search by Service ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 border-input focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-h4 text-foreground">Phase 1 Services</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total Records: {totalRecords.toLocaleString()}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-medium">
                    <button
                      onClick={() => handleSort('id')}
                      className="flex items-center hover:text-primary transition-colors"
                    >
                      Service ID
                      {getSortIcon('id')}
                    </button>
                  </TableHead>
                  <TableHead className="font-medium">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center hover:text-primary transition-colors"
                    >
                      Service Name
                      {getSortIcon('name')}
                    </button>
                  </TableHead>
                  <TableHead className="font-medium text-center">
                    <button
                      onClick={() => handleSort('totalRecords')}
                      className="flex items-center justify-center hover:text-primary transition-colors w-full"
                    >
                      Total Records
                      {getSortIcon('totalRecords')}
                    </button>
                  </TableHead>
                  <TableHead className="font-medium text-center">
                    See Dendrogram
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service, index) => (
                  <TableRow 
                    key={service.id} 
                    className={`hover:bg-muted/50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-muted/20'
                    }`}
                  >
                    <TableCell className="font-mono">
                      {service.id}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        {service.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-medium">
                        {service.totalRecords.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`/service/${service.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-xs btn-gradient-secondary"
                        >
                          <FontAwesomeIcon icon={faEye} className="w-3 h-3 mr-1" />
                          Create/View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-3 p-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-muted-foreground">
                        Service ID: {service.id}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {service.name}
                      </div>
                    </div>
                    <Badge variant="outline" className="font-medium">
                      {service.totalRecords.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex justify-end">
                    <Link to={`/service/${service.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs btn-gradient-secondary"
                      >
                        <FontAwesomeIcon icon={faEye} className="w-3 h-3 mr-1" />
                        Create/View
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredServices.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No services found matching "{searchQuery}"</p>
              <Button
                variant="ghost"
                onClick={() => setSearchQuery('')}
                className="mt-2 text-primary"
              >
                Clear search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{phase1Services.length}</div>
            <div className="text-sm text-muted-foreground">Total Services</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{totalRecords.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Records</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {Math.round(totalRecords / phase1Services.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Records/Service</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}