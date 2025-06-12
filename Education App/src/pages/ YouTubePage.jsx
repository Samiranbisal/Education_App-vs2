// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const API_KEY = 'AIzaSyD1bfDO_0y3o_N6iL4DJKXzS1_Pl3H9ACk';

// const fetchRandomVideo = async () => {
//   const randomQuery = Math.random().toString(36).substring(7); // Generates a random string
//   const response = await axios.get(
//     `https://www.googleapis.com/youtube/v3/search`, {
//       params: {
//         part: 'snippet',
//         q: randomQuery,
//         type: 'video',
//         maxResults: 1,
//         key: API_KEY,
//       },
//     }
//   );
//   return response.data.items[0];
// };

// const RandomYouTubeVideo = () => {
//   const [video, setVideo] = useState(null);

//   useEffect(() => {
//     const getVideo = async () => {
//       const videoData = await fetchRandomVideo();
//       setVideo(videoData);
//     };
//     getVideo();
//   }, []);

//   if (!video) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Random YouTube Video</h2>
//       <iframe
//         width="560"
//         height="315"
//         src={`https://www.youtube.com/embed/${video.id.videoId}`}
//         title={video.snippet.title}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//       <p>{video.snippet.title}</p>
//       <p>{video.snippet.description}</p>
//     </div>
//   );
// };

// export default RandomYouTubeVideo;
// ------------------------------------------------------------------------------------------------------?
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual key
// const API_KEY = 'AIzaSyCkMZz4ctl_RSAQ-5LfCWuHjqZi835n5ww';

// const YouTubePage = () => {
//   const [video, setVideo] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   // Fetch a random video on load
//   useEffect(() => {
//     const fetchRandomVideo = async () => {
//       const randomQuery = Math.random().toString(36).substring(7);
//       const response = await axios.get(
//         `https://www.googleapis.com/youtube/v3/search`,
//         {
//           params: {
//             part: 'snippet',
//             q: randomQuery,
//             type: 'video',
//             maxResults: 1,
//             key: API_KEY,
//           },
//         }
//       );
//       setVideo(response.data.items[0]);
//     };

//     fetchRandomVideo();
//   }, []);

//   // Search videos by term
//   const handleSearch = async () => {
//     const response = await axios.get(
//       `https://www.googleapis.com/youtube/v3/search`,
//       {
//         params: {
//           part: 'snippet',
//           q: searchTerm,
//           type: 'video',
//           maxResults: 9,
//           key: API_KEY,
//         },
//       }
//     );
//     setSearchResults(response.data.items);
//   };

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
//       {/* <h1>YouTube Explorer</h1> */}

//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           placeholder="Search Any videos..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{
//             padding: '10px',
//             width: '80%',
//             fontSize: '16px',
//             border: '1px solid #ccc',
//             borderRadius: '6px',
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             padding: '10px 15px',
//             marginLeft: '10px',
//             fontSize: '16px',
//             borderRadius: '6px',
//             cursor: 'pointer',
//           }}
//         >
//           Search
//         </button>
//       </div>

//       {searchResults.length > 0 ? (
//         <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr 1fr' }}>
//           {searchResults.map((video) => (
//             <div key={video.id.videoId}>
//               <iframe
//                 width="100%"
//                 height="200"
//                 src={`https://www.youtube.com/embed/${video.id.videoId}`}
//                 title={video.snippet.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//               <p>{video.snippet.title}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         video && (
//           <div>
//             <h2>Random YouTube Video</h2>
//             <iframe
//               width="560"
//               height="315"
//               src={`https://www.youtube.com/embed/${video.id.videoId}`}
//               title={video.snippet.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//             <p>{video.snippet.title}</p>
//             <p>{video.snippet.description}</p>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default YouTubePage;

// -------------------------------------------------------------------------------------------------------

// YouTubePage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './YouTubePage.css';

// // const API_KEY = 'YOUR_YOUTUBE_API_KEY';
// const API_KEY = 'AIzaSyCkMZz4ctl_RSAQ-5LfCWuHjqZi835n5ww';

// const formatDuration = (isoDuration) => {
//   const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
//   const [hours, minutes, seconds] = [match[1] || '0', match[2] || '0', match[3] || '0'];
//   return `${hours > 0 ? hours.padStart(2, '0') + ':' : ''}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
// };

// const YouTubePage = () => {
//   const [video, setVideo] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [nextPageToken, setNextPageToken] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchRandomVideo();
//   }, []);

//   const fetchRandomVideo = async () => {
//     try {
//       const randomQuery = Math.random().toString(36).substring(7);
//       const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
//         params: {
//           part: 'snippet',
//           q: randomQuery,
//           type: 'video',
//           maxResults: 1,
//           key: API_KEY,
//         },
//       });
//       const vid = res.data.items[0];
//       const statsRes = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
//         params: {
//           part: 'contentDetails,statistics',
//           id: vid.id.videoId,
//           key: API_KEY,
//         },
//       });
//       const stats = statsRes.data.items[0];
//       vid.duration = stats.contentDetails.duration;
//       vid.stats = stats.statistics;
//       setVideo(vid);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSearch = async (loadMore = false) => {
//     if (!searchTerm) return;
//     setLoading(true);
//     try {
//       const params = {
//         part: 'snippet',
//         q: searchTerm,
//         type: 'video',
//         maxResults: 1,
//         key: API_KEY,
//         pageToken: loadMore ? nextPageToken : undefined,
//       };
//       const res = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
//       const items = res.data.items;
//       const ids = items.map(i => i.id.videoId).join(',');

//       const details = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
//         params: {
//           part: 'contentDetails,statistics',
//           id: ids,
//           key: API_KEY,
//         },
//       });

//       const detailsMap = {};
//       details.data.items.forEach(item => {
//         detailsMap[item.id] = {
//           duration: item.contentDetails.duration,
//           stats: item.statistics,
//         };
//       });

//       const results = items.map(item => ({
//         ...item,
//         duration: detailsMap[item.id.videoId]?.duration || '',
//         stats: detailsMap[item.id.videoId]?.stats || {},
//       }));

//       setSearchResults(loadMore ? [...searchResults, ...results] : results);
//       setNextPageToken(res.data.nextPageToken || null);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = () => handleSearch(true);
//   const handleVideoClick = (vid) => setVideo(vid);

//   return (
//     <div className="container">
//       <h1>YouTube Explorer</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search YouTube videos..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={() => handleSearch(false)}>Search</button>
//       </div>
//       {loading && <p>Loading...</p>}
//       <div className="cards">
//         {searchResults.map((vid) => (
//           <div key={vid.id.videoId} className="card" onClick={() => handleVideoClick(vid)}>
//             <img src={vid.snippet.thumbnails.medium.url} alt="thumbnail" />
//             <div className="card-content">
//               <p className="card-title">{vid.snippet.title}</p>
//               <p className="card-meta">{vid.snippet.channelTitle} • {new Date(vid.snippet.publishedAt).toLocaleDateString()}</p>
//               <p className="card-stats">👁️ {Number(vid.stats.viewCount || 0).toLocaleString()} • 👍 {Number(vid.stats.likeCount || 0).toLocaleString()}</p>
//               <p className="card-duration">{formatDuration(vid.duration)}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {nextPageToken && <button onClick={handleLoadMore} className="load-more">Load More</button>}
//       {video && (
//         <div className="player">
//           <h2>{video.snippet.title}</h2>
//           <p className="card-meta">
//             {video.snippet.channelTitle} • {new Date(video.snippet.publishedAt).toLocaleDateString()} •
//             {formatDuration(video.duration)} • 👁️ {Number(video.stats.viewCount || 0).toLocaleString()} • 👍 {Number(video.stats.likeCount || 0).toLocaleString()}
//           </p>
//           <iframe
//             width="100%"
//             height="400"
//             src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
//             frameBorder="0"
//             allow="autoplay; encrypted-media"
//             allowFullScreen
//           />
//           <p>{video.snippet.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YouTubePage;


// -----------------------------------------------------------------------------------// YouTubePage.jsx


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_KEY = 'AIzaSyCkMZz4ctl_RSAQ-5LfCWuHjqZi835n5ww';


// const YouTubePage = () => {
//   const [video, setVideo] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const fetchRandomVideo = async () => {
//       try {
//         const randomQuery = Math.random().toString(36).substring(7);
//         const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
//           params: {
//             part: 'snippet',
//             q: randomQuery,
//             type: 'video',
//             maxResults: 0,
//             key: API_KEY,
//           },
//         });
//         setVideo(response.data.items[0]);
//       } catch (err) {
//         console.error('Failed to fetch random video:', err);
//       }
//     };

//     fetchRandomVideo();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
//         params: {
//           part: 'snippet',
//           q: searchTerm,
//           type: 'video',
//           maxResults: 9,
//           key: API_KEY,
//         },
//       });
//       setSearchResults(response.data.items);
//       setVideo(null); // clear current video if new search is made
//     } catch (err) {
//       console.error('Search failed:', err);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Search any videos..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={styles.input}
//         />
//         <button onClick={handleSearch} style={styles.button}>
//           Search
//         </button>
//       </div>

//       {searchResults.length > 0 && (
//         <div style={styles.grid}>
//           {searchResults.map((vid) => (
//             <div
//               key={vid.id.videoId}
//               style={styles.card}
//               onClick={() => setVideo(vid)}
//             >
//               <img
//                 src={vid.snippet.thumbnails.medium.url}
//                 alt={vid.snippet.title}
//                 style={styles.thumbnail}
//               />
//               <p style={styles.title}>{vid.snippet.title}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {video && (
//         <div style={styles.videoPlayer}>
//           <iframe
//             width="100%"
//             height="400"
//             src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
//             title={video.snippet.title}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//           <h2>{video.snippet.title}</h2>
//           <p>{video.snippet.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px',
//     fontFamily: 'sans-serif',
//   },
//   searchContainer: {
//     marginBottom: '20px',
//     display: 'flex',
//     flexDirection: 'row',
//     // alignItems: 'center',
//     // justifyContent: 'space-between',
//     gap: '10px',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '6px',
//     width: '100%',
//     maxWidth: '500px',
//   },
//   button: {
//     padding: '10px 15px',
//     fontSize: '16px',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     width: '150px',
//     alignSelf: 'start',
//   },
//   grid: {
//     display: 'grid',
//     gap: '20px',
//     // gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//     gridTemplateColumns: '1fr 1fr 1fr',
//   },

//   card: {
//     cursor: 'pointer',
//     border: '1px solid #eee',
//     borderRadius: '10px',
//     overflow: 'hidden',
//     backgroundColor: '#fafafa',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//     transition: 'transform 0.2s ease',
//   },
//   thumbnail: {
//     width: '100%',
//     display: 'block',
//   },
//   title: {
//     padding: '10px',
//     fontSize: '14px',
//     fontWeight: 'bold',
//   },
//   videoPlayer: {
//     marginTop: '40px',
//   },
//   button: {
//     padding: '10px 15px',
//     fontSize: '16px',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     transition: 'background-color 0.3s ease',
//   },
//   buttonHover: {
//     backgroundColor: '#0056b3',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '6px',
//     width: '100%',
//     maxWidth: '500px',
//   },
//   inputFocus: {
//     borderColor: '#007bff',
//     outline: 'none',
//   },
// };

// export default YouTubePage;


// ------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEYS = [
  // 'AIzaSyCkMZz4ctl_RSAQ-5LfCWuHjqZi835n5ww',
  // 'AIzaSyA2cj1bomRx_XqyOlIpFZ24fywYux03j6E',
  // 'AIzaSyCkMZz4ctl_RSAQ-5LfCWuHjqZi835n5ww2',
  // 'AIzaSyCkMZz4ctl_RSAQ-5LfCWuHjqZi835n5ww3',
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