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
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select name="doctor" onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              Dr. {doc.name} - {doc.specialization}
            </option>
          ))}
        </select><br /><br />
        <input type="date" name="date" onChange={handleChange} required /><br /><br />
        <input type="time" name="time" onChange={handleChange} required /><br /><br />
        <textarea name="reason" placeholder="Reason for visit" onChange={handleChange} required /><br /><br />
        <button type="submit">Book Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BookAppointment;