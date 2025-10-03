import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CaretDown } from '@phosphor-icons/react'

interface ServiceGroup {
  id: string
  name: string
  description: string
  assignee: string
  cardOrder: number
}

interface ServiceGroupSelectorProps {
  selectedServiceGroup?: string
  onServiceGroupChange?: (serviceGroupId: string) => void
}

export function ServiceGroupSelector({ 
  selectedServiceGroup = "phase1-cycle2", 
  onServiceGroupChange 
}: ServiceGroupSelectorProps) {
  const [currentSelection, setCurrentSelection] = useState(selectedServiceGroup)
  
  // Mock service groups data - in a real app, this would come from an API
  const serviceGroups: ServiceGroup[] = [
    {
      id: "phase1-cycle2",
      name: "Phase 1 Cycle 2",
      description: "This is the second set of services in the Phase 1 2025 Q4 work.",
      assignee: "BAs",
      cardOrder: 2
    },
    {
      id: "phase1-cycle1", 
      name: "Phase 1 Cycle 1",
      description: "This is the first 50 services for the Phase 1 work",
      assignee: "BAs",
      cardOrder: 1
    },
    {
      id: "cycle1-service-group",
      name: "Cycle 1 service group",
      description: "This is the set of services in the first cycle (50, though 3 are not yet added).",
      assignee: "Dheeraj",
      cardOrder: 3
    },
    {
      id: "test",
      name: "test",
      description: "test",
      assignee: "SR test",
      cardOrder: 4
    },
    {
      id: "demo",
      name: "demo",
      description: "test",
      assignee: "SR test",
      cardOrder: 5
    },
    {
      id: "testing",
      name: "Test",
      description: "Testing",
      assignee: "MH demo",
      cardOrder: 6
    },
    {
      id: "sr-test-sample",
      name: "test",
      description: "test", 
      assignee: "sr test sample",
      cardOrder: 7
    }
  ]

  const handleValueChange = (value: string) => {
    setCurrentSelection(value)
    onServiceGroupChange?.(value)
  }

  const selectedGroup = serviceGroups.find(group => group.id === currentSelection)

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        Service Group:
      </span>
      <Select value={currentSelection} onValueChange={handleValueChange}>
        <SelectTrigger className="w-64 h-9 bg-card border-border hover:border-primary/40 transition-colors cursor-pointer">
          <SelectValue>
            <span className="text-sm font-medium text-primary">
              {selectedGroup?.name || "Select Service Group"}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent 
          className="bg-card border-border shadow-lg w-80 max-h-80 overflow-y-auto"
          sideOffset={4}
        >
          {serviceGroups.map((group) => (
            <SelectItem 
              key={group.id} 
              value={group.id}
              className="cursor-pointer hover:bg-muted/80 focus:bg-muted transition-colors p-3"
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-foreground text-sm">
                    {group.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {group.assignee}
                    </span>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {group.cardOrder}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed text-left">
                  {group.description}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}