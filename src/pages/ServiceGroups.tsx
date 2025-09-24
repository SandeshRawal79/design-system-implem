import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BackToDashboardButton } from '@/components/BackToDashboardButton'
import { DataTable } from '@/components/DataTable'
import { Plus } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

interface ServiceGroup {
  id: number
  name: string
  description: string
  assignee: string
  members: number
  created: string
}

export function ServiceGroups() {
  // Mock data based on the screenshot
  const [serviceGroups] = useState<ServiceGroup[]>([
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
  ])

  const handleCreateNewGroup = () => {
    console.log('Create new group clicked')
  }

  const handleModify = (groupId: number) => {
    console.log('Modify group:', groupId)
  }

  const handleCreateView = (groupId: number) => {
    console.log('Create/View group:', groupId)
  }

  const columns = [
    {
      key: 'id',
      label: 'ID',
      minWidth: '60px',
      render: (value: number) => (
        <span className="font-medium text-foreground cursor-pointer">{value}</span>
      )
    },
    {
      key: 'name',
      label: 'Group Name',
      render: (value: string) => (
        <span className="text-info hover:text-info/80 cursor-pointer font-medium transition-colors">
          {value}
        </span>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <span className="text-info hover:text-info/80 cursor-pointer transition-colors">
          {value}
        </span>
      )
    },
    {
      key: 'assignee',
      label: 'Assignee',
      render: (value: string) => (
        <span className="text-foreground cursor-pointer">{value}</span>
      )
    },
    {
      key: 'members',
      label: 'Members',
      minWidth: '80px',
      render: (value: number) => (
        <div className="text-center">
          <Badge variant="secondary" className="cursor-pointer">
            {value}
          </Badge>
        </div>
      )
    },
    {
      key: 'created',
      label: 'Created',
      minWidth: '140px',
      render: (value: string) => (
        <span className="text-muted-foreground text-sm cursor-pointer">{value}</span>
      )
    },
    {
      key: 'modify',
      label: 'Modify',
      sortable: false,
      searchable: false,
      minWidth: '80px',
      render: (_: any, record: ServiceGroup) => (
        <Button
          onClick={() => handleModify(record.id)}
          variant="ghost"
          size="sm"
          className="text-success hover:text-success/80 hover:bg-success/10 font-medium cursor-pointer"
        >
          Modify
        </Button>
      )
    },
    {
      key: 'dendrogram',
      label: 'See Dendrogram',
      sortable: false,
      searchable: false,
      minWidth: '120px',
      render: (_: any, record: ServiceGroup) => (
        <Button
          onClick={() => handleCreateView(record.id)}
          variant="ghost"
          size="sm"
          className="text-success hover:text-success/80 hover:bg-success/10 font-medium cursor-pointer"
        >
          Create/View
        </Button>
      )
    }
  ]

  return (
    <div className="space-y-8">
      {/* Top Back Button */}
      <div className="flex items-start mb-4 -mt-2">
        <BackToDashboardButton />
      </div>

      {/* Hero Section with Metrics */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-h1-responsive font-bold mb-2">Service Groups</h1>
            <p className="text-lg opacity-90">Manage and view service group assignments</p>
          </div>
          
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 group">
              <div className="text-3xl font-bold mb-1 group-hover:scale-105 transition-transform">
                {serviceGroups.length}
              </div>
              <div className="text-sm opacity-80">TOTAL GROUPS</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 group">
              <div className="text-3xl font-bold mb-1 group-hover:scale-105 transition-transform">
                {serviceGroups.length}
              </div>
              <div className="text-sm opacity-80">ASSIGNED GROUPS</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 group">
              <div className="text-3xl font-bold mb-1 group-hover:scale-105 transition-transform">
                1297
              </div>
              <div className="text-sm opacity-80">AVAILABLE SERVICES</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <Button 
          onClick={handleCreateNewGroup}
          className="btn-gradient-primary h-[42px] px-6 text-sm font-medium rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Group
        </Button>
      </div>

      {/* Service Groups Table */}
      <div className="space-y-6">
        <DataTable
          data={serviceGroups}
          columns={columns}
          searchable
          searchPlaceholder="Search service groups..."
        />
      </div>
    </div>
  )
}