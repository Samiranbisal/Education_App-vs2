// ChatRoom.jsx
import React, { useEffect } from 'react';
import { ZIMKitManager, ZIMKitProvider, ZIMKitConversationList, ZIMKitMessageList, ZIMKitInput } from '@zegocloud/zimkit-react';

const appID = 751802392; // your ZEGOCLOUD app ID
const serverSecret = '58bb358f1373b2270c1d8fc25cdb85c7'; // your secret

const ChatRoom = () => {
  const userID = localStorage.getItem('uid') || 'user_' + Date.now();
  const userName = localStorage.getItem('username') || 'Guest';

  useEffect(() => {
    const zim = ZIMKitManager.getInstance();
    zim.init(appID);
    zim.connectUser({ userID, userName });
  }, []);

  return (
    <ZIMKitProvider appID={appID} userID={userID} userName={userName}>
      <div style={{ display: 'flex', height: '90vh' }}>
        {/* Left: Conversation List */}
        <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
          <ZIMKitConversationList />
        </div>

        {/* Right: Message Box */}
        <div style={{ width: '70%', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <ZIMKitMessageList />
          </div>
          <ZIMKitInput />
        </div>
      </div>
    </ZIMKitProvider>
  );
};

export default ChatRoom;
