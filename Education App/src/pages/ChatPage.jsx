import React, { useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import {
  userMessagesRef,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  signIn,
  onAuth
} from "../firebase";
import { doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null);
  const [username, setUsername] = useState("You");
  const [abortController, setAbortController] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    signIn();
    onAuth((user) => {
      if (user) {
        setUid(user.uid);
        setUsername(`User-${user.uid.substring(0, 5)}`);
        const q = query(userMessagesRef(user.uid), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const msgs = snapshot.docs.map((doc) => doc.data());
          setMessages(msgs);
        });
        return unsubscribe;
      }
    });
  }, []);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !uid) return;

    const userMsg = {
      sender: "user",
      // name: username,
      // avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`,
      text: input,
      timestamp: serverTimestamp()
    };

    setInput("");
    await addDoc(userMessagesRef(uid), userMsg);
    setLoading(true);

    const botName = "EduBot";
    const botAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(botName)}`;
    let fullText = "";
    let botDocId = null;

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Education App",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528:free",
          stream: true,
          messages: [{ role: "user", content: input }]
        }),
        signal: controller.signal
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(line => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.replace("data: ", "").trim();
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) {
                fullText += token;

                if (!botDocId) {
                  const botDocRef = await addDoc(userMessagesRef(uid), {
                    sender: "bot",
                    name: botName,
                    avatar: botAvatar,
                    text: "",
                    timestamp: serverTimestamp()
                  });
                  botDocId = botDocRef.id;
                } else {
                  const botDocRef = doc(userMessagesRef(uid), botDocId);
                  await setDoc(botDocRef, {
                    sender: "bot",
                    name: botName,
                    avatar: botAvatar,
                    text: fullText,
                    timestamp: serverTimestamp()
                  });
                }
              }
            } catch (err) {
              console.warn("Stream parsing error:", err);
            }
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.warn("Streaming aborted by user.");
      } else {
        console.error("Streaming error:", err);
        fullText = "Error: " + err.message;
        await addDoc(userMessagesRef(uid), {
          sender: "bot",
          name: botName,
          avatar: botAvatar,
          text: fullText,
          timestamp: serverTimestamp()
        });
      }
    }

    setAbortController(null);
    setLoading(false);
  };

  const stopGenerating = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setLoading(false);
    }
  };

  const clearChat = async () => {
    if (!uid) return;
    const snapshot = await getDocs(userMessagesRef(uid));
    const deletions = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletions);
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender}`}>
            <img className="avatar" src={msg.avatar} alt={msg.name} />
            <div className="message-content">
              <div className="name">{msg.name}</div>
              <div className="text">{msg.text}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
        <button onClick={stopGenerating} disabled={!abortController}>
          Stop
        </button>
        <button onClick={clearChat} disabled={loading}>
          Clear Chat
        </button>
      </div>
    </div>
  );
}
