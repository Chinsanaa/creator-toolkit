'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';

export default function CreatorLoginPage() {
  const { login } = useAuth();

  return (
    <AuthForm
      title="Creator sign in"
      subtitle="Sign in to manage your earnings, sponsorships, and wallet."
      submitLabel="Sign in"
      alternateHref="/signup/creator"
      alternatePrompt="New creator?"
      alternateLabel="Create account"
      beforeForm={<AuthTypeBackLink audience="creator" />}
      legalConsentMode="login"
      oauthUserType="creator"
      fields={[
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
      ]}
      onSubmit={async (values) => {
        await login({ email: values.email, password: values.password });
      }}
    />
  );
}
