import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageLayout } from '@/components/PageLayout'
import { DataTable } from '@/components/DataTable'

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
    timestamp: "2025-08-22 04:22:26"
  },
  {
    id: 5,
    creator: "Dheeraj",
    name: "Z No Change CD 5",
    setCount: 288,
    description: "Type=Copayment, options=No",
    abcdTup: 892,
    serviceId: 0,
    serviceName: "Product Wide Provision",
    provisionType: "Copayment",
    options: "No",
    approvalsNeeded: ["SH", "HPO", "PM&D"],
    timestamp: "2025-08-22 04:22:28"
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
  const [abcdSets] = useState(mockAbcdSets)

  const handleView = (setId: number) => {
    console.log('View ABCD set:', setId)
  }

  const handleDownload = (setId: number) => {
    console.log('Download ABCD set:', setId)
  }

  const handleRefresh = (setId: number) => {
    console.log('Refresh ABCD set:', setId)
  }

  const getProvisionTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'Coverage': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'Deductible': return 'bg-green-100 text-green-800 border-green-300'
      case 'Coinsurance - Insurer': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Copayment': return 'bg-orange-100 text-orange-800 border-orange-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
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
      key: 'creator',
      label: 'Creator',
      render: (value: string) => (
        <span className="text-info cursor-pointer font-medium">{value}</span>
      )
    },
    {
      key: 'name',
      label: 'ABCD Set Name',
      render: (value: string) => (
        <span className="text-info hover:text-info/80 cursor-pointer font-medium transition-colors">
          {value}
        </span>
      )
    },
    {
      key: 'setCount',
      label: 'Set Count',
      minWidth: '90px',
      render: (value: number) => (
        <Badge variant="secondary" className="cursor-pointer">
          {value.toLocaleString()}
        </Badge>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <span className="text-sm text-muted-foreground cursor-pointer">{value}</span>
      )
    },
    {
      key: 'abcdTup',
      label: 'ABCD Tup',
      minWidth: '90px',
      render: (value: number) => (
        <Badge variant="outline" className="cursor-pointer">
          {value.toLocaleString()}
        </Badge>
      )
    },
    {
      key: 'serviceName',
      label: 'Service Name',
      render: (value: string) => (
        <span className="text-foreground cursor-pointer">{value}</span>
      )
    },
    {
      key: 'provisionType',
      label: 'Provision Type',
      render: (value: string, record: AbcdSet) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${getProvisionTypeBadgeColor(value)}`}>
          {value}
        </span>
      )
    },
    {
      key: 'options',
      label: 'Options',
      render: (value: string) => (
        <span className="text-sm text-foreground cursor-pointer">{value}</span>
      )
    },
    {
      key: 'approvalsNeeded',
      label: 'Approvals Needed',
      searchable: false,
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.map((approval, index) => (
            <Badge key={index} variant="destructive" className="text-xs cursor-pointer">
              {approval}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: 'timestamp',
      label: 'Timestamp',
      minWidth: '140px',
      render: (value: string) => (
        <span className="text-xs text-muted-foreground cursor-pointer">{value}</span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      searchable: false,
      minWidth: '120px',
      render: (_: any, record: AbcdSet) => (
        <div className="flex gap-1">
          <Button
            onClick={() => handleView(record.id)}
            variant="ghost"
            size="sm"
            className="text-info hover:text-info/80 hover:bg-info/10 px-2 cursor-pointer"
            title="View"
          >
            View
          </Button>
          <Button
            onClick={() => handleDownload(record.id)}
            variant="ghost"
            size="sm"
            className="text-success hover:text-success/80 hover:bg-success/10 px-2 cursor-pointer"
            title="Download"
          >
            ↓
          </Button>
          <Button
            onClick={() => handleRefresh(record.id)}
            variant="ghost"
            size="sm"
            className="text-warning hover:text-warning/80 hover:bg-warning/10 px-2 cursor-pointer"
            title="Refresh"
          >
            ↻
          </Button>
        </div>
      )
    }
  ]

  return (
    <PageLayout
      title="ABCD Sets"
      subtitle="Manage and view ABCD set configurations and provisions"
      badge={{
        count: abcdSets.length,
        label: "ABCD sets found"
      }}
    >
      <DataTable
        data={abcdSets}
        columns={columns}
        searchable
        searchPlaceholder="Search ABCD sets..."
      />
    </PageLayout>
  )
}