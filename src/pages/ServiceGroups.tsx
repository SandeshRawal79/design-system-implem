import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from '@phosphor-icons/react'

interface ServiceGroup {
  id: number
  name: string
  description: string
  assignee: string
  members: number
  created: string
}

export function ServiceGroups() {
  const navigate = useNavigate()
  
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

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const handleCreateNewGroup = () => {
    // Handle create new group action
    console.log('Create new group clicked')
  }

  const handleModify = (groupId: number) => {
    console.log('Modify group:', groupId)
  }

  const handleCreateView = (groupId: number) => {
    console.log('Create/View group:', groupId)
  }

  return (
    <div className="space-y-8">
      {/* Header Section with Gradient Background */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-lg overflow-hidden">
        <CardContent className="p-8">
          <h1 className="text-h1-responsive font-bold mb-2">Service Groups</h1>
          <p className="text-lg opacity-90 mb-8">Manage and view service group assignments</p>
          
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all duration-200">
              <div className="text-3xl font-bold mb-1">5</div>
              <div className="text-sm opacity-80">TOTAL GROUPS</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all duration-200">
              <div className="text-3xl font-bold mb-1">5</div>
              <div className="text-sm opacity-80">ASSIGNED GROUPS</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 transition-all duration-200">
              <div className="text-3xl font-bold mb-1">1297</div>
              <div className="text-sm opacity-80">AVAILABLE SERVICES</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={handleCreateNewGroup}
          className="btn-gradient-primary h-[42px] px-6 text-sm font-medium rounded-lg cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Group
        </Button>
        
        <Button 
          onClick={handleBackToDashboard}
          variant="outline"
          className="btn-gradient-secondary h-[42px] px-6 text-sm font-medium rounded-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Service Groups Table */}
      <Card className="border border-border rounded-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">ID</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Group Name</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Description</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Assignee</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Members</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Created</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Modify</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">See Dendrogram</th>
                </tr>
              </thead>
              <tbody>
                {serviceGroups.map((group, index) => (
                  <tr 
                    key={group.id} 
                    className={`border-b border-border hover:bg-muted/50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-muted/20'
                    }`}
                  >
                    <td className="p-4 text-sm text-foreground font-medium">{group.id}</td>
                    <td className="p-4">
                      <span className="text-sm text-info hover:text-info/80 cursor-pointer font-medium">
                        {group.name}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-info hover:text-info/80 cursor-pointer">
                        {group.description}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-foreground">{group.assignee}</td>
                    <td className="p-4 text-sm text-foreground text-center">{group.members}</td>
                    <td className="p-4 text-sm text-muted-foreground">{group.created}</td>
                    <td className="p-4">
                      <Button
                        onClick={() => handleModify(group.id)}
                        variant="ghost"
                        size="sm"
                        className="text-success hover:text-success/80 hover:bg-success/10 text-sm font-medium cursor-pointer p-2"
                      >
                        Modify
                      </Button>
                    </td>
                    <td className="p-4">
                      <Button
                        onClick={() => handleCreateView(group.id)}
                        variant="ghost"
                        size="sm"
                        className="text-success hover:text-success/80 hover:bg-success/10 text-sm font-medium cursor-pointer p-2"
                      >
                        Create/View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}