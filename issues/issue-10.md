# [FEATURE] Issue 10: Infrastructure & Documentation

## 🏗 Relationship Tracking
- **Parent Epic:** #0 [EPIC] Backend Authentication & User Management
- **[BLOCKS]:** None
- **[BLOCKED BY]:** #1 to #9 (Final Sync)
- **[STATUS]:** (To be updated by Intern)

## 📝 Description
Finalize system documentation and implement automated maintenance tasks.

## 👤 User Story
As a platform maintainer, I want automated documentation and cleanup tasks so that the system remains healthy and organized.

## ✅ Task Checklist
- [ ] Create `GET /openapi.json` to export full spec
- [ ] Update `src/docs/openapi.js` with all new routes from Issues 1-9
- [ ] Implement Cleanup Cron job (delete inactive users after 30 days)
- [ ] Final manual verification of Swagger UI

## 🛠 Technical Implementation
- **Route:** `GET /openapi.json`
- **Background Job:** `node-cron` scheduled daily at midnight.
- **Logic:** `User.deleteMany({ isActive: false, updatedAt: { $lt: 30_days_ago } })`

## 🏁 Acceptance Criteria
- [ ] All endpoints are documented and testable via Swagger.
- [ ] Cron job logs the number of deleted records daily.
