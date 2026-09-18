# Features — Authentication

The app has **two independent auth domains**.

## Member Auth (Firebase)

- `AuthContextProvider` wraps the app and exposes the Firebase user via `useAuthState(auth)`.
- Firestore stores member profiles, quiz answers, and event participation.
- Client components call `useAuthContext()` and branch on `userAuth` to show/hide member UI.
- `club/(user-handle)/profile/layout.tsx` redirects unauthenticated users.

```tsx
const { userAuth, loading } = useAuthContext();
```

## Admin Auth (Flask + coarse gate)

Admins authenticate against the **Flask backend**:

1. Admin login page POSTs credentials to `https://nditc.pythonanywhere.com/api/v1/user/login`.
2. Flask sets an httpOnly `session` JWT cookie.
3. That cookie is sent on subsequent CMS mutations (image upload, content create/update/delete).

A **coarse UI gate** additionally checks `ADMIN_IDS` (comma-separated Firebase UIDs) via `/api/admin`:

```ts
const ids = process.env.ADMIN_IDS?.split(",");
if (ids?.includes(data.id)) return NextResponse.json({ auth: true });
```

> ⚠️ The `ADMIN_IDS` gate only controls **UI rendering**. True authorization for content edits is enforced by the Flask `@auth_required` decorator server-side. The two should be kept in sync.

## Registration

- `MemberRegistration.tsx` / `NonMemberRegistration.tsx` in `(main)/Components/Register` handle public sign-up, calling `/api/createaccountndc` to verify NDC membership via `memberapi.nditc.net`.
- `registerData.ts` holds registration form configuration.