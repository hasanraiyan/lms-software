# [FEATURE] Issue 6: Profile Access

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #10
- **[BLOCKED BY]:** #3
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Implement current user profile retrieval and basic information updates.

## 👤 User Story
As a logged-in user, I want to view and update my profile details so that my information stays current.

## ✅ Task Checklist
- [ ] Implement `GET /api/v1/profile/` (Get Current User)
- [ ] Implement `PATCH /api/v1/profile/` (Update Profile)
- [ ] Ensure sensitive fields (password, role) are protected from updates
- [ ] Add Unit Tests for profile retrieval and update

## 🛠 Technical Implementation
- **Route:** `GET /api/v1/profile/`, `PATCH /api/v1/profile/`
- **Controller:** `profileController.getProfile`, `profileController.updateProfile`
- **Middleware:** `authMiddleware`, `validateBody`

## 🏁 Acceptance Criteria
- [ ] `GET /profile` returns the authenticated user's data excluding the password.
- [ ] `PATCH /profile` correctly updates name/age but ignores `role` or `isVerified` fields.
