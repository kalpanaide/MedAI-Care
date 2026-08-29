import { useState, useEffect } from 'react';
import axios from 'axios';

function MyAppointments({ patientId }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/appointments/patient/${patientId}`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.log(error));
  }, [patientId]);

  const statusColor = (status) => {
    if (status === 'Confirmed') return 'var(--color-success)';
    if (status === 'Cancelled') return 'var(--color-accent)';
    if (status === 'Completed') return 'var(--color-primary)';
    return 'var(--color-text-muted)';
  };

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h2>My Appointments</h2>
      <p className="card-subtitle">Track your upcoming and past visits</p>

      {appointments.length === 0 && <p className="empty-state">No appointments booked yet.</p>}
      {appointments.map((appt) => (
        <div key={appt._id} className="list-item">
          <h4>Dr. {appt.doctor.name} - {appt.doctor.specialization}</h4>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
            {appt.date} at {appt.time}
          </p>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--color-text-muted)' }}>
            Reason: {appt.reason}
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: statusColor(appt.status), fontWeight: '600' }}>
            {appt.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyAppointments;