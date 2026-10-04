# NDITC Web — Documentation

> Next.js 15 (App Router) frontend for the NDITC club platform. Deployed on Vercel at `https://nditc.net`.

This `docs/` folder contains the full technical documentation for the frontend, organized by concern.

## Contents

| Section | Description |
|---|---|
| [Getting Started](getting-started.md) | Install, env, dev server |
| [Dependencies](dependencies.md) | Full dependency map & what each is for |
| [Architecture / Overview](architecture/overview.md) | Tech stack, topology, design philosophy |
| [Architecture / App Router](architecture/app-router.md) | Route groups, layouts, pages |
| [Architecture / State Management](architecture/state-management.md) | Context providers, Firebase, fetching |
| [Architecture / API Routes](architecture/api-routes.md) | BFF Route Handlers |
| [Features / Authentication](features/authentication.md) | Firebase Auth + admin gate |
| [Features / Club Portal](features/club-portal.md) | Member & admin portal |
| [Features / Quiz & Events](features/quiz-events.md) | Quiz submission, leaderboard |
| [Features / Content](features/content.md) | Activities, notifications, images |
| [Configuration / Environment](configuration/environment.md) | Required env vars |
| [Deployment](deployment.md) | Vercel build & PWA |

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript 5 |
| UI | React 18, NextUI, Tailwind CSS 3 |
| Animation | Framer Motion |
| Auth (members) | Firebase Auth + Firestore + Storage |
| Auth (admin) | Flask JWT cookie (via `/api/v1/user/login`) + `ADMIN_IDS` gate |
| Data fetching | Native `fetch` (no SWR/TanStack) |
| PWA | `next-pwa` |
| Media | Cloudinary (avatar upload) |
| Email | Nodemailer (contact), Mailchimp (newsletter) |
| Host | Vercel |