import { getOAuthRedirectOrigin } from '@/lib/native/platform';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { UserType } from '@/lib/types/auth';

export type OAuthProvider = 'google' | 'apple';

export async function startOAuthSignIn(provider: OAuthProvider, userType: UserType): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  const params = new URLSearchParams({ user_type: userType });
  const origin = await getOAuthRedirectOrigin();
  const redirectTo = `${origin}/callback?${params.toString()}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.url) {
    throw new Error('Could not start social sign-in. Please try again.');
  }

  try {
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.isNativePlatform()) {
      const { Browser } = await import('@capacitor/browser');
      await Browser.open({ url: data.url, presentationStyle: 'popover' });
      return;
    }
  } catch {
    // fall through to full-page redirect on web
  }

  window.location.assign(data.url);
}
