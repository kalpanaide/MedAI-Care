import { useState, useEffect } from 'react';
import axios from 'axios';

function BookAppointment({ patientId }) {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors/all')
      .then((response) => setDoctors(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/appointments/book', {
        patient: patientId,
        doctor: formData.doctor,
        date: formData.date,
        time: formData.time,
        reason: formData.reason
      });
      setMessage('Appointment booked successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Booking failed. Try again.');
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Book Appointment</h2>
      <p className="card-subtitle">Choose a doctor and pick a time that works for you</p>
      <form onSubmit={handleSubmit}>
        <select className="form-input" name="doctor" onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              Dr. {doc.name} - {doc.specialization}
            </option>
          ))}
        </select>
        <input className="form-input" type="date" name="date" onChange={handleChange} required />
        <input className="form-input" type="time" name="time" onChange={handleChange} required />
        <textarea className="form-input" name="reason" placeholder="Reason for visit" onChange={handleChange} required />
        <button className="btn-primary" type="submit">Book Appointment</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default BookAppointment;