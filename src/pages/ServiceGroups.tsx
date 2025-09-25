import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'
import { PageLayout } from '@/components/PageLayout'
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
      label: 'Actions',
      sortable: false,
      searchable: false,
      minWidth: '90px',
      className: 'actions-col',
      render: (_: any, record: ServiceGroup) => (
        <Button
          onClick={() => handleCreateView(record.id)}
          size="sm"
          className="btn-gradient-primary text-xs h-6 md:h-7 px-2 md:px-3 whitespace-nowrap cursor-pointer"
        >
          Create/View
        </Button>
      )
    }
  ]

  return (
    <PageLayout
      title="Service Groups"
      subtitle="Manage and view service group assignments"
      badge={{
        count: serviceGroups.length,
        label: "service groups found"
      }}
    >
      <DataTable
        data={serviceGroups}
        columns={columns}
        searchable
        searchPlaceholder="Search service groups..."
      />
    </PageLayout>
  )
}