import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone } from 'lucide-react';
import { COMPANY } from '@/config/constants';

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-400">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
                <GraduationCap className="size-4 text-white" />
              </div>
              <span className="font-display font-bold text-white text-base">Veyora</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              {COMPANY.TAGLINE}. Built for Indian schools, priced for Indian budgets.
            </p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${COMPANY.EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="size-3.5 shrink-0" /> {COMPANY.EMAIL}
              </a>
              {COMPANY.CONTACT_PHONES.map((p) => (
                <a key={p} href={`tel:${p}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="size-3.5 shrink-0" /> +91 {p}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Product</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Features', href: '/#features' },
                { label: 'Pricing', href: '/#pricing' },
                { label: 'Live Demo', href: '/demo-school/admin/dashboard' },
                { label: 'About', href: '/about' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Support</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Help Center', href: '/contact' },
                { label: 'Sign In', href: '/login' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${COMPANY.SUPPORT_EMAIL}`} className="hover:text-white transition-colors">
                  {COMPANY.SUPPORT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} {COMPANY.NAME}. All rights reserved.</p>
          <p className="text-ink-500">Made with ♥ in India, for Indian schools</p>
        </div>
      </div>
    </footer>
  );
}
