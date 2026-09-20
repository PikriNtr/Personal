# TODO — Portofolio Astro

## Konten (segera)
- [ ] Ganti link dummy `#` di `src/pages/index.astro` dan `src/components/NavItem.tsx` dengan link asli tiap project (Instagram/YouTube/Drive)

## Fitur
- [ ] Halaman project sendiri (`/project/nianely`, dst.) — embed Instagram/YouTube per project, card tinggal link ke sana
- [ ] Spotify now-playing di hero — fetch `/api/now-playing` dari island kecil, tampil "🎧 listening to ..." di bawah tagline (env vars: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` di Vercel)
- [ ] Links sosial (GitHub / Instagram / osu!) — deretan icon di hero atau halaman `/links` gaya linktree

## Polish
- [ ] Sitemap + robots.txt (`@astrojs/sitemap`)
- [ ] Vercel Analytics (toggle di dashboard Vercel)
- [ ] Dark mode ikuti sistem (`prefers-color-scheme` + localStorage) supaya tidak "flash" terang saat load di mode gelap

## Catatan
- `og:url` dan `og:image` di `src/pages/index.astro` memakai domain placeholder `https://pikrintr.vercel.app` — ganti kalau domain akhirnya berbeda
