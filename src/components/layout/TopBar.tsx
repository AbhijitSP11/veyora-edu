import { Bell, Search, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getInitials } from '@/lib/utils';
import { useTenant } from '@/hooks/useTenant';

export function TopBar() {
  const { user } = useAuth();
  const { schoolSlug } = useTenant();

  return (
    <header className="h-[60px] bg-white border-b border-ink-100 flex items-center justify-between px-5 shrink-0">
      {/* Search */}
      <div className="relative hidden md:flex items-center w-72">
        <Search className="absolute left-3 size-3.5 text-ink-400" />
        <input
          type="text"
          placeholder="Search students, classes..."
          className="w-full pl-9 pr-4 h-8 text-sm rounded-lg bg-ink-50 border border-transparent text-ink-700 placeholder:text-ink-400 focus:bg-white focus:border-ink-200 focus:ring-2 focus:ring-primary/10 outline-none transition-all"
        />
        <kbd className="absolute right-3 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-ink-200 bg-white px-1.5 font-mono text-[10px] text-ink-400">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Quick add */}
        <button className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover transition-colors">
          <Plus className="size-3.5" />
          <span className="hidden sm:inline">New</span>
        </button>

        {/* Notifications */}
        <button className="relative flex items-center justify-center size-8 rounded-lg text-ink-500 hover:bg-ink-50 hover:text-ink-900 transition-colors">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent-coral ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-ink-200" />

        {/* User */}
        {user && (
          <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-ink-50 transition-colors">
            <div className="size-7 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-[11px] font-bold">
              {getInitials(user.name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-ink-900 leading-tight">{user.name.split(' ')[0]}</p>
              <p className="text-[10px] text-ink-400 leading-tight capitalize">{schoolSlug}</p>
            </div>
          </button>
        )}
      </div>
    </header>
  );
}
