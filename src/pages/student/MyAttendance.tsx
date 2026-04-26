import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, formatDate, calculateAttendancePercentage } from '@/lib/utils';
import { useAttendanceReport } from '@/hooks/useAttendance';
import { useAuth } from '@/hooks/useAuth';
import type { Attendance } from '@/types/models';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const STATUS_COLOR: Record<string, string> = {
  PRESENT: 'bg-emerald-500',
  ABSENT: 'bg-red-500',
  LATE: 'bg-amber-500',
  HALF_DAY: 'bg-amber-300',
};

export function MyAttendance() {
  const { user } = useAuth();
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year] = useState(now.getFullYear());

  const { data, isLoading } = useAttendanceReport(user?.id ?? '', month, year);
  const records: Attendance[] = data?.success ? (data.data as Attendance[]) : [];

  const stats = {
    total: records.length,
    present: records.filter((r) => r.status === 'PRESENT').length,
    absent: records.filter((r) => r.status === 'ABSENT').length,
    late: records.filter((r) => r.status === 'LATE').length,
  };
  const pct = calculateAttendancePercentage(stats.present, stats.total);

  return (
    <div className="space-y-6">
      <PageHeader title="My Attendance" breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Attendance' }]} />

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Days', value: stats.total, color: 'text-gray-900' },
          { label: 'Present', value: stats.present, color: 'text-emerald-600' },
          { label: 'Absent', value: stats.absent, color: 'text-red-600' },
          { label: 'Late', value: stats.late, color: 'text-amber-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Percentage */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center gap-6">
        <div className="relative size-20">
          <svg className="size-20 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15" fill="none"
              stroke="#10B981" strokeWidth="3"
              strokeDasharray={`${(pct / 100) * 94.2} 94.2`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
            {pct}%
          </span>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900 font-display">Attendance Rate</p>
          <p className="text-sm text-gray-500">{MONTHS[month - 1]} {year}</p>
          <p className={cn('text-sm font-medium mt-1', pct >= 75 ? 'text-emerald-600' : 'text-red-600')}>
            {pct >= 75 ? 'Good standing' : 'Below minimum (75%)'}
          </p>
        </div>
      </div>

      {/* Month selector */}
      <div className="flex items-center gap-2 flex-wrap">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setMonth(i + 1)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              month === i + 1 ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary',
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Calendar dots */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Daily Attendance</h3>
        {isLoading ? (
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => <Skeleton key={i} className="size-8 rounded-lg" />)}
          </div>
        ) : records.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No records for this month.</p>
        ) : (
          <div className="space-y-2">
            {records.map((r) => (
              <div key={r.id} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                <div className={cn('size-2.5 rounded-full shrink-0', STATUS_COLOR[r.status])} />
                <span className="text-sm text-gray-600">{formatDate(r.date)}</span>
                <span className={cn('text-xs font-medium capitalize ml-auto', {
                  'text-emerald-600': r.status === 'PRESENT',
                  'text-red-600': r.status === 'ABSENT',
                  'text-amber-600': r.status === 'LATE',
                })}>
                  {r.status.charAt(0) + r.status.slice(1).toLowerCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
