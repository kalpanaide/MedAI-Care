import { useState } from 'react';
import axios from 'axios';

function DoctorRegister() {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
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
      const response = await axios.post('http://localhost:5000/api/doctors/register', formData);
      setMessage('Registration successful!');
      console.log(response.data);
    } catch (error) {
      setMessage('Registration failed. Try again.');
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Doctor Registration</h2>
      <p className="card-subtitle">Join MedAI Care as a healthcare provider</p>
      <form onSubmit={handleSubmit}>
        <input className="form-input" type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input className="form-input" type="text" name="specialization" placeholder="Specialization" onChange={handleChange} required />
        <input className="form-input" type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required />
        <input className="form-input" type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn-primary" type="submit">Register</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default DoctorRegister;