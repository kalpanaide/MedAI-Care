import { useState } from 'react';
import axios from 'axios';

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setResult('');

    try {
      const response = await axios.post('http://localhost:5000/api/ai/symptom-check', { symptoms });
      setResult(response.data.result);
    } catch (error) {
      setResult('Something went wrong. Please try again.');
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>AI Symptom Checker</h2>
      <textarea
        rows="4"
        style={{ width: '100%' }}
        placeholder="Describe your symptoms (e.g. fever, headache since 2 days)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <br /><br />
      <button onClick={handleCheck} disabled={loading}>
        {loading ? 'Checking...' : 'Check Symptoms'}
      </button>

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid gray', whiteSpace: 'pre-line' }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default SymptomChecker;