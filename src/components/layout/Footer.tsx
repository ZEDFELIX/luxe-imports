import Link from 'next/link';
import { NAVIGATION, SITE_CONFIG } from '@/lib/constants';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  divisions: [
    { label: 'Automotive', href: '/automotive' },
    { label: 'Aviation', href: '/aviation' },
    { label: 'Marine', href: '/marine' },
  ],
  support: [
    { label: 'Client Portal', href: '/portal' },
    { label: 'Track Request', href: '/portal/requests' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark-alt border-t border-border/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 py-16 sm:py-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="font-serif text-xl font-semibold tracking-[0.15em] text-white">
                LUXE
              </span>
              <span className="w-6 h-px bg-gold" />
              <span className="font-serif text-xl font-light tracking-[0.15em] text-gold">
                IMPORTS
              </span>
            </Link>
            <p className="text-sm text-muted/70 leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs text-muted/50 uppercase tracking-widest">
              <span>Road</span>
              <span className="text-gold">→</span>
              <span>Sky</span>
              <span className="text-gold">→</span>
              <span>Sea</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-6">
              Divisions
            </h3>
            <ul className="space-y-3">
              {footerLinks.divisions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted/70 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="luxury-divider" />
        <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/40 tracking-wider">
            © {new Date().getFullYear()} Luxe Imports. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted/30">
              {SITE_CONFIG.email}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
