import { useState } from 'react';
import axios from 'axios';

function MentalHealthCheckIn() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/mental-health/checkin', { message: userMessage });
      setChatHistory((prev) => [...prev, { sender: 'ai', text: response.data.result }]);
    } catch (error) {
      setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Something went wrong. Please try again.' }]);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="card" style={{ maxWidth: '520px' }}>
      <h2>Mental Health Check-in</h2>
      <p className="card-subtitle">Share how you're feeling. This is a supportive space, not a replacement for professional help.</p>

      <div style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        minHeight: '250px',
        padding: '16px',
        marginBottom: '14px',
        whiteSpace: 'pre-line',
        backgroundColor: 'var(--color-bg)'
      }}>
        {chatHistory.length === 0 && <p className="empty-state">Start by sharing how you're feeling today...</p>}
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ marginBottom: '16px', textAlign: chat.sender === 'user' ? 'right' : 'left' }}>
            <strong style={{ color: chat.sender === 'user' ? 'var(--color-text)' : 'var(--color-primary)', fontSize: '13px' }}>
              {chat.sender === 'user' ? 'You' : 'MedAI Care'}
            </strong>
            <p style={{ margin: '4px 0 0 0' }}>{chat.text}</p>
          </div>
        ))}
        {loading && <p className="empty-state">Thinking...</p>}
      </div>

      <textarea
        className="form-input"
        rows="3"
        placeholder="How are you feeling today?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn-primary" onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

export default MentalHealthCheckIn;