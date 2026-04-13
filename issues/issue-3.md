# [FEATURE] Issue 3: Auth Flow B (Login & Session)

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #5, #6, #7, #8
- **[BLOCKED BY]:** #1
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Implement secure login, token management, and a reusable authentication middleware.

## 👤 User Story
As a registered user, I want to log in securely so that I can access protected areas of the platform.

## ✅ Task Checklist
- [ ] Implement `POST /api/v1/auth/login` (Access/Refresh Tokens)
- [ ] Implement `POST /api/v1/auth/logout`
- [ ] Create `src/middlewares/auth.js` (JWT Verification)
- [ ] Add Unit Tests for login and auth middleware

## 🛠 Technical Implementation
- **Route:** `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`
- **Controller:** `authController.login`, `authController.logout`
- **Middleware:** `rateLimiter`, `validateBody`
- **Logic:** Populate `res.locals.user` with user ID and role from JWT.

## 🏁 Acceptance Criteria
- [ ] Login returns valid JWT Access and Refresh tokens.
- [ ] Auth middleware correctly rejects invalid or expired tokens.
- [ ] Logout invalidates the current session.
