import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group intelligence-card bg-card border-border">
      <CardHeader className="pb-2 px-3 pt-3">
        <div className="flex items-center justify-between mb-1">
          <CardTitle className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
            {title}
          </CardTitle>
          {badgeText && badgeCount && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground cursor-pointer text-xs px-1.5 py-0.5">
              {badgeText} {badgeCount}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-snug line-clamp-2 mb-2">
          {description}
        </p>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full cursor-pointer ${isActive ? 'bg-success status-active' : 'bg-muted-foreground'}`}></div>
          <span className="text-xs font-medium text-success cursor-pointer">Active</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-3 pb-3">
        <div className="space-y-1.5">
          {teams.map((team, index) => (
            <div key={index} className="flex items-center justify-between cursor-pointer hover:bg-muted/30 rounded-lg p-1 -m-1 transition-colors">
              <span className="text-xs text-primary hover:underline cursor-pointer font-medium truncate max-w-[60%]">
                {team.name}
              </span>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-foreground cursor-pointer">{team.percentage}%</span>
                <div className="text-xs text-muted-foreground cursor-pointer">
                  ({team.count} of {team.total})
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
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
        {/* Two-column layout with equal card widths */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
          {/* Left Column - ABCD Disposition */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">ABCD Disposition</h2>
              <Badge variant="outline" className="bg-primary text-primary-foreground cursor-pointer text-xs px-2 py-1">
                Classification 2
              </Badge>
            </div>
            
            {/* Same grid layout as right column for equal card widths */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {classificationCards.map((card, index) => (
                <AbcdCard key={index} {...card} />
              ))}
            </div>
          </div>

          {/* Right Column - Streamlining Classifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">Streamlining Classifications</h2>
              <Badge variant="outline" className="bg-info text-white cursor-pointer text-xs px-2 py-1">
                Analytics 8
              </Badge>
            </div>
            
            {/* Grid layout for analytics cards in right column */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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