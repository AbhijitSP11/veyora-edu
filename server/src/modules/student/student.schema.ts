import { z } from 'zod';

export const createStudentSchema = z.object({
  rollNumber: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  class: z.string().min(1),
  section: z.string().min(1),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string(),
  address: z.string().optional(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  parentEmail: z.string().email().optional(),
  admissionDate: z.string(),
});

export const listStudentsQuerySchema = z.object({
  class: z.string().optional(),
  section: z.string().optional(),
  search: z.string().optional(),
  status: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type ListStudentsQuery = z.infer<typeof listStudentsQuerySchema>;
