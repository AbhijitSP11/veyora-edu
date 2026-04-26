import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { get, post, put, del } from '@/lib/api';
import { queryKeys } from '@/config/queryKeys';
import { useTenant } from './useTenant';
import type { Student } from '@/types/models';
import type { StudentInput } from '@/lib/validators';

interface StudentFilters extends Record<string, unknown> {
  class?: string;
  section?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export function useStudents(filters?: StudentFilters) {
  const { schoolSlug } = useTenant();

  return useQuery({
    queryKey: queryKeys.students.list(schoolSlug, filters),
    queryFn: () => get<Student[]>('/students', filters),
    enabled: !!schoolSlug,
  });
}

export function useStudent(studentId: string) {
  const { schoolSlug } = useTenant();

  return useQuery({
    queryKey: queryKeys.students.detail(schoolSlug, studentId),
    queryFn: () => get<Student>(`/students/${studentId}`),
    enabled: !!schoolSlug && !!studentId,
  });
}

export function useCreateStudent() {
  const queryClient = useQueryClient();
  const { schoolSlug } = useTenant();

  return useMutation({
    mutationFn: (data: StudentInput) => post<Student>('/students', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all(schoolSlug) });
    },
  });
}

export function useUpdateStudent(studentId: string) {
  const queryClient = useQueryClient();
  const { schoolSlug } = useTenant();

  return useMutation({
    mutationFn: (data: Partial<StudentInput>) => put<Student>(`/students/${studentId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all(schoolSlug) });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.detail(schoolSlug, studentId) });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();
  const { schoolSlug } = useTenant();

  return useMutation({
    mutationFn: (studentId: string) => del<void>(`/students/${studentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all(schoolSlug) });
    },
  });
}
