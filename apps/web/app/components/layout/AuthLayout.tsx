import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="auth-page">
      <div className="container-lg mx-auto max-w-md px-4">{children}</div>
    </section>
  );
}
