// const YOUTUBE_API_KEY = 'AIzaSyARs00TfHp-F6yb0_E06NI4S-7K_TrQcvw';

// export async function fetchTrailer(query) {
//   const res = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
//   );
//   const data = await res.json();
//   return data.items[0]?.id?.videoId || null;
// }


const YOUTUBE_API_KEY = 'AIzaSyD1bfDO_0y3o_N6iL4DJKXzS1_Pl3H9ACk';

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
