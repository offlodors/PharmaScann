// Configuration for API endpoints based on environment
export const getBaseUrl = (): string => {
  // Check if we're in a Capacitor mobile app
  if (typeof window !== 'undefined' && (window as any).Capacitor) {
    // Mobile app - no backend server
    return '';
  }
  
  // Web app in development
  if (import.meta.env.DEV) {
    return '';
  }
  
  // Web app in production
  return '';
};

export const isMobileApp = (): boolean => {
  return typeof window !== 'undefined' && (window as any).Capacitor;
};

export const isDevMode = (): boolean => {
  return import.meta.env.DEV;
};