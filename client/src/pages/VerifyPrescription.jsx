import { useState } from 'react';
import axios from 'axios';
import translations from '../translations';

function VerifyPrescription({ language = 'en' }) {
  const t = translations[language];

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
      setError(t.notFoundError);
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>{t.verifyTitle}</h2>
      <p className="card-subtitle">{t.verifySubtitle}</p>

      <input
        className="form-input"
        type="text"
        placeholder={t.enterPrescriptionId}
        value={prescriptionId}
        onChange={(e) => setPrescriptionId(e.target.value)}
      />
      <button className="btn-primary" onClick={handleVerify}>{t.verify}</button>

      {error && <p className="status-message" style={{ color: 'var(--color-accent)' }}>{error}</p>}

      {result && (
        <div className="list-item" style={{ marginTop: '20px', borderColor: 'var(--color-success)' }}>
          <p style={{ color: 'var(--color-success)', fontWeight: '600', margin: '0 0 10px 0' }}>✅ {t.genuinePrescription}</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>{t.patientLabel}:</strong> {result.patient.name} ({result.patient.age} yrs, {result.patient.gender})</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>{t.doctorLabel}:</strong> Dr. {result.doctor.name} ({result.doctor.specialization})</p>
          <p style={{ margin: '0 0 4px 0' }}><strong>{t.medicinesLabel}:</strong> {result.medicines}</p>
          {result.notes && <p style={{ margin: 0 }}><strong>{t.notesLabel}:</strong> {result.notes}</p>}
        </div>
      )}
    </div>
  );
}

export default VerifyPrescription;