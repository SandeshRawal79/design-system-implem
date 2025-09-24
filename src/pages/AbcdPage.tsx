import { Play } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
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
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          {badgeText && badgeCount && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground cursor-pointer">
              {badgeText} {badgeCount}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <div className={`w-2 h-2 rounded-full cursor-pointer ${isActive ? 'bg-success status-active' : 'bg-muted-foreground'}`}></div>
          <span className="text-xs font-medium text-success cursor-pointer">Active</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {teams.map((team, index) => (
            <div key={index} className="flex items-center justify-between cursor-pointer hover:bg-muted/30 rounded-lg p-2 -m-2 transition-colors">
              <span className="text-sm text-primary hover:underline cursor-pointer font-medium">
                {team.name}
              </span>
              <div className="text-right">
                <span className="text-lg font-bold text-foreground cursor-pointer">{team.percentage}%</span>
                <div className="text-xs text-muted-foreground cursor-pointer">
                  {team.count} of {team.total}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button 
          size="sm" 
          className="w-full mt-6 btn-gradient-secondary text-primary hover:text-white cursor-pointer"
        >
          <Play className="w-4 h-4 mr-2" />
          Launch
        </Button>
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
    <PageLayout
      title="ABCD Disposition"
      subtitle="Healthcare Analytics Platform for provision analysis and team collaboration"
      showBackButton={true}
      backButtonLabel="Back to Dashboard"
      backButtonPath="/"
    >
      {/* Classification Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-foreground">ABCD Disposition</h2>
          <Badge variant="outline" className="bg-primary text-primary-foreground cursor-pointer">
            Classification 2
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {classificationCards.map((card, index) => (
            <AbcdCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Analytics Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-foreground">Streamlining Classifications</h2>
          <Badge variant="outline" className="bg-info text-white cursor-pointer">
            Analytics 6
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {analyticsCards.map((card, index) => (
            <AbcdCard key={index} {...card} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}