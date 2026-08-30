import { useState } from 'react';
import axios from 'axios';

function ResetPassword({ token }) {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('https://medai-care-backend.onrender.com/api/patients/reset-password', {
        token,
        newPassword
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Reset Password</h2>
      <p className="card-subtitle">Enter your new password below</p>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default ResetPassword;