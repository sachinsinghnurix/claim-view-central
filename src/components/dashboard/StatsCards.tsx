
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Clock, CheckCircle, XCircle, DollarSign, TrendingUp } from 'lucide-react';
import { Claim } from './ClaimsDashboard';

interface StatsCardsProps {
  claims: Claim[];
}

export function StatsCards({ claims }: StatsCardsProps) {
  const totalClaims = claims.length;
  const pendingClaims = claims.filter(c => c.status === 'pending').length;
  const approvedClaims = claims.filter(c => c.status === 'approved').length;
  const rejectedClaims = claims.filter(c => c.status === 'rejected').length;
  const totalAmount = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const approvedAmount = claims
    .filter(c => c.status === 'approved')
    .reduce((sum, claim) => sum + claim.amount, 0);

  const stats = [
    {
      title: 'Total Claims',
      value: totalClaims,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%'
    },
    {
      title: 'Pending Review',
      value: pendingClaims,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+3%'
    },
    {
      title: 'Approved',
      value: approvedClaims,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8%'
    },
    {
      title: 'Rejected',
      value: rejectedClaims,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '-2%'
    },
    {
      title: 'Total Value',
      value: `$${totalAmount.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+15%'
    },
    {
      title: 'Approved Value',
      value: `$${approvedAmount.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: '+18%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-green-600 font-medium">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
