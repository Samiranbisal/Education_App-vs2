import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useSearchParams } from 'react-router-dom';
import './HostRoom.css';

const Room = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const role_str = searchParams.get('role') || 'audience';
  const inviteId = searchParams.get('invite');
  const containerRef = useRef(null);
  const initializeRef = useRef(false);

  const appID = 991487129;
  const serverSecret = '902f18dae32103c669afccbcb65b2e0e';

  const isHost = role_str === 'host';
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [joined, setJoined] = useState(isHost); // Host joins automatically

  const role =
    role_str === 'host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  const generateInviteLink = (roleType) => {
    const uniqueId = Math.random().toString(36).substring(2, 10);
    // return `${window.location.protocol}//${window.location.host}/room/${roomId}?role=${roleType}&invite=${uniqueId}`;
    return `${roomId}?role=${roleType}${uniqueId}`;

  };

  const audienceURL = generateInviteLink('audience');
  const cohostURL = generateInviteLink('cohost');

  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      username || 'Guest'
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: { role },
      },
    });
  };

  useEffect(() => {
    if (!roomId || !joined || !containerRef.current || initializeRef.current) return;
    initializeRef.current = true;
    myMeeting(containerRef.current);
  }, [roomId, joined]);

  const handleJoin = () => {
    if (!username.trim()) {
      alert('Please enter your name');
      return;
    }
    localStorage.setItem('username', username);
    setJoined(true);
  };

  return (
    <div className="room-container">
      {!joined && !isHost ? (
        <div className="join-form">
          <h2>Join as {role_str}</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="invite-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin} className="copy-button">
            ✅ Join Room
          </button>
        </div>
      ) : (
        <>
          <div className="zego-video-container" ref={containerRef}></div>

          {(role_str === 'host' || role_str === 'cohost') && (
            <div className="invite-section">
              <h3>📨 Invite Audience</h3>

              <div className="link-copy-group">
                <input type="text" value={audienceURL} readOnly className="invite-input" />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(audienceURL);
                    alert('Audience link copied!');
                  }}
                  className="copy-button"
                >
                  📋 Copy Audience Link
                </button>
              </div>

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                  audienceURL
                )}&size=150x150`}
                alt="Audience QR Code"
                className="qr-code"
              />

              <h3 style={{ marginTop: '2rem' }}>👥 Invite Cohost</h3>

              <div className="link-copy-group">
                <input type="text" value={cohostURL} readOnly className="invite-input" />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(cohostURL);
                    alert('Cohost link copied!');
                  }}
                  className="copy-button"
                >
                  📋 Copy Cohost Link
                </button>
              </div>

              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                  cohostURL
                )}&size=150x150`}
                alt="Cohost QR Code"
                className="qr-code"
              />

              <div className="share-buttons">
                <a
                  href={`https://wa.me/?text=Join our live stream: ${encodeURIComponent(audienceURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  📲 WhatsApp (Audience)
                </a>
                <a
                  href={`https://wa.me/?text=Join as cohost: ${encodeURIComponent(cohostURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  🤝 WhatsApp (Cohost)
                </a>
                <a
                  href={`mailto:?subject=Join Our Live Stream&body=Click to join: ${encodeURIComponent(audienceURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  ✉️ Email
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(audienceURL)}&text=Join our live stream`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  📢 Telegram
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(audienceURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  📘 Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=Join our live stream&url=${encodeURIComponent(audienceURL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  🐦 X (Twitter)
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Room;
