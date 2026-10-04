# Configuration — Environment Variables

Create `.env.local` (or Vercel project env) with the following.

## Firebase (Client) — `NEXT_PUBLIC_*`

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_KEY` | Firebase web API key |
| `NEXT_PUBLIC_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_PROJECT_ID` | Firebase project id (also used by Admin) |
| `NEXT_PUBLIC_STORAGE_BUCKET` | Firebase Storage bucket |
| `NEXT_PUBLIC_MESSAGING_SENDER_ID` | FCM sender id |
| `NEXT_PUBLIC_APP_ID` | Firebase app id |
| `NEXT_PUBLIC_MEASUREMENT_ID` | Analytics (optional) |

## Firebase (Admin / Server-only)

| Variable | Purpose |
|---|---|
| `FIREBASE_CLIENT_EMAIL` | Service account client email |
| `FIREBASE_PRIVATE_KEY` | Service account private key (newline-escaped) |

Used by `config/firebaseAdmin.ts` (`initAdmin`). Marked `server-only`.

## App / Feature Gates

| Variable | Purpose |
|---|---|
| `ADMIN_IDS` | Comma-separated Firebase UIDs allowed into admin UI (coarse gate) |
| `NEXT_PUBLIC_API_BASE_URL` | ⚠️ Not yet used — Flask API base is hard-coded; add this to centralize |

## Third-Party (Server-only)

| Variable | Purpose |
|---|---|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary upload (`/api/profile`) |
| `CLOUDINARY_API_KEY` | Cloudinary key |
| `CLOUDINARY_API_SECRET` | Cloudinary secret |
| `MEMBER_API_PRIVATE_KEY` | Token for `memberapi.nditc.net` (`Authorization: Token ...`) |
| `NEXT_PUBLIC_EMAIL_PASSWORD` | Gmail app password for contact form (⚠️ should be non-public) |
| `NEXT_PUBLIC_PERSONAL_EMAIL` | Contact form recipient |

## Notes

- `NEXT_PUBLIC_EMAIL_PASSWORD` is currently exposed as a public var in `contact/route.ts` — recommended to move to a private env var.
- The Flask API base URL is hard-coded in `src/data/events.ts` and notification pages. Introduce `NEXT_PUBLIC_API_BASE_URL` and refactor for portability.