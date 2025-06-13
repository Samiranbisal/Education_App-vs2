
// ------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEYS = [
  'AIzaSyCkMZz4ctl_RSAQ-5LfCWuHjqZi835n5ww',
  'AIzaSyA2cj1bomRx_XqyOlIpFZ24fywYux03j6E',
  'AIzaSyDbBCM93ksPqMB7iIsd1rkEhhuZuov26Es',
  'AIzaSyB6q2a_EK5cBIP0Q1rpsiwrtzkW76hK_t0',
  'AIzaSyAb_9VwQa9rujPrCnJp04jF5hv_4SDmnv4',
];

const fetchWithFallback = async (params) => {
  for (const key of API_KEYS) {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: { ...params, key },
      });

      if (response.data && response.data.items && response.data.items.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.warn(`Key failed: ${key}`, error.response?.status || error.message);
    }
  }
  throw new Error('All API keys failed');
};

const YouTubePage = () => {
  const [video, setVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchRandomVideo = async () => {
      try {
        const randomQuery = Math.random().toString(36).substring(7);
        const data = await fetchWithFallback({
          part: 'snippet',
          q: randomQuery,
          type: 'video',
          maxResults: 0,
        });
        setVideo(data.items[0]);
      } catch (err) {
        console.error('Failed to fetch random video:', err);
      }
    };

    fetchRandomVideo();
  }, []);

  const handleSearch = async () => {
    try {
      const data = await fetchWithFallback({
        part: 'snippet',
        q: searchTerm,
        type: 'video',
        maxResults: 9,
      });
      setSearchResults(data.items);
      setVideo(null); // Clear the random video if searching
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search any videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {searchResults.length > 0 && (
        <div style={styles.grid}>
          {searchResults.map((vid) => (
            <div
              key={vid.id.videoId}
              style={styles.card}
              onClick={() => setVideo(vid)}
            >
              <img
                src={vid.snippet.thumbnails.medium.url}
                alt={vid.snippet.title}
                style={styles.thumbnail}
              />
              <p style={styles.title}>{vid.snippet.title}</p>
            </div>
          ))}
        </div>
      )}

      {video && (
        <div style={styles.videoPlayer}>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
            title={video.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h2>{video.snippet.title}</h2>
          <p>{video.snippet.description}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'sans-serif',
  },
  searchContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    width: '100%',
    maxWidth: '500px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    transition: 'background-color 0.3s ease',
  },
  grid: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  card: {
    cursor: 'pointer',
    border: '1px solid #eee',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
  },
  thumbnail: {
    width: '100%',
    display: 'block',
  },
  title: {
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  videoPlayer: {
    marginTop: '40px',
  },
};

export default YouTubePage;
// ------------------------------------------------------------------------------------