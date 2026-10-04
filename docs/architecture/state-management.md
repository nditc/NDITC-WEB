# Architecture — State Management

There is **no Redux/Zustand/SWR/TanStack Query**. State is handled via three mechanisms:

## 1. React Context Providers

Located in `src/app/_context/`:

| Provider | Provides | Used for |
|---|---|---|
| `AuthContextProvider` | `{ userAuth, loading, error }` | Firebase auth state (`useAuthState`) |
| `UserDataContextProvider` | member profile data | current user's club/profile data |
| `ConfigProvider` | site config (from Firestore `config/config`) | feature flags / site settings |

`useAuthContext()` exposes the Firebase user to any client component.

```tsx
// AuthContextProvider.tsx
const [userAuth, loading, error] = useAuthState(auth);
```

## 2. Firebase (member state)

- **Auth:** `firebase/auth` → `useAuthState`.
- **Firestore:** `firebase/firestore` for profiles, quiz answers, event participation.
- **Storage:** `firebase/storage` for member assets.
- **Admin (server):** `firebase-admin` in Route Handlers (`firebaseAdmin.ts`, guarded by `server-only`).

## 3. Data Fetching (native `fetch`)

- **Server Components** fetch the Flask API directly:
  ```ts
  const res = await fetch(
    "https://nditc.pythonanywhere.com/api/v1/notifications/web?page=1&limit=5",
    { cache: "no-store" },
  );
  ```
- **Client Components** use `useEffect + fetch` to Route Handlers or Firebase.
- `cache: "no-store"` is used wherever content must be fresh.

## Config Binding

`src/config/config_db.ts` reads/writes a single Firestore doc `config/config` via `getConfig` / `setConfig` / `useConfig`.

## Club Context

`src/app/club/Context/AdminContext.ts` provides admin-panel-scoped state for the `club/admin` section.