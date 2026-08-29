import { useState, useEffect } from 'react';

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div style={{
      backgroundColor: 'var(--color-accent)',
      color: 'white',
      textAlign: 'center',
      padding: '8px',
      fontSize: '14px',
      fontWeight: '500'
    }}>
      You're offline. Some features may not work, but your saved data is still available.
    </div>
  );
}

export default NetworkStatus;