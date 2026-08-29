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
    <div className="card" style={{ maxWidth: '600px' }}>
      <h2>My Appointments</h2>
      <p className="card-subtitle">Here's who you're seeing</p>

      {appointments.length === 0 && <p className="empty-state">No appointments yet.</p>}
      {appointments.map((appt) => (
        <div key={appt._id} className="list-item">
          <h4>{appt.patient.name} ({appt.patient.age} yrs, {appt.patient.gender})</h4>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Phone: {appt.patient.phone}
          </p>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
            {appt.date} at {appt.time}
          </p>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
            Reason: {appt.reason}
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-primary)', fontWeight: '600' }}>
            {appt.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DoctorDashboard;