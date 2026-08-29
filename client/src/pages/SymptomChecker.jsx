import { useState } from 'react';
import axios from 'axios';
import translations from '../translations';

function SymptomChecker({ language = 'en' }) {
  const t = translations[language];

  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const severityColor = (level) => {
    if (level === 'Low') return '#5FA777';
    if (level === 'High') return '#E4483B';
    return '#E09A3E';
  };

  const severityLabel = (level) => {
    if (level === 'Low') return t.low;
    if (level === 'High') return t.high;
    return t.medium;
  };

  const handleCheck = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post('https://medai-care-backend.onrender.com/api/ai/symptom-check', { symptoms });
      setResult(response.data.result);
    } catch (error) {
      setResult({ cause: 'Something went wrong. Please try again.', severity: 'Medium', advice: '' });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>{t.symptomTitle}</h2>
      <p className="card-subtitle">{t.symptomSubtitle}</p>

      <textarea
        className="form-input"
        rows="4"
        placeholder={t.symptomPlaceholder}
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button className="btn-primary" onClick={handleCheck} disabled={loading}>
        {loading ? t.checking : t.checkSymptoms}
      </button>

      {result && (
        <div style={{ marginTop: '24px' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: severityColor(result.severity),
            color: 'white',
            padding: '5px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            {t.severity}: {severityLabel(result.severity)}
          </div>

          <div style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            padding: '18px',
            marginBottom: '10px'
          }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)' }}>
              {t.possibleCause}
            </p>
            <p style={{ margin: 0 }}>{result.cause}</p>
          </div>

          {result.advice && (
            <div style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: '18px',
              marginBottom: '14px'
            }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600', color: 'var(--color-primary)' }}>
                {t.advice}
              </p>
              <p style={{ margin: 0 }}>{result.advice}</p>
            </div>
          )}

          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            {t.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

export default SymptomChecker;