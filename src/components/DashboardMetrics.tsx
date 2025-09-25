import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUsers, 
  faTag, 
  faDatabase, 
  faFile 
} from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  additionalInfo: string
  icon: typeof faUsers
  iconColor: string
  isActive?: boolean
  onClick?: () => void
  isClickable?: boolean
}

function MetricCard({ 
  title, 
  value, 
  subtitle, 
  additionalInfo, 
  icon, 
  iconColor, 
  isActive = false,
  onClick,
  isClickable = false
}: MetricCardProps) {
  return (
    <Card 
      className={`p-3 h-full flex flex-col justify-between hover:shadow-md transition-all cursor-pointer ${
        isClickable ? 'hover:scale-[1.02] interactive-element' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-2xl xl:text-3xl font-bold text-foreground mb-1">{value}</h3>
          <p className="text-muted-foreground text-xs">{title}</p>
        </div>
        <div 
          className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg flex items-center justify-center shadow-sm"
          style={{ backgroundColor: iconColor }}
        >
          <FontAwesomeIcon icon={icon} className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-xs" style={{ color: '#1F8A7A' }}>
            {additionalInfo.split(' ')[0]} {additionalInfo.split(' ')[1]}
          </span>
          <span className="text-muted-foreground text-xs">
            {additionalInfo.split(' ').slice(2).join(' ')}
          </span>
        </div>
        {isActive && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full status-active" style={{ backgroundColor: '#43812C' }}></div>
            <span className="text-xs font-medium" style={{ color: '#43812C' }}>
              {subtitle}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

export function DashboardMetrics() {
  const navigate = useNavigate()
  
  const metrics = [
    {
      title: "Phase 1 Services",
      value: "51",
      subtitle: "Currently active",
      additionalInfo: "1298 Total Services",
      icon: faUsers,
      iconColor: "#1F8A7A",
      onClick: () => navigate('/phase1-services'),
      isClickable: true
    },
    {
      title: "Total Service Groups",
      value: "5",
      subtitle: "Currently active",
      additionalInfo: "1298 Total Services",
      icon: faTag,
      iconColor: "#0174B2",
      onClick: () => navigate('/service-groups'),
      isClickable: true
    },
    {
      title: "ABCD Sets",
      value: "66",
      subtitle: "Currently active",
      additionalInfo: "Managed Currently active",
      icon: faDatabase,
      iconColor: "#F48436",
      isActive: true,
      onClick: () => navigate('/abcd-sets'),
      isClickable: true
    },
    {
      title: "Phase 1 ABCDs",
      value: "2693",
      subtitle: "Currently active",
      additionalInfo: "18105 Total ABCDs",
      icon: faFile,
      iconColor: "#1F8A7A",
      onClick: () => navigate('/abcd'),
      isClickable: true
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}