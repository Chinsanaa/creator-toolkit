'use client';

import { useEffect } from 'react';

export function ApplePlatformBootstrap() {
  useEffect(() => {
    let cancelled = false;
    let removeAppUrlListener: (() => void) | undefined;

    void (async () => {
      try {
        const { Capacitor } = await import('@capacitor/core');
        if (!Capacitor.isNativePlatform() || cancelled) return;

        const platform = Capacitor.getPlatform();
        document.documentElement.classList.add('native-app', `native-${platform}`);

        if (platform === 'ios') {
          document.documentElement.classList.add('apple-platform');
        }

        const { StatusBar, Style } = await import('@capacitor/status-bar');
        const { SplashScreen } = await import('@capacitor/splash-screen');

        await StatusBar.setStyle({ style: Style.Dark });
        await SplashScreen.hide();

        const { App } = await import('@capacitor/app');
        const listener = await App.addListener('appUrlOpen', (event) => {
          try {
            const url = new URL(event.url);
            if (url.protocol !== 'app.earnio.mobile:') return;

            const callbackPath = url.pathname.replace(/^\//, '') || 'callback';
            if (callbackPath !== 'callback') return;

            const next = `/auth/callback${url.search}`;
            window.location.assign(next);
          } catch {
            // ignore malformed callback URLs
          }
        });

        removeAppUrlListener = () => {
          void listener.remove();
        };
      } catch {
        // Capacitor unavailable in web-only builds
      }
    })();

    return () => {
      cancelled = true;
      removeAppUrlListener?.();
    };
  }, []);

  return null;
}
