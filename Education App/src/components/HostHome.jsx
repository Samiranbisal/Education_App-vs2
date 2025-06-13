import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HostHome.css'; // ✅ Import your CSS

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('host');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'host') {
      const generateRoomId = () => 'room-' + Math.random().toString(36).substr(2, 6);
      setRoomId(generateRoomId());
    } else {
      setRoomId('');
    }
  }, [role]);

  const handleJoin = () => {
    if (!name.trim() || (!roomId.trim() && role !== 'host')) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    localStorage.setItem('username', name);
    navigate(`/room/${roomId}?role=${role}`);
  };

  return (
    <div className="home-container">
      <h2 style={{ marginBottom: 20 }}>🎥 Join Live Stream</h2>

      {role !== 'host' && (
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="home-input"
        />
      )}

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="home-input"
      />

      <select value={role} onChange={(e) => setRole(e.target.value)} className="home-input">
        <option value="host">Host</option>
        <option value="cohost">Cohost</option>
        <option value="audience">Audience</option>
      </select>

      {role === 'host' && (
        <div className="preview-box">
          <strong>Host Preview:</strong> Start the stream, control participants, and manage chat.
        </div>
      )}
      {role === 'cohost' && (
        <div className="preview-box">
          <strong>Cohost Preview:</strong> Share your mic/cam and help manage the session.
        </div>
      )}
      {role === 'audience' && (
        <div className="preview-box">
          <strong>Audience Preview:</strong> Watch live, send messages, no mic/cam access.
        </div>
      )}

      {error && <p className="home-error">{error}</p>}

      <button onClick={handleJoin} className="home-button">
        🚪 Join Room
      </button>
    </div>
  );
};

export default Home;
