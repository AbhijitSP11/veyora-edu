import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, Bell, ClipboardList, BookOpen, FileText,
  CreditCard, BarChart3, Settings, LogOut, PanelLeftClose, PanelLeft,
  GraduationCap, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { getInitials } from '@/lib/utils';

const NAV_GROUPS = {
  admin: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: 'dashboard' },
      ],
    },
    {
      label: 'Academic',
      items: [
        { label: 'Students', icon: Users, href: 'students' },
        { label: 'Attendance', icon: ClipboardList, href: 'attendance' },
        { label: 'Marks', icon: BookOpen, href: 'marks' },
        { label: 'Report Cards', icon: FileText, href: 'report-cards' },
      ],
    },
    {
      label: 'Finance & Comms',
      items: [
        { label: 'Fees', icon: CreditCard, href: 'fees' },
        { label: 'Notifications', icon: Bell, href: 'notifications' },
        { label: 'Reports', icon: BarChart3, href: 'reports' },
      ],
    },
    {
      label: 'System',
      items: [
        { label: 'Settings', icon: Settings, href: 'settings' },
      ],
    },
  ],
  student: [
    {
      label: '',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: 'dashboard' },
        { label: 'My Profile', icon: Users, href: 'profile' },
        { label: 'Attendance', icon: ClipboardList, href: 'attendance' },
        { label: 'My Marks', icon: BookOpen, href: 'marks' },
        { label: 'Documents', icon: FileText, href: 'documents' },
        { label: 'Fees', icon: CreditCard, href: 'fees' },
        { label: 'Notifications', icon: Bell, href: 'notifications' },
      ],
    },
  ],
};

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user, logout } = useAuth();
  const { schoolSlug } = useTenant();

  const isStudent = user?.role === 'STUDENT';
  const groups = isStudent ? NAV_GROUPS.student : NAV_GROUPS.admin;
  const basePath = isStudent ? `/${schoolSlug}/student` : `/${schoolSlug}/admin`;

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-white border-r border-ink-100 transition-all duration-300 ease-in-out shrink-0',
        sidebarCollapsed ? 'w-[60px]' : 'w-60',
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center h-[60px] border-b border-ink-100 shrink-0 px-3',
        sidebarCollapsed ? 'justify-center' : 'gap-2.5 justify-between',
      )}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary shrink-0">
            <GraduationCap className="size-4 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink-900 leading-tight truncate">Veyora</p>
              <p className="text-[10px] text-ink-400 leading-tight truncate capitalize">
                {user?.role?.toLowerCase().replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors shrink-0"
          >
            <PanelLeftClose className="size-4" />
          </button>
        )}
        {sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="absolute left-0 right-0 mx-auto mt-1 p-1.5 rounded-md text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors hidden"
          />
        )}
      </div>

      {sidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center py-2 text-ink-400 hover:text-ink-700 hover:bg-ink-50 transition-colors mx-2 rounded-md mt-1"
        >
          <PanelLeft className="size-4" />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {groups.map((group, gi) => (
          <div key={gi} className={cn(!sidebarCollapsed && group.label ? 'mb-1' : 'mb-0')}>
            {!sidebarCollapsed && group.label && (
              <p className="px-4 pt-3 pb-1 text-[10px] font-semibold text-ink-400 uppercase tracking-widest">
                {group.label}
              </p>
            )}
            {sidebarCollapsed && group.label && gi > 0 && (
              <div className="mx-3 my-2 h-px bg-ink-100" />
            )}
            <div className="space-y-0.5 px-2">
              {group.items.map((item) => (
                <NavLink
                  key={item.href}
                  to={`${basePath}/${item.href}`}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 rounded-lg transition-all duration-150 group relative',
                      sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2',
                      isActive
                        ? 'bg-primary-light text-primary font-semibold'
                        : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && !sidebarCollapsed && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
                      )}
                      <item.icon className={cn('size-4 shrink-0', isActive ? 'text-primary' : 'text-ink-400 group-hover:text-ink-700')} />
                      {!sidebarCollapsed && (
                        <span className="text-sm truncate">{item.label}</span>
                      )}
                      {sidebarCollapsed && (
                        <span className="absolute left-full ml-2 px-2 py-1 bg-ink-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-ink-100 p-2 shrink-0">
        {!sidebarCollapsed && user && (
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1 rounded-lg hover:bg-ink-50 cursor-default">
            <div className="size-7 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink-900 truncate leading-tight">{user.name}</p>
              <p className="text-[10px] text-ink-400 truncate capitalize">{user.email}</p>
            </div>
            <ChevronRight className="size-3 text-ink-300 shrink-0" />
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            'w-full flex items-center gap-2.5 rounded-lg text-ink-500 hover:bg-rose-50 hover:text-rose-600 transition-colors',
            sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2',
          )}
        >
          <LogOut className="size-4 shrink-0" />
          {!sidebarCollapsed && <span className="text-sm">Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
