import { FormEvent, useState } from 'react';
import { Link } from 'react-router';
import type { Route } from './+types/auth.forgot-password';
import { AuthLayout } from '~/components/layout/AuthLayout';
import { Icon } from '~/components/icons/Icon';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Forgot Password — FreshMart' }];
}

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setEmail(String(form.get('email') ?? ''));
    setSubmitted(true);
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        {submitted ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon id="check" width={28} height={28} />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#333333]">Check your email</h1>
            <p className="mt-3 text-sm leading-relaxed text-body">
              We sent a password reset link to <strong className="text-[#333333]">{email}</strong>. Click
              the link in the email to set a new password.
            </p>
            <p className="mt-4 text-xs text-body">
              Didn&apos;t get it? Check spam, or try again in a few minutes.
            </p>
            <div className="mt-6 space-y-3">
              <Link
                to={`/auth/reset-password?email=${encodeURIComponent(email)}`}
                className="btn-primary-lg block w-full text-center"
              >
                Continue to reset password
              </Link>
              <Link to="/auth/login" className="block text-sm font-medium text-primary hover:underline">
                Back to sign in
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h1 className="font-heading text-2xl font-bold text-[#333333]">Forgot password?</h1>
              <p className="mt-2 text-sm text-body">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>
              <button type="submit" className="btn-primary-lg w-full">
                Send reset link
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-body">
              Remember your password?{' '}
              <Link to="/auth/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
