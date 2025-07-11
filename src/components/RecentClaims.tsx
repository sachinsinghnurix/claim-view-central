
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
  const handleCustomerClick = (claimId: string) => {
    // Convert CLM-001 format to CLM-2024-001 format for the URL
    const formattedClaimId = claimId.replace('CLM-', 'CLM-2024-');
    const url = `https://azure-claim-portal.lovable.app/claims/${formattedClaimId}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Claims</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-muted-foreground">Claim ID</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockClaims.map((claim) => (
              <TableRow key={claim.id} className="border-border hover:bg-muted/50">
                <TableCell className="font-medium text-card-foreground">{claim.id}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleCustomerClick(claim.id)}
                    className="text-primary hover:text-primary/80 hover:underline cursor-pointer transition-colors"
                  >
                    {claim.customer}
                  </button>
                </TableCell>
                <TableCell className="text-card-foreground">{claim.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(claim.status)}>
                    {claim.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-card-foreground">{claim.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
