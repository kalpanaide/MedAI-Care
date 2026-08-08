import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setShowLogin(false)}>Register</button>
        <button onClick={() => setShowLogin(true)}>Login</button>
      </div>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
}

export default App;