// CohostJoin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CohostJoin = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomId.trim()) return;
    navigate(`/room/${roomId}?role=cohost`);
  };

  return (
    <div style={styles.container}>
      <h2>Join as Co-host</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleJoin} style={styles.button}>
        Join Now
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: 40,
    maxWidth: 400,
    margin: '100px auto',
    textAlign: 'center',
    background: '#f0f0f0',
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  input: {
    padding: 10,
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#6f42c1',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default CohostJoin;
