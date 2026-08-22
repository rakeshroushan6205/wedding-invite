# Rakesh & Priya — Luxury Wedding Invitation Website

A cinematic, royal-feeling wedding invitation site built with React, Vite,
Tailwind CSS, Framer Motion, and React Three Fiber.

## Quick Start

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## 1. Customize the content — one file

Almost everything you'll want to change lives in **`src/data/weddingData.js`**:
couple names, wedding date, the couple's story, event schedule (Mehendi,
Haldi, Sangeet, Ceremony, Reception), venue + map, gallery photos, wedding
films, family members, gift/UPI details, contact info, and the FAQ list
used by the "Wedding Guide" chat widget. Edit that one file and the whole
site updates.

## 2. The 3D experience

There are three layers to the 3D system:

- **Persistent background** (`src/components/SceneCanvas.jsx`, mounted once
  in `App.jsx`) — a fixed, fullscreen 3D scene of glowing rings, sparkles,
  diamonds, and roses that sits behind *every* section on the site. It
  reacts to scroll (a gentle oscillating depth/drift so it never "runs out"
  on a long page) and to the pointer (parallax). Every section's background
  is intentionally translucent (`bg-ivory/85`, `bg-maroon/75`, etc. with
  `backdrop-blur`) so this scene stays visible through all of them.
- **Dedicated showcase** (`src/components/Experience3D.jsx`) — its own
  full-screen section, right after the hero, where your real wedding photos
  hang in gold frames arranged in a circle and **orbit continuously on
  their own** (a `RotatingCenterpiece` group driven by `useFrame`). Each
  photo is wrapped in a `<Billboard>`, so however the ring spins — or
  however far you **drag to look around** via `OrbitControls` — every
  photo always faces you instead of disappearing edge-on. Which photos
  appear is controlled by `carouselPhotos` in `weddingData.js` (defaults to
  the first 6 gallery photos; swap in your own, local image paths work
  fine too).
- **Hero scene** — the hero itself is just a translucent panel over the
  persistent background, so the very first thing guests see is already the
  3D scene plus a video texture layered on top.

If you ever need to tone the background down (e.g. for lower-end phones),
reduce the `Sparkles` `count` props in `SceneCanvas.jsx` or drop the
`dpr={[1, 1.5]}` cap to `dpr={1}`.

## 3. Wedding Films (video showcase)

`src/components/VideoShowcase.jsx` is a dedicated section with a large
featured video player and a thumbnail strip to switch between films —
configured entirely from the `films` array in `src/data/weddingData.js`.
Add your own films by dropping `.mp4` files into
`public/media/video/films/` (see `public/media/README.txt`) and updating
that array; until real files are added, each thumbnail doubles as the video
poster so nothing looks broken.

The masonry **Gallery** section also supports short video clips via the
`galleryVideos` array in the same data file, shown in a small Swiper
carousel beneath the photo grid — handy for quick behind-the-scenes clips
alongside the main films above.

## 4. Music

A short, original instrumental theme (`public/audio/wedding-theme.mp3`,
~24s, loops seamlessly) is included by default — synthesized from scratch
for this project, so there are no licensing concerns. Swap it for a real
track any time by replacing that file (or pointing `music.src` in
`weddingData.js` at a new path) — no other code changes needed.

Playback starts the instant the guest taps **"Enter The Celebration"** on
the envelope (`src/hooks/useBackgroundMusic.js`, wired through
`LoadingEnvelope`'s `onMusicStart`), not after a delay — this matters
because mobile browsers (iOS Safari in particular) only allow audio
autoplay if `play()` runs synchronously inside the real click/tap, so this
is the most reliable place for it to start. The floating play/pause/volume
widget in the corner controls that same shared audio instance.

## 5. Add your real media

Drop your files into `public/` and they'll be picked up automatically
(see `public/media/README.txt` for the exact paths):

- `public/media/video/hero-bg.mp4` — the fullscreen hero video
- `public/media/video/films/*.mp4` — the Wedding Films showcase
- `public/media/gallery/*` — gallery photos & video clips
- `public/media/family/*`, `public/media/couple/*` — your own photos
- `public/media/qr-code.png` — your UPI QR code image
- `public/audio/wedding-theme.mp3` — background music (already included)

Until you add these, the site uses elegant Unsplash placeholder images so it
looks complete out of the box.

## 6. The countdown at zero

Once `couple.weddingDate` (in `weddingData.js`) is in the past, every unit
in the Countdown section (Days / Hours / Minutes / Seconds) automatically
shows `00` and the heading switches to "Forever Has Begun" — see
`getTimeLeft()` in `src/components/Countdown.jsx`. No extra setup needed;
just keep the date in that file accurate.

## 7. Things that are simulated (and how to make them real)

This project is fully functional in the browser, but a couple of features
that the brief describes as backend-powered are implemented as honest,
working **front-end simulations** so the site runs with zero servers or paid
services. Each is clearly marked in code with how to upgrade it:

- **RSVP form** (`src/components/RSVPForm.jsx`) — submissions are saved to
  the browser's `localStorage` by default. Set `VITE_RSVP_ENDPOINT` in a
  `.env` file (copy `.env.example`) to POST real submissions to Formspree, a
  Google Apps Script web app, Airtable, or your own API.
- **Guest Wishes Wall** (`src/components/WishesWall.jsx`) — wishes persist
  per-device via `localStorage`, so a guest's own wishes survive a refresh,
  but aren't shared live with other guests yet. Wire it to Firebase
  Firestore or Supabase (a few lines in that file) for a real-time shared
  wall.
- **Wedding Guide AI assistant** (`src/components/AIAssistant.jsx`) — answers
  questions by matching keywords against the FAQ list in `weddingData.js`,
  entirely client-side (no API key, no cost, no network dependency). To make
  it a true LLM-powered assistant, add a backend route that calls the Claude
  API server-side (never put an API key in front-end code) and send the
  guest's question there instead.

Everything else — the opening envelope animation, the 3D system, music,
countdown, timeline, gallery/lightbox, wedding films, event cards, map
embed, cursor trail, confetti finale — is fully real and requires no
further setup.

## 8. Project structure

```
src/
  data/weddingData.js        ← edit this for all content
  hooks/
    useSceneControls.js      ← scroll + pointer tracking for the 3D bg
    useBackgroundMusic.js    ← shared Audio() instance + play/pause/volume
  components/
    LoadingEnvelope.jsx      ← opening envelope gate, starts the music
    Hero.jsx                 ← cinematic hero (sits over the 3D bg)
    SceneCanvas.jsx          ← persistent background 3D scene
    Experience3D.jsx         ← dedicated, auto-spinning 3D showcase
    Marquee.jsx              ← GSAP-powered scrolling ribbon
    CoupleStory.jsx
    Countdown.jsx
    EventSchedule.jsx
    Gallery.jsx
    VideoShowcase.jsx        ← Wedding Films section
    Venue.jsx
    FamilySection.jsx
    RSVPForm.jsx
    WishesWall.jsx
    GiftSection.jsx
    FinaleSection.jsx        ← scroll-triggered confetti finale
    Footer.jsx
    MusicPlayer.jsx          ← presentational controls only
    AIAssistant.jsx          ← "Wedding Guide" FAQ widget
    Navbar.jsx, SectionDivider.jsx, FloatingPetals.jsx, CursorTrail.jsx
```

## 9. Performance notes

- The persistent 3D background uses a capped device pixel ratio
  (`dpr={[1, 1.5]}`) and modest geometry/particle counts to stay smooth on
  phones even though it now renders behind the whole page.
- Images are lazy-loaded; the gallery lightbox and video players load full
  media on demand rather than upfront.
- Reduced-motion is respected (cursor hearts and petals turn off
  automatically for users with `prefers-reduced-motion` set, or on touch
  devices for the cursor trail).

## 10. Deploying

This is a static Vite app — `npm run build` produces a `dist/` folder you
can deploy to Vercel, Netlify, GitHub Pages, or any static host.
