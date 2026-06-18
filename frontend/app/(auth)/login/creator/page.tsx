'use client';

import Link from 'next/link';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthTypeBackLink } from '@/components/auth/AuthTypeBackLink';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { appendNextParam } from '@/lib/auth/navigation';

export default function CreatorLoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next');

  return (
    <AuthForm
      title={t('creator_sign_in')}
      subtitle={t('creator_sign_in_subtitle')}
      submitLabel={t('sign_in')}
      alternateHref={appendNextParam('/signup/creator', nextPath)}
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
      afterPassword={
        <div className="text-right">
          <Link href={appendNextParam('/forgot-password', nextPath)} className="text-sm text-blue-600 hover:text-blue-700">
            {t('forgot_password')}
          </Link>
        </div>
      }
    />
  );
}
