import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
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
      const response = await axios.post('http://localhost:5000/api/patients/register', formData);
      setMessage('Registration successful!');
      console.log(response.data);
    } catch (error) {
      setMessage('Registration failed. Try again.');
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Patient Registration</h2>
      <p className="card-subtitle">Create your account to get started</p>
      <form onSubmit={handleSubmit}>
        <input className="form-input" type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input className="form-input" type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <select className="form-input" name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input className="form-input" type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn-primary" type="submit">Register</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default Register;