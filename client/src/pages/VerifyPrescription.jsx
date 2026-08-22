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
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Verify Prescription</h2>
      <p style={{ fontSize: '14px', color: 'gray' }}>Enter the Prescription ID from the QR code to verify its authenticity.</p>

      <input
        type="text"
        placeholder="Enter Prescription ID"
        value={prescriptionId}
        onChange={(e) => setPrescriptionId(e.target.value)}
        style={{ width: '100%' }}
      />
      <br /><br />
      <button onClick={handleVerify}>Verify</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '20px', border: '1px solid green', padding: '15px' }}>
          <p style={{ color: 'green' }}><strong>✅ Genuine Prescription</strong></p>
          <p><strong>Patient:</strong> {result.patient.name} ({result.patient.age} yrs, {result.patient.gender})</p>
          <p><strong>Doctor:</strong> Dr. {result.doctor.name} ({result.doctor.specialization})</p>
          <p><strong>Medicines:</strong> {result.medicines}</p>
          {result.notes && <p><strong>Notes:</strong> {result.notes}</p>}
        </div>
      )}
    </div>
  );
}

export default VerifyPrescription;