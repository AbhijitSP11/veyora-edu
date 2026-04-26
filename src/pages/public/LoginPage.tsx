import { LoginForm } from '@/components/features/auth/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-[#1e6b8a] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <LoginForm />
      </div>
    </div>
  );
}
