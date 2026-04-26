import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { post } from '@/lib/api';
import type { LoginInput } from '@/lib/validators';
import type { User } from '@/types/models';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  schoolSlug?: string;
}

export function useAuth() {
  const { user, accessToken, schoolSlug, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginInput) =>
      post<LoginResponse>('/auth/login', credentials),
    onSuccess: (response) => {
      if (!response.success) return;
      const { accessToken, refreshToken, user, schoolSlug } = response.data;
      localStorage.setItem('refresh_token', refreshToken);
      if (schoolSlug) localStorage.setItem('school_slug', schoolSlug);
      setAuth(user, accessToken, schoolSlug);
      if (user.role === 'SUPER_ADMIN') {
        navigate('/super-admin/schools');
      } else if (user.role === 'STUDENT') {
        navigate(`/${schoolSlug}/student/dashboard`);
      } else {
        navigate(`/${schoolSlug}/admin/dashboard`);
      }
    },
  });

  const handleLogout = () => {
    logout();
    queryClient.clear();
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('school_slug');
    navigate('/login');
  };

  return {
    user,
    accessToken,
    schoolSlug,
    isAuthenticated: !!user && !!accessToken,
    isAdmin: user?.role === 'SCHOOL_ADMIN' || user?.role === 'SUPER_ADMIN',
    isTeacher: user?.role === 'TEACHER',
    isStudent: user?.role === 'STUDENT',
    isSuperAdmin: user?.role === 'SUPER_ADMIN',
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: handleLogout,
  };
}
