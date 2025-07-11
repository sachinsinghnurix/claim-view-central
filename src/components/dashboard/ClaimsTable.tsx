
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Edit, MoreHorizontal, AlertTriangle } from 'lucide-react';
import { Claim } from './ClaimsDashboard';

interface ClaimsTableProps {
  claims: Claim[];
}

export function ClaimsTable({ claims }: ClaimsTableProps) {
  const getStatusBadge = (status: Claim['status']) => {
    const statusConfig = {
      pending: { label: 'Pending', variant: 'secondary' as const, className: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
      approved: { label: 'Approved', variant: 'secondary' as const, className: 'bg-green-100 text-green-800 hover:bg-green-200' },
      rejected: { label: 'Rejected', variant: 'secondary' as const, className: 'bg-red-100 text-red-800 hover:bg-red-200' },
      'under-review': { label: 'Under Review', variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800 hover:bg-blue-200' }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Claim['priority']) => {
    const priorityConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'High', className: 'bg-red-100 text-red-800' }
    };

    const config = priorityConfig[priority];
    return (
      <Badge variant="secondary" className={config.className}>
        {priority === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
        {config.label}
      </Badge>
    );
  };

  if (claims.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <FileText className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No claims found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead className="font-semibold">Claim #</TableHead>
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Priority</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Assigned To</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim) => (
            <TableRow 
              key={claim.id} 
              className="hover:bg-gray-50/50 transition-colors duration-200"
            >
              <TableCell className="font-medium text-blue-600">
                {claim.claimNumber}
              </TableCell>
              <TableCell className="font-medium">{claim.customerName}</TableCell>
              <TableCell className="text-gray-600">{claim.type}</TableCell>
              <TableCell>{getStatusBadge(claim.status)}</TableCell>
              <TableCell>{getPriorityBadge(claim.priority)}</TableCell>
              <TableCell className="font-semibold text-green-600">
                ${claim.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-gray-600">
                {new Date(claim.dateSubmitted).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-gray-600">{claim.assignedTo}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Claim
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
