import { useState } from 'react';
import axios from 'axios';

function VerifyPrescription() {
  const [prescriptionId, setPrescriptionId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setError('');
    setResult(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/prescriptions/verify/${prescriptionId}`);
      setResult(response.data.prescription);
    } catch (error) {
      setError('Prescription not found. This may not be genuine.');
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Verify Prescription</h2>
      <p className="card-subtitle">Enter the Prescription ID from the QR code to verify its authenticity.</p>

      <input
        className="form-input"
        type="text"
        placeholder="Enter Prescription ID"
        value={prescriptionId}
        onChange={(e) => setPrescriptionId(e.target.value)}
      />
      <button className="btn-primary" onClick={handleVerify}>Verify</button>

      {error && <p className="status-message" style={{ color: 'var(--color-accent)' }}>{error}</p>}

      {result && (
        <div className="list-item" style={{ marginTop: '20px', borderColor: 'var(--color-success)' }}>
          <p style={{ color: 'var(--color-success)', fontWeight: '600', margin: '0 0 10px 0' }}>✅ Genuine Prescription</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>Patient:</strong> {result.patient.name} ({result.patient.age} yrs, {result.patient.gender})</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>Doctor:</strong> Dr. {result.doctor.name} ({result.doctor.specialization})</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>Medicines:</strong> {result.medicines}</p>
          {result.notes && <p style={{ margin: 0 }}><strong>Notes:</strong> {result.notes}</p>}
        </div>
      )}
    </div>
  );
}

export default VerifyPrescription;