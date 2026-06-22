'use client';

import { SignupForm } from '@/components/auth/SignupForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { appendNextParam } from '@/lib/auth/navigation';

export default function CreatorSignupPage() {
  const { signup } = useAuth();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');

  return (
    <SignupForm
      title={t('create_creator_account')}
      subtitle={t('create_creator_account_subtitle')}
      submitLabel={t('create_account')}
      alternateHref={appendNextParam('/login/creator', nextPath)}
      alternatePrompt={t('already_have_account')}
      alternateLabel={t('sign_in')}
      beforeForm={<AuthTypeBackLink audience="creator" />}
      oauthUserType="creator"
      firstNamePlaceholder="Jane"
      lastNamePlaceholder="Doe"
      usernamePlaceholder="creator_handle"
      emailLabel={t('email')}
      emailPlaceholder="you@example.com"
      onSubmit={async (values) => {
        await signup({
          email: values.email,
          password: values.password,
          name: values.name,
          username: values.username,
          userType: 'creator',
          acceptedTerms: values.acceptedTerms,
        });
      }}
    />
  );
}
