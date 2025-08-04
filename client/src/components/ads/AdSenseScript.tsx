import { useEffect } from 'react';

interface AdSenseScriptProps {
  clientId: string;
}

export function AdSenseScript({ clientId }: AdSenseScriptProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && clientId) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      script.crossOrigin = 'anonymous';
      
      document.head.appendChild(script);

      return () => {
        // Cleanup script on unmount
        const existingScript = document.querySelector(`script[src*="${clientId}"]`);
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [clientId]);

  return null;
}

export default AdSenseScript;