import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageLayout } from '@/components/PageLayout'
import { ServiceGroupSelector } from '@/components/ServiceGroupSelector'
import { CaretDown } from '@phosphor-icons/react'

interface AbcdCardProps {
  title: string
  description: string
  isActive: boolean
  teams: Array<{
    name: string
    percentage: number
    count: number
    total: number
  }>
  badgeText?: string
  badgeCount?: number
}

function AbcdCard({ title, description, isActive, teams, badgeText, badgeCount }: AbcdCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="flex flex-col intelligence-card border hover:border-primary/20 cursor-pointer min-h-fit bg-card" style={{ padding: '12px' }}>
      <div className="flex-1" style={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1" style={{ gap: '8px' }}>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 flex-1" style={{ fontSize: '20px', lineHeight: '1.2' }}>{title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="flex items-center justify-center rounded-md hover:bg-muted transition-colors duration-200 cursor-pointer"
              style={{ width: '24px', height: '24px' }}
              aria-label={isExpanded ? "Collapse description" : "Expand description"}
            >
              <CaretDown 
                size={16} 
                className={`text-icon transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          </div>
          {badgeText && badgeCount && (
            <Badge 
              className="text-primary-foreground font-medium group-hover:scale-105 transition-transform duration-200 bg-primary"
              style={{ marginLeft: '8px' }}
            >
              {badgeText} {badgeCount}
            </Badge>
          )}
        </div>
        
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: '12px' }}>
            {description}
          </p>
        </div>
        
        {isActive && (
          <div className="flex items-center" style={{ gap: '6px' }}>
            <div className="rounded-full status-active bg-success" style={{ width: '8px', height: '8px' }}></div>
            <span className="font-medium text-success" style={{ fontSize: '12px' }}>
              Active
            </span>
          </div>
        )}

        <div style={{ gap: '4px', display: 'flex', flexDirection: 'column' }}>
          {teams.map((team, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center rounded-md cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 hover:shadow-sm hover:scale-[1.02] group"
              style={{ padding: '6px', marginLeft: '-6px', marginRight: '-6px' }}
            >
              <span 
                className="font-medium transition-all duration-300 group-hover:font-semibold team-stats-text relative underline-offset-2 hover:underline text-primary"
                style={{ fontSize: '12px' }}
              >
                {team.name}
              </span>
              <div className="flex items-center" style={{ gap: '6px' }}>
                <span 
                  className="font-bold transition-all duration-300 group-hover:scale-110 team-stats-percentage"
                  style={{ fontSize: '12px' }}
                >
                  {team.percentage}%
                </span>
                <span 
                  className="font-medium transition-all duration-300 group-hover:font-semibold text-secondary"
                  style={{ fontSize: '12px' }}
                >
                  ({team.count} of {team.total})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

export function AbcdPage() {
  const [selectedServiceGroup, setSelectedServiceGroup] = useState("phase1-cycle2")
  
  // Service groups mapping for subtitle display
  const serviceGroupNames = {
    "phase1-cycle2": "Phase 1 Cycle 2",
    "phase1-cycle1": "Phase 1 Cycle 1", 
    "cycle1-service-group": "Cycle 1 service group",
    "test": "test",
    "demo": "demo",
    "testing": "Test",
    "sr-test-sample": "test"
  }
  
  // Handle service group selection change
  const handleServiceGroupChange = (serviceGroupId: string) => {
    setSelectedServiceGroup(serviceGroupId)
    // In a real app, you would fetch new data based on the selected service group
    console.log('Selected service group:', serviceGroupId)
  }
  
  const classificationCards = [
    {
      title: "No Change",
      description: "ABCDs that do not have a New Provision Type or Option nor a New Bencode",
      isActive: true,
      teams: [
        { name: "Simplify Healthcare", percentage: 0, count: 0, total: 452 },
        { name: "HPO team", percentage: 0, count: 0, total: 452 },
        { name: "PM&D team", percentage: 0, count: 0, total: 452 },
        { name: "Total", percentage: 0, count: 452, total: 452 }
      ]
    },
    {
      title: "Change",
      description: "ABCDs with a New Provision Type and/or Option and/or a New Bencode",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    }
  ]

  const analyticsCards = [
    {
      title: "New Provision Type",
      description: "All ABCDs with a row that changes only Provision Type",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    },
    {
      title: "New Provision Type is not in CCR",
      description: "All ABCDs with a row that changes Provision Type to a value not currently in CCR",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    },
    {
      title: "New Provision Option",
      description: "All ABCDs with a row that changes only Provision Option",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    },
    {
      title: "New Bencode",
      description: "All ABCDs with a row that recommends a New Bencode",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    },
    {
      title: "New Provision Type & Option",
      description: "All ABCDs with a row that changes both Provision Type & Option",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    },
    {
      title: "New Provision Type & Bencode",
      description: "All ABCDs with a row that changes Provision Type & recommends a New Bencode",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    },
    {
      title: "New Provision Option & Bencode",
      description: "All ABCDs with a row that changes Provision Option and recommends a New Bencode",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    },
    {
      title: "New Provision Type & Option & Bencode",
      description: "All ABCDs with a row that changes Provision Type & Option and recommends a New Bencode",
      isActive: true,
      teams: [
        { name: "Total", percentage: 0, count: 0, total: 0 }
      ]
    }
  ]

  return (
    <div className="abcd-page-compact">
      <PageLayout
        title="ABCD"
        subtitle={`Service Group: ${serviceGroupNames[selectedServiceGroup as keyof typeof serviceGroupNames] || selectedServiceGroup}`}
        backButtonLabel="Back to Dashboard"
        backButtonPath="/"
        rightContent={
          <ServiceGroupSelector 
            selectedServiceGroup={selectedServiceGroup}
            onServiceGroupChange={handleServiceGroupChange}
          />
        }
      >
        {/* Two-column layout with 20% ABCD Disposition and 80% Streamlining Classifications using 4px grid system */}
        <div className="grid grid-cols-1 xl:grid-cols-5 h-full" style={{ gap: '24px' }}>
          {/* Left Column - ABCD Disposition (20% width) */}
          <div className="xl:col-span-1" style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center" style={{ gap: '12px' }}>
              <h2 className="font-semibold text-foreground" style={{ fontSize: '20px' }}>ABCD Disposition</h2>
              <Badge variant="outline" className="bg-primary text-primary-foreground cursor-pointer" style={{ fontSize: '12px', padding: '4px 8px' }}>
                Classification 2
              </Badge>
            </div>
            
            {/* Single column layout for compact cards in narrow column */}
            <div style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
              {classificationCards.map((card, index) => (
                <AbcdCard key={index} {...card} />
              ))}
            </div>
          </div>

          {/* Right Column - Streamlining Classifications (80% width) */}
          <div className="xl:col-span-4" style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center" style={{ gap: '12px' }}>
              <h2 className="font-semibold text-foreground" style={{ fontSize: '20px' }}>Streamlining Classifications</h2>
              <Badge variant="outline" className="bg-info text-white cursor-pointer" style={{ fontSize: '12px', padding: '4px 8px' }}>
                Analytics 8
              </Badge>
            </div>
            
            {/* Grid layout for analytics cards in wider column using 4px grid system */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4" style={{ gap: '16px' }}>
              {analyticsCards.map((card, index) => (
                <AbcdCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  )
}