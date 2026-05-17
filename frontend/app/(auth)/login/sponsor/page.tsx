'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';

export default function SponsorLoginPage() {
  const { login } = useAuth();

  return (
    <AuthForm
      title="Sponsor sign in"
      subtitle="Sign in to manage campaigns and review creator applications."
      submitLabel="Sign in"
      alternateHref="/signup/sponsor"
      alternatePrompt="New sponsor?"
      alternateLabel="Create account"
      beforeForm={<AuthTypeBackLink mode="login" />}
      fields={[
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
      ]}
      onSubmit={async (values) => {
        await login({ email: values.email, password: values.password });
      }}
    />
  );
}
