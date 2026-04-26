import { z } from 'zod';

export const saveMarksSchema = z.object({
  examId: z.string(),
  subjectId: z.string(),
  entries: z.array(z.object({
    studentId: z.string(),
    marksObtained: z.number().min(0),
    isAbsent: z.boolean().default(false),
    remarks: z.string().optional(),
  })),
});

export const marksQuerySchema = z.object({
  examId: z.string(),
  class: z.string(),
  section: z.string(),
  subject: z.string().optional(),
});

export type SaveMarksInput = z.infer<typeof saveMarksSchema>;
