import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/models';

// DEV: mock user so all pages render without a real login
const DEV_USER: User = {
  id: 'dev-user-1',
  schoolId: 'dev-school-1',
  name: 'Ayush Sharma',
  email: 'admin@demo.com',
  role: 'SCHOOL_ADMIN',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface AuthState {
  user: User | null;
  accessToken: string | null;
  schoolSlug: string | null;
  setAuth: (user: User, accessToken: string, schoolSlug?: string) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEV_USER,
      accessToken: 'dev-token',
      schoolSlug: 'demo-school',

      setAuth: (user, accessToken, schoolSlug) =>
        set({ user, accessToken, schoolSlug: schoolSlug ?? null }),

      setAccessToken: (token) => set({ accessToken: token }),

      logout: () => set({ user: null, accessToken: null, schoolSlug: null }),
    }),
    {
      name: 'veyora-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        schoolSlug: state.schoolSlug,
      }),
    },
  ),
);
