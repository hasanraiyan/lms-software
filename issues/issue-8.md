# [FEATURE] Issue 8: Admin - User Discovery

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** #9
- **[BLOCKED BY]:** #3
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Implement user listing and role-based access control for administrative tasks.

## 👤 User Story
As an administrator, I want to see a list of all users so that I can manage the platform effectively.

## ✅ Task Checklist
- [ ] Create `roleGuard` middleware (e.g., `checkRole(['admin'])`)
- [ ] Implement `GET /api/v1/admin/users` (Paginated list)
- [ ] Add filtering by role, status, or verification
- [ ] Add Unit Tests for admin role checks

## 🛠 Technical Implementation
- **Route:** `GET /api/v1/admin/users`
- **Controller:** `adminController.listUsers`
- **Middleware:** `authMiddleware`, `roleGuard(['admin'])`

## 🏁 Acceptance Criteria
- [ ] Non-admin users are blocked with a `403 Forbidden` error.
- [ ] Admin can see all users with pagination (default 10 per page).
