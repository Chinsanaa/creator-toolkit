'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { appendNextParam } from '@/lib/auth/navigation';

export default function SponsorLoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');

  return (
    <AuthForm
      title={t('sponsor_sign_in')}
      subtitle={t('sponsor_sign_in_subtitle')}
      submitLabel={t('sign_in')}
      alternateHref={appendNextParam('/signup/sponsor', nextPath)}
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
