import { DataTable, type Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate, formatINR } from '@/lib/utils';
import type { Fee } from '@/types/models';

interface FeeTableProps {
  fees: Fee[];
  isLoading?: boolean;
}

export function FeeTable({ fees, isLoading }: FeeTableProps) {
  const columns: Column<Fee>[] = [
    {
      key: 'description',
      header: 'Fee Type',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{row.description}</p>
          <p className="text-xs text-gray-500 capitalize">{row.feeType.toLowerCase()}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row) => <span className="text-sm font-mono font-medium">{formatINR(row.amount)}</span>,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (row) => <span className="text-sm">{formatDate(row.dueDate)}</span>,
    },
    {
      key: 'paidDate',
      header: 'Paid Date',
      render: (row) => (
        <span className="text-sm">{row.paidDate ? formatDate(row.paidDate) : '—'}</span>
      ),
    },
    {
      key: 'paidAmount',
      header: 'Paid',
      render: (row) => (
        <span className="text-sm font-mono">{row.paidAmount ? formatINR(row.paidAmount) : '—'}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={fees}
      isLoading={isLoading}
      emptyTitle="No fee records"
      emptyDescription="Fee records will appear here once created."
    />
  );
}
