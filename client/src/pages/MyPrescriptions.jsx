import { useState, useEffect } from 'react';
import axios from 'axios';

function MyPrescriptions({ patientId }) {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios.get(`https://medai-care-backend.onrender.com/api/prescriptions/patient/${patientId}`)
      .then((response) => setPrescriptions(response.data))
      .catch((error) => console.log(error));
  }, [patientId]);

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h2>My Prescriptions</h2>
      <p className="card-subtitle">All prescriptions issued to you</p>

      {prescriptions.length === 0 && <p className="empty-state">No prescriptions yet.</p>}
      {prescriptions.map((presc) => (
        <div key={presc._id} className="list-item">
          <h4>Dr. {presc.doctor.name} - {presc.doctor.specialization}</h4>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
            {presc.medicines}
          </p>
          {presc.notes && (
            <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Note: {presc.notes}
            </p>
          )}
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-muted)' }}>
            {new Date(presc.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyPrescriptions;