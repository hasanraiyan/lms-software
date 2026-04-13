# [EPIC] Backend Authentication & User Management

This Epic tracks the foundational setup and authentication flow for the LMS Backend. 

## 🗺 Relationship Roadmap
This epic follows a dependency-driven path. **Issue 1** is the root blocker.

### 🟢 Phase 1: Foundation (Start Here)
- [ ] **Issue 1:** User Model & Health Checks
  - [BLOCKS] #2, #3, #6, #8

### 🟡 Phase 2: Core Auth (Parallel)
- [ ] **Issue 2:** Registration & Email OTP
  - [BLOCKED BY] #1 | [BLOCKS] #4
- [ ] **Issue 3:** Login & JWT Middleware
  - [BLOCKED BY] #1 | [BLOCKS] #5, #6, #7, #8

### 🔵 Phase 3: User & Admin Ops (Parallel)
- [ ] **Issue 4:** OTP Resend & Recovery Initiation
  - [BLOCKED BY] #2 | [BLOCKS] #5
- [ ] **Issue 6:** Profile Retrieval & Updates
  - [BLOCKED BY] #3 | [BLOCKS] #10
- [ ] **Issue 8:** Admin Listing & Role Guards
  - [BLOCKED BY] #3 | [BLOCKS] #9

### 🔴 Phase 4: Finalization & Security
- [ ] **Issue 5:** Password Reset & Change
  - [BLOCKED BY] #3, #4 | [BLOCKS] #10
- [ ] **Issue 7:** Account Soft-Delete
  - [BLOCKED BY] #3 | [BLOCKS] #10
- [ ] **Issue 9:** Admin Delete Control
  - [BLOCKED BY] #8 | [BLOCKS] #10
- [ ] **Issue 10:** Documentation & Cron Cleanup
  - [BLOCKED BY] #1 through #9

---

## 📈 Overall Progress
- **Total Issues:** 10
- **Completed:** 0
- **Completion Percentage:** 0%
