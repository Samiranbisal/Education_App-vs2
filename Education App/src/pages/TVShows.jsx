// import React, { useEffect, useState } from 'react';
// import { fetchPopularTVShows } from '../utils/trakt';
// import { fetchTrailer } from '../utils/youtube';
// import { auth, db } from '../firebase';
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
// } from 'firebase/firestore';
// import '../styles/TVShows.css';

// const ITEMS_PER_PAGE = 8;

// const TVShows = () => {
//   const [tvShows, setTvShows] = useState([]);
//   const [trailers, setTrailers] = useState({});
//   const [sortBy, setSortBy] = useState('rating');
//   const [favorites, setFavorites] = useState([]);
//   const [selectedTrailer, setSelectedTrailer] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const user = auth.currentUser;

//   const fetchFavorites = async () => {
//     if (!user) return;
//     const docRef = doc(db, 'users', user.uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       setFavorites(docSnap.data().favorites || []);
//     }
//   };

//   const toggleFavorite = async (id) => {
//     if (!user) return alert('Please log in to favorite.');
//     const docRef = doc(db, 'users', user.uid);
//     const isFav = favorites.includes(id);

//     await updateDoc(docRef, {
//       favorites: isFav ? arrayRemove(id) : arrayUnion(id),
//     });

//     setFavorites((prev) =>
//       isFav ? prev.filter((f) => f !== id) : [...prev, id]
//     );
//   };

//   const openTrailer = (videoId) => {
//     setSelectedTrailer(videoId);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedTrailer(null);
//     setShowModal(false);
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       const data = await fetchPopularTVShows();
//       setTvShows(data);
//       fetchFavorites();

//       const trailerMap = {};
//       for (const show of data.slice(0, 15)) {
//         const trailer = await fetchTrailer(show.title + ' trailer');
//         if (trailer) trailerMap[show.id] = trailer;
//       }
//       setTrailers(trailerMap);
//     };

//     loadData();
//   }, []);

//   const sortedShows = [...tvShows].sort((a, b) => {
//     if (sortBy === 'rating') return b.rating - a.rating;
//     if (sortBy === 'year') return b.year - a.year;
//     return 0;
//   });

//   const paginatedShows = sortedShows.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const totalPages = Math.ceil(sortedShows.length / ITEMS_PER_PAGE);

//   return (
//     <div className="tvshows-container">
//       <header className="tvshows-header">
//         <h1>TV Shows (via Trakt)</h1>
//         <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
//           <option value="rating">Sort by Rating</option>
//           <option value="year">Sort by Year</option>
//         </select>
//       </header>

//       <div className="tvshows-grid">
//         {paginatedShows.map((show) => (
//           <div key={show.id} className="tvshow-card">
//             <img src={show.poster} alt={show.title} />
//             <h3>{show.title}</h3>
//             <p>Rating: {show.rating?.toFixed(1) || 'N/A'}</p>
//             <p>Year: {show.year}</p>
//             <button
//               onClick={() => toggleFavorite(show.id)}
//               className={favorites.includes(show.id) ? 'favorited' : ''}
//             >
//               {favorites.includes(show.id) ? '★ Favorited' : '☆ Favorite'}
//             </button>
//             {trailers[show.id] && (
//               <button onClick={() => openTrailer(trailers[show.id])}>
//                 ▶ Watch Trailer
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentPage(idx + 1)}
//             className={currentPage === idx + 1 ? 'active' : ''}
//           >
//             {idx + 1}
//           </button>
//         ))}
//       </div>

//       {showModal && selectedTrailer && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-button" onClick={closeModal}>✖</button>
//             <iframe
//               width="100%"
//               height="400"
//               src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=1`}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               title="Trailer"
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TVShows;


import React, { useEffect, useState } from 'react';
import { fetchPopularTVShows } from '../utils/trakt';
import { fetchTrailer } from '../utils/youtube';
import { auth, db } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import '../styles/TVShows.css';

const ITEMS_PER_PAGE = 8;

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [trailers, setTrailers] = useState({});
  const [sortBy, setSortBy] = useState('rating');
  const [favorites, setFavorites] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const user = auth.currentUser;

  // Fetch or create user favorites doc
  const fetchFavorites = async () => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFavorites(docSnap.data().favorites || []);
    } else {
      await setDoc(docRef, { favorites: [] });
    }
  };

  const toggleFavorite = async (id) => {
    if (!user) return alert('Please log in to favorite.');
    const docRef = doc(db, 'users', user.uid);
    const isFav = favorites.includes(id);

    await updateDoc(docRef, {
      favorites: isFav ? arrayRemove(id) : arrayUnion(id),
    });

    setFavorites((prev) =>
      isFav ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const openTrailer = (videoId) => {
    setSelectedTrailer(videoId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTrailer(null);
    setShowModal(false);
  };

  // Load all TV shows on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPopularTVShows();
      setTvShows(data);
      await fetchFavorites();
    };
    loadData();
  }, []);

  // Load trailers for current page only
  useEffect(() => {
    const loadPageTrailers = async () => {
      const pageShows = sortedShows.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );

      const trailerMap = {};
      for (const show of pageShows) {
        if (!trailers[show.id]) {
          const trailer = await fetchTrailer(`${show.title} official trailer`);
          if (trailer) trailerMap[show.id] = trailer;
        }
      }
      setTrailers((prev) => ({ ...prev, ...trailerMap }));
    };

    if (tvShows.length > 0) loadPageTrailers();
  }, [currentPage, tvShows]);

  const sortedShows = [...tvShows].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'year') return b.year - a.year;
    return 0;
  });

  const paginatedShows = sortedShows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedShows.length / ITEMS_PER_PAGE);

  return (
    <div className="tvshows-container">
      <header className="tvshows-header">
        {/* <h1>TV Shows (via Trakt)</h1> */}
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="rating">Sort by Rating</option>
          <option value="year">Sort by Year</option>
        </select>
      </header>

      <div className="tvshows-grid">
        {paginatedShows.map((show) => (
          <div key={show.id} className="tvshow-card">
            <img
              src={show.poster}
              alt={show.title}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/300x450?text=${encodeURIComponent(
                  show.title
                )}`;
              }}
            />
            <h3>{show.title}</h3>
            <p>Rating: {show.rating?.toFixed(1) || 'N/A'}</p>
            <p>Year: {show.year}</p>
            <button
              onClick={() => toggleFavorite(show.id)}
              className={favorites.includes(show.id) ? 'favorited' : ''}
            >
              {favorites.includes(show.id) ? '★ Favorited' : '☆ Favorite'}
            </button>
            {trailers[show.id] ? (
              <button onClick={() => openTrailer(trailers[show.id])}>
                ▶ Watch Trailer
              </button>
            ) : (
              <p className="no-trailer">Trailer not found</p>
              //  <button onClick={() => openTrailer(trailers[show.id])}>
              //   ▶ Watch Trailer
              // </button>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? 'active' : ''}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {showModal && selectedTrailer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              ✖
            </button>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=1`}
              // src={`https://www.youtube.com/embed/${selectedTrailer}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVShows;
