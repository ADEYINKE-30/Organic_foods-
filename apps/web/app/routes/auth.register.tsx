import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import type { Route } from './+types/auth.register';
import { SocialLoginButtons } from '~/components/auth/SocialLoginButtons';
import { AuthLayout } from '~/components/layout/AuthLayout';
import { PasswordInput } from '~/components/ui/PasswordInput';
import { useAuthStore } from '~/store/auth.store';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Register — FreshMart' }];
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    login(
      {
        id: '1',
        email: String(form.get('email') ?? ''),
        firstName: String(form.get('firstName') ?? ''),
        lastName: String(form.get('lastName') ?? ''),
      },
      'mock-access-token',
    );
    navigate('/account');
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="mb-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-[#333333]">Join FreshMart</h1>
          <p className="mt-2 text-sm text-body">
            Create an account for faster checkout and exclusive offers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label" htmlFor="firstName">
                First name
              </label>
              <input id="firstName" name="firstName" required className="form-input" />
            </div>
            <div>
              <label className="form-label" htmlFor="lastName">
                Last name
              </label>
              <input id="lastName" name="lastName" required className="form-input" />
            </div>
          </div>
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
            minLength={8}
            autoComplete="new-password"
            hint="Must be at least 8 characters long."
          />
          <button type="submit" className="btn-primary-lg w-full">
            Create account
          </button>
        </form>

        <div className="mt-6">
          <SocialLoginButtons />
        </div>

        <p className="mt-6 text-center text-sm text-body">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
