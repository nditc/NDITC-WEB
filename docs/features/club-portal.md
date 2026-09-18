# Features — Club Portal

The `/club` route group is the member + admin area.

## Member Area (`club/(user-handle)/`)

| Page | Purpose |
|---|---|
| `login/` | Member login (Firebase) |
| `register/` | Club registration |
| `profile/` | Profile (announcements, club, events sub-pages) |
| `delete-account/` | Account deletion flow (`/api/deleteaccount`) |
| `reset-password/` | Password reset |
| `verify/` | Account verification |

Shared components in `club/Components/`: `Field`, `Textarea`, `Select`, `File`, `Modal`, `Loading`, `InfoBox`, `SubNav`, `PassingYear`, `Admin/`, `Dashboard/`, `Events/`, `Home/`, `Participate/`, `Profile/`.

`club/Context/AdminContext.ts` provides portal-scoped state.

## Admin Area (`club/admin/`)

| Page | Purpose |
|---|---|
| `login/` | Admin login (→ Flask `/user/login`) |
| `(adminpanel)/` | Admin dashboard (users, content management) |
| `eventEdit/[eventID]/` | Edit an event |
| `rankers/[id]/` | Manage rankers |

The `(adminpanel)/layout.tsx` calls `/api/admin` to gate the UI by `ADMIN_IDS`.

## Leaderboard & Standings

- `club/leaderboard/` — reads/writes points via `/api/points`.
- `club/standings/[type]/` — filtered standings.

## Developer Section

- `club/developer/` + `club/developer/developers.ts` — developer directory within the portal.

## Shared Club Components

`club/Components/Profile/ProfilePic.tsx` uploads avatars via `/api/profile` (Cloudinary). `club/Components/Participate/AnswerSheet.tsx` submits quizzes via `/api/submit`.