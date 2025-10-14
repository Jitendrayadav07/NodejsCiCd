Backend setup

1) Copy .env example values into a new .env file at backend root.
2) Install deps: npm install
3) Run dev server: npm run dev
4) Health check: GET http://localhost:4000/health
5) Users API (requires DB):
   - GET /api/users
   - GET /api/users/:id
   - POST /api/users
   - PUT /api/users/:id
   - DELETE /api/users/:id


