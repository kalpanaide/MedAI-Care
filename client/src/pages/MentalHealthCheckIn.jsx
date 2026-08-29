import { useState } from 'react';
import axios from 'axios';

function MentalHealthCheckIn() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('https://medai-care-backend.onrender.com/api/mental-health/checkin', { message: userMessage });
      setChatHistory((prev) => [...prev, { sender: 'ai', text: response.data.result }]);
      speak(response.data.result);
    } catch (error) {
      const errorText = 'Something went wrong. Please try again. 💙';
      setChatHistory((prev) => [...prev, { sender: 'ai', text: errorText }]);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="card" style={{ maxWidth: '520px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2>Mental Health Check-in 🌿</h2>
        <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
          <input
            type="checkbox"
            checked={voiceEnabled}
            onChange={(e) => {
              setVoiceEnabled(e.target.checked);
              if (!e.target.checked) window.speechSynthesis.cancel();
            }}
          />
          🔊 Voice
        </label>
      </div>
      <p className="card-subtitle">Share how you're feeling. This is a supportive space, not a replacement for professional help.</p>

      <div style={{
        borderRadius: 'var(--radius)',
        minHeight: '250px',
        maxHeight: '400px',
        overflowY: 'auto',
        padding: '10px 4px',
        marginBottom: '14px'
      }}>
        {chatHistory.length === 0 && <p className="empty-state">Start by sharing how you're feeling today...</p>}
        {chatHistory.map((chat, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: chat.sender === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '12px'
          }}>
            <div style={{
              maxWidth: '80%',
              backgroundColor: chat.sender === 'user' ? 'var(--color-primary)' : 'var(--color-bg)',
              color: chat.sender === 'user' ? 'white' : 'var(--color-text)',
              border: chat.sender === 'user' ? 'none' : '1px solid var(--color-border)',
              padding: '10px 14px',
              borderRadius: chat.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
              fontSize: '14px',
              whiteSpace: 'pre-line'
            }}>
              {chat.text}
              {chat.sender === 'ai' && (
                <div
                  onClick={() => speak(chat.text)}
                  style={{ marginTop: '6px', fontSize: '12px', color: 'var(--color-primary)', cursor: 'pointer' }}
                >
                  🔊 Play
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: '10px 14px',
              borderRadius: '14px 14px 14px 2px',
              fontSize: '14px',
              color: 'var(--color-text-muted)'
            }}>
              typing...
            </div>
          </div>
        )}
      </div>

      <textarea
        className="form-input"
        rows="2"
        placeholder="How are you feeling today?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn-primary" onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send 💬'}
      </button>
    </div>
  );
}

export default MentalHealthCheckIn;