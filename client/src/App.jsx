import { useState } from 'react';
import axios from 'axios';
import Register from './pages/Register';
import DoctorRegister from './pages/DoctorRegister';
import BookAppointment from './pages/BookAppointment';
import DoctorDashboard from './pages/DoctorDashboard';
import SymptomChecker from './pages/SymptomChecker';
import MedicineReminder from './pages/MedicineReminder';
import HealthRecords from './pages/HealthRecords';
import EmergencySOS from './pages/EmergencySOS';

function App() {
  const [view, setView] = useState('patientLoginQuick');
  const [message, setMessage] = useState('');

  const [loggedInPatientId, setLoggedInPatientId] = useState(null);
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });

  const [loggedInDoctorId, setLoggedInDoctorId] = useState(null);
  const [doctorLoginFormData, setDoctorLoginFormData] = useState({ email: '', password: '' });

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handlePatientLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patients/login', loginFormData);
      setLoggedInPatientId(response.data.patient._id);
      setMessage('Login successful!');
      setView('bookAppointment');
    } catch (error) {
      setMessage('Login failed. Check email/password.');
    }
  };

  const handleDoctorLoginChange = (e) => {
    setDoctorLoginFormData({ ...doctorLoginFormData, [e.target.name]: e.target.value });
  };

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/doctors/login', doctorLoginFormData);
      setLoggedInDoctorId(response.data.doctor._id);
      setMessage('Login successful!');
      setView('doctorDashboard');
    } catch (error) {
      setMessage('Login failed. Check email/password.');
    }
  };

  const patientTabs = (
    <div style={{ textAlign: 'center' }}>
      <button onClick={() => setView('bookAppointment')}>Book Appointment</button>
      <button onClick={() => setView('medicineReminder')}>Medicine Reminders</button>
      <button onClick={() => setView('healthRecords')}>Health Records</button>
      <button onClick={() => setView('emergencySOS')}>Emergency SOS</button>
    </div>
  );

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setView('patientRegister')}>Patient Register</button>
        <button onClick={() => setView('patientLoginQuick')}>Patient Login</button>
        <button onClick={() => setView('doctorRegister')}>Doctor Register</button>
        <button onClick={() => setView('doctorLoginQuick')}>Doctor Login</button>
        <button onClick={() => setView('symptomChecker')}>AI Symptom Checker</button>
      </div>

      {view === 'patientRegister' && <Register />}
      {view === 'doctorRegister' && <DoctorRegister />}

      {view === 'patientLoginQuick' && (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
          <h2>Patient Login</h2>
          <form onSubmit={handlePatientLogin}>
            <input type="email" name="email" placeholder="Email" onChange={handleLoginChange} required /><br /><br />
            <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} required /><br /><br />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {view === 'doctorLoginQuick' && (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
          <h2>Doctor Login</h2>
          <form onSubmit={handleDoctorLogin}>
            <input type="email" name="email" placeholder="Email" onChange={handleDoctorLoginChange} required /><br /><br />
            <input type="password" name="password" placeholder="Password" onChange={handleDoctorLoginChange} required /><br /><br />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {view === 'bookAppointment' && loggedInPatientId && (
        <div>
          {patientTabs}
          <BookAppointment patientId={loggedInPatientId} />
        </div>
      )}

      {view === 'medicineReminder' && loggedInPatientId && (
        <div>
          {patientTabs}
          <MedicineReminder patientId={loggedInPatientId} />
        </div>
      )}

      {view === 'healthRecords' && loggedInPatientId && (
        <div>
          {patientTabs}
          <HealthRecords patientId={loggedInPatientId} />
        </div>
      )}

      {view === 'emergencySOS' && loggedInPatientId && (
        <div>
          {patientTabs}
          <EmergencySOS />
        </div>
      )}

      {view === 'symptomChecker' && <SymptomChecker />}

      {view === 'doctorDashboard' && loggedInDoctorId && (
        <DoctorDashboard doctorId={loggedInDoctorId} />
      )}
    </div>
  );
}

export default App;