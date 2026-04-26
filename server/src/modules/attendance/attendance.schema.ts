import { z } from 'zod';

export const markAttendanceSchema = z.object({
  date: z.string(),
  class: z.string(),
  section: z.string(),
  records: z.array(z.object({
    studentId: z.string(),
    status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY']),
    remarks: z.string().optional(),
  })),
});

export const attendanceQuerySchema = z.object({
  class: z.string().optional(),
  section: z.string().optional(),
  date: z.string().optional(),
});

export const attendanceReportQuerySchema = z.object({
  studentId: z.string(),
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number(),
});

export type MarkAttendanceInput = z.infer<typeof markAttendanceSchema>;
