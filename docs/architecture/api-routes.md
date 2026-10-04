# Architecture — API Routes (BFF)

`src/app/api/*` are **Next.js Route Handlers** acting as a Backend-for-Frontend. They run server-side, so secrets stay out of the client bundle.

| Route | Method | Purpose | External dependency |
|---|---|---|---|
| `/api/admin` | POST | Gate admin UI by checking `ADMIN_IDS` against Firebase UID | env `ADMIN_IDS` |
| `/api/contact` | POST | Send contact email via Nodemailer (Gmail) | `NEXT_PUBLIC_EMAIL_PASSWORD` |
| `/api/createaccountndc` | POST | Look up NDC member by roll; returns member data | `memberapi.nditc.net` + `MEMBER_API_PRIVATE_KEY` |
| `/api/deleteaccount` | POST | Delete member account flow | Firebase Admin |
| `/api/description/[url]` | GET | Proxy/fetch external description content | arbitrary URL |
| `/api/getevents` | POST | Fetch member events | Firebase / internal |
| `/api/getmemberbyroll` | POST | Member lookup by roll | `memberapi.nditc.net` |
| `/api/getquestion` | POST | Fetch quiz questions for an event | Firebase |
| `/api/memberdata` | POST | Fetch member profile data | `memberapi.nditc.net` |
| `/api/newsletter` | POST | Subscribe to Mailchimp | `nditc.us14.list-manage.com` |
| `/api/points` | GET/POST | Leaderboard points (list/create) | Firebase |
| `/api/points/[id]` | PUT/DELETE | Update/delete a member's points | Firebase |
| `/api/profile` | POST | Upload avatar to Cloudinary | `CLOUDINARY_*` |
| `/api/submit` | POST | Submit quiz answers, compute marks, persist to Firestore | Firebase Admin |

## Example — Admin Gate

```ts
// /api/admin/route.ts
export async function POST(req: NextRequest) {
  const ids = process.env.ADMIN_IDS?.split(",");
  const data = await req.json();
  if (ids?.includes(data.id)) return NextResponse.json({ auth: true });
  return NextResponse.json({ auth: false });
}
```

## Example — Member API Proxy

```ts
// /api/createaccountndc/route.ts
const apiUrl = `https://memberapi.nditc.net/roll/20${roll.substring(1,3)}/${roll}/`;
const memberDOC = await fetch(apiUrl, {
  headers: { Authorization: "Token " + process.env.MEMBER_API_PRIVATE_KEY },
});
```

## Security Notes

- All third-party tokens (`CLOUDINARY_API_SECRET`, `MEMBER_API_PRIVATE_KEY`, `FIREBASE_PRIVATE_KEY`, email password) are **server-only**.
- `firebaseAdmin.ts` is marked `import "server-only"` to prevent client import.
- ⚠️ `contact/route.ts` currently hard-codes a Gmail app-password in source — should be moved to an env var.