
College Fullstack Demo (React + Three.js frontend, Express + lowdb backend)

Structure:
- frontend/  (Vite React app)
- backend/   (Express API with lowdb file-based DB)

Local setup:
1) Install Node.js (version 18+ recommended)
2) Open two terminals:
   - Terminal A (backend): 
       cd backend
       npm install
       npm start
   - Terminal B (frontend):
       cd frontend
       npm install
       npm run dev
3) Open http://localhost:5173 (vite default) -- frontend will fetch API from /api/* (proxy not configured; for dev you can set up proxy or run frontend build and serve from backend)

Quick build & serve (recommended for deployment):
1) cd frontend
   npm install
   npm run build
2) cd backend
   npm install
   copy the built frontend (frontend/dist) into backend/dist or ensure backend serves frontend/dist (current backend serves ../frontend/dist)
3) npm start (backend serves the built frontend)

Deployment:
- You can deploy backend on Render/Heroku/Vercel (Node service) and use same repo.
- Or deploy frontend static build on Netlify/Vercel and backend on Render; remember to set CORS.

If you want, I can prepare a Dockerfile / deployment script.
