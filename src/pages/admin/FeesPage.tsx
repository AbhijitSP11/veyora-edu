import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SearchBar } from '@/components/shared/SearchBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FeeTable } from '@/components/features/fees/FeeTable';
import { StatCard } from '@/components/shared/StatCard';
import { CreditCard, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function FeesPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const stats = [
    { label: 'Total Collected', value: '₹12.4L', icon: <CreditCard className="size-5 text-primary" /> },
    { label: 'This Month', value: '₹4.2L', icon: <TrendingUp className="size-5 text-emerald-600" />, iconBg: 'bg-emerald-50' },
    { label: 'Overdue', value: '₹1.8L', icon: <AlertTriangle className="size-5 text-red-600" />, iconBg: 'bg-red-50' },
    { label: 'Pending', value: '₹3.1L', icon: <CheckCircle className="size-5 text-amber-600" />, iconBg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Management"
        description="Track and manage student fee payments"
        breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Fees' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} iconBg={stat.iconBg} />
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search student..." className="w-64" />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="OVERDUE">Overdue</SelectItem>
            <SelectItem value="PARTIAL">Partial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <FeeTable fees={[]} isLoading={false} />
    </div>
  );
}
