# LMS Software

## Overview

This repository contains a monorepo for an LMS (Learning Management System) with separate backend and frontend apps.

### Coding Style & Standards
- **Backend Design Blueprint:** [Google Doc: Backend Design Blueprint](https://docs.google.com/document/d/1jJ1B8qG3t6zfqsYoPyDIq_hZIkPAjuaSr-ZhzjyjXf8/edit?usp=sharing)

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
