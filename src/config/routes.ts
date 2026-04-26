export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',

  // Admin
  ADMIN_DASHBOARD: '/:schoolSlug/admin/dashboard',
  ADMIN_STUDENTS: '/:schoolSlug/admin/students',
  ADMIN_STUDENT_DETAIL: '/:schoolSlug/admin/students/:studentId',
  ADMIN_NOTIFICATIONS: '/:schoolSlug/admin/notifications',
  ADMIN_ATTENDANCE: '/:schoolSlug/admin/attendance',
  ADMIN_MARKS: '/:schoolSlug/admin/marks',
  ADMIN_REPORT_CARDS: '/:schoolSlug/admin/report-cards',
  ADMIN_FEES: '/:schoolSlug/admin/fees',
  ADMIN_REPORTS: '/:schoolSlug/admin/reports',
  ADMIN_SETTINGS: '/:schoolSlug/admin/settings',

  // Student
  STUDENT_DASHBOARD: '/:schoolSlug/student/dashboard',
  STUDENT_PROFILE: '/:schoolSlug/student/profile',
  STUDENT_NOTIFICATIONS: '/:schoolSlug/student/notifications',
  STUDENT_DOCUMENTS: '/:schoolSlug/student/documents',
  STUDENT_ATTENDANCE: '/:schoolSlug/student/attendance',
  STUDENT_MARKS: '/:schoolSlug/student/marks',
  STUDENT_FEES: '/:schoolSlug/student/fees',

  // Super Admin
  SUPER_ADMIN_SCHOOLS: '/super-admin/schools',
  SUPER_ADMIN_ONBOARDING: '/super-admin/schools',
  SUPER_ADMIN_SETTINGS: '/super-admin/settings',
} as const;

export function adminPath(schoolSlug: string, path: string): string {
  return `/${schoolSlug}/admin/${path}`;
}

export function studentPath(schoolSlug: string, path: string): string {
  return `/${schoolSlug}/student/${path}`;
}
