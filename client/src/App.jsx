import { useState } from 'react';
import axios from 'axios';
import Register from './pages/Register';
import Login from './pages/Login';
import DoctorRegister from './pages/DoctorRegister';
import DoctorLogin from './pages/DoctorLogin';
import BookAppointment from './pages/BookAppointment';

function App() {
  const [view, setView] = useState('patientLogin');
  const [loggedInPatientId, setLoggedInPatientId] = useState(null);
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

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

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setView('patientRegister')}>Patient Register</button>
        <button onClick={() => setView('patientLoginQuick')}>Patient Login (for booking)</button>
        <button onClick={() => setView('doctorRegister')}>Doctor Register</button>
        <button onClick={() => setView('doctorLogin')}>Doctor Login</button>
      </div>

      {view === 'patientRegister' && <Register />}
      {view === 'doctorRegister' && <DoctorRegister />}
      {view === 'doctorLogin' && <DoctorLogin />}

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

      {view === 'bookAppointment' && loggedInPatientId && (
        <BookAppointment patientId={loggedInPatientId} />
      )}
    </div>
  );
}

export default App;