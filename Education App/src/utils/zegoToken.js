// src/utils/zegoToken.js
import crypto from "crypto";

export function generateZegoToken(appID, serverSecret, userID, effectiveTime = 3600) {
  const nonce = Math.floor(Math.random() * 100000);
  const currentTime = Math.floor(Date.now() / 1000);
  const payloadObject = {
    app_id: appID,
    user_id: userID,
    nonce: nonce,
    ctime: currentTime,
    expire: currentTime + effectiveTime,
  };
  const payload = Buffer.from(JSON.stringify(payloadObject)).toString('base64');
  const signature = crypto
    .createHmac('sha256', serverSecret)
    .update(payload)
    .digest('base64');
  const token = `03${signature}${payload}`;
  return token;
}
