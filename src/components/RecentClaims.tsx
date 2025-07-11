
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockClaims = [
  {
    id: "CLM-001",
    customer: "John Doe",
    amount: "$2,500",
    status: "pending",
    date: "2024-01-15"
  },
  {
    id: "CLM-002",
    customer: "Jane Smith",
    amount: "$1,800",
    status: "approved",
    date: "2024-01-14"
  },
  {
    id: "CLM-003",
    customer: "Bob Johnson",
    amount: "$3,200",
    status: "rejected",
    date: "2024-01-13"
  },
  {
    id: "CLM-004",
    customer: "Alice Brown",
    amount: "$950",
    status: "pending",
    date: "2024-01-12"
  },
  {
    id: "CLM-005",
    customer: "Charlie Wilson",
    amount: "$4,100",
    status: "approved",
    date: "2024-01-11"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const RecentClaims = () => {
  const handleCustomerClick = (customerId: string) => {
    const url = `https://azure-claim-portal.lovable.app/claims/CLM-2024-001`;
    window.open(url, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Claims</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockClaims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">{claim.id}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleCustomerClick(claim.id)}
                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    {claim.customer}
                  </button>
                </TableCell>
                <TableCell>{claim.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(claim.status)}>
                    {claim.status}
                  </Badge>
                </TableCell>
                <TableCell>{claim.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
