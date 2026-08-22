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
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Emergency SOS</h2>
      <button
        onClick={handleSOS}
        disabled={loading}
        style={{ backgroundColor: 'red', color: 'white', padding: '15px 30px', fontSize: '18px', border: 'none', borderRadius: '8px' }}
      >
        {loading ? 'Getting Location...' : 'SOS - Find Nearby Hospitals'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {location && (
        <div style={{ marginTop: '20px' }}>
          <p>Your Location: {location.lat}, {location.lng}</p>
          <iframe
            title="hospital-map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=hospitals+near+${location.lat},${location.lng}&z=14&output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default EmergencySOS;