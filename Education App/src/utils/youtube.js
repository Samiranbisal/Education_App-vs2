

const YOUTUBE_API_KEY = 'AIzaSyD1bfDO_0y3o_N6iL4DJKXzS1_Pl3H9ACk';
// const YOUTUBE_API_KEY = 'AIzaSyD1bfDO_0y39ACk';

export const fetchTrailer = async (query) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&key=${YOUTUBE_API_KEY}&type=video&maxResults=1`
    );
    const data = await res.json();
    return data.items?.[0]?.id?.videoId || null;
  } catch (err) {
    console.error('YouTube error:', err.message);
    return null;
  }
};
