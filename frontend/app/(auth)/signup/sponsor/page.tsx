'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SponsorSignupPage() {
  const { signup } = useAuth();
  const { t } = useLanguage();

  return (
    <AuthForm
      title={t('create_sponsor_account')}
      subtitle={t('create_sponsor_account_subtitle')}
      submitLabel={t('create_sponsor_account')}
      alternateHref="/login/sponsor"
      alternatePrompt={t('already_have_account')}
      alternateLabel={t('sign_in')}
      beforeForm={<AuthTypeBackLink audience="sponsor" />}
      legalConsentMode="signup"
      oauthUserType="sponsor"
      fields={[
        { name: 'name', label: t('company_or_brand_name'), placeholder: 'Your brand' },
        { name: 'username', label: t('username'), placeholder: 'brand_handle' },
        { name: 'email', label: t('work_email'), type: 'email', placeholder: 'you@company.com' },
        {
          name: 'password',
          label: t('password'),
          type: 'password',
          placeholder: t('at_least_8_chars'),
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
