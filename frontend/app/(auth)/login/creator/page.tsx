'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CreatorLoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();

  return (
    <AuthForm
      title={t('creator_sign_in')}
      subtitle={t('creator_sign_in_subtitle')}
      submitLabel={t('sign_in')}
      alternateHref="/signup/creator"
      alternatePrompt={t('new_creator')}
      alternateLabel={t('create_account')}
      beforeForm={<AuthTypeBackLink audience="creator" />}
      legalConsentMode="login"
      oauthUserType="creator"
      fields={[
        { name: 'email', label: t('email'), type: 'email', placeholder: 'you@example.com' },
        { name: 'password', label: t('password'), type: 'password', placeholder: '••••••••' },
      ]}
      onSubmit={async (values) => {
        await login({ email: values.email, password: values.password });
      }}
    />
  );
}
