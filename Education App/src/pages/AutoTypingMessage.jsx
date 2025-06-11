import React, { useEffect, useState, useRef } from 'react';
import './AutoTypingMessage.css';

const AutoTypingMessage = ({
  messages = [
    "Welcome to Friends Wave.com 🎥",
    "Join the community and start watching together! 🎉",
    "Explore top-rated TV Shows 🌟",
    "Stream live with friends 🧑‍🤝‍🧑",
    "Enjoy trailers, favorites movics 🎬",
    "Discover new shows and movies every day! 🍿",
    
  ],
  speed = 80,
  pause = 1500,
  loop = true,
  soundUrl = '/type.mp3'
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [messageVisible, setMessageVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(soundUrl);
    audioRef.current.volume = 0.2;
  }, [soundUrl]);

  useEffect(() => {
    if (!messageVisible) return;

    const currentMessage = messages[msgIndex];
    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentMessage.charAt(charIndex));
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
        setCharIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const pauseTimeout = setTimeout(() => {
        setMessageVisible(false); // trigger slide out
      }, pause);
      return () => clearTimeout(pauseTimeout);
    }
  }, [charIndex, messageVisible, msgIndex, messages, speed, pause]);

  useEffect(() => {
    if (!messageVisible) {
      const transitionTimeout = setTimeout(() => {
        setDisplayedText('');
        setCharIndex(0);
        setMsgIndex((prev) => (prev + 1) % messages.length);
        setMessageVisible(true); // trigger slide in
      }, 400); // match slide-out duration
      return () => clearTimeout(transitionTimeout);
    }
  }, [messageVisible, messages.length]);

  return (
    <div className="auto-type-container">
      <p className={`auto-type-text ${messageVisible ? 'slide-in' : 'slide-out'}`}>
        {displayedText}<span className="auto-type-cursor">|</span>
      </p>
    </div>
  );
};

export default AutoTypingMessage;
