# [FEATURE] Issue 4: Auth Flow C (OTP Recovery)

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #5
- **[BLOCKED BY]:** #2
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Implement logic for resending verification OTPs and initiating password recovery.

## 👤 User Story
As a user who missed their verification email or forgot their password, I want to request a new OTP so that I can recover my account.

## ✅ Task Checklist
- [ ] Implement `POST /api/v1/auth/resend-otp`
- [ ] Implement `POST /api/v1/auth/forgot-password` (Generate reset token/OTP)
- [ ] Add strict rate limiting for OTP resends
- [ ] Add Unit Tests for recovery triggers

## 🛠 Technical Implementation
- **Route:** `POST /api/v1/auth/resend-otp`, `POST /api/v1/auth/forgot-password`
- **Controller:** `authController.resendOtp`, `authController.forgotPassword`
- **Middleware:** `rateLimiter`, `validateBody`
- **Email:** Trigger `mail.service.js` for all outbound OTPs.

## 🏁 Acceptance Criteria
- [ ] Resend OTP only works for unverified accounts.
- [ ] Forgot password returns a generic success message to prevent user enumeration.
- [ ] Rate limiter blocks more than 3 requests per 15 mins for sensitive endpoints.
