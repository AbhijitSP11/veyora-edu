import { Badge } from '@/components/ui/badge';

type StatusType = string;

const STATUS_CONFIG: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary' | 'violet'; label: string }> = {
  PAID:        { variant: 'success',  label: 'Paid' },
  PENDING:     { variant: 'warning',  label: 'Pending' },
  OVERDUE:     { variant: 'error',    label: 'Overdue' },
  PARTIAL:     { variant: 'warning',  label: 'Partial' },
  PRESENT:     { variant: 'success',  label: 'Present' },
  ABSENT:      { variant: 'error',    label: 'Absent' },
  LATE:        { variant: 'warning',  label: 'Late' },
  HALF_DAY:    { variant: 'warning',  label: 'Half Day' },
  ACTIVE:      { variant: 'success',  label: 'Active' },
  INACTIVE:    { variant: 'default',  label: 'Inactive' },
  TRANSFERRED: { variant: 'info',     label: 'Transferred' },
  ALUMNI:      { variant: 'violet',   label: 'Alumni' },
  VERIFIED:    { variant: 'success',  label: 'Verified' },
  MISSING:     { variant: 'error',    label: 'Missing' },
  REJECTED:    { variant: 'error',    label: 'Rejected' },
  DRAFT:       { variant: 'warning',  label: 'Draft' },
  PUBLISHED:   { variant: 'success',  label: 'Published' },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? { variant: 'default' as const, label: status };
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
