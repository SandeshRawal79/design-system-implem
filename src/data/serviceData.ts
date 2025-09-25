// Phase 1 Services data based on the screenshot
export interface ServiceData {
  id: string;
  name: string;
  totalRecords: number;
}

export const phase1Services: ServiceData[] = [
  { id: "3501115", name: "PCP Office/Outpatient Visit and Consultation -> Professional Services", totalRecords: 50 },
  { id: "3501117", name: "Specialist Office/Outpatient Visit and Consultation -> Professional Services", totalRecords: 132 },
  { id: "3501121", name: "Physician Office/Outpatient Visit and Consultation -> Professional Services", totalRecords: 95 },
  { id: "3501123", name: "Surgery -> Professional Services", totalRecords: 83 },
  { id: "3501127", name: "Diagnostic Services -> Professional Services", totalRecords: 10 },
  { id: "3501129", name: "Allergy Testing -> Diagnostic Services -> Professional Services", totalRecords: 122 },
  { id: "3501131", name: "Maternity -> Professional Services", totalRecords: 29 },
  { id: "3501133", name: "Maternity for Dependent Daughters -> Maternity -> Professional Services", totalRecords: 7 },
  { id: "3501135", name: "Allergy Extracts -> Professional Services", totalRecords: 60 },
  { id: "3501137", name: "Spinal Manipulations -> Professional Services", totalRecords: 150 },
  { id: "3501139", name: "Professional Therapy and Rehabilitation Services -> Professional Services", totalRecords: 2 },
  { id: "3501141", name: "Occupational Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services", totalRecords: 187 },
  { id: "3501143", name: "Speech Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services", totalRecords: 131 },
  { id: "3501145", name: "Physical Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services", totalRecords: 203 },
  { id: "3501147", name: "Respiratory Therapy -> Professional Therapy and Rehabilitation Services -> Professional Services", totalRecords: 45 },
  { id: "3501149", name: "Cardiac Rehabilitation -> Professional Therapy and Rehabilitation Services -> Professional Services", totalRecords: 78 },
  { id: "3501151", name: "Pulmonary Rehabilitation -> Professional Therapy and Rehabilitation Services -> Professional Services", totalRecords: 34 },
  { id: "3501153", name: "Mental Health and Substance Abuse -> Professional Services", totalRecords: 156 },
  { id: "3501155", name: "Outpatient Mental Health -> Mental Health and Substance Abuse -> Professional Services", totalRecords: 289 },
  { id: "3501157", name: "Outpatient Substance Abuse -> Mental Health and Substance Abuse -> Professional Services", totalRecords: 67 },
  { id: "3501159", name: "Preventive Care -> Professional Services", totalRecords: 412 },
  { id: "3501161", name: "Adult Preventive Care -> Preventive Care -> Professional Services", totalRecords: 328 },
  { id: "3501163", name: "Pediatric Preventive Care -> Preventive Care -> Professional Services", totalRecords: 245 },
  { id: "3501165", name: "Prenatal Care -> Preventive Care -> Professional Services", totalRecords: 89 },
  { id: "3501167", name: "Well-Child Care -> Preventive Care -> Professional Services", totalRecords: 301 },
  { id: "3501169", name: "Immunizations -> Preventive Care -> Professional Services", totalRecords: 456 },
  { id: "3501171", name: "Vision Care -> Professional Services", totalRecords: 123 },
  { id: "3501173", name: "Eye Exams -> Vision Care -> Professional Services", totalRecords: 98 },
  { id: "3501175", name: "Contact Lenses -> Vision Care -> Professional Services", totalRecords: 54 },
  { id: "3501177", name: "Prescription Eyewear -> Vision Care -> Professional Services", totalRecords: 76 },
  { id: "3501179", name: "Dental Care -> Professional Services", totalRecords: 234 },
  { id: "3501181", name: "Basic Dental Care -> Dental Care -> Professional Services", totalRecords: 187 },
  { id: "3501183", name: "Major Dental Care -> Dental Care -> Professional Services", totalRecords: 89 },
  { id: "3501185", name: "Orthodontic Care -> Dental Care -> Professional Services", totalRecords: 45 },
  { id: "3501187", name: "Emergency Services -> Professional Services", totalRecords: 178 },
  { id: "3501189", name: "Emergency Room -> Emergency Services -> Professional Services", totalRecords: 134 },
  { id: "3501191", name: "Urgent Care -> Emergency Services -> Professional Services", totalRecords: 267 },
  { id: "3501193", name: "Ambulance Services -> Emergency Services -> Professional Services", totalRecords: 67 },
  { id: "3501195", name: "Laboratory Services -> Diagnostic Services -> Professional Services", totalRecords: 398 },
  { id: "3501197", name: "Radiology Services -> Diagnostic Services -> Professional Services", totalRecords: 234 },
  { id: "3501199", name: "X-Ray -> Radiology Services -> Diagnostic Services -> Professional Services", totalRecords: 156 },
  { id: "3501201", name: "MRI -> Radiology Services -> Diagnostic Services -> Professional Services", totalRecords: 89 },
  { id: "3501203", name: "CT Scan -> Radiology Services -> Diagnostic Services -> Professional Services", totalRecords: 123 },
  { id: "3501205", name: "Ultrasound -> Radiology Services -> Diagnostic Services -> Professional Services", totalRecords: 178 },
  { id: "3501207", name: "Nuclear Medicine -> Radiology Services -> Diagnostic Services -> Professional Services", totalRecords: 34 },
  { id: "3501209", name: "Cardiac Testing -> Diagnostic Services -> Professional Services", totalRecords: 145 },
  { id: "3501211", name: "EKG -> Cardiac Testing -> Diagnostic Services -> Professional Services", totalRecords: 267 },
  { id: "3501213", name: "Echocardiogram -> Cardiac Testing -> Diagnostic Services -> Professional Services", totalRecords: 98 },
  { id: "3501215", name: "Stress Test -> Cardiac Testing -> Diagnostic Services -> Professional Services", totalRecords: 76 },
  { id: "3501217", name: "Holter Monitor -> Cardiac Testing -> Diagnostic Services -> Professional Services", totalRecords: 45 },
  { id: "3501219", name: "Sleep Studies -> Diagnostic Services -> Professional Services", totalRecords: 67 }
];

// Calculate total records
export const getTotalRecords = () => {
  return phase1Services.reduce((total, service) => total + service.totalRecords, 0);
};

// Search and filter functions
export const searchServices = (query: string) => {
  if (!query.trim()) return phase1Services;
  
  const lowerQuery = query.toLowerCase();
  return phase1Services.filter(service => 
    service.id.includes(lowerQuery) || 
    service.name.toLowerCase().includes(lowerQuery)
  );
};

// Sort services
export type SortField = 'id' | 'name' | 'totalRecords';
export type SortDirection = 'asc' | 'desc';

export const sortServices = (services: ServiceData[], field: SortField, direction: SortDirection) => {
  return [...services].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }
    
    if (direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};