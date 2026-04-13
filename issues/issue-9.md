# [FEATURE] Issue 9: Admin - User Control

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #10
- **[BLOCKED BY]:** #8
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Allow administrators to delete or disable specific user accounts by ID.

## 👤 User Story
As an administrator, I want to delete problematic user accounts so that I can maintain platform safety.

## ✅ Task Checklist
- [ ] Implement `DELETE /api/v1/admin/users/:id`
- [ ] Ensure admins cannot delete their own account via this route
- [ ] Add Integration Tests for admin-led deletion

## 🛠 Technical Implementation
- **Route:** `DELETE /api/v1/admin/users/:id`
- **Controller:** `adminController.deleteUser`
- **Middleware:** `authMiddleware`, `roleGuard(['admin'])`

## 🏁 Acceptance Criteria
- [ ] Successfully removes or soft-deletes the target user ID.
- [ ] Returns `404 Not Found` if the user ID does not exist.
- [ ] Admin-on-admin deletion is prevented or requires extra logging.
