import type { CapacitorConfig } from '@capacitor/cli';

const serverUrl = process.env.CAPACITOR_SERVER_URL?.trim();

function allowsLocalCleartext(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === 'http:' &&
      (parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname === '[::1]' ||
        parsed.hostname === '::1')
    );
  } catch {
    return false;
  }
}

if (serverUrl?.startsWith('http://') && !allowsLocalCleartext(serverUrl)) {
  throw new Error('CAPACITOR_SERVER_URL must use HTTPS unless it points to localhost.');
}

const config: CapacitorConfig = {
  appId: 'app.earnio.mobile',
  appName: 'Earnio',
  webDir: 'frontend/public',
  server: serverUrl
    ? {
        url: serverUrl,
        cleartext: allowsLocalCleartext(serverUrl),
        androidScheme: 'https',
      }
    : undefined,
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    allowsLinkPreview: false,
    scheme: 'Earnio',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#eef6ff',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#eef6ff',
    },
  },
};

export default config;
