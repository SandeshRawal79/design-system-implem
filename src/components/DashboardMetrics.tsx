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
  additionalInfo, 
  icon, 
  iconColor, 
  isActive = false,
  onClick,
  isClickable = false
}: MetricCardProps) {
  return (
    <Card 
      className={`p-6 h-[166px] flex flex-col justify-between hover:shadow-md transition-all cursor-pointer ${
        isClickable ? 'hover:scale-[1.02] interactive-element' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-4xl font-bold text-foreground mb-2">{value}</h3>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
        </div>
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
          style={{ backgroundColor: iconColor }}
        >
          <FontAwesomeIcon icon={icon} className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm" style={{ color: '#1F8A7A' }}>
            {additionalInfo.split(' ')[0]} {additionalInfo.split(' ')[1]}
          </span>
          <span className="text-muted-foreground text-sm">
            {additionalInfo.split(' ').slice(2).join(' ')}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function DashboardMetrics() {
  const navigate = useNavigate()
  
  const metrics = [
    {
      title: "Phase 1 Cycle 2 Services",
      value: "80",
      additionalInfo: "1298 Total Services",
      icon: faUsers,
      iconColor: "#1F8A7A",
      onClick: () => navigate('/phase1-services'),
      isClickable: true
    },
    {
      title: "Total Service Groups",
      value: "7",
      additionalInfo: "1298 Total Services",
      icon: faTag,
      iconColor: "#0174B2",
      onClick: () => navigate('/service-groups'),
      isClickable: true
    },
    {
      title: "ABCD Sets",
      value: "66",
      additionalInfo: "",
      icon: faDatabase,
      iconColor: "#F48436",
      isActive: true,
      onClick: () => navigate('/abcd-sets'),
      isClickable: true
    },
    {
      title: "Phase 1 Cycle 2 ABCDs",
      value: "3940",
      additionalInfo: "18105 Total ABCDs",
      icon: faFile,
      iconColor: "#1F8A7A",
      onClick: () => navigate('/abcd'),
      isClickable: true
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}