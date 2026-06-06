'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';

export default function SponsorSignupPage() {
  const { signup } = useAuth();

  return (
    <AuthForm
      title="Create sponsor account"
      subtitle="Post campaigns and review creator applications on Earnio."
      submitLabel="Create sponsor account"
      alternateHref="/login/sponsor"
      alternatePrompt="Already have an account?"
      alternateLabel="Sign in"
      beforeForm={<AuthTypeBackLink audience="sponsor" />}
      legalConsentMode="signup"
      oauthUserType="sponsor"
      fields={[
        { name: 'name', label: 'Company or brand name', placeholder: 'Your brand' },
        { name: 'username', label: 'Username', placeholder: 'brand_handle' },
        { name: 'email', label: 'Work email', type: 'email', placeholder: 'you@company.com' },
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
          userType: 'sponsor',
          acceptedTerms: values.acceptedTerms === 'true',
        });
      }}
    />
  );
}
