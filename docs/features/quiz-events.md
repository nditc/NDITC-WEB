# Features — Quiz & Events

The platform runs quiz events with a points/leaderboard system backed by **Firebase/Firestore** (not the Flask backend).

## Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Participate page
    participant API as /api/submit
    participant FA as Firebase Admin
    participant FS as Firestore

    U->>P: Open event /club/participate/[id]
    P->>P: fetch /api/getquestion (questions)
    U->>P: Submit answers (AnswerSheet.tsx)
    P->>API: POST /api/submit {id, uid, answers}
    API->>FA: initAdmin() + getFirestore()
    API->>FS: read answers/<id> (correct answers, time window)
    API->>API: compute marks; check already-participated
    API->>FS: write eventparticipant/<uid> (points, events[])
    API->>FS: write answers/<id>/eventparticipant/<uid>
    API-->>P: {examMarks, result, totalMarks}
```

## Key Pieces

- **`/api/getquestion`** — returns the quiz questions for an event (proxy to Firebase).
- **`/api/submit`** (`src/app/api/submit/route.ts`) — the core grading handler:
  - Verifies the event time window (`date` / `enddate`).
  - Prevents duplicate participation (`eventparticipant/<uid>.events` includes `id`).
  - Computes marks (MCQ + written), updates cumulative `points`.
  - Differentiates `intra` / `intraCollege` / `public` quiz types.
- **`/api/points`** — leaderboard CRUD (GET list, POST create, PUT/PATCH update, DELETE).
- **`club/leaderboard/`** and **`club/standings/[type]/`** — display rankings.
- **`club/events/[uid]/[memberid]/`** and **`club/eventdetails/[id]/`** — event views.

## Status Codes (custom)

`/api/submit` uses non-standard codes for client logic:

| Code | Meaning |
|---|---|
| `999` | Time window error (before start / after end) |
| `555` | Already participated |
| `500` | Internal error |

## Notes

- All quiz state lives in Firestore collections: `answers`, `eventparticipant`, `eventparticipant/<uid>/eventsData`.
- The Flask backend is **not** involved in quizzes.