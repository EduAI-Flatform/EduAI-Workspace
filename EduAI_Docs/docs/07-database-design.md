# 07-database-design.md

# Database Design

## Database

PostgreSQL.

ORM:

Prisma.

Vector Extension:

pgvector.

## Tenant Model

Single Tenant.

Do not add tenant_id or organization_id in MVP.

## Global Rules

All important tables use:

- id UUID
- created_at
- updated_at
- deleted_at where soft delete is required

## Core Tables

### users

Fields:

- id
- email
- password_hash
- full_name
- avatar_url
- status
- created_at
- updated_at
- deleted_at

Indexes:

- email unique
- status

### roles

Fields:

- id
- name
- description
- created_at
- updated_at

Default roles:

- student
- instructor
- platform_admin

### user_roles

Fields:

- id
- user_id
- role_id
- created_at

Constraint:

- unique user_id + role_id

---

# Digital Identity

### user_profiles

Fields:

- id
- user_id
- phone_number
- date_of_birth
- bio
- headline
- location
- website_url
- public_slug
- is_public
- created_at
- updated_at

### user_skills

Fields:

- id
- user_id
- name
- level
- category
- created_at
- updated_at

### portfolios

Fields:

- id
- user_id
- title
- description
- project_url
- image_url
- start_date
- end_date
- created_at
- updated_at
- deleted_at

---

# Digital Learning

### courses

Fields:

- id
- instructor_id
- title
- slug
- description
- thumbnail_url
- level
- status
- visibility
- created_at
- updated_at
- deleted_at

Enums:

level:

- beginner
- intermediate
- advanced

status:

- draft
- published
- archived

visibility:

- public
- private

### lessons

Fields:

- id
- course_id
- title
- slug
- type
- content
- video_url
- document_url
- order_index
- duration_minutes
- is_preview
- created_at
- updated_at
- deleted_at

type:

- video
- pdf
- article

### enrollments

Fields:

- id
- user_id
- course_id
- status
- enrolled_at
- completed_at
- created_at
- updated_at

Constraint:

- unique user_id + course_id

### learning_progress

Fields:

- id
- user_id
- course_id
- lesson_id
- status
- progress_percent
- completed_at
- last_accessed_at
- created_at
- updated_at

Constraint:

- unique user_id + lesson_id

---

# Assessment

### quizzes

Fields:

- id
- course_id
- lesson_id
- title
- description
- passing_score
- time_limit_minutes
- status
- created_at
- updated_at
- deleted_at

status:

- draft
- published
- archived

### questions

Fields:

- id
- quiz_id
- type
- question_text
- options_json
- correct_answer_json
- explanation
- points
- order_index
- created_at
- updated_at

type:

- multiple_choice
- true_false
- short_answer

`options_json` and `correct_answer_json` use PostgreSQL JSONB.

### quiz_attempts

Fields:

- id
- quiz_id
- user_id
- score
- max_score
- passed
- answers_json
- started_at
- submitted_at
- created_at

### assignments

Fields:

- id
- course_id
- lesson_id
- title
- description
- due_date
- max_score
- status
- created_at
- updated_at
- deleted_at

status:

- draft
- published
- archived

### submissions

Fields:

- id
- assignment_id
- user_id
- content
- file_url
- score
- feedback
- status
- submitted_at
- graded_at
- graded_by
- created_at
- updated_at

status:

- submitted
- graded

Constraint:

- unique assignment_id + user_id

---

# Live Classroom

### classroom_sessions

Fields:

- id
- course_id
- instructor_id
- title
- description
- provider
- meeting_url
- room_name
- scheduled_start
- scheduled_end
- actual_start
- actual_end
- status
- created_at
- updated_at
- deleted_at

provider:

- jitsi

status:

- scheduled
- live
- ended
- cancelled

### classroom_attendance

Fields:

- id
- session_id
- user_id
- joined_at
- left_at
- duration_seconds
- created_at
- updated_at

Constraint:

- unique session_id + user_id

### classroom_recordings

Fields:

- id
- session_id
- recording_url
- duration_seconds
- created_at

---

# Digital Library

### library_categories

Fields:

- id
- name
- slug
- description
- created_at
- updated_at

### library_resources

Fields:

- id
- owner_id
- category_id
- title
- description
- type
- file_url
- external_url
- visibility
- created_at
- updated_at
- deleted_at

### library_tags

Fields:

- id
- name
- slug
- created_at

### resource_tags

Fields:

- id
- resource_id
- tag_id

### saved_resources

Fields:

- id
- user_id
- resource_id
- created_at

---

# Community

### community_posts

Fields:

- id
- author_id
- title
- content
- visibility
- status
- created_at
- updated_at
- deleted_at

### community_comments

Fields:

- id
- post_id
- author_id
- parent_id
- content
- status
- created_at
- updated_at
- deleted_at

### community_reactions

Fields:

- id
- post_id
- user_id
- type
- created_at

Constraint:

- unique post_id + user_id + type

---

# AI

### ai_conversations

Fields:

- id
- user_id
- context_type
- context_id
- title
- created_at
- updated_at

### ai_messages

Fields:

- id
- conversation_id
- role
- content
- token_count
- model
- created_at

### ai_embeddings

Fields:

- id
- source_type
- source_id
- chunk_text
- embedding
- metadata_json
- created_at

`embedding` uses pgvector `vector(1536)` in the migration. Prisma maps this
provider-specific column as `Unsupported("vector")`; vector similarity queries
will use SQL until Prisma adds a native vector field. The database must have
the pgvector extension available; the migration enables it with
`CREATE EXTENSION IF NOT EXISTS vector`.

### ai_generated_quizzes

Fields:

- id
- user_id
- source_type
- source_id
- output_json
- created_at

### ai_flashcards

Fields:

- id
- user_id
- source_type
- source_id
- front
- back
- created_at

---

# Certificates

### certificate_templates

Fields:

- id
- name
- description
- background_url
- layout_json
- created_at
- updated_at

### certificates

Fields:

- id
- user_id
- course_id
- certificate_template_id
- certificate_code
- title
- issued_at
- verification_url
- qr_code_url
- metadata_json
- created_at

Constraint:

- certificate_code unique

---

# Phase 2 Planned Tables

Do not implement in Phase 1 unless explicitly instructed.

- companies
- jobs
- job_applications
- mentors
- mentor_bookings
- mentor_sessions

# Phase 3 Planned Tables

Do not implement in Phase 1 unless explicitly instructed.

- products
- orders
- order_items
- payments
- affiliates
- referrals
- commissions
- withdrawals
