'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CreatorSignupPage() {
  const { signup } = useAuth();
  const { t } = useLanguage();

  return (
    <AuthForm
      title={t('create_creator_account')}
      subtitle={t('create_creator_account_subtitle')}
      submitLabel={t('create_account')}
      alternateHref="/login/creator"
      alternatePrompt={t('already_have_account')}
      alternateLabel={t('sign_in')}
      beforeForm={<AuthTypeBackLink audience="creator" />}
      legalConsentMode="signup"
      oauthUserType="creator"
      fields={[
        { name: 'name', label: t('full_name'), placeholder: 'Your name' },
        { name: 'username', label: t('username'), placeholder: 'creator_handle' },
        { name: 'email', label: t('email'), type: 'email', placeholder: 'you@example.com' },
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
          userType: 'creator',
          acceptedTerms: values.acceptedTerms === 'true',
        });
      }}
    />
  );
}
