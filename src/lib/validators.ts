import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  schoolSlug: z.string().optional(),
});

export const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  parentEmail: z.string().email().optional().or(z.literal('')),
  admissionDate: z.string().min(1, 'Admission date is required'),
});

export const notificationSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  body: z.string().min(10, 'Message body must be at least 10 characters'),
  type: z.enum(['PERSONAL', 'CLASS', 'BROADCAST']),
  targetClass: z.string().optional(),
  targetSection: z.string().optional(),
  targetStudentId: z.string().optional(),
  sentVia: z.array(z.enum(['IN_APP', 'SMS', 'WHATSAPP', 'EMAIL'])).min(1, 'Select at least one channel'),
});

export const attendanceSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  class: z.string().min(1, 'Class is required'),
  section: z.string().min(1, 'Section is required'),
  records: z.array(
    z.object({
      studentId: z.string(),
      status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY']),
      remarks: z.string().optional(),
    }),
  ),
});

export const marksEntrySchema = z.object({
  examId: z.string().min(1, 'Exam is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  records: z.array(
    z.object({
      studentId: z.string(),
      marksObtained: z.number().min(0),
      isAbsent: z.boolean().default(false),
      remarks: z.string().optional(),
    }),
  ),
});

export const feeSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  feeType: z.enum(['TUITION', 'TRANSPORT', 'EXAM', 'LIBRARY', 'SPORTS', 'OTHER']),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  dueDate: z.string().min(1, 'Due date is required'),
  academicYear: z.string().min(1, 'Academic year is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type StudentInput = z.infer<typeof studentSchema>;
export type NotificationInput = z.infer<typeof notificationSchema>;
export type AttendanceInput = z.infer<typeof attendanceSchema>;
export type MarksEntryInput = z.infer<typeof marksEntrySchema>;
export type FeeInput = z.infer<typeof feeSchema>;
