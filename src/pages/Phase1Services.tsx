import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ServiceRecord {
  id: string
  name: string
  totalRecords: number
}

type SortField = 'id' | 'name' | 'totalRecords'
type SortDirection = 'asc' | 'desc'

export function Phase1Services() {
  const navigate = useNavigate()
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Mock data based on the screenshot - 51 services total
  const services: ServiceRecord[] = [
    { id: '3501115', name: 'PCP Office/Outpatient Visit and Consultation -> Professional Services', totalRecords: 50 },
    { id: '3501117', name: 'Specialist Office/Outpatient Visit and Consultation -> Professional Services', totalRecords: 132 },
    { id: '3501121', name: 'Physician Office/Outpatient Visit and Consultation -> Professional Services', totalRecords: 95 },
    { id: '3501123', name: 'Surgery -> Professional Services', totalRecords: 83 },
    { id: '3501127', name: 'Diagnostic Services -> Professional Services', totalRecords: 10 },
    { id: '3501129', name: 'Allergy Testing -> Diagnostic Services -> Professional Services', totalRecords: 122 },
    { id: '3501131', name: 'Maternity -> Professional Services', totalRecords: 29 },
    { id: '3501133', name: 'Maternity for Dependent Daughters -> Maternity -> Professional Services', totalRecords: 7 },
    { id: '3501135', name: 'Allergy Extracts -> Professional Services', totalRecords: 60 },
    { id: '3501137', name: 'Spinal Manipulations -> Professional Services', totalRecords: 150 },
    { id: '3501139', name: 'Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 2 },
    { id: '3501141', name: 'Occupational Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 187 },
    { id: '3501143', name: 'Speech Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 131 },
    { id: '3501145', name: 'Physical Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 45 },
    { id: '3501147', name: 'Respiratory Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 23 },
    { id: '3501149', name: 'Cardiac Rehabilitation -> Professional Therapy and Rehabilitation Services -> Professional Services', totalRecords: 18 },
    { id: '3501151', name: 'Mental Health Services -> Professional Services', totalRecords: 78 },
    { id: '3501153', name: 'Substance Abuse Treatment -> Mental Health Services -> Professional Services', totalRecords: 34 },
    { id: '3501155', name: 'Psychological Testing -> Mental Health Services -> Professional Services', totalRecords: 67 },
    { id: '3501157', name: 'Psychiatric Services -> Mental Health Services -> Professional Services', totalRecords: 89 },
    { id: '3501159', name: 'Emergency Services -> Professional Services', totalRecords: 156 },
    { id: '3501161', name: 'Urgent Care Services -> Emergency Services -> Professional Services', totalRecords: 234 },
    { id: '3501163', name: 'Ambulance Services -> Emergency Services -> Professional Services', totalRecords: 45 },
    { id: '3501165', name: 'Laboratory Services -> Diagnostic Services -> Professional Services', totalRecords: 298 },
    { id: '3501167', name: 'Pathology Services -> Laboratory Services -> Diagnostic Services -> Professional Services', totalRecords: 87 },
    { id: '3501169', name: 'Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 423 },
    { id: '3501171', name: 'Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 312 },
    { id: '3501173', name: 'Nuclear Medicine -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 56 },
    { id: '3501175', name: 'Ultrasound Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 189 },
    { id: '3501177', name: 'CT Scan Services -> Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 145 },
    { id: '3501179', name: 'MRI Services -> Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 98 },
    { id: '3501181', name: 'X-Ray Services -> Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 267 },
    { id: '3501183', name: 'Mammography Services -> Imaging Services -> Radiology Services -> Diagnostic Services -> Professional Services', totalRecords: 76 },
    { id: '3501185', name: 'Cardiology Services -> Professional Services', totalRecords: 123 },
    { id: '3501187', name: 'Electrocardiogram -> Cardiology Services -> Professional Services', totalRecords: 89 },
    { id: '3501189', name: 'Echocardiogram -> Cardiology Services -> Professional Services', totalRecords: 67 },
    { id: '3501191', name: 'Stress Testing -> Cardiology Services -> Professional Services', totalRecords: 45 },
    { id: '3501193', name: 'Holter Monitoring -> Cardiology Services -> Professional Services', totalRecords: 34 },
    { id: '3501195', name: 'Pulmonology Services -> Professional Services', totalRecords: 78 },
    { id: '3501197', name: 'Pulmonary Function Testing -> Pulmonology Services -> Professional Services', totalRecords: 56 },
    { id: '3501199', name: 'Sleep Studies -> Pulmonology Services -> Professional Services', totalRecords: 43 },
    { id: '3501201', name: 'Gastroenterology Services -> Professional Services', totalRecords: 101 },
    { id: '3501203', name: 'Endoscopy Services -> Gastroenterology Services -> Professional Services', totalRecords: 87 },
    { id: '3501205', name: 'Colonoscopy Services -> Gastroenterology Services -> Professional Services', totalRecords: 134 },
    { id: '3501207', name: 'Dermatology Services -> Professional Services', totalRecords: 89 },
    { id: '3501209', name: 'Skin Biopsy -> Dermatology Services -> Professional Services', totalRecords: 45 },
    { id: '3501211', name: 'Ophthalmology Services -> Professional Services', totalRecords: 78 },
    { id: '3501213', name: 'Eye Examination -> Ophthalmology Services -> Professional Services', totalRecords: 156 },
    { id: '3501215', name: 'Orthopedic Services -> Professional Services', totalRecords: 234 },
    { id: '3501217', name: 'Joint Replacement -> Orthopedic Services -> Professional Services', totalRecords: 67 },
    { id: '3501219', name: 'Sports Medicine -> Orthopedic Services -> Professional Services', totalRecords: 89 }
  ]

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedServices = [...services].sort((a, b) => {
    let aValue: string | number = a[sortField]
    let bValue: string | number = b[sortField]
    
    if (sortDirection === 'desc') {
      [aValue, bValue] = [bValue, aValue]
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue)
    }
    
    return Number(aValue) - Number(bValue)
  })

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return faSort
    }
    return sortDirection === 'asc' ? faSortUp : faSortDown
  }

  const totalServicesFound = services.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-h3-responsive md:text-[2rem] font-bold text-foreground">
          ABCD Dashboard (Phase 1 Services)
        </h1>
        
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="text-success border-success bg-success/10 font-medium">
            {totalServicesFound}
          </Badge>
          <span className="text-muted-foreground">services found</span>
        </div>
      </div>

      {/* Services Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-muted/30">
              <tr className="border-b border-border">
                <th className="text-left p-3 md:p-4 min-w-[100px]">
                  <button 
                    onClick={() => handleSort('id')}
                    className="flex items-center gap-2 font-semibold text-sm md:text-base text-foreground hover:text-primary transition-colors"
                  >
                    Service ID
                    <FontAwesomeIcon 
                      icon={getSortIcon('id')} 
                      className="w-3 h-3 text-muted-foreground"
                    />
                  </button>
                </th>
                <th className="text-left p-3 md:p-4">
                  <button 
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 font-semibold text-sm md:text-base text-foreground hover:text-primary transition-colors"
                  >
                    Service Name
                    <FontAwesomeIcon 
                      icon={getSortIcon('name')} 
                      className="w-3 h-3 text-muted-foreground"
                    />
                  </button>
                </th>
                <th className="text-left p-3 md:p-4 min-w-[120px]">
                  <button 
                    onClick={() => handleSort('totalRecords')}
                    className="flex items-center gap-2 font-semibold text-sm md:text-base text-foreground hover:text-primary transition-colors"
                  >
                    Total Records
                    <FontAwesomeIcon 
                      icon={getSortIcon('totalRecords')} 
                      className="w-3 h-3 text-muted-foreground"
                    />
                  </button>
                </th>
                <th className="text-left p-3 md:p-4 min-w-[140px]">
                  <span className="font-semibold text-sm md:text-base text-foreground">See Dendrogram</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedServices.map((service, index) => (
                <tr 
                  key={service.id} 
                  className={`border-b border-border hover:bg-muted/20 transition-colors ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                  }`}
                >
                  <td className="p-3 md:p-4">
                    <span className="font-mono text-xs md:text-sm text-foreground font-medium">
                      {service.id}
                    </span>
                  </td>
                  <td className="p-3 md:p-4">
                    <span className="text-xs md:text-sm text-foreground leading-relaxed">
                      {service.name}
                    </span>
                  </td>
                  <td className="p-3 md:p-4">
                    <span className="text-xs md:text-sm font-medium text-foreground">
                      {service.totalRecords}
                    </span>
                  </td>
                  <td className="p-3 md:p-4">
                    <Button 
                      size="sm" 
                      className="btn-gradient-primary text-xs h-6 md:h-7 px-2 md:px-3 whitespace-nowrap"
                    >
                      Create/View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Back Button */}
      <div className="flex justify-center pt-4">
        <Button 
          variant="outline" 
          className="btn-gradient-secondary"
          onClick={() => navigate('/')}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}