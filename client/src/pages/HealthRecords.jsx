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
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2>Digital Health Records</h2>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Record Title (e.g. Blood Test Report)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />
        <input type="file" onChange={handleFileChange} required /><br /><br />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Record'}
        </button>
      </form>

      {message && <p>{message}</p>}

      <h3>My Records</h3>
      {records.length === 0 && <p>No records uploaded yet.</p>}
      {records.map((rec) => (
        <div key={rec._id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
          <p><strong>{rec.title}</strong></p>
          <a href={rec.fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
          <br /><br />
          <button onClick={() => handleDelete(rec._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default HealthRecords;