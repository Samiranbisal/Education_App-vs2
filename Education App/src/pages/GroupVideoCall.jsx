import React, { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const GroupVideoCall = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
  const username = state?.username || "Guest_" + Math.floor(Math.random() * 1000);
  const meetingRef = useRef(null);

  useEffect(() => {
    const appID = 555675961;
    const serverSecret = "166bbf1ce068e454e9f2118544967842";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      username
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // zp.joinRoom({
    //   container: meetingRef.current,
    //   sharedLinks: [
    //     {
    //       name: "Copy Link",
    //       url: `${window.location.origin}/group-video-call/${roomId}`,
    //     },
    //   ],
    //   scenario: {
    //     mode: ZegoUIKitPrebuilt.GroupCall,
    //   },
    // });
    zp.joinRoom({
      container: meetingRef.current,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.origin}/group-video-call/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      // turnOnCameraWhenJoining: true,   // ✅ Turns on camera
      // turnOnMicrophoneWhenJoining: true, // ✅ Turns on mic
      // showPreJoinView: false,          // Optional: skip preview screen
    });    
  }, [roomId, username]);

  return (
    <div
      ref={meetingRef}
      style={{ width: "100%", height: "100vh", backgroundColor: "#000" }}
    />
  );
};

export default GroupVideoCall;
