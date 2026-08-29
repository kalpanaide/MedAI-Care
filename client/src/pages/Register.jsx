import { useState } from 'react';
import axios from 'axios';
import translations from '../translations';

function Register({ language = 'en' }) {
  const t = translations[language];

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
      const response = await axios.post('https://medai-care-backend.onrender.com/api/patients/register', formData);
      setMessage('Registration successful!');
      console.log(response.data);
    } catch (error) {
      setMessage('Registration failed. Try again.');
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>{t.regPatientTitle}</h2>
      <p className="card-subtitle">{t.regPatientSubtitle}</p>
      <form onSubmit={handleSubmit}>
        <input className="form-input" type="text" name="name" placeholder={t.fullName} onChange={handleChange} required />
        <input className="form-input" type="number" name="age" placeholder={t.age} onChange={handleChange} required />
        <select className="form-input" name="gender" onChange={handleChange} required>
          <option value="">{t.selectGender}</option>
          <option value="Male">{t.male}</option>
          <option value="Female">{t.female}</option>
          <option value="Other">{t.other}</option>
        </select>
        <input className="form-input" type="text" name="phone" placeholder={t.phoneNumber} onChange={handleChange} required />
        <input className="form-input" type="email" name="email" placeholder={t.email} onChange={handleChange} required />
        <input className="form-input" type="password" name="password" placeholder={t.password} onChange={handleChange} required />
        <button className="btn-primary" type="submit">{t.register}</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default Register;