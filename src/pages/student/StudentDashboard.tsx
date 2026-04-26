import { BookOpen, ClipboardList, CreditCard, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { useTenant } from '@/hooks/useTenant';
import { useAuth } from '@/hooks/useAuth';

export function StudentDashboard() {
  const { user } = useAuth();
  const { schoolSlug } = useTenant();

  const cards = [
    { label: 'Attendance', value: '92%', sub: 'This term', icon: <ClipboardList className="size-6 text-emerald-600" />, bg: 'bg-emerald-50', href: `/${schoolSlug}/student/attendance` },
    { label: 'Last Exam', value: '78/100', sub: 'Unit Test 1', icon: <BookOpen className="size-6 text-primary" />, bg: 'bg-primary-light', href: `/${schoolSlug}/student/marks` },
    { label: 'Fee Due', value: '₹8,500', sub: 'Due: 15 May', icon: <CreditCard className="size-6 text-amber-600" />, bg: 'bg-amber-50', href: `/${schoolSlug}/student/fees` },
    { label: 'Notifications', value: '3 new', sub: 'Unread', icon: <Bell className="size-6 text-violet-600" />, bg: 'bg-violet-50', href: `/${schoolSlug}/student/notifications` },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Hello, ${user?.name?.split(' ')[0] ?? 'Student'}`}
        description="Here's a summary of your academic status"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.href}
            className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-card-hover transition-shadow flex items-center gap-4"
          >
            <div className={`flex items-center justify-center size-14 rounded-xl ${card.bg} shrink-0`}>
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-950 font-display">{card.value}</p>
              <p className="text-sm font-medium text-gray-700">{card.label}</p>
              <p className="text-xs text-gray-400">{card.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
