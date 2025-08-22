# Auth + No-Random Data Patches (Full Fix)

## Run
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init_auth
npm run server   # backend on :8787
# new terminal
npm run dev      # frontend

## Notes
- Prisma uses SQLite by default; change provider/url if you prefer Postgres/MySQL.
- Watchlists use a join table (WatchlistItem) instead of String[] for symbols.
- API GET /api/watchlists returns { id, name, symbols: string[] } for UI compatibility.
