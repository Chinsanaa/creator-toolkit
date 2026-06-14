'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SponsorLoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();

  return (
    <AuthForm
      title={t('sponsor_sign_in')}
      subtitle={t('sponsor_sign_in_subtitle')}
      submitLabel={t('sign_in')}
      alternateHref="/signup/sponsor"
      alternatePrompt={t('new_sponsor')}
      alternateLabel={t('create_account')}
      beforeForm={<AuthTypeBackLink audience="sponsor" />}
      legalConsentMode="login"
      oauthUserType="sponsor"
      fields={[
        { name: 'email', label: t('email'), type: 'email', placeholder: 'you@company.com' },
        { name: 'password', label: t('password'), type: 'password', placeholder: '••••••••' },
      ]}
      onSubmit={async (values) => {
        await login({ email: values.email, password: values.password });
      }}
    />
  );
}
