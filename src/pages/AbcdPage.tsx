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
    <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 group intelligence-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          {badgeText && badgeCount && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground cursor-pointer text-xs">
              {badgeText} {badgeCount}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div className={`w-1.5 h-1.5 rounded-full cursor-pointer ${isActive ? 'bg-success status-active' : 'bg-muted-foreground'}`}></div>
          <span className="text-xs font-medium text-success cursor-pointer">Active</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {teams.map((team, index) => (
            <div key={index} className="flex items-center justify-between cursor-pointer hover:bg-muted/30 rounded-lg p-1.5 -m-1.5 transition-colors">
              <span className="text-xs text-primary hover:underline cursor-pointer font-medium">
                {team.name}
              </span>
              <div className="text-right">
                <span className="text-sm font-bold text-foreground cursor-pointer">{team.percentage}%</span>
                <div className="text-xs text-muted-foreground cursor-pointer">
                  {team.count} of {team.total}
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
        { name: "HPO team", percentage: 0, count: 0, total: 1458 },
        { name: "PM&D team", percentage: 0, count: 3, total: 1453 },
        { name: "Simplify Healthcare", percentage: 1, count: 16, total: 1476 }
      ]
    },
    {
      title: "Change",
      description: "ABCDs with a New Provision Type and/or Option and/or a New Bencode",
      isActive: true,
      teams: [
        { name: "HPO team", percentage: 0, count: 0, total: 23 },
        { name: "PM&D team", percentage: 29, count: 4, total: 14 },
        { name: "Simplify Healthcare", percentage: 18, count: 12, total: 65 }
      ]
    }
  ]

  const analyticsCards = [
    {
      title: "New Provision Type",
      description: "All ABCDs with a row that changes only Provision Type",
      isActive: true,
      teams: [
        { name: "Simplify Healthcare", percentage: 0, count: 0, total: 10 }
      ]
    },
    {
      title: "New Provision Type is not in CCR",
      description: "All ABCDs with a row that changes only Provision Type but to a value not currently in CCR",
      isActive: true,
      teams: [
        { name: "HPO team", percentage: 0, count: 0, total: 11 },
        { name: "PM&D team", percentage: 0, count: 0, total: 3 },
        { name: "Simplify Healthcare", percentage: 52, count: 11, total: 21 }
      ]
    },
    {
      title: "New Provision Option",
      description: "All ABCDs with a row that changes only Provision Option",
      isActive: true,
      teams: [
        { name: "HPO team", percentage: 0, count: 0, total: 1 },
        { name: "PM&D team", percentage: 0, count: 0, total: 1 },
        { name: "Simplify Healthcare", percentage: 11, count: 1, total: 9 }
      ]
    },
    {
      title: "New Bencode",
      description: "All ABCDs with a row that recommends a New Bencode",
      isActive: true,
      teams: [
        { name: "HPO team", percentage: 0, count: 0, total: 8 },
        { name: "PM&D team", percentage: 60, count: 3, total: 5 },
        { name: "Simplify Healthcare", percentage: 0, count: 0, total: 8 }
      ]
    },
    {
      title: "New Provision Option & Option",
      description: "All ABCDs with a row that changes both Provision Type & Option",
      isActive: true,
      teams: [
        { name: "HPO team", percentage: 0, count: 0, total: 11 },
        { name: "PM&D team", percentage: 0, count: 0, total: 3 },
        { name: "Simplify Healthcare", percentage: 79, count: 11, total: 14 }
      ]
    },
    {
      title: "New Provision Type & Bencode",
      description: "All ABCDs with a row that changes both Provision Type and recommends a New Bencode",
      isActive: true,
      teams: [
        { name: "Simplify Healthcare", percentage: 0, count: 0, total: 3 }
      ]
    }
  ]

  return (
    <div className="abcd-page-compact">
      <PageLayout
        title="ABCD Disposition"
        subtitle="Healthcare Analytics Platform for provision analysis and team collaboration"
        backButtonLabel="Back to Dashboard"
        backButtonPath="/"
      >
        {/* Classification Section - Compact spacing */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">ABCD Disposition</h2>
            <Badge variant="outline" className="bg-primary text-primary-foreground cursor-pointer text-xs">
              Classification 2
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {classificationCards.map((card, index) => (
              <AbcdCard key={index} {...card} />
            ))}
          </div>
        </div>

        {/* Analytics Section - Compact spacing */}
        <div className="space-y-4 mt-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Streamlining Classifications</h2>
            <Badge variant="outline" className="bg-info text-white cursor-pointer text-xs">
              Analytics 6
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {analyticsCards.map((card, index) => (
              <AbcdCard key={index} {...card} />
            ))}
          </div>
        </div>
      </PageLayout>
    </div>
  )
}