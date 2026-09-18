# Architecture — App Router

The app uses the **Next.js App Router** with **route groups** (parenthesized folders that don't affect the URL).

## Route Groups

| Group | URL prefix | Purpose |
|---|---|---|
| `(main)` | `/` | Public site: home, about, activities, executive, developer, policy, notifications, details |
| `club` | `/club` | Member & admin portal: login, profile, leaderboard, participate, events, admin panel |

## Layouts

- **Root layout** (`src/app/layout.tsx`): wraps everything in `NextUIProvider → AuthContextProvider → UserDataContextProvider`, renders `Navbar`, `SideBar`, `Footer`, `ToastContainer`, `NextTopLoader`.
- **`club/admin/(adminpanel)/layout.tsx`**: admin shell, calls `/api/admin` to gate UI.
- **`club/(user-handle)/profile/layout.tsx`**: member shell, fetches `/api/admin` and guards authenticated sections.

## Special Files

| File | Role |
|---|---|
| `error.tsx`, `global-error.tsx` | Error boundaries |
| `not-found.tsx` | 404 |
| `offline/page.tsx` | PWA offline fallback |
| `loading.tsx` | Suspense fallbacks (activities, notifications) |

## Pages (selected)

**`(main)`**
- `page.tsx` — home (Hero, ActivityCards, Departments, FAQ, HashtechPosts, WhyNditc)
- `activities/page.tsx` + `_components/` (EventsList, Upcoming, Event)
- `notifications/page.tsx` + `_components/SingleNotification`
- `details/[url]/[type]/[date]/page.tsx` — content detail (decrypts `url`)
- `about/`, `executive/`, `developer/`, `policy/`

**`club`**
- `club/page.tsx` — portal landing
- `club/(user-handle)/` — login, profile, register, delete-account, reset-password, verify
- `club/admin/` — login, `(adminpanel)`, eventEdit, rankers
- `club/participate/[id]/`, `club/leaderboard/`, `club/events/`, `club/standings/[type]/`

## Data Modules

Static content lives in `src/data/` (`about.ts`, `developers.ts`, `executives.ts`, `faqs.ts`, `timeline.ts`, `departments.ts`, `mainActivities.ts`, `events.ts`). `events.ts` also hard-codes the Flask API base URL for content fetching.