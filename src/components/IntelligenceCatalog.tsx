import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

interface IntelligenceServiceProps {
  title: string
  type: 'Analytics' | 'Management'
  description: string
  status: 'Active' | 'Inactive'
  primaryAction: string
  secondaryAction?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  teamStats?: Array<{
    team: string
    percentage: string
    detail: string
  }>
}

function IntelligenceCard({ 
  title, 
  type, 
  description, 
  status, 
  primaryAction, 
  secondaryAction,
  onPrimaryClick,
  onSecondaryClick,
  teamStats 
}: IntelligenceServiceProps) {
  const typeColor = type === 'Analytics' ? '#474A9E' : '#F48436'
  
  return (
    <Card className="p-6 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        
        <Badge 
          className="mb-4 text-white font-medium"
          style={{ backgroundColor: typeColor }}
        >
          {type}
        </Badge>
        
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        
        {status === 'Active' && (
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full status-active" style={{ backgroundColor: '#43812C' }}></div>
            <span className="text-xs font-medium" style={{ color: '#43812C' }}>
              Active
            </span>
          </div>
        )}

        {teamStats && (
          <div className="space-y-2 mb-4">
            {teamStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{stat.team}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{stat.percentage}</span>
                  <span className="text-xs text-muted-foreground">({stat.detail})</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <Button 
          className="btn-gradient-primary w-full justify-center gap-2 cursor-pointer"
          onClick={onPrimaryClick}
        >
          <FontAwesomeIcon icon={faPlay} className="w-3 h-3" />
          {primaryAction}
        </Button>
        {secondaryAction && (
          <Button 
            variant="outline" 
            className="btn-gradient-secondary w-full cursor-pointer"
            onClick={onSecondaryClick}
          >
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3 mr-2" />
            {secondaryAction}
          </Button>
        )}
      </div>
    </Card>
  )
}

export function IntelligenceCatalog() {
  const navigate = useNavigate()
  
  const services = [
    {
      title: "Service Intelligence",
      type: "Analytics" as const,
      description: "Smart service analytics and performance monitoring with detailed insights and reporting",
      status: "Active" as const,
      primaryAction: "Launch Phase I services",
      secondaryAction: "Launch all services",
      onPrimaryClick: () => navigate('/phase1-services'),
      onSecondaryClick: () => console.log('Launch all services clicked')
    },
    {
      title: "Service Group Intelligence", 
      type: "Management" as const,
      description: "Organize and group related services together for streamlined processing, workflow management, and bulk operations",
      status: "Active" as const,
      primaryAction: "Launch"
    },
    {
      title: "Set Intelligence",
      type: "Management" as const,
      description: "Comprehensive ABCD set management and workflow orchestration for provision approval",
      status: "Active" as const,
      primaryAction: "Launch",
      teamStats: [
        { team: "HPO team", percentage: "2%", detail: "1 of 45" },
        { team: "PM&D team", percentage: "2%", detail: "1 of 42" },
        { team: "Simplify Healthcare", percentage: "12%", detail: "8 of 66" }
      ]
    },
    {
      title: "ABCD Intelligence",
      type: "Analytics" as const,
      description: "Phase 1 ABCD record analytics and provision tracking with detailed insights and performance metrics",
      status: "Active" as const,
      primaryAction: "Launch",
      teamStats: [
        { team: "HPO team", percentage: "0%", detail: "0 of 438" },
        { team: "PM&D team", percentage: "2%", detail: "7 of 398" },
        { team: "Simplify Healthcare", percentage: "3%", detail: "80 of 2693" }
      ]
    }
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Intelligence Catalog</h2>
        <Badge variant="secondary" className="text-muted-foreground">
          4
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <IntelligenceCard key={index} {...service} />
        ))}
      </div>
    </div>
  )
}