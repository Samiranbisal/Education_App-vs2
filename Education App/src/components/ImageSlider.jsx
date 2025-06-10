import React, { useState, useEffect, useRef } from 'react';
import './slider.css';

const SWIPE_THRESHOLD = 50;
const ACCESS_KEY = '4QRXvm_Y6T-LrHDsLLiyFd-8oJb8TBMQUj_H2jE-aoM'; // ✅ Public only
const API_URL = `https://api.unsplash.com/photos/random?count=8&query=education&client_id=${ACCESS_KEY}`;

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const urls = data.map((img) => img.urls.regular);
        setImages(urls);
      } catch (error) {
        console.error("Error fetching Unsplash images:", error);
      }
    };
    fetchImages();
  }, []);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const onTouchStart = (e) => (touchStartX.current = e.changedTouches[0].clientX);
  const onTouchMove = (e) => (touchEndX.current = e.changedTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > SWIPE_THRESHOLD) goToNext();
    else if (distance < -SWIPE_THRESHOLD) goToPrevious();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (images.length === 0) return <p>Loading images…</p>;

  return (
    <div
      className="slider"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button className="slider-button left" onClick={goToPrevious}>{'<'}</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slider-image" />
      <button className="slider-button right" onClick={goToNext}>{'>'}</button>
    </div>
  );
};

export default ImageSlider;
