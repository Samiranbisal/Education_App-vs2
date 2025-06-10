// HostJoin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getAuth } from 'firebase/auth';

const HostJoin = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

//   const auth = getAuth();
//   const user = auth.currentUser;
  const username = 'AbcTatai' //user?.displayName || user?.email || "Host";

  const handleJoin = () => {
    if (!roomId.trim()) return;
    // Redirect to Room page with roomId and role=host
    navigate(`/room/${roomId}?role=host`);
  };

  return (
    <div style={styles.container}>
      <h2>Welcome, {username}</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleJoin} style={styles.button}>
        Join as Host
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
    background: '#f8f8f8',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default HostJoin;
