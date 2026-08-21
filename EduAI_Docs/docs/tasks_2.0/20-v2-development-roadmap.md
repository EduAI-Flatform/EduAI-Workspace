# EduAI 2.0 Task Roadmap

## Baseline verified from GitHub main branches

- Home featured courses already load from `courseService.listPublishedCourses()`.
- Student dashboard already loads from `dashboardService.getStudentDashboard()`.
- Instructor dashboard already loads from `dashboardService.getInstructorDashboard()`.
- Backend already exposes student and instructor dashboard APIs.
- Frontend currently maps `/admin/dashboard/*` to `StudentDashboard`; a dedicated admin dashboard is still missing.
- Backend currently has no registered modules for notifications, Career Hub, Mentor System, or AI Learning Path.
- Several instructor sidebar destinations do not have dedicated page branches and can fall back to the dashboard home.

## Scope rule

Version 2.0 must not contain a generic “replace mock data with APIs” task. Each new page must use APIs from the start, while Sprint 13 audits remaining gaps factually.

## Sprint 13: Stabilization and Gap Audit

- `SPR13-001` — Audit Live API Integration
- `SPR13-002` — Complete Incomplete Navigation Flows
- `SPR13-003` — Regression Test Core V1 Flows

## Sprint 14: Platform Administration

- `SPR14-001` — Create Admin Domain and Dashboard API
- `SPR14-002` — Build Dedicated Admin Dashboard
- `SPR14-003` — Admin User Management
- `SPR14-004` — Admin Course and Content Moderation
- `SPR14-005` — Platform Audit Log

## Sprint 15: Learning Completion and Assessment V2

- `SPR15-001` — Harden Course Completion Rules
- `SPR15-002` — Quiz Attempt Policy and History
- `SPR15-003` — Assignment Resubmission and Rubrics
- `SPR15-004` — Automatic Certificate Issuance

## Sprint 16: Notifications

- `SPR16-001` — Notification Schema and Service
- `SPR16-002` — In-App Notification Center
- `SPR16-003` — SSE Realtime Notifications
- `SPR16-004` — Email Notification Preferences

## Sprint 17: AI Learning Path

- `SPR17-001` — Learning Goals and Skill Profile
- `SPR17-002` — Generate AI Learning Path
- `SPR17-003` — Learning Path Dashboard
- `SPR17-004` — Course-Grounded AI Tutor

## Sprint 18: Career Hub

- `SPR18-001` — Career Profile
- `SPR18-002` — Job Opportunity Management
- `SPR18-003` — Job Applications
- `SPR18-004` — AI Job Skill Matching

## Sprint 19: Mentor System

- `SPR19-001` — Mentor Profiles and Availability
- `SPR19-002` — Mentor Booking Workflow
- `SPR19-003` — Mentor Jitsi Session
- `SPR19-004` — Mentor Notes, Goals, and Reviews

## Sprint 20: Production Readiness V2

- `SPR20-001` — Security, Ownership, and Rate-Limit Review
- `SPR20-002` — Observability and Dependency Health
- `SPR20-003` — Performance, Accessibility, and Lighthouse Pass
- `SPR20-004` — End-to-End UAT and V2 Release Package
