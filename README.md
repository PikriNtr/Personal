# PikriNtr Portofolio — Astro

Personal portofolio, dimigrasi dari Next.js ke Astro (statis, tanpa framework server).

## Stack

- [Astro](https://astro.build) + island React (Navbar dropdown, hover video player, theme toggle)
- Tailwind CSS v3 (PostCSS)
- Font: Inter via `@fontsource/inter`

## Commands

| Command           | Action                          |
| :---------------- | :------------------------------ |
| `npm install`     | Install dependencies            |
| `npm run dev`     | Dev server di `localhost:4321`  |
| `npm run build`   | Build produksi ke `./dist/`     |
| `npm run preview` | Preview hasil build lokal       |

## Deploy (Vercel)

Import repo ini ke Vercel — framework preset **Astro** terdeteksi otomatis, tidak perlu config tambahan.

## Spotify Now Playing (opsional)

`api/now-playing.js` adalah Vercel Serverless Function (tanpa framework). Aktif jika env vars berikut di-set di Vercel:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

Endpoint: `GET /api/now-playing` — mengembalikan `{ isPlaying: false }` jika env vars kosong atau tidak ada lagu yang diputar.
