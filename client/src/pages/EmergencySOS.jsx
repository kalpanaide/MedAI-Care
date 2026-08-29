import { useState } from 'react';

function EmergencySOS() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSOS = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError('Unable to get location. Please allow location access.');
        setLoading(false);
        console.log(err);
      }
    );
  };

  return (
    <div className="card" style={{ textAlign: 'center', maxWidth: '520px' }}>
      <h2>Emergency SOS</h2>
      <p className="card-subtitle">Find nearby hospitals in one tap</p>

      <button
        className="btn-danger"
        onClick={handleSOS}
        disabled={loading}
      >
        {loading ? 'Getting Location...' : 'SOS - Find Nearby Hospitals'}
      </button>

      {error && <p className="status-message" style={{ color: 'var(--color-accent)' }}>{error}</p>}

      {location && (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
            Your Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
          <iframe
            title="hospital-map"
            width="100%"
            height="380"
            style={{ border: 0, borderRadius: 'var(--radius)' }}
            src={`https://maps.google.com/maps?q=hospitals+near+${location.lat},${location.lng}&z=14&output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default EmergencySOS;