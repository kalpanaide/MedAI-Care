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
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Mental Health Check-in</h2>
      <p style={{ fontSize: '14px', color: 'gray' }}>Share how you're feeling. This is a supportive space, not a replacement for professional help.</p>

      <div style={{ border: '1px solid gray', minHeight: '250px', padding: '10px', marginBottom: '10px', whiteSpace: 'pre-line' }}>
        {chatHistory.length === 0 && <p style={{ color: 'gray' }}>Start by sharing how you're feeling today...</p>}
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ marginBottom: '15px', textAlign: chat.sender === 'user' ? 'right' : 'left' }}>
            <strong>{chat.sender === 'user' ? 'You' : 'MedAI Care'}:</strong>
            <p>{chat.text}</p>
          </div>
        ))}
        {loading && <p style={{ color: 'gray' }}>Thinking...</p>}
      </div>

      <textarea
        rows="3"
        style={{ width: '100%' }}
        placeholder="How are you feeling today?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br /><br />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

export default MentalHealthCheckIn;