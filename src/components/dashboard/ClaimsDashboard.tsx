
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  TrendingUp,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import { StatsCards } from './StatsCards';
import { ClaimsTable } from './ClaimsTable';
import { ClaimFilters } from './ClaimFilters';

export interface Claim {
  id: string;
  claimNumber: string;
  customerName: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  amount: number;
  dateSubmitted: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
}

const mockClaims: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2024-001',
    customerName: 'John Smith',
    type: 'Auto Insurance',
    status: 'pending',
    amount: 2500,
    dateSubmitted: '2024-01-15',
    priority: 'high',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: '2',
    claimNumber: 'CLM-2024-002',
    customerName: 'Emma Davis',
    type: 'Home Insurance',
    status: 'approved',
    amount: 4200,
    dateSubmitted: '2024-01-14',
    priority: 'medium',
    assignedTo: 'Mike Wilson'
  },
  {
    id: '3',
    claimNumber: 'CLM-2024-003',
    customerName: 'Robert Brown',
    type: 'Health Insurance',
    status: 'under-review',
    amount: 1800,
    dateSubmitted: '2024-01-13',
    priority: 'low',
    assignedTo: 'Lisa Chen'
  },
  {
    id: '4',
    claimNumber: 'CLM-2024-004',
    customerName: 'Maria Garcia',
    type: 'Auto Insurance',
    status: 'rejected',
    amount: 3200,
    dateSubmitted: '2024-01-12',
    priority: 'medium',
    assignedTo: 'David Lee'
  },
  {
    id: '5',
    claimNumber: 'CLM-2024-005',
    customerName: 'James Wilson',
    type: 'Life Insurance',
    status: 'approved',
    amount: 15000,
    dateSubmitted: '2024-01-11',
    priority: 'high',
    assignedTo: 'Sarah Johnson'
  }
];

export function ClaimsDashboard() {
  const [claims, setClaims] = useState<Claim[]>(mockClaims);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    const matchesType = typeFilter === 'all' || claim.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Claims Management</h1>
            <p className="text-gray-600 mt-1">Monitor and manage insurance claims efficiently</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            New Claim
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards claims={claims} />

        {/* Filters and Search */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ClaimFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
            />
          </CardContent>
        </Card>

        {/* Claims Table */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <FileText className="h-5 w-5" />
              Recent Claims ({filteredClaims.length})
            </CardTitle>
            <CardDescription>
              Manage and track all insurance claims in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClaimsTable claims={filteredClaims} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
