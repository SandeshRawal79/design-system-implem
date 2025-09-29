import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MagnifyingGlass, X, CaretUp, CaretDown, SortAscending, SortDescending } from '@phosphor-icons/react'

// Types for filtering and sorting
type SortField = 'abcd_1up' | 'service_id' | 'service_name' | 'provision_type' | 'options' | 'num_provisions' | 'num_products' | 'num_splits' | 'num_clients' | 'num_groups'
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
    service_name: "Federal Legend Drugs",
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
    approvalStatuses: generateApprovalStatuses(),
    similarity_score: "95.2"
  },
  {
    abcd_1up: 2019,
    service_id: 15002,
    service_name: "Federal Legend Drugs",
    provision_type_1up: null,
    provision_type: "Anti Cancer Deductible",
    options: "Only Options (D)",
    num_splits: 1,
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
    approvalStatuses: generateApprovalStatuses(),
    similarity_score: "92.8"
  }
];

// ApprovalStatusIndicators component
const ApprovalStatusIndicators = ({ statuses }: { statuses: string[] }) => (
  <div className="flex gap-1 justify-center">
    {statuses.map((status, index) => (
      <span
        key={index}
        className={`inline-block w-4 h-4 text-center text-xs font-bold rounded ${
          status === '✓' ? 'bg-success/10 text-success' :
          status === '✗' ? 'bg-destructive/10 text-destructive' :
          'bg-muted text-muted-foreground'
        }`}
      >
        {status}
      </span>
    ))}
  </div>
);

export function ClusterDetails() {
  const { serviceId, clusterId } = useParams();
  
  // State for similar records search and display
  const [showSimilarRecords, setShowSimilarRecords] = useState(false);
  const [showExactSameCDRecords, setShowExactSameCDRecords] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [similarRecords, setSimilarRecords] = useState<any[]>([]);
  const [exactSameCDRecords, setExactSameCDRecords] = useState<any[]>([]);
  const [isSimilarTableCollapsed, setIsSimilarTableCollapsed] = useState(false);
  const [isExactTableCollapsed, setIsExactTableCollapsed] = useState(false);
  
  // Filtering and sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortField>('abcd_1up');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setStatusFilter('all');
    setSortBy('abcd_1up');
    setSortDirection('asc');
  };

  // Simulate finding similar records
  const findSimilarRecords = (recordId: number) => {
    setSelectedRecordId(recordId);
    setSimilarRecords(mockClusterData);
    setShowSimilarRecords(true);
    setIsSimilarTableCollapsed(false);
  };

  // Simulate finding exact same CD records
  const findExactSameCDRecords = (recordId: number) => {
    setSelectedRecordId(recordId);
    setExactSameCDRecords(mockClusterData.slice(0, 3));
    setShowExactSameCDRecords(true);
    setIsExactTableCollapsed(false);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cluster Details</h1>
          <p className="text-muted-foreground">Service ID: {serviceId} | Cluster: {clusterId}</p>
        </div>
      </div>

      {/* Main cluster data table */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Cluster Records</h2>
            
            {/* Search and filters */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={() => findSimilarRecords(15001)}>
                Find Similar Records
              </Button>
              <Button onClick={() => findExactSameCDRecords(15001)}>
                Find Exact CD Records
              </Button>
            </div>

            {/* Records table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse" style={{ fontSize: 'var(--font-body)' }}>
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">ABCD</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Service ID</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Service Name</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Provision Type</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Options</th>
                    <th className="text-center px-4 py-2 font-medium text-muted-foreground">Provisions</th>
                    <th className="text-center px-4 py-2 font-medium text-muted-foreground">Products</th>
                    <th className="text-center px-4 py-2 font-medium text-muted-foreground">Approvals</th>
                  </tr>
                </thead>
                <tbody>
                  {mockClusterData.map((record, index) => (
                    <tr key={record.service_id} className="border-b border-border hover:bg-muted/30">
                      <td className="px-4 py-2">
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                          {record.abcd_1up}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        <span className="font-bold text-info">{record.service_id}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="font-medium text-foreground">{record.service_name}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-foreground">{record.provision_type}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-accent">{record.options}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="font-bold text-primary">{record.num_provisions.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span className="font-bold text-success">{record.num_products.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Similar Records Table */}
      {showSimilarRecords && (
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground">Similar Records</h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-info/10 text-info border-info/20">
                  {similarRecords.length} records found
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSimilarTableCollapsed(!isSimilarTableCollapsed)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isSimilarTableCollapsed ? <CaretDown className="h-4 w-4" /> : <CaretUp className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSimilarRecords(false);
                  setSelectedRecordId(null);
                  setSimilarRecords([]);
                }}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {!isSimilarTableCollapsed && (
              <>
                {/* Quick Status Filters */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {['all', 'with-approvals', 'pending-approvals', 'no-approvals'].map((type) => (
                      <Button
                        key={type}
                        variant={filterType === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType(type as FilterType)}
                        className="text-xs"
                      >
                        {type === 'all' ? 'All' 
                          : type === 'with-approvals' ? 'With Approvals'
                          : type === 'pending-approvals' ? 'Pending'
                          : 'None'}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                </div>

                {/* Similar Records Table */}
                <div className="max-h-96 overflow-auto">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-card border-b border-border">
                      <tr>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground">#</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground">ABCD</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground">Service ID</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground">Service Name</th>
                        <th className="text-left px-2 py-2 font-medium text-muted-foreground">Options</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground">Similarity</th>
                        <th className="text-center px-2 py-2 font-medium text-muted-foreground">Approval</th>
                      </tr>
                    </thead>
                    <tbody>
                      {similarRecords.map((record, index) => (
                        <tr key={`${record.service_id}-${record.abcd_1up}`} className="border-b border-border hover:bg-muted/30">
                          <td className="px-2 py-2 text-center">
                            <span className="text-muted-foreground font-mono text-sm">{index + 1}</span>
                          </td>
                          <td className="px-2 py-2">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                              {record.abcd_1up}
                            </Badge>
                          </td>
                          <td className="px-2 py-2">
                            <span className="font-bold text-info">{record.service_id}</span>
                          </td>
                          <td className="px-2 py-2">
                            <span className="font-medium text-foreground">{record.service_name}</span>
                          </td>
                          <td className="px-2 py-2">
                            <span className="text-accent">{record.options}</span>
                          </td>
                          <td className="px-2 py-2 text-center">
                            <Badge 
                              variant="outline" 
                              className={`font-bold ${
                                parseFloat(record.similarity_score) >= 95 ? 'bg-success/10 text-success border-success/20' :
                                parseFloat(record.similarity_score) >= 90 ? 'bg-warning/10 text-warning border-warning/20' :
                                'bg-info/10 text-info border-info/20'
                              }`}
                            >
                              {record.similarity_score}%
                            </Badge>
                          </td>
                          <td className="px-2 py-2 text-center">
                            <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Exact Same CD Records Table */}
      {showExactSameCDRecords && selectedRecordId && (
        <Card className="border border-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground">Exact Same CD Records</h3>
                <Badge variant="outline" className="px-2 py-0.5 bg-success/10 text-success border-success/20">
                  {exactSameCDRecords.length} exact matches found
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExactTableCollapsed(!isExactTableCollapsed)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isExactTableCollapsed ? <CaretDown className="h-4 w-4" /> : <CaretUp className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowExactSameCDRecords(false);
                  setSelectedRecordId(null);
                  setExactSameCDRecords([]);
                }}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {!isExactTableCollapsed && (
              <div className="max-h-96 overflow-auto">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-card border-b border-border">
                    <tr>
                      <th className="text-left px-2 py-2 font-medium text-muted-foreground">#</th>
                      <th className="text-left px-2 py-2 font-medium text-muted-foreground">ABCD</th>
                      <th className="text-left px-2 py-2 font-medium text-muted-foreground">Service ID</th>
                      <th className="text-left px-2 py-2 font-medium text-muted-foreground">Service Name</th>
                      <th className="text-left px-2 py-2 font-medium text-muted-foreground">Provision Type</th>
                      <th className="text-center px-2 py-2 font-medium text-muted-foreground">Approval</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exactSameCDRecords.map((record, index) => (
                      <tr key={`exact-${record.service_id}-${record.abcd_1up}`} className="border-b border-border hover:bg-muted/30">
                        <td className="px-2 py-2 text-center">
                          <span className="text-muted-foreground font-mono text-sm">{index + 1}</span>
                        </td>
                        <td className="px-2 py-2">
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                            {record.abcd_1up}
                          </Badge>
                        </td>
                        <td className="px-2 py-2">
                          <span className="font-bold text-info">{record.service_id}</span>
                        </td>
                        <td className="px-2 py-2">
                          <span className="font-medium text-foreground">{record.service_name}</span>
                        </td>
                        <td className="px-2 py-2">
                          <span className="text-foreground">{record.provision_type}</span>
                        </td>
                        <td className="px-2 py-2 text-center">
                          <ApprovalStatusIndicators statuses={record.approvalStatuses} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}