import { useState, useEffect } from 'react';
import axios from 'axios';

function HealthRecords({ patientId }) {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchRecords = () => {
    axios.get(`http://localhost:5000/api/health-records/patient/${patientId}`)
      .then((response) => setRecords(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchRecords();
  }, [patientId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      setMessage('Please add a title and select a file.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('patient', patientId);
    formData.append('title', title);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/health-records/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Record uploaded successfully!');
      setTitle('');
      setFile(null);
      fetchRecords();
    } catch (error) {
      setMessage('Upload failed. Try again.');
      console.log(error);
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/health-records/${id}`);
      fetchRecords();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Digital Health Records</h2>
      <p className="card-subtitle">Keep all your medical reports in one place</p>

      <form onSubmit={handleUpload}>
        <input
          className="form-input"
          type="text"
          placeholder="Record Title (e.g. Blood Test Report)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input className="form-input" type="file" onChange={handleFileChange} required />
        <button className="btn-primary" type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Record'}
        </button>
      </form>

      {message && <p className="status-message">{message}</p>}

      <h3 style={{ marginTop: '28px', marginBottom: '12px' }}>My Records</h3>
      {records.length === 0 && <p className="empty-state">No records uploaded yet.</p>}
      {records.map((rec) => (
        <div key={rec._id} className="list-item">
          <h4>{rec.title}</h4>
          <a href={rec.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontSize: '14px' }}>
            View File
          </a>
          <br /><br />
          <button className="btn-delete" onClick={() => handleDelete(rec._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default HealthRecords;