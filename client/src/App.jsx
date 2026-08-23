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
import MentalHealthCheckIn from './pages/MentalHealthCheckIn';
import CreatePrescription from './pages/CreatePrescription';
import VerifyPrescription from './pages/VerifyPrescription';
import translations from './translations';

function App() {
  const [view, setView] = useState('patientLoginQuick');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('en');

  const t = translations[language];

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
      <button onClick={() => setView('bookAppointment')}>{t.bookAppointment}</button>
      <button onClick={() => setView('medicineReminder')}>{t.medicineReminders}</button>
      <button onClick={() => setView('healthRecords')}>{t.healthRecords}</button>
      <button onClick={() => setView('emergencySOS')}>{t.emergencySOS}</button>
      <button onClick={() => setView('mentalHealth')}>{t.mentalHealth}</button>
    </div>
  );

  const doctorTabs = (
    <div style={{ textAlign: 'center' }}>
      <button onClick={() => setView('doctorDashboard')}>{t.myAppointments}</button>
      <button onClick={() => setView('createPrescription')}>{t.createPrescription}</button>
    </div>
  );

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button onClick={() => setLanguage('en')} style={{ fontWeight: language === 'en' ? 'bold' : 'normal' }}>English</button>
        {' | '}
        <button onClick={() => setLanguage('hi')} style={{ fontWeight: language === 'hi' ? 'bold' : 'normal' }}>हिंदी</button>
      </div>

      <h1 style={{ textAlign: 'center' }}>{t.welcome}</h1>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button onClick={() => setView('patientRegister')}>{t.patientRegister}</button>
        <button onClick={() => setView('patientLoginQuick')}>{t.patientLogin}</button>
        <button onClick={() => setView('doctorRegister')}>{t.doctorRegister}</button>
        <button onClick={() => setView('doctorLoginQuick')}>{t.doctorLogin}</button>
        <button onClick={() => setView('symptomChecker')}>{t.symptomChecker}</button>
        <button onClick={() => setView('verifyPrescription')}>{t.verifyPrescription}</button>
      </div>

      {view === 'patientRegister' && <Register />}
      {view === 'doctorRegister' && <DoctorRegister />}

      {view === 'patientLoginQuick' && (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
          <h2>{t.patientLogin}</h2>
          <form onSubmit={handlePatientLogin}>
            <input type="email" name="email" placeholder={t.email} onChange={handleLoginChange} required /><br /><br />
            <input type="password" name="password" placeholder={t.password} onChange={handleLoginChange} required /><br /><br />
            <button type="submit">{t.login}</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {view === 'doctorLoginQuick' && (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
          <h2>{t.doctorLogin}</h2>
          <form onSubmit={handleDoctorLogin}>
            <input type="email" name="email" placeholder={t.email} onChange={handleDoctorLoginChange} required /><br /><br />
            <input type="password" name="password" placeholder={t.password} onChange={handleDoctorLoginChange} required /><br /><br />
            <button type="submit">{t.login}</button>
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

      {view === 'mentalHealth' && loggedInPatientId && (
        <div>
          {patientTabs}
          <MentalHealthCheckIn />
        </div>
      )}

      {view === 'symptomChecker' && <SymptomChecker />}

      {view === 'verifyPrescription' && <VerifyPrescription />}

      {view === 'doctorDashboard' && loggedInDoctorId && (
        <div>
          {doctorTabs}
          <DoctorDashboard doctorId={loggedInDoctorId} />
        </div>
      )}

      {view === 'createPrescription' && loggedInDoctorId && (
        <div>
          {doctorTabs}
          <CreatePrescription doctorId={loggedInDoctorId} />
        </div>
      )}
    </div>
  );
}

export default App;