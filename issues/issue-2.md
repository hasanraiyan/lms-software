# [FEATURE] Issue 2: Auth Flow A (Registration & OTP)

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #4
- **[BLOCKED BY]:** #1
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Implement user signup and initial email verification logic using OTP.

## 👤 User Story
As a new user, I want to register for an account and verify my email so that I can securely access the platform.

## ✅ Task Checklist
- [ ] Implement `POST /api/v1/auth/register` logic
- [ ] Implement `POST /api/v1/auth/verify-email-otp` logic
- [ ] Integrate `mail.service.js` for OTP delivery
- [ ] Add Zod Validation for registration and OTP inputs
- [ ] Add Integration Tests for registration flow

## 🛠 Technical Implementation
- **Route:** `POST /api/v1/auth/register`, `POST /api/v1/auth/verify-email-otp`
- **Controller:** `authController.register`, `authController.verifyOtp`
- **Middleware:** `rateLimiter`, `validateBody`
- **Model Changes:** Updates `isVerified` and `otp` fields.

## 🏁 Acceptance Criteria
- [ ] Successful registration hashes passwords using bcrypt.
- [ ] Verification OTP is 6 digits and expires after a set time.
- [ ] Integration test confirms user is verified after correct OTP submission.
