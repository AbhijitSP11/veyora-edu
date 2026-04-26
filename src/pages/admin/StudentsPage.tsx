import { useState } from 'react';
import { UserPlus, Upload, Download } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { StudentTable } from '@/components/features/students/StudentTable';
import { StudentFilters } from '@/components/features/students/StudentFilters';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { StudentForm } from '@/components/features/students/StudentForm';
import { useCreateStudent } from '@/hooks/useStudents';
import { useDebounce } from '@/hooks/useDebounce';
import type { StudentInput } from '@/lib/validators';

export function StudentsPage() {
  const [search, setSearch] = useState('');
  const [class_, setClass] = useState('all');
  const [section, setSection] = useState('all');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const debouncedSearch = useDebounce(search);
  const createStudent = useCreateStudent();

  const filters = {
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(class_ !== 'all' && { class: class_ }),
    ...(section !== 'all' && { section }),
    ...(status !== 'all' && { status }),
    page,
    limit: 20,
  };

  const handleCreate = (data: StudentInput) => {
    createStudent.mutate(data, { onSuccess: () => setAddOpen(false) });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        description="Manage all student records"
        breadcrumbs={[{ label: 'Dashboard', href: '../dashboard' }, { label: 'Students' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Upload className="size-4" /> Import CSV
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="size-4" /> Export
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <UserPlus className="size-4" /> Add Student
            </Button>
          </div>
        }
      />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <StudentFilters
          search={search} onSearchChange={(v) => { setSearch(v); setPage(1); }}
          class_={class_} onClassChange={(v) => { setClass(v); setPage(1); }}
          section={section} onSectionChange={(v) => { setSection(v); setPage(1); }}
          status={status} onStatusChange={(v) => { setStatus(v); setPage(1); }}
        />
      </div>

      <StudentTable filters={filters} />

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <StudentForm
            onSubmit={handleCreate}
            isLoading={createStudent.isPending}
            onCancel={() => setAddOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
