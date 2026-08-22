# Wedding Invite — Agent Guide

## Commands
- `npm run dev` — dev server (auto-opens browser)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build
- Build must succeed before considering work done.

## Content
Everything in `src/data/weddingData.js`:
- couple names, date, story, events, venues, gallery photos, films, family, FAQ, gift/UPI, music source
- `carouselPhotos` controls the 3D carousel (defaults to first 6 gallery images)
- `galleryImages` and `films` use Unsplash placeholders

## Media files
Drop into `public/media/`:
- `video/hero-bg.mp4`, `video/films/*.mp4`, `gallery/*`, `family/*`, `couple/*`, `qr-code.png`
- `audio/wedding-theme.mp3` — background music (included)

## 3D Background Architecture
`SceneCanvas.jsx` — full-screen R3F canvas behind all sections:
- **Falling petals** (35+ animated planes with drift/respawn)
- **Butterflies** (6 wing-flapping groups with organic motion)
- **Bokeh lights** (25+ floating soft circles)
- **Stars** (400-point particle system, visible in night moods)
- **Moon** (emissive sphere with point light, night sections)
- **Sparkles** from `@react-three/drei` (gold + white layers)
- **Roses, diamonds, rings** — static Float-based decorative elements

### Section Moods (automatic via useActiveSection)
Each section has unique lighting/particle mood defined in `MOODS`:
- **hero/experience** — warm gold, blush ambient
- **story** — soft green/garden palette
- **countdown/films/footer** — night sky with stars + moon
- **events/gallery/venue/family/rsvp/wishes** — warm elegant tones
- Transitions between moods are smooth (lerped in useFrame)

## Simulated features
- **RSVP**: `localStorage` by default; set `VITE_RSVP_ENDPOINT` in `.env` for real POST
- **Wishes Wall**: `localStorage` per device; wire to Firebase/Supabase
- **AI Assistant**: FAQ keyword match; swap for server-side Claude API

## Key architecture
- `App.jsx` — root: `SceneCanvas` (fixed bg) + `useActiveSection` (mood tracking) + all sections
- `src/hooks/` — `useSceneControls` (scroll/pointer for 3D camera), `useActiveSection` (IntersectionObserver), `useBackgroundMusic` (shared Audio)
- Music starts on envelope tap (`LoadingEnvelope`) for mobile autoplay compliance
- Sections use transparent backgrounds (`bg-ivory/60 backdrop-blur-xl`) so the 3D scene shows through
- Tailwind theme: custom colors (`maroon`, `gold`, `ivory`, `rosegold`, `bronze`, `blush`)

## Non-obvious
- `prefers-reduced-motion` respected (cursor effects/petals turn off)
- 3D bg uses `dpr={[1, 1.5]}` for mobile perf
- Countdown shows "Forever Has Begun" when date is past
- `useActiveSection` relies on `id` attributes on each section element
- `GlowRing`, `InterlockedRings`, `Diamond`, `Rose` exported from `SceneCanvas.jsx`
