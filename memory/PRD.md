# Silkstrand Academy — Spider Web themed School Website

## Original Problem Statement
Design a highly creative, visually engaging, and professional school website with a unique 'Spider Web' theme — pastel color palette, subtle SVG web illustrations, smooth animations, sections Home/About/Academics/Admissions/Events/Contact, responsive, accessible.

## User Choices (v1)
- School name: Silkstrand Academy (placeholder)
- Palette: Lavender (#C9B6E4) + Mint (#B5E3CC) + Peach (#FFD3B5) on cream #FBF7F2
- Scope: Static site + Contact form (DB) + Admissions form (DB) + Events from backend
- Rich/interactive animations approved

## Architecture
- Backend: FastAPI (`/app/backend/server.py`) with MongoDB (motor). Routes prefixed `/api`.
  - POST/GET `/api/contact`
  - POST/GET `/api/admissions`
  - POST/GET/DELETE `/api/events` (5 events auto-seeded on startup)
- Frontend: React 19 single-page, anchor-scrolled sections.
  - `App.js` composes Nav, WebCursor, Hero, About, Academics, Admissions, Events, Contact, Footer.
  - Custom SVG web generator in `lib/web.js`; components in `components/SpiderWeb.jsx`.
  - Web-thread cursor follows mouse + draws threads to `[data-web-anchor]` elements (`WebCursor.jsx`).
  - Fonts: Fraunces (display) + Plus Jakarta Sans (body).
  - shadcn/ui: Button, Input, Textarea, Label, Select, Card; toast via sonner.

## Implemented (Feb 2026)
- Hero with parallax SVG webs, dangling spider, headline marquee, 3 stat cards.
- About section with 4 values.
- Academics grid of 6 programs with pastel-disc motifs and tilt-hover.
- Admissions form (7 fields) → POST `/api/admissions` → success toast.
- Events grid rendering seeded events from `/api/events`.
- Contact form → POST `/api/contact` → success toast.
- Dark ink footer with rotating web + links.
- Grain texture overlay, scroll-reveal, slow-spin webs, pill shimmer buttons.

## Testing
- Backend pytest: 7/7 pass — root, contact CRUD+422, admissions CRUD, events seed+CRUD+404.
- Frontend Playwright: all sections render, both forms submit, events populated, toasts visible, web-cursor active.
- Report: `/app/test_reports/iteration_1.json` — 100% both.

## Backlog
- P1: Admin dashboard to view/manage contacts, admissions, events.
- P1: Image gallery on About/Academics using real photography.
- P2: Multi-page routing for deep program pages with rich content.
- P2: Blog/News section for community updates.
- P2: Newsletter subscription + integration with Resend/SendGrid.
