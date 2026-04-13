# [FEATURE] Issue 5: Password Management

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #10
- **[BLOCKED BY]:** #3, #4
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Implement final password reset via OTP and internal password change logic.

## 👤 User Story
As a user, I want to reset my password using an OTP or change it from my profile so that I can maintain my account security.

## ✅ Task Checklist
- [ ] Implement `POST /api/v1/auth/reset-password`
- [ ] Implement `POST /api/v1/profile/change-password`
- [ ] Add Zod validation for password complexity
- [ ] Add Integration Tests for password reset flow

## 🛠 Technical Implementation
- **Route:** `POST /api/v1/auth/reset-password`, `POST /api/v1/profile/change-password`
- **Controller:** `authController.resetPassword`, `profileController.changePassword`
- **Middleware:** `authMiddleware` (for Change Password), `validateBody`

## 🏁 Acceptance Criteria
- [ ] Password reset only works with a valid, non-expired OTP.
- [ ] Change password requires the correct old password.
- [ ] Successful password change invalidates old sessions.
