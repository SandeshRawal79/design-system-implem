import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PageLayout } from '@/components/PageLayout'

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
  return (
    <Card className="p-4 h-full flex flex-col justify-between intelligence-card border-2 hover:border-primary/20 cursor-pointer">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{title}</h3>
          {badgeText && badgeCount && (
            <Badge 
              className="text-white font-medium group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: '#474A9E' }}
            >
              {badgeText} {badgeCount}
            </Badge>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {description}
        </p>
        
        {isActive && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-2 h-2 rounded-full status-active" style={{ backgroundColor: '#43812C' }}></div>
            <span className="text-xs font-medium" style={{ color: '#43812C' }}>
              Active
            </span>
          </div>
        )}

        <div className="space-y-1 mb-2">
          {teams.map((team, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-1.5 -mx-1.5 rounded-md cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 hover:shadow-sm hover:scale-[1.02] group"
            >
              <span 
                className="text-xs font-medium transition-all duration-300 group-hover:font-semibold team-stats-text relative underline-offset-2 hover:underline"
                style={{ color: '#474A9E' }}
              >
                {team.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span 
                  className="text-xs font-bold transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: 'linear-gradient(135deg, #474A9E 0%, #1F8A7A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {team.percentage}%
                </span>
                <span 
                  className="text-xs font-medium transition-all duration-300 group-hover:font-semibold"
                  style={{ color: '#1F8A7A' }}
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
        subtitle="Service Group: Phase 1 Cycle 2"
        backButtonLabel="Back to Dashboard"
        backButtonPath="/"
      >
        {/* Two-column layout with 20% ABCD Disposition and 80% Streamlining Classifications */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 h-full">
          {/* Left Column - ABCD Disposition (20% width) */}
          <div className="xl:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">ABCD Disposition</h2>
              <Badge variant="outline" className="bg-primary text-primary-foreground cursor-pointer text-xs px-2 py-1">
                Classification 2
              </Badge>
            </div>
            
            {/* Single column layout for compact cards in narrow column */}
            <div className="space-y-4">
              {classificationCards.map((card, index) => (
                <AbcdCard key={index} {...card} />
              ))}
            </div>
          </div>

          {/* Right Column - Streamlining Classifications (80% width) */}
          <div className="xl:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">Streamlining Classifications</h2>
              <Badge variant="outline" className="bg-info text-white cursor-pointer text-xs px-2 py-1">
                Analytics 8
              </Badge>
            </div>
            
            {/* Grid layout for analytics cards in wider column */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
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