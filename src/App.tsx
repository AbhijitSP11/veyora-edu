import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Layouts
import { PublicLayout } from '@/components/layout/PublicLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Auth
import { ProtectedRoute } from '@/components/features/auth/ProtectedRoute';

// Public pages
import { LandingPage } from '@/pages/public/LandingPage';
import { AboutPage } from '@/pages/public/AboutPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { LoginPage } from '@/pages/public/LoginPage';

// Admin pages
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { StudentsPage } from '@/pages/admin/StudentsPage';
import { AttendancePage } from '@/pages/admin/AttendancePage';
import { MarksPage } from '@/pages/admin/MarksPage';
import { NotificationsPage } from '@/pages/admin/NotificationsPage';
import { FeesPage } from '@/pages/admin/FeesPage';
import { ReportsPage } from '@/pages/admin/ReportsPage';
import { ReportCardsPage } from '@/pages/admin/ReportCardsPage';
import { SettingsPage } from '@/pages/admin/SettingsPage';

// Student pages
import { StudentDashboard } from '@/pages/student/StudentDashboard';
import { MyProfile } from '@/pages/student/MyProfile';
import { MyAttendance } from '@/pages/student/MyAttendance';
import { MyMarks } from '@/pages/student/MyMarks';
import { MyNotifications } from '@/pages/student/MyNotifications';
import { MyDocuments } from '@/pages/student/MyDocuments';
import { MyFees } from '@/pages/student/MyFees';

// Super Admin pages
import { SchoolsPage } from '@/pages/super-admin/SchoolsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Login (no layout wrapper) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin routes */}
          <Route
            path="/:schoolSlug/admin"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="marks" element={<MarksPage />} />
            <Route path="report-cards" element={<ReportCardsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="fees" element={<FeesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Student routes */}
          <Route
            path="/:schoolSlug/student"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="attendance" element={<MyAttendance />} />
            <Route path="marks" element={<MyMarks />} />
            <Route path="notifications" element={<MyNotifications />} />
            <Route path="documents" element={<MyDocuments />} />
            <Route path="fees" element={<MyFees />} />
          </Route>

          {/* Super Admin routes */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="schools" replace />} />
            <Route path="schools" element={<SchoolsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
