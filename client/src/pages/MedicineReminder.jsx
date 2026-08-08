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

  const fetchMedicines = () => {
    axios.get(`http://localhost:5000/api/medicines/patient/${patientId}`)
      .then((response) => setMedicines(response.data))
      .catch((error) => console.log(error));
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
      await axios.post('http://localhost:5000/api/medicines/add', {
        patient: patientId,
        ...formData
      });
      setMessage('Medicine reminder added!');
      setFormData({ medicineName: '', dosage: '', time: '', frequency: 'Once a day' });
      fetchMedicines();
    } catch (error) {
      setMessage('Failed to add reminder.');
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/medicines/${id}`);
      fetchMedicines();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Medicine Reminders</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="medicineName"
          placeholder="Medicine Name"
          value={formData.medicineName}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="text"
          name="dosage"
          placeholder="Dosage (e.g. 1 tablet)"
          value={formData.dosage}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        /><br /><br />
        <select name="frequency" value={formData.frequency} onChange={handleChange}>
          <option value="Once a day">Once a day</option>
          <option value="Twice a day">Twice a day</option>
          <option value="Thrice a day">Thrice a day</option>
          <option value="As needed">As needed</option>
        </select><br /><br />
        <button type="submit">Add Reminder</button>
      </form>

      {message && <p>{message}</p>}

      <h3>My Medicines</h3>
      {medicines.length === 0 && <p>No reminders added yet.</p>}
      {medicines.map((med) => (
        <div key={med._id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
          <p><strong>{med.medicineName}</strong> - {med.dosage}</p>
          <p>Time: {med.time} | {med.frequency}</p>
          <button onClick={() => handleDelete(med._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MedicineReminder;