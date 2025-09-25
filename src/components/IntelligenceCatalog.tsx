import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

interface IntelligenceServiceProps {
  title: string
  type: 'Analytics' | 'Management'
  description: string
  status: 'Active' | 'Inactive'
  onCardClick?: () => void
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
  onCardClick,
  teamStats 
}: IntelligenceServiceProps) {
  const typeColor = type === 'Analytics' ? '#474A9E' : '#F48436'
  
  return (
    <Card 
      className="p-6 h-full flex flex-col justify-between intelligence-card border-2 hover:border-primary/20 cursor-pointer"
      onClick={onCardClick}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{title}</h3>
        </div>
        
        <Badge 
          className="mb-4 text-white font-medium group-hover:scale-105 transition-transform duration-200"
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
              <div 
                key={index} 
                className="flex justify-between items-center p-2 -mx-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 hover:shadow-sm hover:scale-[1.02] group"
                onClick={(e) => {
                  e.stopPropagation()
                  // Add navigation logic here if needed for team stats
                }}
              >
                <span 
                  className="text-sm font-medium transition-all duration-300 group-hover:font-semibold team-stats-text relative underline-offset-2 hover:underline"
                  style={{ color: '#474A9E' }}
                >
                  {stat.team}
                </span>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-sm font-bold transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      background: 'linear-gradient(135deg, #474A9E 0%, #1F8A7A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {stat.percentage}
                  </span>
                  <span 
                    className="text-xs font-medium transition-all duration-300 group-hover:font-semibold"
                    style={{ color: '#1F8A7A' }}
                  >
                    ({stat.detail})
                  </span>
                </div>
              </div>
            ))}
          </div>
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
      onCardClick: () => navigate('/phase1-services')
    },
    {
      title: "Service Group Intelligence", 
      type: "Management" as const,
      description: "Organize and group related services together for streamlined processing, workflow management, and bulk operations",
      status: "Active" as const,
      onCardClick: () => navigate('/service-groups')
    },
    {
      title: "Set Intelligence",
      type: "Management" as const,
      description: "Comprehensive ABCD set management and workflow orchestration for provision approval",
      status: "Active" as const,
      onCardClick: () => navigate('/abcd-sets'),
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
      onCardClick: () => navigate('/abcd'),
      teamStats: [
        { team: "HPO team", percentage: "0%", detail: "0 of 438" },
        { team: "PM&D team", percentage: "2%", detail: "7 of 398" },
        { team: "Simplify Healthcare", percentage: "3%", detail: "80 of 2693" }
      ]
    }
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Intelligence Catalog</h2>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-medium px-2.5 py-1">
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