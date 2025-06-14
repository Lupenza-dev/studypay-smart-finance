
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Target, Users, Award } from 'lucide-react';

interface CompanyStats {
  foundedYear: string;
  studentsServed: string;
  institutionPartners: string;
  totalFunding: string;
  satisfactionRate: string;
}

interface CompanyStatsSectionProps {
  companyStats: CompanyStats;
  setCompanyStats: (stats: CompanyStats) => void;
}

const CompanyStatsSection = ({ companyStats, setCompanyStats }: CompanyStatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Founded</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Input
            value={companyStats.foundedYear}
            onChange={(e) => setCompanyStats({ ...companyStats, foundedYear: e.target.value })}
            className="text-lg font-bold border-none p-0 h-auto"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Students Served</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <Input
            value={companyStats.studentsServed}
            onChange={(e) => setCompanyStats({ ...companyStats, studentsServed: e.target.value })}
            className="text-lg font-bold border-none p-0 h-auto"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Partners</CardTitle>
          <Award className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <Input
            value={companyStats.institutionPartners}
            onChange={(e) => setCompanyStats({ ...companyStats, institutionPartners: e.target.value })}
            className="text-lg font-bold border-none p-0 h-auto"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <Input
            value={companyStats.totalFunding}
            onChange={(e) => setCompanyStats({ ...companyStats, totalFunding: e.target.value })}
            className="text-lg font-bold border-none p-0 h-auto"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          <Award className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <Input
            value={companyStats.satisfactionRate}
            onChange={(e) => setCompanyStats({ ...companyStats, satisfactionRate: e.target.value })}
            className="text-lg font-bold border-none p-0 h-auto"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyStatsSection;
