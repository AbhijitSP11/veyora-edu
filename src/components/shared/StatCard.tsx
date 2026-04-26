import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg?: string;
  trend?: { value: number; label: string };
  className?: string;
  accent?: 'blue' | 'green' | 'amber' | 'rose' | 'violet';
}

const ACCENT_MAP = {
  blue:   { bg: 'bg-primary-light',  icon: 'text-primary',        bar: 'bg-primary' },
  green:  { bg: 'bg-emerald-50',     icon: 'text-emerald-600',     bar: 'bg-emerald-500' },
  amber:  { bg: 'bg-amber-50',       icon: 'text-amber-600',       bar: 'bg-amber-500' },
  rose:   { bg: 'bg-rose-50',        icon: 'text-rose-600',        bar: 'bg-rose-500' },
  violet: { bg: 'bg-violet-50',      icon: 'text-violet-600',      bar: 'bg-violet-500' },
};

export function StatCard({ label, value, icon, iconBg, trend, className, accent = 'blue' }: StatCardProps) {
  const colors = ACCENT_MAP[accent];

  return (
    <div className={cn(
      'bg-white rounded-xl p-5 shadow-card hover:shadow-card-md transition-shadow duration-200 group',
      className,
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('flex items-center justify-center size-10 rounded-xl', iconBg ?? colors.bg)}>
          <span className={colors.icon}>{icon}</span>
        </div>
        {trend && (
          <span className={cn(
            'flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full',
            trend.value >= 0
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700',
          )}>
            {trend.value >= 0
              ? <TrendingUp className="size-3" />
              : <TrendingDown className="size-3" />}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-ink-900 font-display leading-none mb-1">{value}</p>
      <p className="text-xs text-ink-400 font-medium">{label}</p>

      {trend && (
        <p className="text-[10px] text-ink-300 mt-1">{trend.label}</p>
      )}
    </div>
  );
}
