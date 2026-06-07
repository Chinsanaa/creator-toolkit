import type { CapacitorConfig } from '@capacitor/cli';

const serverUrl = process.env.CAPACITOR_SERVER_URL?.trim();

const config: CapacitorConfig = {
  appId: 'app.earnio.mobile',
  appName: 'Earnio',
  webDir: 'frontend/public',
  server: serverUrl
    ? {
        url: serverUrl,
        cleartext: serverUrl.startsWith('http://'),
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
