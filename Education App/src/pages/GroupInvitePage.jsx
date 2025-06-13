import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GroupInvitePage.css";

const GroupInvitePage = () => {
  const { roomId } = useParams();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }

    // Redirect to the actual video call page with username in query
    navigate(`/group-video-call/${roomId}?username=${encodeURIComponent(username)}`);
  };

  return (
    <div className="invite-page-container">
      <h2>You’ve been invited to join a Group Video Call</h2>
      <p><strong>Room ID:</strong> {roomId}</p>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleJoin}>Join Call</button>
    </div>
  );
};

export default GroupInvitePage;
