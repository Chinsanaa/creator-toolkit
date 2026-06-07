export type NativePlatform = 'ios' | 'android' | 'web';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export async function getNativePlatform(): Promise<NativePlatform> {
  if (!isBrowser()) return 'web';

  try {
    const { Capacitor } = await import('@capacitor/core');
    const platform = Capacitor.getPlatform();
    if (platform === 'ios') return 'ios';
    if (platform === 'android') return 'android';
    return 'web';
  } catch {
    return 'web';
  }
}

export async function isNativeApp(): Promise<boolean> {
  if (!isBrowser()) return false;

  try {
    const { Capacitor } = await import('@capacitor/core');
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

export async function getOAuthRedirectOrigin(): Promise<string> {
  if (await isNativeApp()) {
    return 'app.earnio.mobile://auth';
  }
  return window.location.origin;
}
