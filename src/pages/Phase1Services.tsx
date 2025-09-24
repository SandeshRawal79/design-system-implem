import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/PageLayout'
import { DataTable } from '@/components/DataTable'

interface ServiceRecord {
  id: string
  name: string
  totalRecords: number
}

export function Phase1Services() {
  // Mock data based on the screenshot - 50 services total
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

  const columns = [
    {
      key: 'id',
      label: 'Service ID',
      minWidth: '100px',
      render: (value: string) => (
        <span className="font-mono text-xs md:text-sm text-foreground font-medium cursor-pointer">
          {value}
        </span>
      )
    },
    {
      key: 'name',
      label: 'Service Name',
      render: (value: string) => (
        <span className="text-xs md:text-sm text-foreground leading-relaxed cursor-pointer">
          {value}
        </span>
      )
    },
    {
      key: 'totalRecords',
      label: 'Total Records',
      minWidth: '120px',
      render: (value: number) => (
        <span className="text-xs md:text-sm font-medium text-foreground cursor-pointer">
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'See Dendrogram',
      sortable: false,
      searchable: false,
      minWidth: '140px',
      render: () => (
        <Button 
          size="sm" 
          className="btn-gradient-primary text-xs h-6 md:h-7 px-2 md:px-3 whitespace-nowrap cursor-pointer"
        >
          Create/View
        </Button>
      )
    }
  ]

  return (
    <PageLayout
      title="ABCD Dashboard (Phase 1 Services)"
      badge={{
        count: services.length,
        label: "services found"
      }}
    >
      <DataTable
        data={services}
        columns={columns}
        searchable
        searchPlaceholder="Search services..."
      />
    </PageLayout>
  )
}