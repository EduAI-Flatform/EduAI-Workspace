# Frontend Dashboard Structure

## Status

Accepted

## Date

2026-06-18

## Context

EduAI will have separate dashboards for students, instructors, and admins. Each dashboard can contain many page contents/tabs, so dashboard code must not grow into one large TSX/CSS file.

The student dashboard was first split while implementing the Stitch-based student dashboard UI. This structure is now the preferred pattern for future dashboard work.

## Decision

Dashboard features must be organized by role first, then by page content.

Use this folder shape:

```text
Front_End/src/features/dashboard/
  StudentDashboard/
    index.ts
    StudentDashboard.tsx
    StudentDashboard.css
    StudentSidebar.tsx
    StudentSidebar.css
    StudentDashboardHome/
      index.ts
      StudentDashboardHome.tsx
      StudentDashboardHome.css
      dashboardHomeData.ts
      HeroSection/
        HeroSection.tsx
        HeroSection.css
      LearningCoursesSection/
        LearningCoursesSection.tsx
        LearningCoursesSection.css
      DashboardPanels/
        UpcomingClassesSection.tsx
        UpcomingClassesSection.css
        LearningAnalyticsSection.tsx
        LearningAnalyticsSection.css
      AiHubSection/
        AiHubSection.tsx
        AiHubSection.css
      CertificatesSection/
        CertificatesSection.tsx
        CertificatesSection.css
```

Apply the same pattern later for:

```text
AdminDashboard/
InstructorDashboard/
```

## Rules

- The top-level role dashboard component only composes layout: sidebar plus active page content.
- Each dashboard tab/page content must live in its own folder named after that page.
- Do not put all tab contents into one shared `Content.tsx` file.
- Split large page content into section components with colocated CSS.
- Keep page-local static/demo data in a page-local data file, for example `dashboardHomeData.ts`.
- Use `index.ts` for clean folder imports.
- Keep dashboard CSS small and layout-focused. Section styling belongs beside the section component.
- Keep sidebar as a role-level component because it is shared across pages inside the same role dashboard.

## Example

`StudentDashboard.tsx` should look like composition, not page implementation:

```tsx
export function StudentDashboard() {
  return (
    <section className="student-dashboard">
      <StudentSidebar />
      <main className="student-dashboard__content">
        <StudentDashboardHome firstName={firstName} />
      </main>
    </section>
  );
}
```

When adding a new student tab, create a sibling page folder:

```text
StudentDashboard/
  MyLearningPage/
    index.ts
    MyLearningPage.tsx
    MyLearningPage.css
    CourseListSection/
      CourseListSection.tsx
      CourseListSection.css
```

## Consequences

- Dashboard pages stay easier to change as Stitch screens are implemented.
- Student, instructor, and admin dashboards can evolve independently.
- CSS files stay smaller and scoped to the page/section they style.
- Future routing can switch active page content without moving section code around.
