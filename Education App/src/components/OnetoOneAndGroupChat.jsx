// src/components/OnetoOneAndGroupChat.jsx
import { ZIMKitManager, ZIMKitProvider, ZIMKitConversationList, ZIMKitMessageList } from '@zegocloud/zimkit-react';
import { useEffect, useState } from 'react';
import { generateZegoToken } from '../utils/zegoToken';

const appID = 1193363811; // ✅ Your Zego App ID
const serverSecret = "5f722bbadfb1ba32960c72bc1ad4c749"; // 🔒 Replace with your real ServerSecret

export default function OnetoOneAndGroupChat() {
  const [isReady, setIsReady] = useState(false);
  const userID = "Samiran210";
  const userName = "Samiran";

  useEffect(() => {
    const init = async () => {
      const token = generateZegoToken(appID, serverSecret, userID);

      await ZIMKitManager.init({
        appID,
        userInfo: { userID, userName },
        token,
      });

      setIsReady(true);
    };

    init();
  }, []);

  return isReady ? (
    <ZIMKitProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <ZIMKitConversationList />
        <ZIMKitMessageList />
      </div>
    </ZIMKitProvider>
  ) : (
    <div>Loading Chat...</div>
  );
}
