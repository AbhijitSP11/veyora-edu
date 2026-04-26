export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const AttendanceStatus = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  HALF_DAY: 'HALF_DAY',
} as const;
export type AttendanceStatus = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

export const ExamType = {
  UNIT_TEST: 'UNIT_TEST',
  MID_TERM: 'MID_TERM',
  FINAL: 'FINAL',
  PRACTICAL: 'PRACTICAL',
  INTERNAL: 'INTERNAL',
} as const;
export type ExamType = (typeof ExamType)[keyof typeof ExamType];

export const MarksStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
} as const;
export type MarksStatus = (typeof MarksStatus)[keyof typeof MarksStatus];

export const FeeStatus = {
  PAID: 'PAID',
  PENDING: 'PENDING',
  OVERDUE: 'OVERDUE',
  PARTIAL: 'PARTIAL',
} as const;
export type FeeStatus = (typeof FeeStatus)[keyof typeof FeeStatus];

export const FeeType = {
  TUITION: 'TUITION',
  TRANSPORT: 'TRANSPORT',
  EXAM: 'EXAM',
  LIBRARY: 'LIBRARY',
  SPORTS: 'SPORTS',
  OTHER: 'OTHER',
} as const;
export type FeeType = (typeof FeeType)[keyof typeof FeeType];

export const NotificationType = {
  PERSONAL: 'PERSONAL',
  CLASS: 'CLASS',
  BROADCAST: 'BROADCAST',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const DocumentType = {
  BIRTH_CERTIFICATE: 'BIRTH_CERTIFICATE',
  TRANSFER_CERTIFICATE: 'TRANSFER_CERTIFICATE',
  AADHAR: 'AADHAR',
  MARKSHEET: 'MARKSHEET',
  PHOTO: 'PHOTO',
  OTHER: 'OTHER',
} as const;
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const DocumentStatus = {
  VERIFIED: 'VERIFIED',
  PENDING: 'PENDING',
  MISSING: 'MISSING',
  REJECTED: 'REJECTED',
} as const;
export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus];

export const StudentStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  TRANSFERRED: 'TRANSFERRED',
  ALUMNI: 'ALUMNI',
} as const;
export type StudentStatus = (typeof StudentStatus)[keyof typeof StudentStatus];
