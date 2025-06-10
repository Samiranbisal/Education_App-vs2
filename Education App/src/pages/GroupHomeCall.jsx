import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./GroupHomeCall.css"; // Make sure this file includes the CSS below

import { QRCode } from "react-qrcode-logo";

const generateRoomId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 8 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

const GroupHomeCall = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const qrRef = useRef();

  const joinURL = `${window.location.origin}/group-video-call/${roomId}`;

  useEffect(() => {
    setRoomId(generateRoomId());
  }, []);

  const handleJoinRoom = useCallback(() => {
    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }
    navigate(`/group-video-call/${roomId}`, { state: { username } });
  }, [roomId, username, navigate]);

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `room-${roomId}-qr.png`;
    link.href = url;
    link.click();
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(joinURL).then(() => {
      alert("Room link copied to clipboard!");
    });
  };

  return (
    <div className="group-home-container">
      <h2>Join Group Video Call</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      {/* QR Code Section */}
      <div className="qr-box">
        <div ref={qrRef} style={{ marginBottom: "10px" }}>
          <QRCode value={joinURL} size={160} />
        </div>
        <p>{joinURL}</p>
        <button onClick={handleDownloadQR}>Download QR Code</button>
        <button onClick={handleCopyURL}>Copy URL</button>
      </div>

      <button onClick={handleJoinRoom}>Join</button>
    </div>
  );
};

export default GroupHomeCall;
