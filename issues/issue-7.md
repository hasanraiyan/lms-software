# [FEATURE] Issue 7: Account Lifecycle

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #10
- **[BLOCKED BY]:** #3
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Implement soft-deletion for users, allowing a grace period before permanent removal.

## 👤 User Story
As a user, I want to be able to delete my account so that my data is no longer active on the platform.

## ✅ Task Checklist
- [ ] Implement `DELETE /api/v1/profile/me` (Soft-delete)
- [ ] Update User Model to reflect deletion status/date
- [ ] Add logic to prevent login for soft-deleted accounts
- [ ] Add Unit Tests for deletion flow

## 🛠 Technical Implementation
- **Route:** `DELETE /api/v1/profile/me`
- **Controller:** `profileController.deleteMe`
- **Middleware:** `authMiddleware`
- **Model Changes:** `isActive: false`, `deletedAt: Date.now()`

## 🏁 Acceptance Criteria
- [ ] Account is marked as inactive rather than immediately removed.
- [ ] User receives a confirmation that data will be removed after 30 days.
