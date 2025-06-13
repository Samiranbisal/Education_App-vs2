import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./GroupHomeCall.css";
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
  const [joinLink, setJoinLink] = useState("");
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

  const handleJoinFromLink = () => {
    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      const url = new URL(joinLink);
      const parts = url.pathname.split("/");
      const roomIdFromLink = parts[parts.length - 1];
      if (roomIdFromLink) {
        navigate(`/group-video-call/${roomIdFromLink}`, {
          state: { username },
        });
      } else {
        alert("Invalid link format");
      }
    } catch (err) {
      alert("Invalid link");
    }
  };

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

      <button onClick={handleJoinRoom}>Join</button>

      {/* QR Code Section */}
      <div className="qr-box">
        <div ref={qrRef} style={{ marginBottom: "10px" }}>
          <QRCode value={joinURL} size={160} />
        </div>
        <p>{joinURL}</p>
        <button onClick={handleDownloadQR}>Download QR Code</button>
        <button onClick={handleCopyURL}>Copy URL</button>
      </div>

      {/* Join via Pasted Link */}
      <div className="join-link-section">
        <h3>Paste Link to Join Room</h3>
        <input
          type="text"
          placeholder="Paste full room link here"
          value={joinLink}
          onChange={(e) => setJoinLink(e.target.value)}
        />
        <button onClick={handleJoinFromLink}>Join via Link</button>
      </div>
    </div>
  );
};

export default GroupHomeCall;
