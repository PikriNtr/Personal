// Vercel Serverless Function (tanpa framework): GET /api/now-playing
// Aktif jika env vars berikut di-set di Vercel:
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function getAccessToken() {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export default async function handler(_req, res) {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return res.status(200).json({ isPlaying: false });
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const song = await response.json();

    res.status(200).json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((artist) => artist.name).join(', '),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch now playing' });
  }
}
