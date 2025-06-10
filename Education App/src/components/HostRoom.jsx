import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useSearchParams } from 'react-router-dom';
import './HostRoom.css'; // ✅ Make sure the CSS filename matches exactly

const Room = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const role_str = searchParams.get('role') || 'audience';
  const containerRef = useRef(null);
  const initializeRef = useRef(false);

  const appID = 991487129;
  const serverSecret = '902f18dae32103c669afccbcb65b2e0e';
  const username = localStorage.getItem('username') || 'Guest';

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    Date.now().toString(),
    username
  );

  const role = role_str === 'host'
    ? ZegoUIKitPrebuilt.Host
    : role_str === 'cohost'
    ? ZegoUIKitPrebuilt.Cohost
    : ZegoUIKitPrebuilt.Audience;

  const audienceURL = `${window.location.protocol}//${window.location.host}/room/${roomId}?role=audience`;

  const myMeeting = async (element) => {
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
    if (!roomId || initializeRef.current || !containerRef.current) return;
    initializeRef.current = true;
    myMeeting(containerRef.current);
  }, [roomId]);

  return (
    <div className="room-container">
      <div className="zego-video-container" ref={containerRef}>Inside Room</div>

      {(role_str === 'host' || role_str === 'cohost') && (
        <div className="invite-section">
          <h4>Invite Audience</h4>
          <p>Share this link:</p>

          <input
            type="text"
            value={audienceURL}
            readOnly
            className="invite-input"
          />

          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(audienceURL)}&size=150x150`}
            alt="QR Code"
            className="qr-code"
          />

          <div className="share-buttons">
            <a href={`https://wa.me/?text=Join our live stream: ${encodeURIComponent(audienceURL)}`} target="_blank" rel="noopener noreferrer" className="share-button">
              📲 WhatsApp
            </a>
            <a href={`mailto:?subject=Join Our Live Stream&body=Click here to join: ${encodeURIComponent(audienceURL)}`} target="_blank" rel="noopener noreferrer" className="share-button">
              ✉️ Email
            </a>
            <a href={`https://t.me/share/url?url=${encodeURIComponent(audienceURL)}&text=Join our live stream`} target="_blank" rel="noopener noreferrer" className="share-button">
              📢 Telegram
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(audienceURL)}`} target="_blank" rel="noopener noreferrer" className="share-button">
              📘 Facebook
            </a>
            <a href={`https://twitter.com/intent/tweet?text=Join our live stream&url=${encodeURIComponent(audienceURL)}`} target="_blank" rel="noopener noreferrer" className="share-button">
              🐦 X (Twitter)
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
