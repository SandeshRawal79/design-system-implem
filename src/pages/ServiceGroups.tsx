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
      minWidth: '50px',
      className: 'id-col',
      render: (value: number) => (
        <span className="font-medium text-foreground cursor-pointer">{value}</span>
      )
    },
    {
      key: 'name',
      label: 'Group Name',
      className: 'name-col',
      render: (value: string) => (
        <span className="text-info hover:text-info/80 cursor-pointer font-medium transition-colors">
          {value}
        </span>
      )
    },
    {
      key: 'description',
      label: 'Description',
      className: 'description-col',
      render: (value: string) => (
        <span className="text-info hover:text-info/80 cursor-pointer transition-colors">
          {value}
        </span>
      )
    },
    {
      key: 'assignee',
      label: 'Assignee',
      className: 'assignee-col',
      render: (value: string) => (
        <span className="text-foreground cursor-pointer">{value}</span>
      )
    },
    {
      key: 'members',
      label: 'Members',
      minWidth: '70px',
      className: 'members-col',
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
      minWidth: '110px',
      className: 'created-col',
      render: (value: string) => (
        <span className="text-muted-foreground text-sm cursor-pointer">{value}</span>
      )
    },
    {
      key: 'modify',
      label: 'Modify',
      sortable: false,
      searchable: false,
      minWidth: '70px',
      className: 'modify-col',
      render: (_: any, record: ServiceGroup) => (
        <Button
          onClick={() => handleModify(record.id)}
          variant="ghost"
          size="sm"
          className="text-success hover:text-success/80 hover:bg-success/10 font-medium cursor-pointer table-action-btn"
        >
          Modify
        </Button>
      )
    },
    {
      key: 'dendrogram',
      label: 'Dendrogram',
      sortable: false,
      searchable: false,
      minWidth: '90px',
      className: 'actions-col',
      render: (_: any, record: ServiceGroup) => (
        <Button
          onClick={() => handleCreateView(record.id)}
          variant="ghost"
          size="sm"
          className="text-success hover:text-success/80 hover:bg-success/10 font-medium cursor-pointer table-action-btn"
        >
          Create/View
        </Button>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Top Back Button */}
      <div className="flex items-start mb-3 -mt-2">
        <BackToDashboardButton />
      </div>

      {/* Compact Hero Section with Metrics */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-lg overflow-hidden service-groups-hero">
        <CardContent className="p-5 lg:p-6">
          {/* Compact Header Layout */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold mb-1">Service Groups</h1>
              <p className="text-sm lg:text-base opacity-90">Manage and view service group assignments</p>
            </div>
            
            {/* Action Button moved to hero for space efficiency */}
            <Button 
              onClick={handleCreateNewGroup}
              className="bg-white/20 hover:bg-white/30 border border-white/30 text-white h-9 px-4 text-sm font-medium rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Group
            </Button>
          </div>
          
          {/* Compact Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg metric-card-compact cursor-pointer hover:bg-white/20 transition-all duration-300 group text-center">
              <div className="text-xl lg:text-2xl font-bold mb-0.5 group-hover:scale-105 transition-transform">
                {serviceGroups.length}
              </div>
              <div className="text-xs lg:text-sm opacity-80 font-medium">TOTAL GROUPS</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg metric-card-compact cursor-pointer hover:bg-white/20 transition-all duration-300 group text-center">
              <div className="text-xl lg:text-2xl font-bold mb-0.5 group-hover:scale-105 transition-transform">
                {serviceGroups.length}
              </div>
              <div className="text-xs lg:text-sm opacity-80 font-medium">ASSIGNED GROUPS</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg metric-card-compact cursor-pointer hover:bg-white/20 transition-all duration-300 group text-center">
              <div className="text-xl lg:text-2xl font-bold mb-0.5 group-hover:scale-105 transition-transform">
                1,297
              </div>
              <div className="text-xs lg:text-sm opacity-80 font-medium">AVAILABLE SERVICES</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Groups Table */}
      <div className="space-y-4">
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