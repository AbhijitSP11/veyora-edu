import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { studentSchema, type StudentInput } from '@/lib/validators';
import { CLASS_LIST, SECTION_LIST } from '@/config/constants';
import type { Student } from '@/types/models';

interface StudentFormProps {
  defaultValues?: Partial<Student>;
  onSubmit: (data: StudentInput) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function StudentForm({ defaultValues, onSubmit, isLoading, onCancel }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StudentInput>({
    resolver: zodResolver(studentSchema),
    defaultValues: defaultValues as StudentInput,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name <span className="text-red-500">*</span></label>
            <Input {...register('name')} placeholder="Rahul Sharma" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Roll Number <span className="text-red-500">*</span></label>
            <Input {...register('rollNumber')} placeholder="2024001" className="font-mono" />
            {errors.rollNumber && <p className="mt-1 text-xs text-red-600">{errors.rollNumber.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Class <span className="text-red-500">*</span></label>
            <Select value={watch('class')} onValueChange={(v) => setValue('class', v)}>
              <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
              <SelectContent>
                {CLASS_LIST.map((c) => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.class && <p className="mt-1 text-xs text-red-600">{errors.class.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Section <span className="text-red-500">*</span></label>
            <Select value={watch('section')} onValueChange={(v) => setValue('section', v)}>
              <SelectTrigger><SelectValue placeholder="Select section" /></SelectTrigger>
              <SelectContent>
                {SECTION_LIST.map((s) => <SelectItem key={s} value={s}>Section {s}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.section && <p className="mt-1 text-xs text-red-600">{errors.section.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Gender <span className="text-red-500">*</span></label>
            <Select value={watch('gender')} onValueChange={(v) => setValue('gender', v as 'MALE' | 'FEMALE' | 'OTHER')}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
            <Input type="date" {...register('dateOfBirth')} />
            {errors.dateOfBirth && <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Admission Date <span className="text-red-500">*</span></label>
            <Input type="date" {...register('admissionDate')} />
            {errors.admissionDate && <p className="mt-1 text-xs text-red-600">{errors.admissionDate.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone</label>
            <Input {...register('phone')} placeholder="9876543210" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Address</label>
            <Input {...register('address')} placeholder="House No, Street, City" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Parent / Guardian</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Parent Name</label>
            <Input {...register('parentName')} placeholder="Ramesh Sharma" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Parent Phone</label>
            <Input {...register('parentPhone')} placeholder="9876543210" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">Parent Email</label>
            <Input {...register('parentEmail')} type="email" placeholder="parent@email.com" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : defaultValues ? 'Save Changes' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
}
