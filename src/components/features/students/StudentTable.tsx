import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { useStudents, useDeleteStudent } from '@/hooks/useStudents';
import { useTenant } from '@/hooks/useTenant';
import { formatDate, getInitials } from '@/lib/utils';
import type { Student } from '@/types/models';

interface StudentTableProps {
  filters?: {
    class?: string;
    section?: string;
    search?: string;
    status?: string;
    page?: number;
  };
}

export function StudentTable({ filters }: StudentTableProps) {
  const navigate = useNavigate();
  const { schoolSlug } = useTenant();
  const { data, isLoading } = useStudents(filters);
  const deleteStudent = useDeleteStudent();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const students: Student[] = data?.success ? (data.data as Student[]) : [];

  const columns: Column<Student>[] = [
    {
      key: 'name',
      header: 'Student',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-bold shrink-0">
            {getInitials(row.name)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500 font-mono">{row.rollNumber}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'class',
      header: 'Class',
      render: (row) => (
        <span className="font-mono text-sm">
          {row.class}-{row.section}
        </span>
      ),
    },
    {
      key: 'phone',
      header: 'Contact',
      render: (row) => (
        <span className="text-sm text-gray-600">{row.parentPhone ?? row.phone ?? '—'}</span>
      ),
    },
    {
      key: 'admissionDate',
      header: 'Admitted',
      render: (row) => <span className="text-sm">{formatDate(row.admissionDate)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-24',
      render: (row) => (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${schoolSlug}/admin/students/${row.id}`);
            }}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${schoolSlug}/admin/students/${row.id}?edit=true`);
            }}
          >
            <Edit className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(row.id);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={students}
        isLoading={isLoading}
        onRowClick={(row) => navigate(`/${schoolSlug}/admin/students/${row.id}`)}
        emptyTitle="No students found"
        emptyDescription="Add students individually or import via CSV."
      />
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete student"
        description="This will soft-delete the student record. The data can be recovered by a super admin."
        confirmLabel="Delete"
        onConfirm={() => {
          if (deleteId) {
            deleteStudent.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
          }
        }}
        isLoading={deleteStudent.isPending}
      />
    </>
  );
}
