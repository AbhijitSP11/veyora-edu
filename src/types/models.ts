import type {
  Role,
  AttendanceStatus,
  ExamType,
  MarksStatus,
  FeeStatus,
  FeeType,
  NotificationType,
  DocumentType,
  DocumentStatus,
  StudentStatus,
} from './enums';

export interface School {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  principalName: string;
  isActive: boolean;
  subscriptionPlan: string;
  subscriptionExpiry: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  schoolId: string;
  rollNumber: string;
  name: string;
  email?: string;
  phone?: string;
  class: string;
  section: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  avatarUrl?: string;
  status: StudentStatus;
  admissionDate: string;
  metadata?: Record<string, unknown>;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  schoolId: string;
  title: string;
  body: string;
  type: NotificationType;
  targetClass?: string;
  targetSection?: string;
  targetStudentId?: string;
  sentBy: string;
  sentVia: string[];
  readBy?: string[];
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  schoolId: string;
  studentId: string;
  type: DocumentType;
  status: DocumentStatus;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  verifiedBy?: string;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Fee {
  id: string;
  schoolId: string;
  studentId: string;
  feeType: FeeType;
  description: string;
  amount: number;
  dueDate: string;
  status: FeeStatus;
  paidAmount?: number;
  paidDate?: string;
  paymentMode?: string;
  paymentReference?: string;
  academicYear: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  schoolId: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  markedBy: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Exam {
  id: string;
  schoolId: string;
  name: string;
  examType: ExamType;
  academicYear: string;
  class: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  class: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Marks {
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  subjectId: string;
  maxMarks: number;
  marksObtained: number;
  grade?: string;
  isAbsent: boolean;
  enteredBy: string;
  status: MarksStatus;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GradingBand {
  grade: string;
  min: number;
  max: number;
}

export interface GradingScale {
  id: string;
  schoolId: string;
  name: string;
  bands: GradingBand[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
