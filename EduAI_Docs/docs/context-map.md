# context-map.md

# EduAI Context Map

## Purpose

This file helps AI coding agents load only the relevant docs for each task.

Do not read all docs for every task.

Use targeted context.

## Universal Rule

Always respect the uploaded root AGENTS.md.

This project-specific docs folder only adds EduAI context.

After done task, do not commit, only suggest message, update `docs/current-task.md` for current step and next step

## For Project Overview

Read:

- 00-project-charter.md
- 01-project-context.md
- 02-product-vision.md

## For Role / Permission Work

Read:

- 03-user-roles.md
- 04-business-rules.md
- 08-api-design.md
- 12-security-requirements.md

## For Backend Feature Work

Read:

- 04-business-rules.md
- 05-feature-specification.md
- 07-database-design.md
- 08-api-design.md
- 11-coding-standards.md
- 12-security-requirements.md

## For Frontend Feature Work

Read:

- 05-feature-specification.md
- 06-system-architecture.md
- 08-api-design.md
- 09-ui-ux-guidelines.md
- 14-stitch-ui-reference.md
- 15-frontend-dashboard-structure.md
- 11-coding-standards.md

## For Database Work

Read:

- 04-business-rules.md
- 05-feature-specification.md
- 07-database-design.md
- 12-security-requirements.md

## For API Work

Read:

- 04-business-rules.md
- 07-database-design.md
- 08-api-design.md
- 11-coding-standards.md
- 12-security-requirements.md

## For AI Work

Read:

- 05-feature-specification.md
- 06-system-architecture.md
- 07-database-design.md
- 08-api-design.md
- 12-security-requirements.md
- 13-deployment-architecture.md

## For Live Classroom Work

Read:

- 05-feature-specification.md
- 06-system-architecture.md
- 07-database-design.md
- 08-api-design.md
- 12-security-requirements.md

## For UI/UX Work

Read:

- 05-feature-specification.md
- 06-system-architecture.md
- 08-api-design.md
- 09-ui-ux-guidelines.md
- 14-stitch-ui-reference.md
- 15-frontend-dashboard-structure.md
- 11-coding-standards.md

## For Roadmap / Planning

Read:

- 00-project-charter.md
- 05-feature-specification.md
- 10-development-roadmap.md

## For Deployment Work

Read:

- 06-system-architecture.md
- 12-security-requirements.md
- 13-deployment-architecture.md

## For Security Work

Read:

- 03-user-roles.md
- 04-business-rules.md
- 08-api-design.md
- 12-security-requirements.md

## Phase Control

During Phase 1, do not implement:

- Mobile app
- Multi-tenant SaaS
- Career Hub
- Mentor System
- Marketplace
- Payment
- Affiliate

Phase 2 and Phase 3 are documented for future readiness only.

## Single Tenant Reminder

EduAI MVP is Single Tenant.

Do not add:

- tenant_id
- organization_id
- organization admin
- tenant-specific branding
- tenant-level data isolation
