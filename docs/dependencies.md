# Dependencies

From `package.json`. Grouped by purpose.

## Runtime Dependencies

| Package | Purpose |
|---|---|
| `next` (^15.5.9) | React framework, App Router, RSC |
| `react` / `react-dom` (^18.3.1) | UI library |
| `@nextui-org/react` + subpackages | Component library (Checkbox, DatePicker, System, Theme) |
| `tailwindcss` | Utility CSS (via `tailwind.config.ts`) |
| `tailwind-gradient-mask-image` | Gradient mask utilities |
| `framer-motion` | Animations |
| `firebase` (^10.10.0) | Client Firebase SDK (Auth, Firestore, Storage) |
| `firebase-admin` (^12.2.0) | Server Firebase SDK (route handlers) |
| `react-firebase-hooks` | `useAuthState` etc. |
| `next-pwa` | PWA / service worker / offline |
| `nextjs-toploader` | Top loading bar |
| `react-toastify` | Toast notifications |
| `react-icons` | Icon set |
| `react-markdown` + `remark-gfm` + `remark-math` + `rehype-highlight` + `rehype-katex` | Markdown/MDX rendering for content |
| `react-countdown` | Countdown timers (events) |
| `react-zoom-pan-pinch` | Image zoom/viewer |
| `browser-image-compression` | Client image resize before upload |
| `cloudinary` | Avatar upload (`/api/profile`) |
| `nodemailer` | Contact form email (`/api/contact`) |
| `xlsx` | Excel export (e.g. member/points data) |
| `express` | ⚠️ Listed but **not used** for the app (likely transitive/leftover) |
| `tailwind-datepicker-react` | Date picker |

## Dev Dependencies

| Package | Purpose |
|---|---|
| `typescript` (^5) | Type safety |
| `@types/node`, `@types/react`, `@types/react-dom` | Type defs |
| `eslint` + `eslint-config-next` | Linting |
| `prettier` + `prettier-plugin-tailwindcss` | Formatting |
| `autoprefixer`, `postcss` | CSS pipeline |
| `nodemon` | (configured via `nodemonConfig`) |
| `server-only` | Marks server-only modules (e.g. `firebaseAdmin.ts`) |

## Notes

- **No data-fetching library** (SWR/TanStack Query) is used — the app relies on native `fetch` + `cache: "no-store"`.
- The `express` dependency in `package.json` is not used by the Next.js app itself.