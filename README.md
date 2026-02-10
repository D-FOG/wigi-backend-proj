# Wigi Backend

A TypeScript Node.js backend for Wigi — an education platform API providing user, course, quiz, and certificate management with JWT auth and Swagger docs.

## 📚 Table of contents
- [Project](#wigi-backend)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Environment Variables (.env example)](#-environment-variables-env-example)
- [Running the project](#-running-the-project)
- [API Documentation](#-api-documentation)
- [Scripts / Commands](#-scripts--commands)
- [Deployment Notes](#-deployment-notes)
- [Contributing](#-contributing)
- [License](#-license)

## 🔧 Features
- Authentication (JWT) and role-aware middleware
- User management (register, login, profiles)
- Course management (courses, modules, topics, enrollments)
- Quiz engine + admin tools (create quizzes, attempts, grading)
- Certificate generation endpoints
- File uploads via Cloudinary + Multer
- OpenAPI/Swagger docs served at `/api-docs`

## 🧰 Tech Stack
- Language: TypeScript
- Runtime: Node.js (CommonJS)
- Framework: Express
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (`jsonwebtoken`)
- Storage: Cloudinary (via `cloudinary`)
- Docs: Swagger (`swagger-jsdoc`, `swagger-ui-express`)
- File uploads: `multer`
- Dev tools: `ts-node-dev`, `typescript`

## 🗂 Project structure

Root highlights (source in `src/`):

- `src/app.ts` — Express app, middleware and routes registration
- `src/server.ts` — server bootstrap + DB connection
- `src/config/` — configuration (db, env, swagger, cloudinary)
- `src/middlewares/` — global middlewares (auth, error handling, uploads)
- `src/module/` — domain modules organized by feature:
	- `auth/` — authentication controllers, routes, services
	- `user/` — user controller, model, routes
	- `course/` — course controllers, admin controllers, routes, models, services
	- `quiz/` — quiz models, routes, admin area
	- `certificate/` — certificate endpoints
- `src/utils/` — helpers like API response and error wrappers

This structure keeps features self-contained and easy to extend.

## ⚙️ Setup & Installation

Prerequisites: Node.js (>=16), npm, and a running MongoDB instance or MongoDB Atlas.

Clone and install:

```bash
git clone <repo-url>
cd wigi-backend-proj
npm install
```

Create environment variables by copying the example:

```bash
cp .env.example .env
# then edit .env with real values
```

Build (optional):

```bash
npm run build
```

## 🔑 Environment Variables (.env example)

See `.env.example` in the project root for required variables. Typical variables:

- `PORT` — server port (default 4000)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWT tokens
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials

(`.env.example` included in repo)

## ▶️ Running the project

Development (hot-reload):

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

By default the app serves Swagger UI at `/api-docs` and API routes under `/api/v1`.

## 📖 API Documentation

Swagger/OpenAPI docs are available when the server is running at:

`http://<host>:<port>/api-docs`

Routes are mounted under `/api/v1` (see `src/app.ts`).

## 🛠 Scripts / Commands

- `npm run dev` — run in development with `ts-node-dev` (hot reload)
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled production server (`node dist/server.js`)
- `npm run clean` — remove `dist` (uses `rimraf` in package scripts if present)

## 🚀 Deployment notes

- Ensure `NODE_ENV=production` and set real values for `MONGO_URI` and `JWT_SECRET`.
- Build the project (`npm run build`) then run `npm start`.
- Use a process manager (PM2, systemd) or containerize with Docker for reliability.
- Keep secrets out of repo — use environment variable management for production (vault, secrets manager, or platform envs).

## 🤝 Contributing

1. Fork the repo and create a branch for your feature: `feat/your-feature`.
2. Add tests where appropriate and keep changes focused.
3. Open a pull request describing the change.

Code style: TypeScript with strict settings; follow existing patterns in `src/`.

## 📜 License

This project uses the `ISC` license (see `package.json`).
