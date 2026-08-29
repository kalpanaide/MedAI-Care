import { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorDashboard({ doctorId }) {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    axios.get(`https://medai-care-backend.onrender.com/api/appointments/doctor/${doctorId}`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`https://medai-care-backend.onrender.com/api/appointments/${id}/status`, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  const statusColor = (status) => {
    if (status === 'Confirmed') return 'var(--color-success)';
    if (status === 'Cancelled') return 'var(--color-accent)';
    if (status === 'Completed') return 'var(--color-primary)';
    return 'var(--color-text-muted)';
  };

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
          <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            Reason: {appt.reason}
          </p>
          <select
            className="form-input"
            style={{ marginBottom: 0, width: 'auto', fontSize: '13px', padding: '6px 10px', color: statusColor(appt.status), fontWeight: '600' }}
            value={appt.status}
            onChange={(e) => handleStatusChange(appt._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default DoctorDashboard;