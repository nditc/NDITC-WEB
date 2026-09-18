# Deployment — Frontend

## Host: Vercel

The site is deployed at `https://nditc.net`.

### Build

```bash
npm run build
npm start
```

Vercel uses `next build` automatically. `vercel.json` holds framework/routing config.

### Env

Set all variables from [configuration/environment.md](configuration/environment.md) in the Vercel project dashboard (Production / Preview / Development as needed).

### CORS

The Flask backend allowlists `http://localhost:3000` for dev. For production browser calls to succeed, the backend CORS `origins` must include `https://nditc.net`.

## PWA

`next-pwa` generates a service worker and `manifest.webmanifest` (in `public/`). `src/app/offline/page.tsx` provides an offline fallback. Verify icon paths (`icon512_maskable.png`, etc.) after build.

## Notes

- Because the Flask API base URL is hard-coded to production, the deployed frontend always talks to `nditc.pythonanywhere.com`. If you stand up a staging backend, refactor to `NEXT_PUBLIC_API_BASE_URL`.
- `next.config.mjs` may contain PWA / image config; review before changing build settings.