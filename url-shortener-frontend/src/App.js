// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState(10);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/shorturls', {
        url,
        validity: parseInt(validity, 10),
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>🔗 URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '60%', padding: '8px', marginBottom: '10px' }}
        /><br />
        <input
          type="number"
          placeholder="Validity (minutes)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          style={{ width: '30%', padding: '8px', marginBottom: '10px' }}
        /><br />
        <button type="submit" style={{ padding: '10px 20px' }}>Shorten</button>
      </form>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Short Link:</strong> <a href={response.shortLink} target="_blank" rel="noreferrer">{response.shortLink}</a></p>
          <p><strong>Expires At:</strong> {new Date(response.expiry).toLocaleString()}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}> X  {error}</p>}
    </div>
  );
}

export default App;
