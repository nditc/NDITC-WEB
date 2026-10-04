# Getting Started — Frontend

## Prerequisites

- Node.js 18+ (Next.js 15 requirement)
- npm (or pnpm/yarn)
- A Firebase project (Auth + Firestore + Storage enabled)

## Setup

```bash
cd NDITC-WEB
npm install

# create environment file (see configuration/environment.md)
cp .env.example .env.local   # if an example exists; otherwise create manually

npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Project Layout

```
NDITC-WEB/
├── public/              # static assets, PWA icons, manifest
├── src/
│   ├── app/
│   │   ├── (main)/       # Public site (route group, no /main in URL)
│   │   ├── club/         # Member + admin portal (URL prefix /club)
│   │   ├── api/          # Route Handlers (BFF) — server-only secrets
│   │   ├── _context/     # React Context providers
│   │   ├── layout.tsx    # root layout
│   │   ├── error.tsx / not-found.tsx / offline/
│   ├── config/           # firebase.ts, firebaseAdmin.ts, config_db.ts
│   ├── data/             # static content (developers, executives, faqs…)
│   ├── util/             # Encrypt.ts, Time.ts, verification.ts, MemberCheck.tsx
├── next.config.mjs / vercel.json / tailwind.config.ts / tsconfig.json
```

## Scripts

| Script | Command |
|---|---|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `next lint` |

## Notes

- The frontend calls the Flask backend at a **hard-coded production URL** (`https://nditc.pythonanywhere.com/api/v1/...`). For local backend testing, point those literals at `localhost:8080` (consider extracting to `NEXT_PUBLIC_API_BASE_URL`).
- CORS: the backend allowlists `http://localhost:3000`, matching the Next.js dev port.