# [FEATURE] Issue 1: Foundation (User Identity & Health)

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #2, #3, #6, #8
- **[BLOCKED BY]:** None
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Create the User Schema and complete the health check system to serve as the project anchor.

## 👤 User Story
As a developer, I want a solid user model and health check system so that I can build authentication and monitor system status.

## ✅ Task Checklist
- [ ] Create Mongoose User Schema in `src/models/User.js`
- [ ] Add `getDbHealth` to `src/controllers/healthController.js`
- [ ] Register `GET /` and `GET /api/v1/health/db` in `src/index.js`
- [ ] Add Unit Tests for User model and health endpoints

## 🛠 Technical Implementation
- **Model Changes:** Fields: `email` (unique), `password`, `name`, `role` (admin, instructor, student), `isActive`, `isVerified`, `otp`, `otpExpires`.
- **Route:** `GET /`, `GET /api/v1/health/db`
- **Controller:** `healthController.getDbHealth`
- **Middleware:** None (Public)

## 🏁 Acceptance Criteria
- [ ] User model is valid and fields are correctly typed.
- [ ] `GET /api/v1/health/db` returns `200 OK` when MongoDB is connected.
- [ ] `GET /` returns a welcome message.
