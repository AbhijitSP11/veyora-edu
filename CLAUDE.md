# CLAUDE.md — Veyora School Management Platform (SMP)

> **Product:** Multi-tenant School Management SaaS for Indian K-12 schools
> **Codename:** `veyora-smp`
> **Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui | Node.js + Fastify + Prisma | PostgreSQL | Cloudflare R2

---

## 1. PROJECT IDENTITY

### What This Is
A white-labeled, multi-tenant school management web portal. Each school gets a branded instance (`/:schoolSlug/*`) to manage students, documents, attendance, marks, fees, notifications, and communication. Built as a SaaS product sold to multiple schools — not a one-off project.

### Who Uses It
- **Super Admin** (platform owner) — manages schools, subscriptions, platform settings
- **School Admin** — manages students, sends notifications, generates reports
- **Teacher** — views students, marks attendance, enters marks, sends class notifications
- **Student** — views profile, notifications, documents, attendance, marks, fee status
- **Parent** — views child's profile, notifications, attendance, marks, fees (Phase 3)

### Business Context
- Target: Private schools (200–2000 students) in Tier 2/3 Indian cities
- Pricing: ₹999–₹14,999/month tiered SaaS
- Key constraint: Mobile-first (principals/teachers use phones, not desktops)

---

## 2. DESIGN SYSTEM

### 2.1 Design Philosophy

The design language draws from modern booking/dashboard UIs — clean, spacious, and professional with warmth. NOT generic admin templates. The goal is a product that school principals feel proud showing to parents.

**Core Principles:**
- **Calm authority** — conveys trust and professionalism without being cold
- **Generous whitespace** — breathe between sections, no cramped layouts
- **Card-based architecture** — every data cluster lives in a rounded card with subtle shadow
- **Soft depth** — layered surfaces with gentle shadows, not flat or harsh
- **Warm neutrals** — avoid pure whites and pure blacks; use off-whites and charcoal

### 2.2 Color Palette

```
BRAND COLORS (Primary)
├── Primary:          #1B5E7B    (Deep Teal — headers, primary buttons, active states)
├── Primary Light:    #E8F4F8    (Teal Wash — selected rows, active sidebar bg, highlights)
├── Primary Dark:     #0D3B4F    (Midnight Teal — sidebar bg, footer)
├── Primary Hover:    #15495F    (Button hover)

ACCENT COLORS
├── Accent Warm:      #F59E0B    (Amber — badges, warnings, star ratings, CTAs on landing)
├── Accent Coral:     #EF6C57    (Soft Coral — delete buttons, overdue indicators, errors)
├── Accent Green:     #10B981    (Emerald — success states, paid status, active indicators)
├── Accent Violet:    #7C3AED    (Purple — pro features, premium badges, chart accents)

NEUTRALS (Warm Gray Scale)
├── Gray 950:         #1A1A2E    (Primary text, headings)
├── Gray 800:         #2D2D44    (Secondary text, body copy)
├── Gray 600:         #6B7280    (Muted text, placeholders, timestamps)
├── Gray 400:         #9CA3AF    (Disabled states, borders)
├── Gray 200:         #E5E7EB    (Dividers, table borders)
├── Gray 100:         #F3F4F6    (Card backgrounds, alternating rows)
├── Gray 50:          #F9FAFB    (Page background)
├── White:            #FFFFFF    (Card surfaces, inputs)

SEMANTIC COLORS
├── Success:          #10B981 bg #ECFDF5    (Paid, Active, Present)
├── Warning:          #F59E0B bg #FFFBEB    (Due Soon, Partial Payment)
├── Error:            #EF4444 bg #FEF2F2    (Overdue, Absent, Failed)
├── Info:             #3B82F6 bg #EFF6FF    (Announcements, New)
```

### Tailwind Config Extension
```js
// tailwind.config.ts — extend theme.colors
colors: {
  primary: {
    DEFAULT: '#1B5E7B',
    light: '#E8F4F8',
    dark: '#0D3B4F',
    hover: '#15495F',
  },
  accent: {
    warm: '#F59E0B',
    coral: '#EF6C57',
    green: '#10B981',
    violet: '#7C3AED',
  },
  surface: {
    page: '#F9FAFB',
    card: '#FFFFFF',
    muted: '#F3F4F6',
  },
}
```

### 2.3 Typography

**Font Stack:**
```
Display / Headings:   "Plus Jakarta Sans", sans-serif   (Google Fonts — weight 600, 700, 800)
Body / UI:            "DM Sans", sans-serif              (Google Fonts — weight 400, 500, 600)
Mono / Data:          "JetBrains Mono", monospace         (Roll numbers, IDs, codes)
```

**Why these fonts:** Plus Jakarta Sans has geometric warmth that works for an educational context — professional but not corporate-sterile. DM Sans is highly legible at small sizes for data tables and form labels.

**Scale:**
```
text-xs:    12px / 16px    — Badges, timestamps, fine print
text-sm:    14px / 20px    — Table cells, form labels, secondary text
text-base:  16px / 24px    — Body text, descriptions, notifications
text-lg:    18px / 28px    — Card titles, section headers
text-xl:    20px / 28px    — Page section headings
text-2xl:   24px / 32px    — Page titles (dashboard, student list)
text-3xl:   30px / 36px    — Landing page headings
text-4xl:   36px / 40px    — Hero heading (landing page only)
text-5xl:   48px / 48px    — Stat numbers on dashboard
```

### 2.4 Spacing & Layout

**Grid System:**
- Landing pages: max-w-7xl (1280px), centered
- Dashboard shell: full-width with 256px sidebar (collapsible to 64px on mobile)
- Content area: max-w-6xl (1152px) within dashboard
- Card grid: 2-col on tablet, 3-col on desktop, 1-col on mobile
- Consistent padding: p-6 for cards, p-8 for page sections

**Border Radius:**
```
Buttons:     rounded-lg      (8px)
Cards:       rounded-xl      (12px)
Modals:      rounded-2xl     (16px)
Avatars:     rounded-full
Inputs:      rounded-lg      (8px)
Badges:      rounded-full
```

**Shadows (Soft Depth):**
```
Card resting:     shadow-sm                      (0 1px 2px rgba(0,0,0,0.05))
Card hover:       shadow-md transition-shadow    (0 4px 6px rgba(0,0,0,0.07))
Modal/Dropdown:   shadow-xl                      (0 20px 25px rgba(0,0,0,0.1))
Sidebar:          shadow-lg on right edge
```

### 2.5 Component Patterns

**Status Badges:**
```
Active/Paid/Present  → bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20
Pending/Due          → bg-amber-50 text-amber-700 ring-1 ring-amber-600/20
Overdue/Absent       → bg-red-50 text-red-700 ring-1 ring-red-600/20
Info/New             → bg-blue-50 text-blue-700 ring-1 ring-blue-600/20
Default/Inactive     → bg-gray-100 text-gray-600 ring-1 ring-gray-500/20
```

**Buttons:**
```
Primary:       bg-primary text-white hover:bg-primary-hover → rounded-lg px-4 py-2.5 font-medium
Secondary:     bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50
Danger:        bg-red-600 text-white hover:bg-red-700
Ghost:         text-gray-600 hover:bg-gray-100 hover:text-gray-900
Icon Button:   p-2 rounded-lg hover:bg-gray-100
```

**Data Tables:**
```
- Header row: bg-gray-50 text-sm font-semibold text-gray-600 uppercase tracking-wider
- Body rows: bg-white, border-b border-gray-100
- Hover: hover:bg-primary-light transition-colors
- Alternating: DO NOT USE alternating row colors (looks dated). Use hover highlight instead.
- Row actions: appear on hover as ghost icon buttons (edit, delete, view)
- Pagination: bottom-right, compact style with page numbers
- Empty state: centered illustration + text, not just "No data"
```

**Cards (Dashboard Stat Cards):**
```
- bg-white rounded-xl p-6 shadow-sm
- Icon in top-left: 40x40 rounded-lg bg with icon (e.g., bg-primary-light with primary icon)
- Stat number: text-3xl font-bold text-gray-950
- Label below: text-sm text-gray-600
- Optional: small trend indicator (↑ 12% in green, ↓ 5% in red)
```

**Sidebar Navigation:**
```
- bg-primary-dark, text-white
- Logo + school name at top (each school's branding)
- Nav items: py-2.5 px-4 rounded-lg, flex items-center gap-3
- Active item: bg-white/10 text-white font-medium
- Inactive: text-white/70 hover:text-white hover:bg-white/5
- Section dividers: thin white/10 border with category labels in text-xs uppercase
- Collapse to icons-only on mobile with hamburger toggle
```

**Forms:**
```
- Labels: text-sm font-medium text-gray-700, above input
- Inputs: h-10 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary
- Error: border-red-500 + text-sm text-red-600 below input
- Required indicator: red asterisk after label
- Group related fields in cards with section headings
```

### 2.6 Iconography

Use **Lucide React** (consistent with shadcn/ui). 

Icon sizing:
- Navigation: 20px (size-5)
- Inline/buttons: 16px (size-4)
- Feature cards (landing): 24px (size-6)
- Empty states: 48px (size-12), muted color

### 2.7 Motion & Transitions

```
Default transition:   transition-all duration-200 ease-in-out
Card hover:           transition-shadow duration-200
Sidebar collapse:     transition-all duration-300 ease-in-out
Page transitions:     fade-in with 150ms (use framer-motion or CSS)
Toast notifications:  slide-in from top-right, auto-dismiss 5s
Modal:                fade backdrop + scale-up content (200ms)
Skeleton loading:     animate-pulse on gray-200 shapes matching content layout
```

### 2.8 Page-Specific Design Notes

**Landing Page (Public):**
- Hero: Full-width, bg-gradient from primary-dark to primary, white text
- Feature cards in 3-col grid with icons
- Social proof / school count ticker
- CTA buttons in accent-warm (amber) for contrast against teal
- Testimonial section with school logos
- Footer: bg-primary-dark, 4-col layout

**Admin Dashboard:**
- Top row: 4 stat cards (Total Students, Today's Attendance %, Fees Collected, Pending TCs)
- Below: 2-col layout — left: recent activity feed + attendance trend chart, right: quick actions panel + upcoming exams
- Charts: Use Recharts with primary/accent color palette, no 3D effects

**Student List (Data Table):**
- Search bar + filter dropdowns (Class, Section, Status) in a horizontal bar above table
- Bulk actions toolbar appears when rows selected
- Click row → slide-in detail panel from right (not full page navigation)
- Export button (Excel/PDF) top-right

**Student Profile:**
- Header card with avatar, name, roll number, class badge
- Below: tabbed sections (Personal Info, Documents, Attendance, Marks, Fees, Notifications)
- Documents: grid of thumbnail cards with status badges (Verified, Pending, Missing)
- Attendance tab: calendar heatmap + attendance % stat card
- Marks tab: exam-wise marks table with grades

**Notification Composer (Admin):**
- Clean editor with recipient selector (individual, class-wide, broadcast)
- Preview panel showing how notification appears to student
- Delivery channel selector (In-app, SMS, WhatsApp, Email) with cost indicator

**Attendance Page (Admin/Teacher):**
- Top bar: Date picker (defaults to today) + Class + Section dropdowns
- Grid view: Student names as rows, single Present/Absent/Late toggle per student
- Color-coded: green chip for Present, red for Absent, amber for Late
- Bulk actions: "Mark All Present" button for quick entry
- Bottom bar: summary count (34 Present, 2 Absent, 1 Late) with Save button
- Calendar heatmap view: toggle to see monthly attendance as a color grid (dark green = full attendance, red = absent days)

**Marks Entry Page (Admin/Teacher):**
- Top bar: Exam selector (Unit Test 1, Mid-Term, Final) + Class + Section + Subject dropdowns
- Table: Student Name | Roll No | Max Marks | Marks Obtained | Grade (auto-calculated)
- Inline editing: click any marks cell to type, Tab to move to next student
- Validation: marks cannot exceed max marks, highlight in red if invalid
- Bottom: class average, highest, lowest stats auto-calculated
- Save as Draft / Publish toggle — draft marks are not visible to students

**Report Card Page (Admin):**
- Student selector or bulk generate for entire class
- Preview: formatted report card with school header, student info, subject-wise marks table, attendance summary, grade breakdown, teacher remarks field
- Export: Download as PDF (individual or batch ZIP for full class)
- Grading scale config: Settings page allows school to define their grading bands (A+ = 90-100, A = 80-89, etc.)

**Student: My Attendance (Student Portal):**
- Monthly calendar view with colored dots (green/red/amber)
- Summary card: Total days, Present, Absent, Late, Attendance % with circular progress indicator
- Filter by month/academic year

**Student: My Marks (Student Portal):**
- Exam-wise tabbed view (Unit Test 1 | Mid-Term | Final)
- Subject-wise marks table with grade column
- Class rank (if enabled by school)
- Download Report Card as PDF button

---

## 3. PROJECT STRUCTURE

```
veyora-smp/
├── CLAUDE.md                          # THIS FILE — do not modify without discussion
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── index.html
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
│
├── public/
│   ├── favicon.svg
│   └── assets/                        # Static images (logos, illustrations)
│
├── src/
│   ├── main.tsx                       # Entry point
│   ├── App.tsx                        # Root component + router setup
│   ├── vite-env.d.ts
│   │
│   ├── config/
│   │   ├── constants.ts               # App-wide constants (API_URL, etc.)
│   │   ├── routes.ts                  # Route path definitions (type-safe)
│   │   └── queryKeys.ts              # TanStack Query key factory
│   │
│   ├── lib/
│   │   ├── api.ts                     # Axios/fetch wrapper with tenant header injection
│   │   ├── auth.ts                    # Token management, role checks
│   │   ├── utils.ts                   # cn() helper, formatDate, formatINR, etc.
│   │   └── validators.ts             # Zod schemas shared with forms
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                 # Auth state, login/logout, role checks
│   │   ├── useTenant.ts               # Current school context from URL slug
│   │   ├── useStudents.ts             # Student CRUD query hooks
│   │   ├── useNotifications.ts        # Notification query hooks
│   │   ├── useAttendance.ts           # Attendance marking + reports
│   │   ├── useMarks.ts               # Marks entry + report card queries
│   │   └── useDebounce.ts             # Search debounce
│   │
│   ├── components/
│   │   ├── ui/                        # shadcn/ui primitives (button, input, dialog, etc.)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ... (add as needed)
│   │   │
│   │   ├── layout/
│   │   │   ├── PublicLayout.tsx        # Navbar + footer for landing/about/contact
│   │   │   ├── DashboardLayout.tsx     # Sidebar + header + content area
│   │   │   ├── Sidebar.tsx            # Collapsible nav sidebar
│   │   │   ├── TopBar.tsx             # Search, notifications bell, user menu
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── StatusBadge.tsx         # Reusable status indicator
│   │   │   ├── StatCard.tsx            # Dashboard metric card
│   │   │   ├── EmptyState.tsx          # Centered empty illustration
│   │   │   ├── DataTable.tsx           # Generic table with sort, search, paginate
│   │   │   ├── ConfirmDialog.tsx       # Delete/action confirmation
│   │   │   ├── FileUpload.tsx          # Drag-and-drop document upload
│   │   │   ├── SearchBar.tsx           # Debounced search input
│   │   │   ├── PageHeader.tsx          # Title + breadcrumb + action buttons
│   │   │   └── NotificationToast.tsx   # Toast notification component
│   │   │
│   │   └── features/
│   │       ├── students/
│   │       │   ├── StudentTable.tsx
│   │       │   ├── StudentForm.tsx
│   │       │   ├── StudentProfile.tsx
│   │       │   ├── StudentImport.tsx   # CSV bulk upload
│   │       │   └── StudentFilters.tsx
│   │       │
│   │       ├── notifications/
│   │       │   ├── NotificationComposer.tsx
│   │       │   ├── NotificationList.tsx
│   │       │   └── NotificationCard.tsx
│   │       │
│   │       ├── documents/
│   │       │   ├── DocumentGrid.tsx
│   │       │   └── DocumentViewer.tsx
│   │       │
│   │       ├── fees/
│   │       │   ├── FeeTable.tsx
│   │       │   ├── FeeForm.tsx
│   │       │   └── FeeOverview.tsx
│   │       │
│   │       ├── attendance/
│   │       │   ├── AttendanceMarker.tsx    # Daily attendance marking grid
│   │       │   ├── AttendanceCalendar.tsx  # Monthly calendar heatmap view
│   │       │   ├── AttendanceReport.tsx    # Class/student attendance summary
│   │       │   └── AttendanceFilters.tsx   # Date, class, section filters
│   │       │
│   │       ├── marks/
│   │       │   ├── MarksEntryTable.tsx     # Subject-wise marks entry grid
│   │       │   ├── MarksForm.tsx           # Single student marks form
│   │       │   ├── ReportCardPreview.tsx   # Report card PDF preview
│   │       │   ├── GradeSettings.tsx       # Grading scale configuration
│   │       │   └── ExamSelector.tsx        # Exam type selector (Unit Test, Mid-Term, Final)
│   │       │
│   │       └── auth/
│   │           ├── LoginForm.tsx
│   │           ├── ProtectedRoute.tsx
│   │           └── RoleGate.tsx         # Renders children only for allowed roles
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   └── LoginPage.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── StudentsPage.tsx
│   │   │   ├── StudentDetailPage.tsx
│   │   │   ├── NotificationsPage.tsx
│   │   │   ├── AttendancePage.tsx
│   │   │   ├── MarksPage.tsx
│   │   │   ├── ReportCardsPage.tsx
│   │   │   ├── FeesPage.tsx
│   │   │   ├── ReportsPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   │
│   │   ├── student/
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── MyProfile.tsx
│   │   │   ├── MyNotifications.tsx
│   │   │   ├── MyDocuments.tsx
│   │   │   ├── MyAttendance.tsx
│   │   │   ├── MyMarks.tsx
│   │   │   └── MyFees.tsx
│   │   │
│   │   └── super-admin/
│   │       ├── SchoolsPage.tsx
│   │       ├── SchoolOnboarding.tsx
│   │       └── PlatformSettings.tsx
│   │
│   ├── stores/                        # Zustand stores (minimal — prefer server state via TanStack Query)
│   │   ├── authStore.ts               # User session, tokens
│   │   └── uiStore.ts                 # Sidebar collapsed, theme, modals
│   │
│   └── types/
│       ├── api.ts                     # API response types
│       ├── models.ts                  # School, User, Student, Notification, Fee, Document, Attendance, Exam, Marks
│       └── enums.ts                   # Role, Status, FeeType, NotificationType, DocumentType, ExamType, AttendanceStatus
│
├── server/                            # Backend (monorepo — same repo for now)
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── server.ts                  # Fastify app bootstrap
│   │   ├── config/
│   │   │   ├── env.ts                 # Environment variable validation (Zod)
│   │   │   └── constants.ts
│   │   │
│   │   ├── plugins/
│   │   │   ├── auth.ts                # JWT verification + RBAC decorator
│   │   │   ├── tenancy.ts             # Multi-tenant context injection
│   │   │   ├── rateLimit.ts           # Rate limiting per school
│   │   │   └── errorHandler.ts        # Centralized error formatting
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.schema.ts     # Zod request/response schemas
│   │   │   ├── school/
│   │   │   ├── student/
│   │   │   ├── notification/
│   │   │   ├── document/
│   │   │   ├── fee/
│   │   │   ├── attendance/
│   │   │   │   ├── attendance.routes.ts
│   │   │   │   ├── attendance.service.ts
│   │   │   │   └── attendance.schema.ts
│   │   │   ├── marks/
│   │   │   │   ├── marks.routes.ts
│   │   │   │   ├── marks.service.ts
│   │   │   │   ├── marks.schema.ts
│   │   │   │   └── reportCard.service.ts  # PDF report card generation
│   │   │   ├── exam/
│   │   │   │   ├── exam.routes.ts
│   │   │   │   ├── exam.service.ts
│   │   │   │   └── exam.schema.ts
│   │   │   └── report/
│   │   │
│   │   ├── shared/
│   │   │   ├── middleware/
│   │   │   ├── utils/
│   │   │   └── types/
│   │   │
│   │   └── jobs/                      # Cron-based background tasks
│   │       ├── feeReminder.ts
│   │       └── dailyBackup.ts
│   │
│   └── prisma/
│       ├── schema.prisma              # Database schema
│       ├── seed.ts                    # Seed data for development
│       └── migrations/
│
└── docs/
    ├── API.md                         # API endpoint documentation
    ├── DEPLOYMENT.md                  # Deployment runbook
    └── DATABASE.md                    # Schema decisions and migration guide
```

---

## 4. CODE CONVENTIONS

### 4.1 TypeScript Rules
- **Strict mode ON** — `"strict": true` in tsconfig.json
- **No `any`** — use `unknown` + type narrowing, or define proper types
- **No `enum` keyword** — use `as const` objects:
  ```typescript
  export const Role = { SUPER_ADMIN: 'SUPER_ADMIN', SCHOOL_ADMIN: 'SCHOOL_ADMIN', TEACHER: 'TEACHER', STUDENT: 'STUDENT', PARENT: 'PARENT' } as const;
  export type Role = (typeof Role)[keyof typeof Role];
  ```
- **Interface for object shapes, type for unions/intersections**
- **Explicit return types on exported functions**

### 4.2 React Rules
- **Functional components only** — no class components
- **Named exports** for components: `export function StudentTable() {}` not `export default`
- **Props interfaces** named `{ComponentName}Props`: `interface StudentTableProps {}`
- **Custom hooks** extract all data fetching and business logic out of components
- **No inline styles** — Tailwind only. Exception: truly dynamic values (calculated widths)
- **No prop drilling beyond 2 levels** — use context or Zustand
- **Skeleton loaders** for every data-fetching component (no spinners)

### 4.3 File & Naming Conventions
```
Components:    PascalCase.tsx       (StudentTable.tsx)
Hooks:         camelCase.ts         (useStudents.ts)
Utils:         camelCase.ts         (formatDate.ts)
Types:         camelCase.ts         (models.ts)
Constants:     SCREAMING_SNAKE      (API_BASE_URL)
CSS classes:   kebab-case via Tailwind
API routes:    kebab-case           (/api/v1/students/:id/documents)
DB columns:    snake_case           (school_id, created_at)
```

### 4.4 Import Order (enforced by ESLint)
```typescript
// 1. React
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

// 3. Internal aliases (@/)
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// 4. Relative imports (same feature)
import { StudentFilters } from './StudentFilters';

// 5. Types (type-only imports)
import type { Student } from '@/types/models';
```

### 4.5 Path Aliases
```json
// tsconfig.json paths
{
  "@/*": ["./src/*"],
  "@server/*": ["./server/src/*"]
}
```

---

## 5. API CONVENTIONS

### 5.1 Endpoint Pattern
```
BASE: /api/v1

Auth:
  POST   /api/v1/auth/login
  POST   /api/v1/auth/refresh
  POST   /api/v1/auth/logout
  POST   /api/v1/auth/forgot-password

Students:
  GET    /api/v1/students              ?class=10&section=A&search=rahul&page=1&limit=20
  GET    /api/v1/students/:id
  POST   /api/v1/students
  PUT    /api/v1/students/:id
  DELETE /api/v1/students/:id
  POST   /api/v1/students/import       (CSV bulk)
  GET    /api/v1/students/:id/documents
  POST   /api/v1/students/:id/documents

Notifications:
  GET    /api/v1/notifications         ?type=PERSONAL|BROADCAST&page=1
  POST   /api/v1/notifications
  GET    /api/v1/notifications/:id/read-status

Fees:
  GET    /api/v1/fees                  ?status=OVERDUE&class=10
  POST   /api/v1/fees
  PUT    /api/v1/fees/:id
  GET    /api/v1/fees/summary          (aggregate stats)

Attendance:
  GET    /api/v1/attendance             ?class=10&section=A&date=2025-07-15
  POST   /api/v1/attendance             (bulk mark — array of {studentId, status})
  PUT    /api/v1/attendance/:id         (update single record)
  GET    /api/v1/attendance/report      ?studentId=xyz&month=7&year=2025
  GET    /api/v1/attendance/summary     ?class=10&section=A&month=7&year=2025

Exams:
  GET    /api/v1/exams                  ?academicYear=2025-26
  POST   /api/v1/exams
  PUT    /api/v1/exams/:id
  DELETE /api/v1/exams/:id

Marks:
  GET    /api/v1/marks                  ?examId=xyz&class=10&section=A&subject=Mathematics
  POST   /api/v1/marks                  (bulk entry — array of {studentId, subjectId, marksObtained})
  PUT    /api/v1/marks/:id
  GET    /api/v1/marks/report-card/:studentId  ?examId=xyz&format=pdf|json
  GET    /api/v1/marks/class-result     ?examId=xyz&class=10&section=A

Reports:
  GET    /api/v1/reports/students      ?format=excel|pdf
  GET    /api/v1/reports/fees          ?format=excel|pdf

Schools (Super Admin):
  GET    /api/v1/schools
  POST   /api/v1/schools
  PUT    /api/v1/schools/:id
  GET    /api/v1/schools/:id/stats
```

### 5.2 Response Format
```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 156 }  // for paginated responses
}

// Error
{
  "success": false,
  "error": {
    "code": "STUDENT_NOT_FOUND",
    "message": "Student with ID xyz not found",
    "details": {}  // optional validation errors
  }
}
```

### 5.3 Auth Header
```
Authorization: Bearer <access_token>
X-School-Slug: dpsnashik              // resolved to schoolId by tenancy middleware
```

---

## 6. DATABASE SCHEMA RULES

- **Every table** gets: `id` (UUID v4, PK), `created_at`, `updated_at`
- **Every tenant-scoped table** gets: `school_id` (FK to School, indexed, NOT NULL)
- **Soft deletes** via `deleted_at` (nullable timestamp) on Student, School — never hard delete student data
- **JSONB `metadata`** field on Student for school-specific custom fields
- **Audit log** is append-only — no UPDATE or DELETE on audit_log table
- **Indexes**: Always create composite indexes for `(school_id, <filter_column>)` patterns
- **Prisma migrations** — never edit SQL directly. Always use `prisma migrate dev --name descriptive_name`

---

## 7. WORKFLOW PROTOCOL

### When Claude Code receives a task:

1. **Read CLAUDE.md first** — always re-read this file before starting work
2. **Identify scope** — which module(s) does this touch? (student, notification, attendance, marks, exam, fee, document, etc.)
3. **Check existing code** — read related files before writing new ones
4. **Implement** — follow conventions above, write clean TypeScript
5. **Verify** — run `tsc --noEmit` and check for errors
6. **Test the flow** — trace the data path: UI component → hook → API call → route → service → repository → DB

### Task Prioritization (if multiple tasks):
1. Bug fixes in production features
2. Completing in-progress features
3. New features in current sprint
4. Refactoring / tech debt

### Commit Message Format:
```
feat(student): add CSV bulk import with validation
fix(notification): prevent duplicate broadcast delivery
refactor(auth): extract token refresh into middleware
chore(deps): update prisma to 5.x
docs(api): add fee endpoints documentation
```

---

## 8. ENVIRONMENT VARIABLES

```env
# .env.example

# App
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/veyora_smp

# Auth
JWT_ACCESS_SECRET=<random-64-char>
JWT_REFRESH_SECRET=<random-64-char>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Storage (Cloudflare R2)
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=veyora-documents
R2_PUBLIC_URL=

# Notifications
MSG91_AUTH_KEY=
MSG91_SENDER_ID=VEYORA
RESEND_API_KEY=

# Super Admin
SUPER_ADMIN_EMAIL=admin@veyora.com
```

---

## 9. DESIGN REFERENCE URLS

Keep these bookmarked for design pattern reference:

- Travel Booking UI (clean hero + CTA): https://dribbble.com/shots/25667906
- Aviatour (modern navigation + cards): https://dribbble.com/shots/26591386
- Oriento Hotel (warm luxury + spacing): https://dribbble.com/shots/26415894
- Student Dashboard (dashboard layout): https://dribbble.com/shots/16745725
- Data Table Filters (table UX): https://dribbble.com/shots/27065739
- School Admin Dashboard (sidebar + stats): https://dribbble.com/shots/20718590

### Design Extraction Summary from References:

| Element | Inspiration Source | What to Take |
|---|---|---|
| Hero section | Travel Booking + Aviatour | Full-width gradient hero, bold heading, floating search/CTA card |
| Card design | Oriento + Student Dashboard | Rounded-xl, soft shadow, generous padding, icon+stat layout |
| Data tables | Data Table Filter shot | Horizontal filter bar above table, clean borders, row hover highlight |
| Sidebar | School Admin Dashboard | Dark sidebar, icon+label nav, collapsible, school logo at top |
| Color warmth | Oriento | Warm neutrals (not pure gray), teal primary instead of blue |
| Spacing | All travel shots | Generous whitespace between sections, cards don't touch edges |
| Typography hierarchy | Aviatour | Large bold headings, small muted labels, clear weight contrast |
| Status indicators | Student Dashboard | Pill-shaped badges with semantic colors, not just text |
| Dashboard grid | School Admin Dashboard | 4 stat cards top row, 2-col below for charts + activity |
| Mobile nav | Aviatour | Bottom sheet or hamburger → full-height overlay sidebar |

---

## 10. VEYORA BRANDING

```typescript
// src/config/constants.ts — Company & branding
export const COMPANY = {
  NAME: 'Veyora Infotech',
  PRODUCT_NAME: 'Veyora School Management Platform',
  FOUNDER: 'Ayush Sharma',
  CONTACT_PHONES: ['7218632586', '7738759316'],
  EMAIL: 'ayushsharma001.nsk@gmail.com',
  WEBSITE: 'https://veyora.com',           // to be registered
  SUPPORT_EMAIL: 'support@veyora.com',
  TAGLINE: 'Simplifying school management for modern India',
} as const;
```

Footer and Contact page must always display these details. Landing page hero should feature the TAGLINE. Each school's portal shows the school's own branding (logo, name), with "Powered by Veyora Infotech" in the footer.

---

## 11. DATABASE SCHEMA — ATTENDANCE, EXAM & MARKS

### Attendance
```
Attendance
├── id, school_id (FK), student_id (FK)
├── date (DATE, NOT NULL)
├── status (ENUM: PRESENT, ABSENT, LATE, HALF_DAY)
├── marked_by (FK to User — teacher/admin who marked)
├── remarks (nullable — reason for absence)
├── UNIQUE constraint: (school_id, student_id, date)
└── created_at, updated_at
```
**Index:** `(school_id, date, class, section)` for daily attendance queries.
**Business rule:** Attendance can only be marked once per student per day. Updates allowed same day only (unless admin override).

### Exam
```
Exam
├── id, school_id (FK)
├── name (VARCHAR — "Unit Test 1", "Mid-Term", "Final Exam")
├── exam_type (ENUM: UNIT_TEST, MID_TERM, FINAL, PRACTICAL, INTERNAL)
├── academic_year (VARCHAR — "2025-26")
├── class (VARCHAR — "10")
├── start_date, end_date
├── is_published (BOOLEAN — controls visibility to students)
├── metadata (JSONB — max marks per subject, weightage, etc.)
└── created_at, updated_at
```

### Subject
```
Subject
├── id, school_id (FK)
├── name (VARCHAR — "Mathematics", "Science", "Hindi")
├── code (VARCHAR — "MATH", "SCI", "HIN")
├── class (VARCHAR — applicable class)
├── is_active (BOOLEAN)
└── created_at, updated_at
```

### Marks
```
Marks
├── id, school_id (FK)
├── exam_id (FK to Exam)
├── student_id (FK to Student)
├── subject_id (FK to Subject)
├── max_marks (INTEGER)
├── marks_obtained (DECIMAL — allows 0.5 increments)
├── grade (VARCHAR — auto-calculated from grading scale, nullable)
├── is_absent (BOOLEAN — student was absent for this exam)
├── entered_by (FK to User — teacher who entered)
├── status (ENUM: DRAFT, PUBLISHED)
├── remarks (nullable — teacher comments)
├── UNIQUE constraint: (exam_id, student_id, subject_id)
└── created_at, updated_at
```
**Index:** `(school_id, exam_id, class)` for class-result queries.
**Business rule:** Marks with status DRAFT are only visible to admin/teacher. PUBLISHED marks are visible to students and parents.

### GradingScale
```
GradingScale
├── id, school_id (FK)
├── name (VARCHAR — "CBSE Standard", "Custom")
├── bands (JSONB — [{grade: "A+", min: 90, max: 100}, {grade: "A", min: 80, max: 89}, ...])
├── is_default (BOOLEAN)
└── created_at, updated_at
```
Each school configures their own grading bands. Grades are auto-calculated on marks entry based on the active grading scale.

---

## 12. FUTURE SCOPE (NOT IN MVP)

These features are planned but NOT to be built in the current phase. They are documented here so the architecture accounts for them from day one.

### Online Fee Payment Portal
- **Integration:** Razorpay Payment Gateway (preferred for Indian market)
- **Flow:** Admin creates fee structure → Student/Parent views pending fees → Pays via UPI/Card/Net Banking → Razorpay webhook confirms payment → Fee status auto-updates to PAID
- **Prep now:** Fee table already has `payment_reference` and `payment_mode` columns. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env.example` as placeholder.
- **Schema ready:** Fee model includes `paid_amount`, `paid_date`, `status` — no schema changes needed when payment goes live.

### Parent Login for Academic Tracking
- **Role:** PARENT already defined in RBAC permissions
- **Access:** Read-only view of linked child's profile, attendance, marks, fees, notifications
- **Linking:** Parent user linked to Student via `parent_id` FK on Student table (add when building)
- **Permissions already defined:** `['profile:read', 'notification:read', 'fee:view', 'attendance:view', 'marks:view']`

### SMS & WhatsApp Notification Channels
- **SMS:** MSG91 integration (transactional SMS at ~₹0.18/msg)
- **WhatsApp:** Interakt or MSG91 WhatsApp Business API (~₹0.40/msg)
- **Prep now:** Notification schema already has `sent_via` JSONB array supporting `['IN_APP', 'SMS', 'WHATSAPP', 'EMAIL']`

### Timetable Management
- Class-wise weekly timetable builder
- Teacher-wise schedule view
- Substitution management

### Transport Management
- Bus route and stop management
- Student-bus assignment
- GPS tracking integration (long-term)

---

## 13. QUALITY CHECKLIST

Before marking any feature as complete, verify:

- [ ] TypeScript strict — no `any`, no `@ts-ignore`
- [ ] Responsive — tested at 375px, 768px, 1280px widths
- [ ] Loading states — skeleton loaders, not spinners
- [ ] Empty states — illustration + helpful text, not blank screen
- [ ] Error states — user-friendly message, retry button
- [ ] Multi-tenant — all queries scoped to `schoolId`
- [ ] Auth — route protected, role-gated, token refresh handled
- [ ] Accessibility — labels on inputs, alt on images, keyboard navigable
- [ ] Design system — uses defined colors, fonts, spacing (no magic numbers)
- [ ] Indian localization — dates in DD/MM/YYYY, currency in ₹ with commas (1,23,456)