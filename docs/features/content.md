# Features — Content

Public content (activities, notifications, announcements, images) is served by the **Flask backend** and fetched by the frontend.

## Activities & Events

- `src/data/events.ts` fetches from `https://nditc.pythonanywhere.com/api/v1/` + type.
- `(main)/activities/page.tsx` + `_components/` (EventsList, Upcoming, Event, EventNav) render lists.
- `(main)/details/[url]/[type]/[date]/page.tsx` shows a single item — the `url` param is **decrypted** client-side via `util/Encrypt.ts` (AES-256-CBC) before fetching.
- `HashtechPosts.tsx` surfaces Hashtech-specific posts.

## Notifications

- `(main)/notifications/page.tsx` fetches `/notifications/web?page=1&limit=5` with `cache: "no-store"`.
- `Sidebar/NewNotification.tsx` shows a live badge from the same endpoint.
- `SingleNotification.tsx` renders one notification.

## Announcements & Images

- Announcements rendered in member profile (`club/(user-handle)/profile/announcements/`).
- Images uploaded via Flask `/images/upload` (admin) and served via `/images/<enc_id>`.
- Frontend avatar uploads go through `/api/profile` → Cloudinary.

## Markdown Rendering

Content bodies use `react-markdown` + `remark-gfm` + `remark-math` + `rehype-highlight` + `rehype-katex`, styled by `(main)/styles/markdown.css`.

## Encryption Note

Frontend `util/Encrypt.ts` uses a **hard-coded AES-256-CBC key + IV** to decrypt content URLs. This is independent of the backend's Fernet key and is visible in client code — acceptable for obfuscation, not security.