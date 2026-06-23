'use client';

import { SignupForm } from '@/components/auth/SignupForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { appendNextParam } from '@/lib/auth/navigation';

export default function SponsorSignupPage() {
  const { signup } = useAuth();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');

  return (
    <SignupForm
      title={t('create_sponsor_account')}
      subtitle={t('create_sponsor_account_subtitle')}
      submitLabel={t('create_sponsor_account')}
      alternateHref={appendNextParam('/login/sponsor', nextPath)}
      alternatePrompt={t('already_have_account')}
      alternateLabel={t('sign_in')}
      beforeForm={<AuthTypeBackLink audience="sponsor" />}
      oauthUserType="sponsor"
      nameLabel={t('company_or_brand_name')}
      namePlaceholder="Acme Inc."
      usernamePlaceholder="brand_handle"
      emailLabel={t('work_email')}
      emailPlaceholder="you@company.com"
      onSubmit={async (values) => {
        await signup({
          email: values.email,
          password: values.password,
          name: values.name,
          username: values.username,
          userType: 'sponsor',
          acceptedTerms: values.acceptedTerms,
        });
      }}
    />
  );
}
