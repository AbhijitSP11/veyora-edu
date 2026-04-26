import type { Role } from '@/types/enums';
import type { User } from '@/types/models';

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  localStorage.removeItem('school_slug');
}

export function hasRole(user: User | null, roles: Role[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}

export function isAdmin(user: User | null): boolean {
  return hasRole(user, ['SUPER_ADMIN', 'SCHOOL_ADMIN']);
}

export function isTeacher(user: User | null): boolean {
  return hasRole(user, ['TEACHER']);
}

export function isStudent(user: User | null): boolean {
  return hasRole(user, ['STUDENT']);
}

export function canManageStudents(user: User | null): boolean {
  return hasRole(user, ['SUPER_ADMIN', 'SCHOOL_ADMIN', 'TEACHER']);
}
