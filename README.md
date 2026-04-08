# LMS Software

## Overview

This repository contains a monorepo for an LMS (Learning Management System) with separate backend and frontend apps.

### Backend
- Node.js/Express API
- Located in `backend/`
- Includes tests, linting, and CI workflow

### Frontend
- Vite + React app
- Located in `frontend/`
- Includes linting, build, and CI workflow

## Getting Started

### Backend
```sh
cd backend
pnpm install
pnpm test
```

### Frontend
```sh
cd frontend
pnpm install
pnpm run dev
```

## CI/CD
- Automated GitHub Actions run on push and pull request for both backend and frontend.
- See badges above for current status.

---
Feel free to contribute or open issues!
