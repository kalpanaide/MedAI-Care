import { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorDashboard({ doctorId }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.log(error));
  }, [doctorId]);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>My Appointments</h2>
      {appointments.length === 0 && <p>No appointments yet.</p>}
      {appointments.map((appt) => (
        <div key={appt._id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
          <p><strong>Patient:</strong> {appt.patient.name} ({appt.patient.age} yrs, {appt.patient.gender})</p>
          <p><strong>Phone:</strong> {appt.patient.phone}</p>
          <p><strong>Date:</strong> {appt.date} at {appt.time}</p>
          <p><strong>Reason:</strong> {appt.reason}</p>
          <p><strong>Status:</strong> {appt.status}</p>
        </div>
      ))}
    </div>
  );
}

export default DoctorDashboard;