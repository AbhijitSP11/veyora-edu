import { Link } from 'react-router-dom';
import {
  Users, Bell, ClipboardList, BookOpen, CreditCard, Shield,
  ArrowRight, CheckCircle, ChevronRight, Star, Zap, BarChart2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { COMPANY } from '@/config/constants';

const FEATURES = [
  {
    icon: Users,
    label: 'Student Management',
    desc: 'Complete student lifecycle — admissions, profiles, documents, transfers. Bulk CSV import in seconds.',
    iconClass: 'text-blue-600 bg-blue-50',
    borderClass: 'border-l-blue-500',
  },
  {
    icon: ClipboardList,
    label: 'Attendance Tracking',
    desc: 'One-click daily roll call. Heatmap calendar, monthly summaries, automated low-attendance alerts.',
    iconClass: 'text-emerald-600 bg-emerald-50',
    borderClass: 'border-l-emerald-500',
  },
  {
    icon: BookOpen,
    label: 'Marks & Report Cards',
    desc: 'Enter marks inline, auto-grade with custom scales, generate print-ready PDF report cards in bulk.',
    iconClass: 'text-violet-600 bg-violet-50',
    borderClass: 'border-l-violet-500',
  },
  {
    icon: CreditCard,
    label: 'Fee Management',
    desc: 'Track tuition, transport, and exam fees. Overdue alerts, partial payments, and collection summaries.',
    iconClass: 'text-amber-600 bg-amber-50',
    borderClass: 'border-l-amber-500',
  },
  {
    icon: Bell,
    label: 'Smart Notifications',
    desc: 'Broadcast to classes or individual students via In-App, SMS, WhatsApp, and Email — one compose.',
    iconClass: 'text-rose-600 bg-rose-50',
    borderClass: 'border-l-rose-500',
  },
  {
    icon: Shield,
    label: 'Role-Based Access',
    desc: 'Separate portals for Admins, Teachers, Students, and Parents. Full audit trail on every action.',
    iconClass: 'text-sky-600 bg-sky-50',
    borderClass: 'border-l-sky-500',
  },
];

const STATS = [
  { value: '150+', label: 'Schools onboarded' },
  { value: '2.4L+', label: 'Students managed' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 2s', label: 'Average load time' },
];

const PLANS = [
  {
    name: 'Starter',
    price: '999',
    students: 'Up to 250 students',
    features: ['Student profiles & documents', 'Attendance tracking', 'In-App notifications', 'Email support'],
  },
  {
    name: 'Growth',
    price: '4,999',
    students: 'Up to 1,000 students',
    features: ['Everything in Starter', 'Marks & Report Cards', 'Fee management', 'SMS & WhatsApp', 'Priority support'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '14,999',
    students: 'Unlimited students',
    features: ['Everything in Growth', 'Custom school branding', 'Dedicated account manager', 'API access', '24/7 support'],
  },
];

const TESTIMONIALS = [
  {
    text: '"Veyora cut our monthly paperwork by 80%. Our teachers now spend 40 minutes less per day on admin tasks."',
    name: 'Rajesh Patil',
    role: 'Principal, DPS Nashik',
    avatar: 'RP',
    color: 'border-l-blue-500',
  },
  {
    text: '"Parents love the real-time fee and attendance updates. It has drastically reduced phone calls to the office."',
    name: 'Sunita Sharma',
    role: 'Admin, St. Xavier\'s School',
    avatar: 'SS',
    color: 'border-l-emerald-500',
  },
  {
    text: '"The report card generation alone saved us 3 full days every exam cycle. Absolutely worth it."',
    name: 'Amit Kulkarni',
    role: 'Vice Principal, Modern High School',
    avatar: 'AK',
    color: 'border-l-violet-500',
  },
];

export function LandingPage() {
  return (
    <div className="bg-white">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse at center, rgb(37 99 235 / 0.07) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium">
              <Zap className="size-3.5 text-blue-600" />
              Trusted by 150+ schools across India
              <ChevronRight className="size-3.5" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-center text-4xl md:text-5xl lg:text-[56px] font-bold font-display leading-[1.1] text-ink-900 max-w-3xl mx-auto mb-5">
            The modern OS for{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Indian schools
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                <path d="M0 5 Q50 0 100 5 Q150 10 200 5" stroke="#2563EB" strokeWidth="2" fill="none" opacity="0.4" />
              </svg>
            </span>
          </h1>

          <p className="text-center text-base md:text-lg text-ink-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Replace spreadsheets, WhatsApp groups, and paper registers with one
            clean platform — students, attendance, marks, fees, and communication.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Button size="lg" variant="warm" asChild className="px-8 shadow-card-md">
              <Link to="/contact" className="flex items-center gap-2">
                Book a Free Demo <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/demo-school/admin/dashboard">
                Explore Live Demo
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-ink-400">
            {['No setup fees', 'Cancel anytime', 'Indian data residency', '14-day free trial'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="size-3.5 text-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Product mockup */}
        <div className="relative max-w-5xl mx-auto px-6 pb-0">
          <div className="relative bg-white rounded-2xl shadow-modal border border-ink-100 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-ink-50 border-b border-ink-100">
              <div className="size-3 rounded-full bg-rose-400" />
              <div className="size-3 rounded-full bg-amber-400" />
              <div className="size-3 rounded-full bg-emerald-400" />
              <div className="ml-2 flex-1 bg-white rounded-md px-3 py-1 text-[11px] text-ink-400 border border-ink-200 max-w-xs">
                app.veyora.com/demo-school/admin
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 p-4 bg-surface-page">
              {[
                { label: 'Students', val: '842', color: 'bg-blue-50 text-blue-700' },
                { label: 'Attendance', val: '94%', color: 'bg-emerald-50 text-emerald-700' },
                { label: 'Fees', val: '₹4.2L', color: 'bg-amber-50 text-amber-700' },
                { label: 'Pending', val: '3 TC', color: 'bg-rose-50 text-rose-700' },
              ].map((card) => (
                <div key={card.label} className="bg-white rounded-xl p-4 shadow-card border-l-4 border-l-blue-400 border border-ink-100">
                  <div className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${card.color} mb-2`}>
                    {card.label}
                  </div>
                  <p className="text-2xl font-bold text-ink-900 font-display">{card.val}</p>
                </div>
              ))}
              <div className="col-span-3 bg-white rounded-xl p-4 shadow-card border-l-4 border-l-emerald-400 border border-ink-100 h-28 flex flex-col justify-between">
                <p className="text-xs font-semibold text-ink-600">Recent Activity</p>
                <div className="space-y-1.5">
                  {['Attendance marked — Class 10-A', 'New student: Arjun Mehta', 'Fee reminder sent — 23 students'].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-blue-500 shrink-0" />
                      <p className="text-[11px] text-ink-500 truncate">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl p-4 h-28 flex flex-col justify-between">
                <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wide">Today</p>
                <div>
                  <p className="text-2xl font-bold text-white">Mon</p>
                  <p className="text-xs text-white/70">3 exams this week</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section className="border-y border-ink-100 bg-blue-50/40">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold font-display text-blue-700">{s.value}</p>
              <p className="text-sm text-ink-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-lg mb-12">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-ink-900 mb-4 leading-tight">
              Everything in one place, nothing wasted
            </h2>
            <p className="text-ink-500 leading-relaxed">
              Built for the realities of Indian schools — mobile-first, offline-tolerant, and designed so a teacher with a basic phone can use it on day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className={cn(
                  'group bg-white rounded-xl p-6 border border-ink-100 border-l-4 hover:shadow-card-md transition-all duration-200',
                  f.borderClass,
                )}
              >
                <div className={`inline-flex items-center justify-center size-11 rounded-xl mb-4 ${f.iconClass}`}>
                  <f.icon className="size-5" />
                </div>
                <h3 className="text-base font-bold text-ink-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {f.label}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 px-6 bg-blue-50/30 border-y border-ink-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} className="size-4 fill-amber-400 text-amber-400" />)}
            </div>
            <h2 className="text-3xl font-bold font-display text-ink-900 mb-2">Loved by school administrators</h2>
            <p className="text-ink-500 text-sm">Real feedback from principals and admins across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className={cn('bg-white rounded-xl p-6 shadow-card border border-ink-100 border-l-4', t.color)}
              >
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-ink-600 leading-relaxed mb-5 italic">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-ink-900 mb-3">
              Transparent, affordable pricing
            </h2>
            <p className="text-ink-500">14-day free trial on all plans. No credit card required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-2xl p-6 border-l-4 transition-all',
                  plan.popular
                    ? 'bg-blue-600 text-white shadow-card-lg border border-blue-600 border-l-sky-400 scale-[1.02]'
                    : 'bg-white border border-ink-200 border-l-blue-300 hover:border-l-blue-500 hover:shadow-card-md',
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-warm text-white text-xs font-bold px-3 py-1 rounded-full shadow-card whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                <h3 className={cn('text-lg font-bold font-display mb-1', plan.popular ? 'text-white' : 'text-ink-900')}>
                  {plan.name}
                </h3>
                <p className={cn('text-xs mb-4', plan.popular ? 'text-white/70' : 'text-ink-400')}>
                  {plan.students}
                </p>

                <div className="mb-5">
                  <span className={cn('text-4xl font-bold font-display', plan.popular ? 'text-white' : 'text-ink-900')}>
                    ₹{plan.price}
                  </span>
                  <span className={cn('text-sm ml-1', plan.popular ? 'text-white/60' : 'text-ink-400')}>/mo</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle className={cn('size-4 shrink-0 mt-0.5', plan.popular ? 'text-sky-300' : 'text-emerald-500')} />
                      <span className={cn('text-sm', plan.popular ? 'text-white/90' : 'text-ink-600')}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn('w-full', plan.popular ? 'bg-white text-blue-600 hover:bg-white/90 font-bold' : '')}
                  variant={plan.popular ? 'secondary' : 'outline'}
                  asChild
                >
                  <Link to="/contact">Get started free</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-700 to-sky-500 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="relative">
            <BarChart2 className="size-10 mx-auto mb-5 text-white/50" />
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
              Ready to transform your school's operations?
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Join 150+ schools already saving hours every week with {COMPANY.NAME}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90 font-bold px-8 shadow-card-md" asChild>
                <Link to="/contact">Book a Free Demo</Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/20" asChild>
                <Link to="/demo-school/admin/dashboard">
                  Explore Live Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
