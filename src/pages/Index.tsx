
import { RecentClaims } from "@/components/RecentClaims";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600">View your recent claims activity</p>
        </div>
        <RecentClaims />
      </div>
    </div>
  );
};

export default Index;
