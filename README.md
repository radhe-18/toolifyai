Toolify microservices - backend package (auth, tools, favorites, notifications, gateway)

Quick start (each service run in its own terminal):

1) auth-service
  cd auth-service
  cp .env.example .env   # edit MONGO_URI and JWT_SECRET
  npm install
  npm run dev

2) tools-service
  cd tools-service
  cp .env.example .env   # edit MONGO_URI
  npm install
  npm run dev
  # optionally import seed: POST /api/tools/bulk with data/tools-seed.json body

3) favorites-service
  cd favorites-service
  cp .env.example .env   # edit MONGO_URI and JWT_SECRET (same secret used by auth)
  npm install
  npm run dev

4) notifications-service
  cd notifications-service
  cp .env.example .env .env # edit SMTP if needed
  npm install
  npm run dev

5) gateway
  cd gateway
  cp .env.example .env
  npm install
  npm run dev

Then use gateway endpoints on http://localhost:5000/
e.g. POST http://localhost:5000/api/auth/register
