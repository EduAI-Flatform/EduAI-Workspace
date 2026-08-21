# 03-user-roles.md

# User Roles

## Overview

EduAI MVP uses RBAC.

The system is Single Tenant.

There are no tenant-level roles.

## Roles

- Student
- Instructor
- Platform Admin

## Student

Students can:

- Register and login
- Manage profile
- Enroll in published courses
- View enrolled courses
- Watch lessons
- Complete quizzes
- Submit assignments
- Join live classroom sessions
- Use AI Tutor
- Save library resources
- Create community posts
- Comment on posts
- View and verify certificates

## Instructor

Instructors can:

- Manage own profile
- Create courses
- Edit own courses
- Publish own courses
- Archive own courses
- Create lessons
- Upload course materials
- Create quizzes
- Create assignments
- Grade submissions
- Schedule live classes
- Start live classes
- View attendance for own classes
- Upload library resources
- Use AI tools for lesson, quiz, summary, and flashcard generation
- Issue certificates for own courses when completion rules are satisfied

## Platform Admin

Platform Admin can:

- Manage all users
- Assign roles
- Moderate content
- Manage all courses
- Manage all library resources
- Manage all community posts
- View reports
- Configure certificate templates
- Audit system activities
- Access system health and deployment dashboards

## Permission Principles

Default policy:

Deny by default.

Every protected API must check:

1. Authentication
2. Role permission
3. Resource ownership

## Ownership Rules

- Instructors can only edit their own courses.
- Students can only access courses they enrolled in unless the course is public.
- Users can only edit their own profile.
- Admin can override ownership restrictions.
- Certificates cannot be edited after issuance.
