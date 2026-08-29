import { useState } from 'react';
import axios from 'axios';
import Register from './pages/Register';
import DoctorRegister from './pages/DoctorRegister';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import MyPrescriptions from './pages/MyPrescriptions';
import DoctorDashboard from './pages/DoctorDashboard';
import SymptomChecker from './pages/SymptomChecker';
import MedicineReminder from './pages/MedicineReminder';
import HealthRecords from './pages/HealthRecords';
import EmergencySOS from './pages/EmergencySOS';
import MentalHealthCheckIn from './pages/MentalHealthCheckIn';
import CreatePrescription from './pages/CreatePrescription';
import VerifyPrescription from './pages/VerifyPrescription';
import NetworkStatus from './pages/NetworkStatus';
import translations from './translations';
import './App.css';

function App() {
  const [view, setView] = useState('patientLoginQuick');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  const [loggedInPatientId, setLoggedInPatientId] = useState(null);
  const [loggedInPatientName, setLoggedInPatientName] = useState('');
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });

  const [loggedInDoctorId, setLoggedInDoctorId] = useState(null);
  const [loggedInDoctorName, setLoggedInDoctorName] = useState('');
  const [doctorLoginFormData, setDoctorLoginFormData] = useState({ email: '', password: '' });

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handlePatientLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://medai-care-backend.onrender.com/api/patients/login', loginFormData);
      setLoggedInPatientId(response.data.patient._id);
      setLoggedInPatientName(response.data.patient.name);
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
      const response = await axios.post('https://medai-care-backend.onrender.com/api/doctors/login', doctorLoginFormData);
      setLoggedInDoctorId(response.data.doctor._id);
      setLoggedInDoctorName(response.data.doctor.name);
      setMessage('Login successful!');
      setView('doctorDashboard');
    } catch (error) {
      setMessage('Login failed. Check email/password.');
    }
  };

  const patientTabs = (
    <div>
      <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '14px' }}>
        Logged in as <strong style={{ color: 'var(--color-primary)' }}>{loggedInPatientName}</strong>
      </p>
      <div className="sub-nav">
        <button className={`nav-btn ${view === 'bookAppointment' ? 'active' : ''}`} onClick={() => setView('bookAppointment')}>{t.bookAppointment}</button>
        <button className={`nav-btn ${view === 'myAppointments' ? 'active' : ''}`} onClick={() => setView('myAppointments')}>{t.myAppointmentsPatient}</button>
        <button className={`nav-btn ${view === 'myPrescriptions' ? 'active' : ''}`} onClick={() => setView('myPrescriptions')}>My Prescriptions</button>
        <button className={`nav-btn ${view === 'medicineReminder' ? 'active' : ''}`} onClick={() => setView('medicineReminder')}>{t.medicineReminders}</button>
        <button className={`nav-btn ${view === 'healthRecords' ? 'active' : ''}`} onClick={() => setView('healthRecords')}>{t.healthRecords}</button>
        <button className={`nav-btn ${view === 'emergencySOS' ? 'active' : ''}`} onClick={() => setView('emergencySOS')}>{t.emergencySOS}</button>
        <button className={`nav-btn ${view === 'mentalHealth' ? 'active' : ''}`} onClick={() => setView('mentalHealth')}>{t.mentalHealth}</button>
      </div>
    </div>
  );

  const doctorTabs = (
    <div>
      <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '14px' }}>
        Logged in as <strong style={{ color: 'var(--color-primary)' }}>Dr. {loggedInDoctorName}</strong>
      </p>
      <div className="sub-nav">
        <button className={`nav-btn ${view === 'doctorDashboard' ? 'active' : ''}`} onClick={() => setView('doctorDashboard')}>{t.myAppointments}</button>
        <button className={`nav-btn ${view === 'createPrescription' ? 'active' : ''}`} onClick={() => setView('createPrescription')}>{t.createPrescription}</button>
      </div>
    </div>
  );

  return (
    <div>
      <NetworkStatus />
      <div className="app-header">
        <div className="lang-toggle">
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button>
          <button className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिंदी</button>
        </div>

        <div className="app-title">{t.welcome}</div>

        <div className="nav-bar">
          <button className={`nav-btn ${view === 'patientRegister' ? 'active' : ''}`} onClick={() => setView('patientRegister')}>{t.patientRegister}</button>
          <button className={`nav-btn ${view === 'patientLoginQuick' ? 'active' : ''}`} onClick={() => setView('patientLoginQuick')}>{t.patientLogin}</button>
          <button className={`nav-btn ${view === 'doctorRegister' ? 'active' : ''}`} onClick={() => setView('doctorRegister')}>{t.doctorRegister}</button>
          <button className={`nav-btn ${view === 'doctorLoginQuick' ? 'active' : ''}`} onClick={() => setView('doctorLoginQuick')}>{t.doctorLogin}</button>
          <button className={`nav-btn ${view === 'symptomChecker' ? 'active' : ''}`} onClick={() => setView('symptomChecker')}>{t.symptomChecker}</button>
          <button className={`nav-btn ${view === 'verifyPrescription' ? 'active' : ''}`} onClick={() => setView('verifyPrescription')}>{t.verifyPrescription}</button>
        </div>
      </div>

      {view === 'patientRegister' && <Register language={language} />}
      {view === 'doctorRegister' && <DoctorRegister language={language} />}

      {view === 'patientLoginQuick' && (
        <div className="card">
          <h2>{t.patientLogin}</h2>
          <form onSubmit={handlePatientLogin}>
            <input className="form-input" type="email" name="email" placeholder={t.email} onChange={handleLoginChange} required />
            <input className="form-input" type="password" name="password" placeholder={t.password} onChange={handleLoginChange} required />
            <button className="btn-primary" type="submit">{t.login}</button>
          </form>
          {message && <p className="status-message">{message}</p>}
        </div>
      )}

      {view === 'doctorLoginQuick' && (
        <div className="card">
          <h2>{t.doctorLogin}</h2>
          <form onSubmit={handleDoctorLogin}>
            <input className="form-input" type="email" name="email" placeholder={t.email} onChange={handleDoctorLoginChange} required />
            <input className="form-input" type="password" name="password" placeholder={t.password} onChange={handleDoctorLoginChange} required />
            <button className="btn-primary" type="submit">{t.login}</button>
          </form>
          {message && <p className="status-message">{message}</p>}
        </div>
      )}

      {view === 'bookAppointment' && loggedInPatientId && (
        <div>
          {patientTabs}
          <BookAppointment patientId={loggedInPatientId} />
        </div>
      )}

      {view === 'myAppointments' && loggedInPatientId && (
        <div>
          {patientTabs}
          <MyAppointments patientId={loggedInPatientId} />
        </div>
      )}

      {view === 'myPrescriptions' && loggedInPatientId && (
        <div>
          {patientTabs}
          <MyPrescriptions patientId={loggedInPatientId} />
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

      {view === 'symptomChecker' && <SymptomChecker language={language} />}

      {view === 'verifyPrescription' && <VerifyPrescription language={language} />}

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