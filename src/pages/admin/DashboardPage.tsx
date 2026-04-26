import { Users, UserCheck, CreditCard, FileText, ArrowRight, BookOpen, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '@/components/shared/StatCard';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';

const ACTIVITY = [
  { text: 'Attendance marked for Class 10-A — 34 Present, 2 Absent', time: '10 min ago', color: 'bg-emerald-500' },
  { text: 'New student admitted: Arjun Mehta (Class 9-B)', time: '1 hour ago', color: 'bg-primary' },
  { text: 'Fee reminder sent to 23 overdue students', time: '3 hours ago', color: 'bg-amber-500' },
  { text: 'Unit Test 1 marks published for Class 8', time: 'Yesterday', color: 'bg-violet-500' },
  { text: 'Report cards generated for Class 12', time: '2 days ago', color: 'bg-ink-300' },
];

export function DashboardPage() {
  const { user } = useAuth();
  const { schoolSlug } = useTenant();
  const firstName = user?.name?.split(' ')[0] ?? 'Admin';
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' });

  const QUICK_LINKS = [
    { label: 'Mark Attendance', desc: 'Today\'s roll call', icon: ClipboardList, href: `/${schoolSlug}/admin/attendance`, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'Enter Marks', desc: 'Exam results entry', icon: BookOpen, href: `/${schoolSlug}/admin/marks`, color: 'text-primary', bg: 'bg-primary-light', border: 'border-primary/10' },
    { label: 'Add Student', desc: 'New admission', icon: Users, href: `/${schoolSlug}/admin/students`, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
    { label: 'Collect Fee', desc: 'Record payment', icon: CreditCard, href: `/${schoolSlug}/admin/fees`, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <p className="text-xs font-medium text-ink-400 mb-0.5">{today}</p>
        <h1 className="text-2xl font-bold text-ink-900">Good morning, {firstName} 👋</h1>
        <p className="text-sm text-ink-400 mt-0.5">Here's what's happening at your school today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value="842" accent="blue"
          icon={<Users className="size-5" />}
          trend={{ value: 12, label: 'vs last month' }} />
        <StatCard label="Today's Attendance" value="94%" accent="green"
          icon={<UserCheck className="size-5" />}
          trend={{ value: 2, label: 'vs yesterday' }} />
        <StatCard label="Fees Collected" value="₹4.2L" accent="amber"
          icon={<CreditCard className="size-5" />}
          trend={{ value: -8, label: 'vs last month' }} />
        <StatCard label="Pending TCs" value="3" accent="rose"
          icon={<FileText className="size-5" />} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Activity feed */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-ink-900">Recent Activity</h2>
            <button className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight className="size-3" />
            </button>
          </div>
          <div className="space-y-0">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-ink-50 last:border-0">
                <div className="mt-1.5 shrink-0">
                  <div className={`size-1.5 rounded-full ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink-700 leading-snug">{item.text}</p>
                  <p className="text-[11px] text-ink-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="bg-white rounded-xl shadow-card p-5">
            <h2 className="text-sm font-bold text-ink-900 mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_LINKS.map((ql) => (
                <Link
                  key={ql.label}
                  to={ql.href}
                  className={`flex flex-col gap-1.5 p-3 rounded-lg border ${ql.bg} ${ql.border} hover:scale-[1.02] transition-transform`}
                >
                  <ql.icon className={`size-4 ${ql.color}`} />
                  <div>
                    <p className={`text-xs font-semibold ${ql.color}`}>{ql.label}</p>
                    <p className="text-[10px] text-ink-400">{ql.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Today's snapshot */}
          <div className="bg-gradient-to-br from-primary to-primary-hover rounded-xl p-5 text-white">
            <p className="text-xs font-semibold text-white/70 mb-3 uppercase tracking-wider">Today at a Glance</p>
            {[
              { label: 'Classes Running', value: '18 / 20' },
              { label: 'Staff Present', value: '42 / 45' },
              { label: 'Upcoming Exams', value: '3 this week' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <span className="text-xs text-white/70">{item.label}</span>
                <span className="text-xs font-bold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
