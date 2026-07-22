import { FormEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import type { Route } from './+types/auth.reset-password';
import { AuthLayout } from '~/components/layout/AuthLayout';
import { PasswordInput } from '~/components/ui/PasswordInput';
import { Icon } from '~/components/icons/Icon';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Reset Password — FreshMart' }];
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password') ?? '');
    const confirm = String(form.get('confirmPassword') ?? '');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setDone(true);
    setTimeout(() => navigate('/auth/login'), 2000);
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        {done ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon id="check" width={28} height={28} />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#333333]">Password updated</h1>
            <p className="mt-3 text-sm text-body">
              Your password has been reset. Redirecting you to sign in…
            </p>
            <Link to="/auth/login" className="btn-primary mt-6 inline-flex">
              Sign in now
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h1 className="font-heading text-2xl font-bold text-[#333333]">Set a new password</h1>
              <p className="mt-2 text-sm text-body">
                {email
                  ? `Choose a new password for ${email}.`
                  : 'Choose a strong new password for your account.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <PasswordInput
                id="password"
                name="password"
                label="New password"
                required
                minLength={8}
                autoComplete="new-password"
                hint="Must be at least 8 characters long."
              />
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                required
                minLength={8}
                autoComplete="new-password"
              />

              {error && <p className="text-sm text-danger">{error}</p>}

              <button type="submit" className="btn-primary-lg w-full">
                Reset password
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-body">
              <Link to="/auth/login" className="font-semibold text-primary hover:underline">
                Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
