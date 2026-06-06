'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';

export default function CreatorSignupPage() {
  const { signup } = useAuth();

  return (
    <AuthForm
      title="Create creator account"
      subtitle="Track earnings, apply to sponsorships, and manage payouts."
      submitLabel="Create account"
      alternateHref="/login/creator"
      alternatePrompt="Already have an account?"
      alternateLabel="Sign in"
      beforeForm={<AuthTypeBackLink audience="creator" />}
      fields={[
        { name: 'name', label: 'Full name', placeholder: 'Your name' },
        { name: 'username', label: 'Username', placeholder: 'creator_handle' },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'At least 8 characters',
        },
      ]}
      onSubmit={async (values) => {
        await signup({
          email: values.email,
          password: values.password,
          name: values.name,
          username: values.username,
          userType: 'creator',
        });
      }}
    />
  );
}
