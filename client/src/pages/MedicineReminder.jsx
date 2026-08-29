import { useState, useEffect } from 'react';
import axios from 'axios';

function MedicineReminder({ patientId }) {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    time: '',
    frequency: 'Once a day'
  });
  const [message, setMessage] = useState('');
  const [isOffline, setIsOffline] = useState(false);

  const cacheKey = `medicines_${patientId}`;

  const fetchMedicines = () => {
    axios.get(`https://medai-care-backend.onrender.com/api/medicines/patient/${patientId}`)
      .then((response) => {
        setMedicines(response.data);
        setIsOffline(false);
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          setMedicines(JSON.parse(cached));
          setIsOffline(true);
        }
      });
  };

  useEffect(() => {
    fetchMedicines();
  }, [patientId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://medai-care-backend.onrender.com/api/medicines/add', {
        patient: patientId,
        ...formData
      });
      setMessage('Medicine reminder added!');
      setFormData({ medicineName: '', dosage: '', time: '', frequency: 'Once a day' });
      fetchMedicines();
    } catch (error) {
      setMessage('Failed to add reminder. You may be offline.');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://medai-care-backend.onrender.com/api/medicines/${id}`);
      fetchMedicines();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Medicine Reminders</h2>
      <p className="card-subtitle">Never miss a dose</p>

      {isOffline && (
        <p style={{ fontSize: '13px', color: 'var(--color-accent)', marginBottom: '14px' }}>
          Showing saved data. Connect to the internet to add or update reminders.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={formData.medicineName}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="dosage"
          placeholder="Dosage (e.g. 1 tablet)"
          value={formData.dosage}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <select className="form-input" name="frequency" value={formData.frequency} onChange={handleChange}>
          <option value="Once a day">Once a day</option>
          <option value="Twice a day">Twice a day</option>
          <option value="Thrice a day">Thrice a day</option>
          <option value="As needed">As needed</option>
        </select>
        <button className="btn-primary" type="submit" disabled={isOffline}>Add Reminder</button>
      </form>

      {message && <p className="status-message">{message}</p>}

      <h3 style={{ marginTop: '28px', marginBottom: '12px' }}>My Medicines</h3>
      {medicines.length === 0 && <p className="empty-state">No reminders added yet.</p>}
      {medicines.map((med) => (
        <div key={med._id} className="list-item">
          <h4>{med.medicineName} - {med.dosage}</h4>
          <p style={{ margin: '0 0 8px 0', color: 'var(--color-text-muted)', fontSize: '14px' }}>
            {med.time} | {med.frequency}
          </p>
          <button className="btn-delete" onClick={() => handleDelete(med._id)} disabled={isOffline}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MedicineReminder;