# Aaditya Singh Portfolio

A cinematic, dark, crimson-accented personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and Lenis.

## Features

- Scroll-driven canvas background using the provided desktop and mobile image sequences.
- Automatic responsive switching between desktop and mobile frame folders.
- Fixed cinematic story section with GSAP scroll fades.
- Lenis smooth scrolling and Framer Motion section reveals.
- Music toggle with volume control using `public/music.mp3`.
- CSS blur veil over the bottom-right watermark area.
- High-end responsive sections for hero, about, skills, featured project, other projects, timeline, stats, contact, and footer.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub + Vercel

Push this folder as the repo root:

```txt
D:\my site pls\cinematic-arlecchino-portfolio-package-v2
```

Vercel settings:

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Do not commit `node_modules` or `dist`; they are ignored by `.gitignore`.

## Assets

The required scroll background assets are already inside this project:

- Desktop frames: `public/desktop-frames`
- Mobile frames: `public/mobile-frames`
- Music: `public/music.mp3`

The app reads those paths in `src/components/BackgroundCanvas.jsx`.

## Personalization

Most personal content lives in `src/App.jsx`. When you add a resume later, place it in `public` and update the resume button link in `src/App.jsx`.
