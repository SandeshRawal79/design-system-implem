import React, { useState, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { MagnifyingGlass, X, CaretUp, CaretDown, SortAscending, SortDescending } from '@phosphor-icons/react'

// Types for filtering and sorting
type SortField = 'abcd_1up' | 'service_id' | 'service_name' | 'provision_type' | 'options' | 'num_provisions' | 'num_products' | 'num_splits' | 'num_clients' | 'num_groups' | 'similarity_score'
type SortDirection = 'asc' | 'desc'
type FilterType = 'all' | 'with-approvals' | 'pending-approvals' | 'no-approvals'
type StatusFilter = 'all' | 'approved' | 'rejected' | 'pending'

// Generate random approval statuses for demonstration
const generateApprovalStatuses = () => {
  const statuses = ['✓', '✗', '-'];
  return Array.from({ length: 5 }, () => statuses[Math.floor(Math.random() * statuses.length)]);
};

// Mock data using the provided cluster details data - Extended dataset for scrolling demonstration
const mockClusterData = [
  {
    abcd_1up: 2001,
    service_id: 15001,
    service_name: "Inpatient Occupational Therapy -> Short-Term Inpatient Rehabilitation Therapy -> Inpatient Facility Services Inpatient Occupational Therapy -> Short-Term Inpatient Rehabilitation Therapy -> Inpatient Facility Services",
    provision_type_1up: null,
    provision_type: "Anti Cancer Deductible",
    options: "Does Not Apply",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 8412,
    num_products: 4207,
    num_clients: 953,
    num_groups: 3310,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2019,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Anti Cancer Deductible",
    options: "No",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 4,
    num_products: 2,
    num_clients: 1,
    num_groups: 1,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2028,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Initial Cov Period Spec Tier Copay NonPref",
    options: "Yes Brand Drug 50 Dollars Generic Drug 50 Dollars Brand Drug if Generic Drug Available 50 Dollars",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 16,
    num_products: 2,
    num_clients: 2,
    num_groups: 11,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2036,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Coins - Member Form",
    options: "Yes Brand Drug 40 Percent of Allowed Charge Generic Drug 40 Percent of Allowed Charge Brand Drug if Generic Drug Available 40 Percent of Allowed Charge",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 88,
    num_products: 11,
    num_clients: 8,
    num_groups: 20,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2043,
    service_id: 15001,
    service_name: "Yes Brand Drug 60 Percent of Allowed Charge Generic Drug 60 Percent of Allowed Charge Brand Drug if Generic Drug Available 60 Percent of Allowed Charge",
    provision_type_1up: null,
    provision_type: "Specialty Tier Coins - Member Form",
    options: "Yes Brand Drug 60 Percent of Allowed Charge Generic Drug 60 Percent of Allowed Charge Brand Drug if Generic Drug Available 60 Percent of Allowed Charge",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 56,
    num_products: 7,
    num_clients: 4,
    num_groups: 8,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2046,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Copay Form",
    options: "No",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 30,
    num_products: 15,
    num_clients: 11,
    num_groups: 31,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2048,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Copay NonForm",
    options: "No",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 17,
    num_products: 9,
    num_clients: 7,
    num_groups: 23,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2058,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Copay NonForm",
    options: "Yes Brand Drug 250 Dollars Generic Drug 250 Dollars Brand Drug if Generic Drug Available 250 Dollars",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 220,
    num_products: 31,
    num_clients: 15,
    num_groups: 54,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2060,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Max Copay Form",
    options: "Yes Brand Drug 250 Dollars, per Days Range One Generic Drug 250 Dollars, per Days Range One Brand Drug if Generic Drug Available 250 Dollars, per Days Range One Brand Drug 500 Dollars, per Days Range Two Generic Drug 500 Dollars, per Days Range Two Brand Drug if Generic Drug Available 500 Dollars, per Days Range Two",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 14,
    num_products: 1,
    num_clients: 1,
    num_groups: 2,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  {
    abcd_1up: 2071,
    service_id: 15001,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Specialty Tier Max Copay Form",
    options: "Yes Brand Drug 700 Dollars Generic Drug 700 Dollars Brand Drug if Generic Drug Available 700 Dollars",
    num_splits: 0,
    is_single_split_with_no_change: null,
    num_provisions: 36,
    num_products: 9,
    num_clients: 1,
    num_groups: 2,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  },
  // Add more sample records to demonstrate scrolling
  ...Array.from({ length: 15 }, (_, i) => ({
    abcd_1up: 3000 + i,
    service_id: 15002,
    service_name: "Medical Services Extended",
    provision_type_1up: null,
    provision_type: i % 2 === 0 ? "Premium Drug Coverage" : "Standard Drug Coverage",
    options: i % 3 === 0 ? "Yes" : i % 3 === 1 ? "No" : "Does Not Apply",
    num_splits: Math.floor(Math.random() * 5),
    is_single_split_with_no_change: null,
    num_provisions: Math.floor(Math.random() * 1000) + 10,
    num_products: Math.floor(Math.random() * 100) + 1,
    num_clients: Math.floor(Math.random() * 50) + 1,
    num_groups: Math.floor(Math.random() * 100) + 1,
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses()
  }))
]
// Generate similar records for a given ABCD ID
const generateSimilarRecords = (abcdId: number) => {
  const baseRecord = mockClusterData.find(r => r.abcd_1up === abcdId)
  if (!baseRecord) return []

  return Array.from({ length: 5 + Math.floor(Math.random() * 8) }, (_, i) => ({
    abcd_1up: abcdId + 10000 + i,
    service_id: baseRecord.service_id + Math.floor(Math.random() * 5),
    service_name: baseRecord.service_name,
    provision_type_1up: null,
    provision_type: baseRecord.provision_type,
    options: i % 3 === 0 ? baseRecord.options :
      i % 3 === 1 ? "Similar Option Variant" : "Alternative Configuration",
    num_splits: Math.floor(Math.random() * 3),
    is_single_split_with_no_change: null,
    num_provisions: Math.floor(baseRecord.num_provisions * (0.5 + Math.random())),
    num_products: Math.floor(baseRecord.num_products * (0.7 + Math.random() * 0.6)),
    num_clients: Math.floor((baseRecord.num_clients || 1) * (0.8 + Math.random() * 0.4)),
    num_groups: Math.floor((baseRecord.num_groups || 1) * (0.6 + Math.random() * 0.8)),
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses(),
    similarity_score: (85 + Math.random() * 15).toFixed(1)
  }))
}

// Generate exact same CD records based on selected ABCD
const generateExactSameCDRecords = (abcdId: number) => {
  const baseRecord = mockClusterData.find(r => r.abcd_1up === abcdId)
  if (!baseRecord) return []

  // Generate records with exactly same CD (provision_type and options) but different ABCD IDs
  return Array.from({ length: 3 + Math.floor(Math.random() * 5) }, (_, i) => ({
    abcd_1up: abcdId + 20000 + i,
    service_id: baseRecord.service_id,
    service_name: baseRecord.service_name,
    provision_type_1up: null,
    provision_type: baseRecord.provision_type, // Exact same provision type
    options: baseRecord.options, // Exact same options
    num_splits: baseRecord.num_splits,
    is_single_split_with_no_change: null,
    num_provisions: Math.floor(baseRecord.num_provisions * (0.8 + Math.random() * 0.4)),
    num_products: Math.floor(baseRecord.num_products * (0.9 + Math.random() * 0.2)),
    num_clients: Math.floor((baseRecord.num_clients || 1) * (0.9 + Math.random() * 0.2)),
    num_groups: Math.floor((baseRecord.num_groups || 1) * (0.85 + Math.random() * 0.3)),
    splits: [],
    phase_included_in_bm: 0,
    approver_groups_needed_bm: 1,
    approvals_given_bm: 0,
    approvals_done_by_abcd_set_1up: null,
    member_of_sets: null,
    approvalStatuses: generateApprovalStatuses(),
    exact_match: true
  }))
}

// Component to render approval status indicators in compact format to save column space
function ApprovalStatusIndicators({ statuses }: { statuses: string[] }) {
  return (
    <div className="flex items-center justify-center gap-0.5 font-mono text-sm" role="group" aria-label="Approval status indicators">
      {statuses.map((status, index) => {
        let displaySymbol;
        let colorClass;
        let ariaLabel;

        if (status === '✓') {
          displaySymbol = '✓';
          colorClass = "text-success font-bold";
          ariaLabel = `Approved step ${index + 1}`;
        } else if (status === '✗') {
          displaySymbol = 'X';
          colorClass = "text-destructive font-bold";
          ariaLabel = `Rejected step ${index + 1}`;
        } else {
          displaySymbol = '-';
          colorClass = "text-muted-foreground font-bold";
          ariaLabel = `Pending step ${index + 1}`;
        }

        return (
          <span
            key={index}
            className={`inline-flex items-center justify-center w-4 text-center cursor-default transition-colors duration-200 ${colorClass}`}
            role="status"
            aria-label={ariaLabel}
            title={ariaLabel}
          >
            {displaySymbol}
          </span>
        );
      })}
    </div>
  );
}

export function ClusterDetails() {
  const { serviceId, clusterId } = useParams()

  const clusterInfo = {
    xrayProjection: 'Only Options (D)',
    dataContext: 'id=0 names=Product Wide Provision Product Wide Provision',
    created: '2023-03-16 10:56:57',
    recordsInCluster: 225,
    clusterId: clusterId || '1',
    totalClusters: 1,
    distanceThreshold: 10,
    dendrogramId: "15001",
    dendrogramType: "d",
    dendrogramTypeName: "Only Options (D)"
  }

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('abcd_1up')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [provisionTypeFilter, setProvisionTypeFilter] = useState('all')
  const [distanceThreshold, setDistanceThreshold] = useState(clusterInfo.distanceThreshold.toString())

  // State for similar records
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null)
  const [similarRecords, setSimilarRecords] = useState<any[]>([])
  const [showSimilarRecords, setShowSimilarRecords] = useState(false)

  // State for exact same CD records
  const [exactSameCDRecords, setExactSameCDRecords] = useState<any[]>([])
  const [showExactSameCDRecords, setShowExactSameCDRecords] = useState(false)

  // State for collapsible tables
  const [isMainTableCollapsed, setIsMainTableCollapsed] = useState(false)
  const [isSimilarRecordsCollapsed, setIsSimilarRecordsCollapsed] = useState(false)
  const [isExactSameCDCollapsed, setIsExactSameCDCollapsed] = useState(false)

  // Filter state for Similar Records table
  const [similarSearchTerm, setSimilarSearchTerm] = useState('')
  const [similarSortField, setSimilarSortField] = useState<SortField>('abcd_1up')
  const [similarSortDirection, setSimilarSortDirection] = useState<SortDirection>('asc')
  const [similarFilterType, setSimilarFilterType] = useState<FilterType>('all')
  const [similarStatusFilter, setSimilarStatusFilter] = useState<StatusFilter>('all')
  const [similarProvisionTypeFilter, setSimilarProvisionTypeFilter] = useState('all')
  const [similarRecordsViewMode, setSimilarRecordsViewMode] = useState('Only Options (D)')

  // Filter state for Exact Same CD Records table
  const [exactSearchTerm, setExactSearchTerm] = useState('')
  const [exactSortField, setExactSortField] = useState<SortField>('abcd_1up')
  const [exactSortDirection, setExactSortDirection] = useState<SortDirection>('asc')
  const [exactFilterType, setExactFilterType] = useState<FilterType>('all')
  const [exactStatusFilter, setExactStatusFilter] = useState<StatusFilter>('all')
  const [exactProvisionTypeFilter, setExactProvisionTypeFilter] = useState('all')

  // Refs for scrolling to tables
  const similarRecordsRef = useRef<HTMLDivElement>(null)
  const exactSameCDRecordsRef = useRef<HTMLDivElement>(null)

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...mockClusterData]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.abcd_1up.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply provision type filter
    if (provisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.provision_type === provisionTypeFilter)
    }

    // Apply approval status filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item => {
        const hasApprovals = item.approvalStatuses.includes('✓')
        const hasRejections = item.approvalStatuses.includes('✗')
        const hasPending = item.approvalStatuses.includes('-')

        switch (filterType) {
          case 'with-approvals':
            return hasApprovals
          case 'pending-approvals':
            return hasPending && !hasApprovals && !hasRejections
          case 'no-approvals':
            return !hasApprovals && !hasRejections
          default:
            return true
        }
      })
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const approvedCount = item.approvalStatuses.filter(s => s === '✓').length
        const rejectedCount = item.approvalStatuses.filter(s => s === '✗').length
        const pendingCount = item.approvalStatuses.filter(s => s === '-').length

        switch (statusFilter) {
          case 'approved':
            return approvedCount > rejectedCount && approvedCount > 0
          case 'rejected':
            return rejectedCount > approvedCount && rejectedCount > 0
          case 'pending':
            return pendingCount > 0 && approvedCount === 0 && rejectedCount === 0
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = ''
      let bValue: string | number = ''

      switch (sortField) {
        case 'abcd_1up':
          aValue = a.abcd_1up
          bValue = b.abcd_1up
          break
        case 'service_id':
          aValue = a.service_id
          bValue = b.service_id
          break
        case 'service_name':
          aValue = a.service_name
          bValue = b.service_name
          break
        case 'provision_type':
          aValue = a.provision_type
          bValue = b.provision_type
          break
        case 'options':
          aValue = a.options
          bValue = b.options
          break
        case 'num_provisions':
          aValue = a.num_provisions
          bValue = b.num_provisions
          break
        case 'num_products':
          aValue = a.num_products
          bValue = b.num_products
          break
        case 'num_splits':
          aValue = a.num_splits
          bValue = b.num_splits
          break
        case 'num_clients':
          aValue = a.num_clients
          bValue = b.num_clients
          break
        case 'num_groups':
          aValue = a.num_groups
          bValue = b.num_groups
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [searchTerm, sortField, sortDirection, filterType, statusFilter, provisionTypeFilter])

  // Filter and sort similar records
  const filteredAndSortedSimilarRecords = useMemo(() => {
    let filtered = [...similarRecords]

    // Apply search filter
    if (similarSearchTerm) {
      filtered = filtered.filter(item =>
        item.abcd_1up.toString().toLowerCase().includes(similarSearchTerm.toLowerCase()) ||
        item.service_name.toLowerCase().includes(similarSearchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(similarSearchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(similarSearchTerm.toLowerCase()) ||
        item.similarity_score.toString().includes(similarSearchTerm.toLowerCase())
      )
    }

    // Apply provision type filter
    if (similarProvisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.provision_type === similarProvisionTypeFilter)
    }

    // Apply approval status filter
    if (similarFilterType !== 'all') {
      filtered = filtered.filter(item => {
        const hasApprovals = item.approvalStatuses.includes('✓')
        const hasRejections = item.approvalStatuses.includes('✗')
        const hasPending = item.approvalStatuses.includes('-')

        switch (similarFilterType) {
          case 'with-approvals':
            return hasApprovals
          case 'pending-approvals':
            return hasPending && !hasApprovals && !hasRejections
          case 'no-approvals':
            return !hasApprovals && !hasRejections
          default:
            return true
        }
      })
    }

    // Apply status filter
    if (similarStatusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const approvedCount = item.approvalStatuses.filter(s => s === '✓').length
        const rejectedCount = item.approvalStatuses.filter(s => s === '✗').length
        const pendingCount = item.approvalStatuses.filter(s => s === '-').length

        switch (similarStatusFilter) {
          case 'approved':
            return approvedCount > rejectedCount && approvedCount > 0
          case 'rejected':
            return rejectedCount > approvedCount && rejectedCount > 0
          case 'pending':
            return pendingCount > 0 && approvedCount === 0 && rejectedCount === 0
          default:
            return true
        }
      })
    }

    // Apply sorting (including similarity score)
    filtered.sort((a, b) => {
      let aValue: string | number = ''
      let bValue: string | number = ''

      if (similarSortField === 'similarity_score') {
        aValue = parseFloat(a.similarity_score)
        bValue = parseFloat(b.similarity_score)
      } else {
        switch (similarSortField) {
          case 'abcd_1up':
            aValue = a.abcd_1up
            bValue = b.abcd_1up
            break
          case 'service_id':
            aValue = a.service_id
            bValue = b.service_id
            break
          case 'service_name':
            aValue = a.service_name
            bValue = b.service_name
            break
          case 'provision_type':
            aValue = a.provision_type
            bValue = b.provision_type
            break
          case 'options':
            aValue = a.options
            bValue = b.options
            break
          case 'num_provisions':
            aValue = a.num_provisions
            bValue = b.num_provisions
            break
          case 'num_products':
            aValue = a.num_products
            bValue = b.num_products
            break
          case 'num_splits':
            aValue = a.num_splits
            bValue = b.num_splits
            break
          case 'num_clients':
            aValue = a.num_clients
            bValue = b.num_clients
            break
          case 'num_groups':
            aValue = a.num_groups
            bValue = b.num_groups
            break
          default:
            return 0
        }
      }

      if (aValue < bValue) return similarSortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return similarSortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [similarRecords, similarSearchTerm, similarSortField, similarSortDirection, similarFilterType, similarStatusFilter, similarProvisionTypeFilter])

  // Filter and sort exact same CD records
  const filteredAndSortedExactRecords = useMemo(() => {
    let filtered = [...exactSameCDRecords]

    // Apply search filter
    if (exactSearchTerm) {
      filtered = filtered.filter(item =>
        item.abcd_1up.toString().toLowerCase().includes(exactSearchTerm.toLowerCase()) ||
        item.service_name.toLowerCase().includes(exactSearchTerm.toLowerCase()) ||
        item.provision_type.toLowerCase().includes(exactSearchTerm.toLowerCase()) ||
        item.options.toLowerCase().includes(exactSearchTerm.toLowerCase())
      )
    }

    // Apply provision type filter
    if (exactProvisionTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.provision_type === exactProvisionTypeFilter)
    }

    // Apply approval status filter
    if (exactFilterType !== 'all') {
      filtered = filtered.filter(item => {
        const hasApprovals = item.approvalStatuses.includes('✓')
        const hasRejections = item.approvalStatuses.includes('✗')
        const hasPending = item.approvalStatuses.includes('-')

        switch (exactFilterType) {
          case 'with-approvals':
            return hasApprovals
          case 'pending-approvals':
            return hasPending && !hasApprovals && !hasRejections
          case 'no-approvals':
            return !hasApprovals && !hasRejections
          default:
            return true
        }
      })
    }

    // Apply status filter
    if (exactStatusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const approvedCount = item.approvalStatuses.filter(s => s === '✓').length
        const rejectedCount = item.approvalStatuses.filter(s => s === '✗').length
        const pendingCount = item.approvalStatuses.filter(s => s === '-').length

        switch (exactStatusFilter) {
          case 'approved':
            return approvedCount > rejectedCount && approvedCount > 0
          case 'rejected':
            return rejectedCount > approvedCount && rejectedCount > 0
          case 'pending':
            return pendingCount > 0 && approvedCount === 0 && rejectedCount === 0
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number = ''
      let bValue: string | number = ''

      switch (exactSortField) {
        case 'abcd_1up':
          aValue = a.abcd_1up
          bValue = b.abcd_1up
          break
        case 'service_id':
          aValue = a.service_id
          bValue = b.service_id
          break
        case 'service_name':
          aValue = a.service_name
          bValue = b.service_name
          break
        case 'provision_type':
          aValue = a.provision_type
          bValue = b.provision_type
          break
        case 'options':
          aValue = a.options
          bValue = b.options
          break
        case 'num_provisions':
          aValue = a.num_provisions
          bValue = b.num_provisions
          break
        case 'num_products':
          aValue = a.num_products
          bValue = b.num_products
          break
        case 'num_splits':
          aValue = a.num_splits
          bValue = b.num_splits
          break
        case 'num_clients':
          aValue = a.num_clients
          bValue = b.num_clients
          break
        case 'num_groups':
          aValue = a.num_groups
          bValue = b.num_groups
          break
        default:
          return 0
      }

      if (aValue < bValue) return exactSortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return exactSortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [exactSameCDRecords, exactSearchTerm, exactSortField, exactSortDirection, exactFilterType, exactStatusFilter, exactProvisionTypeFilter])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSimilarSort = (field: SortField) => {
    if (similarSortField === field) {
      setSimilarSortDirection(similarSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSimilarSortField(field)
      setSimilarSortDirection('asc')
    }
  }

  const handleExactSort = (field: SortField) => {
    if (exactSortField === field) {
      setExactSortDirection(exactSortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setExactSortField(field)
      setExactSortDirection('asc')
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterType('all')
    setStatusFilter('all')
    setProvisionTypeFilter('all')
    setSortField('abcd_1up')
    setSortDirection('asc')
  }

  const clearSimilarFilters = () => {
    setSimilarSearchTerm('')
    setSimilarFilterType('all')
    setSimilarStatusFilter('all')
    setSimilarProvisionTypeFilter('all')
    setSimilarSortField('abcd_1up')
    setSimilarSortDirection('asc')
  }

  const clearExactFilters = () => {
    setExactSearchTerm('')
    setExactFilterType('all')
    setExactStatusFilter('all')
    setExactProvisionTypeFilter('all')
    setExactSortField('abcd_1up')
    setExactSortDirection('asc')
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ?
      <CaretUp className="h-3 w-3 ml-1" /> :
      <CaretDown className="h-3 w-3 ml-1" />
  }

  const getSimilarSortIcon = (field: SortField) => {
    if (similarSortField !== field) return null
    return similarSortDirection === 'asc' ?
      <CaretUp className="h-3 w-3 ml-1" /> :
      <CaretDown className="h-3 w-3 ml-1" />
  }

  const getExactSortIcon = (field: SortField) => {
    if (exactSortField !== field) return null
    return exactSortDirection === 'asc' ?
      <CaretUp className="h-3 w-3 ml-1" /> :
      <CaretDown className="h-3 w-3 ml-1" />
  }

  // Handle clicking on the # column to show similar records and scroll to them
  const handleRowNumberClick = (abcdId: number) => {
    if (selectedRecordId === abcdId && showSimilarRecords && showExactSameCDRecords) {
      // If already showing both tables for this row, hide them
      setShowSimilarRecords(false)
      setShowExactSameCDRecords(false)
      setSelectedRecordId(null)
      setSimilarRecords([])
      setExactSameCDRecords([])
    } else {
      // Show both tables for this row
      setSelectedRecordId(abcdId)
      setSimilarRecords(generateSimilarRecords(abcdId))
      setExactSameCDRecords(generateExactSameCDRecords(abcdId))
      setShowSimilarRecords(true)
      setShowExactSameCDRecords(true)
      setIsSimilarRecordsCollapsed(false) // Ensure tables are expanded when showing
      setIsExactSameCDCollapsed(false)

      // Reset filters for new data
      clearSimilarFilters()
      clearExactFilters()

      // Scroll to Similar Records table after a brief delay to allow rendering
      setTimeout(() => {
        similarRecordsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }, 100)
    }
  }

  // Get unique provision types for filter
  const uniqueProvisionTypes = Array.from(new Set(mockClusterData.map(item => item.provision_type)))
  const uniqueSimilarProvisionTypes = Array.from(new Set(similarRecords.map(item => item.provision_type)))
  const uniqueExactProvisionTypes = Array.from(new Set(exactSameCDRecords.map(item => item.provision_type)))

  return (
    <div className="flex flex-col font-['Proxima_Nova',sans-serif] cluster-details-1920">
      {/* Compact Cluster Information Card - Data Context and Distance Threshold Only */}
      <Card className="bg-card border-border mb-4 shadow-sm mx-8 flex-shrink-0">
        <CardContent className="px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Data Context */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground leading-tight truncate" style={{ fontSize: 'var(--font-body)' }}>X-ray Projection:</span>
              <span className="text-muted-foreground leading-non" style={{ fontSize: 'var(--font-body)' }} title={clusterInfo.xrayProjection}>
                {clusterInfo.xrayProjection}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground leading-tight truncate" style={{ fontSize: 'var(--font-body)' }}>Data Context:</span>
              <span className="text-muted-foreground leading-non" style={{ fontSize: 'var(--font-body)' }} title={clusterInfo.dataContext}>
                {clusterInfo.dataContext}
              </span>
            </div>

            {/* Distance Threshold Controls */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground" style={{ fontSize: 'var(--font-body)' }}>Distance Threshold:</span>
              <Input
                type="number"
                value={distanceThreshold}
                onChange={(e) => setDistanceThreshold(e.target.value)}
                step="0.1"
                min="0"
                max="100"
                className="w-20 border-border font-bold text-accent focus:ring-1 focus:ring-ring transition-colors"
                style={{ height: 'var(--button-sm)', fontSize: 'var(--font-body)' }}
              />
              <Button
                size="sm"
                className="px-4 btn-gradient-primary font-medium focus:ring-1 focus:ring-ring transition-colors"
                style={{ height: 'var(--button-sm)', fontSize: 'var(--font-body)' }}
                onClick={() => {
                  console.log('Update distance threshold to:', distanceThreshold)
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Main Data Table - Fixed height with sticky header */}
      <Collapsible open={!isMainTableCollapsed} onOpenChange={(open) => setIsMainTableCollapsed(!open)}>
        <Card className="bg-card border-border shadow-sm flex-1 flex flex-col min-h-0 mx-8 overflow-hidden">
          <CardContent className="p-0 flex flex-col h-full min-h-0">
            {/* Merged Table Header with Collapse Control and Filter Controls */}
            <div className="flex items-center gap-4 px-3 py-2 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
              {/* Left Section: Title, Badge, and Collapse Control */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                  Main Cluster Data
                </h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                  {filteredAndSortedData.length} records
                </Badge>
              </div>

              {/* Filter Controls Section - Merged into header row */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Search Input - Optimized width */}
                <div className="relative flex-1 min-w-64 max-w-80">
                  <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-7 pr-7 border-border placeholder:text-muted-foreground focus:ring-1 focus:ring-ring transition-colors"
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0 hover:bg-muted transition-colors"
                      style={{ height: 'var(--button-xs)', width: 'var(--button-xs)' }}
                      onClick={() => setSearchTerm('')}
                    >
                      <X className="h-2 w-2 text-muted-foreground" />
                    </Button>
                  )}
                </div>

                {/* Quick Status Filters - Ultra-compact for 1920x1080 */}
                <div className="flex items-center gap-1">
                  {['all', 'with-approvals', 'pending-approvals', 'no-approvals'].map((type) => (
                    <Button
                      key={type}
                      variant={filterType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterType(type as FilterType)}
                      className={`${filterType === type
                        ? type === 'with-approvals' ? 'bg-success text-success-foreground hover:bg-success/90'
                          : type === 'pending-approvals' ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                            : type === 'no-approvals' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-border text-foreground hover:bg-muted'
                        } focus:ring-1 focus:ring-ring transition-colors`}
                      style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                    >
                      {type === 'all' ? 'All'
                        : type === 'with-approvals' ? 'With Approvals'
                          : type === 'pending-approvals' ? 'Pending'
                            : 'None'}
                    </Button>
                  ))}
                </div>

                {/* Advanced Filters - Compact Selects */}
                <div className="flex items-center gap-1">
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                    <SelectTrigger className="w-24 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All</SelectItem>
                      <SelectItem value="approved" style={{ fontSize: 'var(--font-body)' }}>✓</SelectItem>
                      <SelectItem value="rejected" style={{ fontSize: 'var(--font-body)' }}>✗</SelectItem>
                      <SelectItem value="pending" style={{ fontSize: 'var(--font-body)' }}>-</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={provisionTypeFilter} onValueChange={setProvisionTypeFilter}>
                    <SelectTrigger className="w-32 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All Types</SelectItem>
                      {uniqueProvisionTypes.map((type) => (
                        <SelectItem key={type} value={type} style={{ fontSize: 'var(--font-body)' }}>{type.substring(0, 20)}...</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                    <SelectTrigger className="w-40 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abcd_1up" style={{ fontSize: 'var(--font-body)' }}>ABCD</SelectItem>
                      <SelectItem value="service_name" style={{ fontSize: 'var(--font-body)' }}>Name</SelectItem>
                      <SelectItem value="num_provisions" style={{ fontSize: 'var(--font-body)' }}>Prov</SelectItem>
                      <SelectItem value="num_products" style={{ fontSize: 'var(--font-body)' }}>Prod</SelectItem>
                      <SelectItem value="num_groups" style={{ fontSize: 'var(--font-body)' }}>Groups</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2 border-border focus:ring-1 focus:ring-ring transition-colors hover:bg-muted"
                    style={{ height: 'var(--button-sm)' }}
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortDirection === 'asc' ?
                      <SortAscending className="h-3 w-3" /> :
                      <SortDescending className="h-3 w-3" />
                    }
                  </Button>
                </div>

                {/* Results & Clear */}
                <div className="flex items-center gap-2 ml-auto">
                  <Badge variant="outline" className="px-2 py-0.5 bg-muted/50 border-border" style={{ fontSize: 'var(--font-body)' }}>
                    {filteredAndSortedData.length}/{mockClusterData.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="px-2 text-muted-foreground hover:text-foreground hover:bg-muted focus:ring-1 focus:ring-ring transition-colors"
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  >
                    <X className="h-2 w-2 mr-1" />
                    Clear
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMainTableCollapsed(!isMainTableCollapsed)}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1"
                    style={{ height: 'var(--button-sm)' }}
                  >
                    {isMainTableCollapsed ? <CaretDown className="h-3 w-3" /> : <CaretUp className="h-3 w-3" />}
                    {isMainTableCollapsed ? 'Expand' : 'Collapse'}
                  </Button>
                </div>
              </div>
            </div>

            <CollapsibleContent className="flex flex-col h-full min-h-0">
              {/* Table Container - Fixed height with sticky header */}
              {!isMainTableCollapsed && (
                <>
                  <div className="max-h-112 overflow-auto">
                    <table className="w-full border-collapse cluster-details-table-full-width" style={{ fontSize: 'var(--font-body)', minWidth: '100%' }}>
                      <colgroup>
                        <col className="col-index" />
                        <col className="col-abcd" />
                        <col className="col-service-id" />
                        <col className="col-service-name" />
                        <col className="col-service-name" />
                        <col className="col-p" />
                        <col className="col-provision-type" />
                        <col className="col-o" />
                        <col className="col-options" />
                        <col className="col-splits" />
                        <col className="col-provisions" />
                        <col className="col-products" />
                        <col className="col-clients" />
                        <col className="col-groups" />
                        <col className="col-approval" />
                      </colgroup>
                      <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                        <tr>
                          <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap col-index bg-card" style={{ fontSize: 'var(--font-body)' }}>#</th>
                          <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-abcd bg-card" onClick={() => handleSort('abcd_1up')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              ABCD 1-Up
                              {getSortIcon('abcd_1up')}
                            </div>
                          </th>
                          <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-service-id bg-card" onClick={() => handleSort('service_id')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Service ID
                              {getSortIcon('service_id')}
                            </div>
                          </th>
                          <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors col-service-name bg-card" onClick={() => handleSort('service_name')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Service Name
                              {getSortIcon('service_name')}
                            </div>
                          </th>
                          <th className="text-left px-2 py-3 font-medium text-muted-foreground hover:text-foreground transition-colors col-p bg-card" style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              P
                            </div>
                          </th>
                          <th className="text-left px-2 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors col-provision-type bg-card" onClick={() => handleSort('provision_type')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Provision Type
                              {getSortIcon('provision_type')}
                            </div>
                          </th>
                          <th className="text-left px-2 py-3 font-medium text-muted-foreground hover:text-foreground transition-colors col-o bg-card" style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              O
                            </div>
                          </th>
                          <th className="text-left px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-options bg-card" onClick={() => handleSort('options')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center">
                              Options
                              {getSortIcon('options')}
                            </div>
                          </th>
                          <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-splits bg-card" onClick={() => handleSort('num_splits')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Splits
                              {getSortIcon('num_splits')}
                            </div>
                          </th>
                          <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-provisions bg-card" onClick={() => handleSort('num_provisions')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Provisions
                              {getSortIcon('num_provisions')}
                            </div>
                          </th>
                          <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-products bg-card" onClick={() => handleSort('num_products')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Products
                              {getSortIcon('num_products')}
                            </div>
                          </th>
                          <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-clients bg-card" onClick={() => handleSort('num_clients')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Clients
                              {getSortIcon('num_clients')}
                            </div>
                          </th>
                          <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors col-groups bg-card" onClick={() => handleSort('num_groups')} style={{ fontSize: 'var(--font-body)' }}>
                            <div className="flex items-center justify-center">
                              Groups
                              {getSortIcon('num_groups')}
                            </div>
                          </th>
                          <th className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap col-approval bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedData.map((record, index) => (
                          <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                            <td className="px-2 py-2 text-left col-index align-middle" style={{ fontSize: 'var(--font-body)' }}>
                              <Button
                                variant="ghost"
                                className={`p-1 h-auto text-primary underline hover:text-primary-foreground cursor-pointer hover:bg-primary font-bold transition-colors ${selectedRecordId === record.abcd_1up && (showSimilarRecords || showExactSameCDRecords) ? 'bg-primary text-primary-foreground' : ''
                                  }`}
                                style={{ fontSize: 'var(--font-body)' }}
                                onClick={() => handleRowNumberClick(record.abcd_1up)}
                                title="Click to show/hide similar records and exact same CD records"
                              >
                                {index + 1}
                              </Button>
                            </td>
                            <td className="px-2 py-2 col-abcd align-middle">
                              <Button variant="link" className="p-0 h-auto text-primary underline font-bold cursor-pointer" style={{ fontSize: 'var(--font-body)' }}>
                                {record.abcd_1up}
                              </Button>
                            </td>
                            <td className="px-2 py-2 text-center col-service-id align-middle">
                              <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}>{record.service_id}</span>
                            </td>
                            <td className="px-2 py-2 col-service-name align-top">
                              <div className="max-w-full">
                                <span className="font-medium text-foreground break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={record.service_name}>
                                  {record.service_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-center col-p align-middle">
                              <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}></span>
                            </td>
                            <td className="px-2 py-2 col-provision-type align-top">
                              <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.provision_type}>
                                {record.provision_type}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-center col-o align-middle">
                              <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}></span>
                            </td>
                            <td className="px-2 py-2 col-options align-top">
                              <span className="font-medium text-accent break-words leading-tight block" style={{ fontSize: 'var(--font-body)' }} title={record.options}>
                                {record.options}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-center col-splits align-middle">
                              <span className="font-bold text-secondary" style={{ fontSize: 'var(--font-body)' }}>{record.num_splits}</span>
                            </td>
                            <td className="px-2 py-2 text-center col-provisions align-middle">
                              <span className="font-bold text-primary" style={{ fontSize: 'var(--font-body)' }}>{record.num_provisions.toLocaleString()}</span>
                            </td>
                            <td className="px-2 py-2 text-center col-products align-middle">
                              <span className="font-bold text-success" style={{ fontSize: 'var(--font-body)' }}>{record.num_products.toLocaleString()}</span>
                            </td>
                            <td className="px-2 py-2 text-center col-clients align-middle">
                              <span className="text-info font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_clients?.toLocaleString() || '-'}</span>
                            </td>
                            <td className="px-2 py-2 text-center col-groups align-middle">
                              <span className="text-warning font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_groups?.toLocaleString() || '-'}</span>
                            </td>
                            <td className="px-2 py-2 text-center col-approval align-middle">
                              <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                            </td>
                          </tr>
                        ))}
                        {filteredAndSortedData.length === 0 && (
                          <tr>
                            <td colSpan={12} className="text-center py-8 text-muted-foreground">
                              <div className="flex flex-col items-center gap-2">
                                <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                                <div>
                                  <p className="font-semibold">No records found</p>
                                  <p className="text-xs">Try adjusting your search or filter criteria</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>

      {/* Similar Records Table */}
      <Collapsible open={!isSimilarRecordsCollapsed} onOpenChange={(open) => setIsSimilarRecordsCollapsed(!open)}>
        <Card ref={similarRecordsRef} className="bg-card border-border shadow-sm mt-4 mx-8 flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Merged Similar Records Header with Collapse Control and Filter Controls */}
            <div className="flex items-center gap-4 px-3 py-2 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
              {/* Left Section: Title, Badge, Dropdown, and Collapse Control */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                  Similar Records
                </h3>
                <Select value={similarRecordsViewMode} onValueChange={setSimilarRecordsViewMode}>
                  <SelectTrigger className="w-64 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Only Options (D)" style={{ fontSize: 'var(--font-body)' }}>Only Options (D)</SelectItem>
                    <SelectItem value="Provision Type + Options (C+D)" style={{ fontSize: 'var(--font-body)' }}>Provision Type + Options (C+D)</SelectItem>
                    <SelectItem value="Service ID/Name + Provision Type + Options (A+B+C+D)" style={{ fontSize: 'var(--font-body)' }}>Service ID/Name + Provision Type + Options (A+B+C+D)</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="px-2 py-0.5 bg-info/10 text-info border-info/20">
                  {filteredAndSortedSimilarRecords.length} records found
                </Badge>
              </div>

              {/* Filter Controls Section - Merged into header row */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Search Input */}
                <div className="relative flex-1 min-w-64 max-w-80">
                  <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search similar records..."
                    value={similarSearchTerm}
                    onChange={(e) => setSimilarSearchTerm(e.target.value)}
                    className="pl-7 pr-7 border-border placeholder:text-muted-foreground focus:ring-1 focus:ring-ring transition-colors"
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  />
                  {similarSearchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0 hover:bg-muted transition-colors"
                      style={{ height: 'var(--button-xs)', width: 'var(--button-xs)' }}
                      onClick={() => setSimilarSearchTerm('')}
                    >
                      <X className="h-2 w-2 text-muted-foreground" />
                    </Button>
                  )}
                </div>

                {/* Quick Status Filters */}
                <div className="flex items-center gap-1">
                  {['all', 'with-approvals', 'pending-approvals', 'no-approvals'].map((type) => (
                    <Button
                      key={type}
                      variant={similarFilterType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSimilarFilterType(type as FilterType)}
                      className={`${similarFilterType === type
                        ? type === 'with-approvals' ? 'bg-success text-success-foreground hover:bg-success/90'
                          : type === 'pending-approvals' ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                            : type === 'no-approvals' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-border text-foreground hover:bg-muted'
                        } focus:ring-1 focus:ring-ring transition-colors`}
                      style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                    >
                      {type === 'all' ? 'All'
                        : type === 'with-approvals' ? 'With Approvals'
                          : type === 'pending-approvals' ? 'Pending'
                            : 'None'}
                    </Button>
                  ))}
                </div>

                {/* Advanced Filters */}
                <div className="flex items-center gap-1">
                  <Select value={similarStatusFilter} onValueChange={(value) => setSimilarStatusFilter(value as StatusFilter)}>
                    <SelectTrigger className="w-24 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All</SelectItem>
                      <SelectItem value="approved" style={{ fontSize: 'var(--font-body)' }}>✓</SelectItem>
                      <SelectItem value="rejected" style={{ fontSize: 'var(--font-body)' }}>✗</SelectItem>
                      <SelectItem value="pending" style={{ fontSize: 'var(--font-body)' }}>-</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={similarProvisionTypeFilter} onValueChange={setSimilarProvisionTypeFilter}>
                    <SelectTrigger className="w-32 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All Types</SelectItem>
                      {uniqueSimilarProvisionTypes.map((type) => (
                        <SelectItem key={type} value={type} style={{ fontSize: 'var(--font-body)' }}>{type.substring(0, 20)}...</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={similarSortField} onValueChange={(value) => setSimilarSortField(value as SortField)}>
                    <SelectTrigger className="w-40 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abcd_1up" style={{ fontSize: 'var(--font-body)' }}>ABCD</SelectItem>
                      <SelectItem value="service_name" style={{ fontSize: 'var(--font-body)' }}>Name</SelectItem>
                      <SelectItem value="num_provisions" style={{ fontSize: 'var(--font-body)' }}>Prov</SelectItem>
                      <SelectItem value="num_products" style={{ fontSize: 'var(--font-body)' }}>Prod</SelectItem>
                      <SelectItem value="num_groups" style={{ fontSize: 'var(--font-body)' }}>Groups</SelectItem>
                      <SelectItem value="similarity_score" style={{ fontSize: 'var(--font-body)' }}>Similarity</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2 border-border focus:ring-1 focus:ring-ring transition-colors hover:bg-muted"
                    style={{ height: 'var(--button-sm)' }}
                    onClick={() => setSimilarSortDirection(similarSortDirection === 'asc' ? 'desc' : 'asc')}
                  >
                    {similarSortDirection === 'asc' ?
                      <SortAscending className="h-3 w-3" /> :
                      <SortDescending className="h-3 w-3" />
                    }
                  </Button>
                </div>

                {/* Results & Clear */}
                <div className="flex items-center gap-2 ml-auto">
                  <Badge variant="outline" className="px-2 py-0.5 bg-muted/50 border-border" style={{ fontSize: 'var(--font-body)' }}>
                    {filteredAndSortedSimilarRecords.length}/{similarRecords.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSimilarFilters}
                    className="px-2 text-muted-foreground hover:text-foreground hover:bg-muted focus:ring-1 focus:ring-ring transition-colors"
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  >
                    <X className="h-2 w-2 mr-1" />
                    Clear
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1"
                      style={{ height: 'var(--button-sm)' }}
                    >
                      {isSimilarRecordsCollapsed ? <CaretDown className="h-3 w-3" /> : <CaretUp className="h-3 w-3" />}
                      {isSimilarRecordsCollapsed ? 'Expand' : 'Collapse'}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
            </div>

            <CollapsibleContent className="flex flex-col h-full min-h-0">

              {/* Similar Records Table */}
              {!isSimilarRecordsCollapsed && (
                <div className="max-h-112 overflow-auto">
                  <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                    <colgroup>
                      <col className="col-index" />
                      <col className="col-abcd" />
                      <col className="col-service-id" />
                      <col className="col-service-name" />
                      <col className="col-p" />
                      <col className="col-provision-type" />
                      <col className="col-o" />
                      <col className="col-options" />
                      <col className="col-provisions" />
                      <col className="col-products" />
                      <col className="col-clients" />
                      <col className="col-groups" />
                      <col className="col-similarity" />
                      <col className="col-approval" />
                    </colgroup>
                    <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                      <tr>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap col-index bg-card" style={{ fontSize: 'var(--font-body)' }}>#</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('abcd_1up')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            ABCD 1-Up
                            {getSimilarSortIcon('abcd_1up')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('service_id')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service ID
                            {getSimilarSortIcon('service_id')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('service_name')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service Name
                            {getSimilarSortIcon('service_name')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground hover:text-foreground transition-colors col-p bg-card" style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            P
                          </div>
                        </th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('provision_type')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Provision Type
                            {getSimilarSortIcon('provision_type')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground hover:text-foreground transition-colors col-o bg-card" style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            O
                          </div>
                        </th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('options')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Options
                            {getSimilarSortIcon('options')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('num_provisions')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Provisions
                            {getSimilarSortIcon('num_provisions')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('num_products')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Products
                            {getSimilarSortIcon('num_products')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('num_clients')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Clients
                            {getSimilarSortIcon('num_clients')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('num_groups')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Groups
                            {getSimilarSortIcon('num_groups')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleSimilarSort('similarity_score')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Similarity
                            {getSimilarSortIcon('similarity_score')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedSimilarRecords.map((record, index) => (
                        <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                          <td className="px-2 py-2 text-left col-index align-middle" style={{ fontSize: 'var(--font-body)' }}>
                            <span className="font-bold text-muted-foreground">{index + 1}</span>
                          </td>
                          <td className="px-2 py-2">
                            <Button variant="link" className="p-0 h-auto text-primary hover:underline font-bold" style={{ fontSize: 'var(--font-body)' }}>
                              {record.abcd_1up}
                            </Button>
                          </td>
                          <td className="px-2 py-2 text-center">
                            <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}>{record.service_id}</span>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.service_name}>
                              {record.service_name}
                            </span>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.provision_type}>
                              {record.provision_type}
                            </span>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <span className="font-medium text-accent break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.options}>
                              {record.options}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="font-bold text-primary" style={{ fontSize: 'var(--font-body)' }}>{record.num_provisions.toLocaleString()}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="font-bold text-success" style={{ fontSize: 'var(--font-body)' }}>{record.num_products.toLocaleString()}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="text-info font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_clients?.toLocaleString() || '-'}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="text-warning font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_groups?.toLocaleString() || '-'}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <Badge
                              variant="outline"
                              className={`font-bold ${parseFloat(record.similarity_score) >= 95 ? 'bg-success/10 text-success border-success/20' :
                                parseFloat(record.similarity_score) >= 90 ? 'bg-warning/10 text-warning border-warning/20' :
                                  'bg-info/10 text-info border-info/20'
                                }`}
                            >
                              {record.similarity_score}%
                            </Badge>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                          </td>
                        </tr>
                      ))}
                      {filteredAndSortedSimilarRecords.length === 0 && (
                        <tr>
                          <td colSpan={12} className="text-center py-8 text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                              <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                              <div>
                                <p className="font-semibold">No similar records found</p>
                                <p className="text-xs">Try adjusting your search or filter criteria</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>

      {/* Exact Same CD Records Table */}
      <Collapsible open={!isExactSameCDCollapsed} onOpenChange={(open) => setIsExactSameCDCollapsed(!open)}>
        <Card ref={exactSameCDRecordsRef} className="bg-card border-border shadow-sm mt-4 mx-8 flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Merged Exact Same CD Records Header with Collapse Control and Filter Controls */}
            <div className="flex items-center gap-4 px-3 py-2 border-b border-border bg-muted/20 flex-shrink-0 flex-wrap">
              {/* Left Section: Title, Badge, and Collapse Control */}
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--font-h6)' }}>
                  Exact Same CD Records for ABCD {selectedRecordId}
                </h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-success/10 text-success border-success/20">
                  {filteredAndSortedExactRecords.length} exact matches found
                </Badge>
              </div>

              {/* Filter Controls Section - Merged into header row */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Search Input */}
                <div className="relative flex-1 min-w-64 max-w-80">
                  <MagnifyingGlass className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search exact CD records..."
                    value={exactSearchTerm}
                    onChange={(e) => setExactSearchTerm(e.target.value)}
                    className="pl-7 pr-7 border-border placeholder:text-muted-foreground focus:ring-1 focus:ring-ring transition-colors"
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  />
                  {exactSearchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 p-0 hover:bg-muted transition-colors"
                      style={{ height: 'var(--button-xs)', width: 'var(--button-xs)' }}
                      onClick={() => setExactSearchTerm('')}
                    >
                      <X className="h-2 w-2 text-muted-foreground" />
                    </Button>
                  )}
                </div>

                {/* Quick Status Filters */}
                <div className="flex items-center gap-1">
                  {['all', 'with-approvals', 'pending-approvals', 'no-approvals'].map((type) => (
                    <Button
                      key={type}
                      variant={exactFilterType === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setExactFilterType(type as FilterType)}
                      className={`${exactFilterType === type
                        ? type === 'with-approvals' ? 'bg-success text-success-foreground hover:bg-success/90'
                          : type === 'pending-approvals' ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                            : type === 'no-approvals' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border-border text-foreground hover:bg-muted'
                        } focus:ring-1 focus:ring-ring transition-colors`}
                      style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                    >
                      {type === 'all' ? 'All'
                        : type === 'with-approvals' ? 'With Approvals'
                          : type === 'pending-approvals' ? 'Pending'
                            : 'None'}
                    </Button>
                  ))}
                </div>

                {/* Advanced Filters */}
                <div className="flex items-center gap-1">
                  <Select value={exactStatusFilter} onValueChange={(value) => setExactStatusFilter(value as StatusFilter)}>
                    <SelectTrigger className="w-24 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All</SelectItem>
                      <SelectItem value="approved" style={{ fontSize: 'var(--font-body)' }}>✓</SelectItem>
                      <SelectItem value="rejected" style={{ fontSize: 'var(--font-body)' }}>✗</SelectItem>
                      <SelectItem value="pending" style={{ fontSize: 'var(--font-body)' }}>-</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={exactProvisionTypeFilter} onValueChange={setExactProvisionTypeFilter}>
                    <SelectTrigger className="w-32 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" style={{ fontSize: 'var(--font-body)' }}>All Types</SelectItem>
                      {uniqueExactProvisionTypes.map((type) => (
                        <SelectItem key={type} value={type} style={{ fontSize: 'var(--font-body)' }}>{type.substring(0, 20)}...</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={exactSortField} onValueChange={(value) => setExactSortField(value as SortField)}>
                    <SelectTrigger className="w-40 border-border focus:ring-1 focus:ring-ring transition-colors" style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abcd_1up" style={{ fontSize: 'var(--font-body)' }}>ABCD</SelectItem>
                      <SelectItem value="service_name" style={{ fontSize: 'var(--font-body)' }}>Name</SelectItem>
                      <SelectItem value="num_provisions" style={{ fontSize: 'var(--font-body)' }}>Prov</SelectItem>
                      <SelectItem value="num_products" style={{ fontSize: 'var(--font-body)' }}>Prod</SelectItem>
                      <SelectItem value="num_groups" style={{ fontSize: 'var(--font-body)' }}>Groups</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    className="px-2 border-border focus:ring-1 focus:ring-ring transition-colors hover:bg-muted"
                    style={{ height: 'var(--button-sm)' }}
                    onClick={() => setExactSortDirection(exactSortDirection === 'asc' ? 'desc' : 'asc')}
                  >
                    {exactSortDirection === 'asc' ?
                      <SortAscending className="h-3 w-3" /> :
                      <SortDescending className="h-3 w-3" />
                    }
                  </Button>
                </div>

                {/* Results & Clear */}
                <div className="flex items-center gap-2 ml-auto">
                  <Badge variant="outline" className="px-2 py-0.5 bg-muted/50 border-border" style={{ fontSize: 'var(--font-body)' }}>
                    {filteredAndSortedExactRecords.length}/{exactSameCDRecords.length}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearExactFilters}
                    className="px-2 text-muted-foreground hover:text-foreground hover:bg-muted focus:ring-1 focus:ring-ring transition-colors"
                    style={{ fontSize: 'var(--font-body)', height: 'var(--button-sm)' }}
                  >
                    <X className="h-2 w-2 mr-1" />
                    Clear
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1"
                      style={{ height: 'var(--button-sm)' }}
                    >
                      {isExactSameCDCollapsed ? <CaretDown className="h-3 w-3" /> : <CaretUp className="h-3 w-3" />}
                      {isExactSameCDCollapsed ? 'Expand' : 'Collapse'}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
            </div>

            <CollapsibleContent className="flex flex-col h-full min-h-0">

              {/* Exact Same CD Records Table */}
              {!isExactSameCDCollapsed && (
                <div className="max-h-112 overflow-auto">
                  <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                    <colgroup>
                      <col className="col-index" />
                      <col className="col-abcd" />
                      <col className="col-service-id" />
                      <col className="col-service-name" />
                      <col className="col-p" />
                      <col className="col-provision-type" />
                      <col className="col-o" />
                      <col className="col-options" />
                      <col className="col-provisions" />
                      <col className="col-products" />
                      <col className="col-clients" />
                      <col className="col-groups" />
                      <col className="col-match-type" />
                      <col className="col-approval" />
                    </colgroup>
                    <thead className="sticky top-0 bg-card border-b border-border z-10 shadow-sm">
                      <tr>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap col-index bg-card" style={{ fontSize: 'var(--font-body)' }}>#</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('abcd_1up')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            ABCD 1-Up
                            {getExactSortIcon('abcd_1up')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('service_id')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service ID
                            {getExactSortIcon('service_id')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('service_name')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Service Name
                            {getExactSortIcon('service_name')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground hover:text-foreground transition-colors col-p bg-card" style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            P
                          </div>
                        </th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('provision_type')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Provision Type
                            {getExactSortIcon('provision_type')}
                          </div>
                        </th>
                        <th className="text-left px-2 py-3 font-medium text-muted-foreground hover:text-foreground transition-colors col-o bg-card" style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            O
                          </div>
                        </th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('options')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center">
                            Options
                            {getExactSortIcon('options')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('num_provisions')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Provisions
                            {getExactSortIcon('num_provisions')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('num_products')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Products
                            {getExactSortIcon('num_products')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('num_clients')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Clients
                            {getExactSortIcon('num_clients')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground transition-colors bg-card" onClick={() => handleExactSort('num_groups')} style={{ fontSize: 'var(--font-body)' }}>
                          <div className="flex items-center justify-center">
                            Groups
                            {getExactSortIcon('num_groups')}
                          </div>
                        </th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Match Type</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap bg-card" style={{ fontSize: 'var(--font-body)' }}>Approval</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedExactRecords.map((record, index) => (
                        <tr key={record.abcd_1up} className="border-b border-border hover:bg-muted/30 transition-colors align-top">
                          <td className="px-2 py-2 text-left col-index align-middle" style={{ fontSize: 'var(--font-body)' }}>
                            <span className="font-bold text-muted-foreground">{index + 1}</span>
                          </td>
                          <td className="px-2 py-2">
                            <Button variant="link" className="p-0 h-auto text-primary hover:underline font-bold" style={{ fontSize: 'var(--font-body)' }}>
                              {record.abcd_1up}
                            </Button>
                          </td>
                          <td className="px-2 py-2 text-center">
                            <span className="font-bold text-info" style={{ fontSize: 'var(--font-body)' }}>{record.service_id}</span>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.service_name}>
                              {record.service_name}
                            </span>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <span className="font-medium text-foreground break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.provision_type}>
                              {record.provision_type}
                            </span>
                          </td>
                          <td className="px-2 py-2 align-top">
                            <span className="font-medium text-accent break-words leading-tight" style={{ fontSize: 'var(--font-body)' }} title={record.options}>
                              {record.options}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="font-bold text-primary" style={{ fontSize: 'var(--font-body)' }}>{record.num_provisions.toLocaleString()}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="font-bold text-success" style={{ fontSize: 'var(--font-body)' }}>{record.num_products.toLocaleString()}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="text-info font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_clients?.toLocaleString() || '-'}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <span className="text-warning font-bold" style={{ fontSize: 'var(--font-body)' }}>{record.num_groups?.toLocaleString() || '-'}</span>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <Badge
                              variant="outline"
                              className="bg-success/10 text-success border-success/20 font-bold"
                            >
                              Exact CD Match
                            </Badge>
                          </td>
                          <td className="px-2 py-2 text-center align-middle">
                            <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                          </td>
                        </tr>
                      ))}
                      {filteredAndSortedExactRecords.length === 0 && (
                        <tr>
                          <td colSpan={12} className="text-center py-8 text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                              <MagnifyingGlass className="h-8 w-8 text-muted-foreground/40" />
                              <div>
                                <p className="font-semibold">No exact CD records found</p>
                                <p className="text-xs">Try adjusting your search or filter criteria</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    </div>
  );
}