const TRAKT_API_KEY = '2626148438a85bfd1a924e2274ab8d743d928628b84174a9b5ff70626e46e567';

export const fetchPopularTVShows = async () => {
  try {
    const response = await fetch('https://api.trakt.tv/shows/popular?extended=full', {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-key': TRAKT_API_KEY,
        'trakt-api-version': '2',
      },
    });

    const data = await response.json();

    return data.map((item) => ({
      id: item.ids.trakt,
      title: item.title,
      year: item.year,
      rating: item.rating || Math.random() * 9, // fallback rating
      poster: `https://images.weserv.nl/?url=thetvdb.com/banners/posters/${item.ids.tvdb}-1.jpg`, // or fallback
    }));
  } catch (err) {
    console.error('Error fetching TV shows:', err.message);
    return [];
  }
};



