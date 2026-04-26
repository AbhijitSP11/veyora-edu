import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Topbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-ink-100/60">
        <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
              <GraduationCap className="size-4 text-white" />
            </div>
            <span className="font-display font-bold text-ink-900 text-base">Veyora</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary-light text-primary'
                    : 'text-ink-500 hover:text-ink-900 hover:bg-ink-50',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <Button variant="secondary" size="sm" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
            <Button size="sm" variant="warm" asChild>
              <Link to="/contact" className="flex items-center gap-1.5">
                Get Demo <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-ink-50 text-ink-700 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-ink-100 bg-white px-5 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Button variant="secondary" asChild size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" variant="warm">
                <Link to="/contact">Get Free Demo</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
