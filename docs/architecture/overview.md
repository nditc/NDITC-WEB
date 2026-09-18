# Architecture — Overview

`NDITC-WEB` is a **Next.js 15 App Router** application that plays two roles:

1. **Public marketing + content site** (`(main)` route group) — backed by Firebase (members) and the Flask API (content).
2. **Member/Admin portal** (`club` route group) — quizzes, leaderboards, profiles, admin CMS.
3. **Backend-for-Frontend (BFF)** — `src/app/api/*` Route Handlers proxy third parties (Cloudinary, Mailchimp, `memberapi.nditc.net`) and perform privileged Firebase Admin operations, keeping secrets server-only.

## Topology

```
Browser
   │
   ▼
Next.js (Vercel)
 ├─ Server Components → fetch Flask API (content)
 ├─ Client Components → Firebase Auth/Firestore (members)
 └─ /api/* Route Handlers (BFF)
       ├─ Cloudinary (avatar)
       ├─ Mailchimp (newsletter)
       ├─ memberapi.nditc.net (member lookup)
       └─ Firebase Admin (quiz persistence)
```

## Design Philosophy

- **App Router + Route Groups** for clean URL semantics without nested folders.
- **Provider composition** in root layout: `NextUIProvider → AuthContextProvider → UserDataContextProvider`.
- **Secrets never hit the client** — all external tokens live in Route Handlers (`server-only`).
- **Two auth domains:** Firebase for members, Flask JWT cookie + `ADMIN_IDS` for admins.
- **PWA** via `next-pwa` for offline access.

## Key Directories

| Path | Role |
|---|---|
| `src/app/(main)/` | Public site |
| `src/app/club/` | Portal (members + admins) |
| `src/app/api/` | BFF Route Handlers |
| `src/app/_context/` | Context providers |
| `src/config/` | Firebase clients, admin, register data |
| `src/data/` | Static content modules |
| `src/util/` | Helpers (Encrypt, Time, verification, MemberCheck) |