import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patients/login', formData);
      setMessage('Login successful! Welcome ' + response.data.patient.name);
      console.log(response.data);
    } catch (error) {
      setMessage('Login failed. Check email/password.');
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;