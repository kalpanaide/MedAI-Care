import { useState, useEffect } from 'react';
import axios from 'axios';

function CreatePrescription({ doctorId }) {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient: '',
    medicines: '',
    notes: ''
  });
  const [qrCode, setQrCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients/all')
      .then((response) => setPatients(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/prescriptions/create', {
        patient: formData.patient,
        doctor: doctorId,
        medicines: formData.medicines,
        notes: formData.notes
      });
      setQrCode(response.data.qrCode);
      setMessage('Prescription created successfully!');
    } catch (error) {
      setMessage('Failed to create prescription.');
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Create Prescription</h2>
      <p className="card-subtitle">Generate a verifiable prescription with QR code</p>
      <form onSubmit={handleSubmit}>
        <select className="form-input" name="patient" onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>{p.name} ({p.age} yrs)</option>
          ))}
        </select>
        <textarea
          className="form-input"
          name="medicines"
          placeholder="Medicines (e.g. Paracetamol 500mg - Twice daily for 5 days)"
          onChange={handleChange}
          required
        />
        <textarea
          className="form-input"
          name="notes"
          placeholder="Notes (optional)"
          onChange={handleChange}
        />
        <button className="btn-primary" type="submit">Create Prescription</button>
      </form>

      {message && <p className="status-message">{message}</p>}

      {qrCode && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
            Scan this QR code to verify:
          </p>
          <img src={qrCode} alt="Prescription QR Code" style={{ borderRadius: 'var(--radius)' }} />
        </div>
      )}
    </div>
  );
}

export default CreatePrescription;