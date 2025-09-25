import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowLeft,
  faFilter,
  faSearch,
  faDownload,
  faEye,
  faEdit,
  faTrash,
  faCheck,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'

interface AbcdRecord {
  id: string
  recordId: string
  provisionStatus: 'Pending' | 'Approved' | 'Rejected' | 'In Review'
  team: string
  createdDate: string
  lastModified: string
  priority: 'High' | 'Medium' | 'Low'
  category: string
  assignedTo: string
}

export function Abcds() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [teamFilter, setTeamFilter] = useState<string>('all')

  // Sample ABCD records data
  const abcdRecords: AbcdRecord[] = [
    {
      id: '1',
      recordId: 'ABCD-2024-001',
      provisionStatus: 'Approved',
      team: 'HPO team',
      createdDate: '2024-01-15',
      lastModified: '2024-01-20',
      priority: 'High',
      category: 'Healthcare Service',
      assignedTo: 'John Smith'
    },
    {
      id: '2',
      recordId: 'ABCD-2024-002',
      provisionStatus: 'Pending',
      team: 'PM&D team',
      createdDate: '2024-01-16',
      lastModified: '2024-01-21',
      priority: 'Medium',
      category: 'Administrative Service',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: '3',
      recordId: 'ABCD-2024-003',
      provisionStatus: 'In Review',
      team: 'Simplify Healthcare',
      createdDate: '2024-01-17',
      lastModified: '2024-01-22',
      priority: 'High',
      category: 'Clinical Service',
      assignedTo: 'Michael Brown'
    },
    {
      id: '4',
      recordId: 'ABCD-2024-004',
      provisionStatus: 'Rejected',
      team: 'HPO team',
      createdDate: '2024-01-18',
      lastModified: '2024-01-23',
      priority: 'Low',
      category: 'Support Service',
      assignedTo: 'Emily Davis'
    },
    {
      id: '5',
      recordId: 'ABCD-2024-005',
      provisionStatus: 'Approved',
      team: 'Simplify Healthcare',
      createdDate: '2024-01-19',
      lastModified: '2024-01-24',
      priority: 'Medium',
      category: 'Healthcare Service',
      assignedTo: 'Robert Wilson'
    },
    {
      id: '6',
      recordId: 'ABCD-2024-006',
      provisionStatus: 'Pending',
      team: 'PM&D team',
      createdDate: '2024-01-20',
      lastModified: '2024-01-25',
      priority: 'High',
      category: 'Administrative Service',
      assignedTo: 'Lisa Anderson'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return '#43812C'
      case 'Pending':
        return '#F48436'
      case 'Rejected':
        return '#E22A2A'
      case 'In Review':
        return '#0174B2'
      default:
        return '#888888'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#E22A2A'
      case 'Medium':
        return '#F48436'
      case 'Low':
        return '#43812C'
      default:
        return '#888888'
    }
  }

  const filteredRecords = abcdRecords.filter(record => {
    const matchesSearch = record.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || record.provisionStatus === statusFilter
    const matchesTeam = teamFilter === 'all' || record.team === teamFilter
    
    return matchesSearch && matchesStatus && matchesTeam
  })

  const statusCounts = {
    approved: abcdRecords.filter(r => r.provisionStatus === 'Approved').length,
    pending: abcdRecords.filter(r => r.provisionStatus === 'Pending').length,
    rejected: abcdRecords.filter(r => r.provisionStatus === 'Rejected').length,
    inReview: abcdRecords.filter(r => r.provisionStatus === 'In Review').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">ABCD Intelligence</h1>
            <p className="text-muted-foreground">Phase 1 ABCD record analytics and provision tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="btn-gradient-primary cursor-pointer">
            <FontAwesomeIcon icon={faDownload} className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total ABCDs</p>
              <p className="text-2xl font-bold text-foreground">2,693</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#43812C' }}></div>
              <span className="text-xs text-muted-foreground">Phase 1 Active Records</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold" style={{ color: '#43812C' }}>{statusCounts.approved}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#43812C' }}>
              <FontAwesomeIcon icon={faCheck} className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-muted-foreground">
              {((statusCounts.approved / abcdRecords.length) * 100).toFixed(0)}% completion rate
            </span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold" style={{ color: '#F48436' }}>{statusCounts.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F48436' }}>
              <FontAwesomeIcon icon={faXmark} className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-muted-foreground">Requires attention</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Review</p>
              <p className="text-2xl font-bold" style={{ color: '#0174B2' }}>{statusCounts.inReview}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0174B2' }}>
              <FontAwesomeIcon icon={faEye} className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-muted-foreground">Under evaluation</span>
          </div>
        </Card>
      </div>

      {/* Team Performance */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Team Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">HPO team</span>
              <span className="text-sm text-muted-foreground">0% (0 of 438)</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">PM&D team</span>
              <span className="text-sm text-muted-foreground">2% (7 of 398)</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-secondary h-2 rounded-full" style={{ width: '2%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Simplify Healthcare</span>
              <span className="text-sm text-muted-foreground">3% (80 of 2693)</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '3%' }}></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" 
              />
              <Input
                placeholder="Search ABCDs..."
                className="pl-10 w-64 cursor-text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 cursor-pointer">
                <FontAwesomeIcon icon={faFilter} className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
              </SelectContent>
            </Select>

            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger className="w-48 cursor-pointer">
                <FontAwesomeIcon icon={faFilter} className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="HPO team">HPO team</SelectItem>
                <SelectItem value="PM&D team">PM&D team</SelectItem>
                <SelectItem value="Simplify Healthcare">Simplify Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredRecords.length} of {abcdRecords.length} records
          </div>
        </div>
      </Card>

      {/* ABCD Records Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">ABCD Records</h3>
          <Badge variant="secondary" className="text-muted-foreground">
            {filteredRecords.length}
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{record.recordId}</TableCell>
                  <TableCell>
                    <Badge 
                      className="text-white font-medium"
                      style={{ backgroundColor: getStatusColor(record.provisionStatus) }}
                    >
                      {record.provisionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.team}</TableCell>
                  <TableCell>
                    <Badge 
                      className="text-white font-medium"
                      style={{ backgroundColor: getPriorityColor(record.priority) }}
                    >
                      {record.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.category}</TableCell>
                  <TableCell>{record.assignedTo}</TableCell>
                  <TableCell>{record.createdDate}</TableCell>
                  <TableCell>{record.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer icon-hover"
                      >
                        <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-icon" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer icon-hover"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-icon" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer icon-hover"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-icon" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}