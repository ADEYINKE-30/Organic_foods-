import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import type { Route } from './+types/auth.login';
import { SocialLoginButtons } from '~/components/auth/SocialLoginButtons';
import { AuthLayout } from '~/components/layout/AuthLayout';
import { PasswordInput } from '~/components/ui/PasswordInput';
import { useAuthStore } from '~/store/auth.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Login — FreshMart' }];
}

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    login({ id: '1', email, firstName: 'Fresh', lastName: 'Mart' }, 'mock-access-token');
    navigate('/account');
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="mb-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-[#333333]">Welcome back!</h1>
          <p className="mt-2 text-sm text-body">Let&apos;s get your fresh groceries.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className="form-input" />
          </div>

          <PasswordInput
            id="password"
            name="password"
            required
            autoComplete="current-password"
            labelExtra={
              <Link
                to="/auth/forgot-password"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            }
          />

          {error && <p className="text-sm text-danger">{error}</p>}

          <label className="flex items-center gap-2 text-sm text-body">
            <input type="checkbox" name="remember" className="rounded border-gray-300 text-primary" />
            Remember me
          </label>

          <button type="submit" className="btn-primary-lg w-full">
            Sign in
          </button>
        </form>

        <div className="mt-6">
          <SocialLoginButtons />
        </div>

        <p className="mt-6 text-center text-sm text-body">
          Don&apos;t have an account?{' '}
          <Link to="/auth/register" className="font-semibold text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
