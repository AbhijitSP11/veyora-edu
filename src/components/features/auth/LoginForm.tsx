import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginInput } from '@/lib/validators';
import { COMPANY } from '@/config/constants';

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginInput) => login(data);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center size-10 rounded-xl bg-primary">
          <GraduationCap className="size-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-display">{COMPANY.PRODUCT_NAME.split(' ')[0]}</h1>
          <p className="text-xs text-gray-500">{COMPANY.NAME}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-950 font-display mb-1">Welcome back</h2>
      <p className="text-sm text-gray-500 mb-6">Sign in to your school portal</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Email address <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="you@school.edu"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">School Code</label>
          <Input type="text" placeholder="e.g. dpsnashik" {...register('schoolSlug')} />
          <p className="mt-1 text-xs text-gray-400">Leave blank if you're a Super Admin</p>
        </div>

        <Button type="submit" className="w-full mt-2" disabled={isLoggingIn}>
          {isLoggingIn ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-400">
        Powered by{' '}
        <span className="font-medium text-gray-600">{COMPANY.NAME}</span>
      </p>
    </div>
  );
}
