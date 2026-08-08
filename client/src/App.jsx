import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import DoctorRegister from './pages/DoctorRegister';
import DoctorLogin from './pages/DoctorLogin';

function App() {
  const [view, setView] = useState('patientRegister');

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setView('patientRegister')}>Patient Register</button>
        <button onClick={() => setView('patientLogin')}>Patient Login</button>
        <button onClick={() => setView('doctorRegister')}>Doctor Register</button>
        <button onClick={() => setView('doctorLogin')}>Doctor Login</button>
      </div>

      {view === 'patientRegister' && <Register />}
      {view === 'patientLogin' && <Login />}
      {view === 'doctorRegister' && <DoctorRegister />}
      {view === 'doctorLogin' && <DoctorLogin />}
    </div>
  );
}

export default App;