import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pharmascan.app',
  appName: 'PharmaScanner',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https',
    allowNavigation: ['*'],
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos'],
      allowEditing: true,
      quality: 80,
      resultType: 'base64',
      source: 'prompt',
      saveToGallery: false
    },
    StatusBar: {
      style: 'default'
    },
    App: {
      allowMixedContent: true
    }
  }
};

export default config;
