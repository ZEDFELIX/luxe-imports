import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

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
    <footer className="bg-dark-alt border-t border-border/20">
      <div className="gold-hairline" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 py-16 sm:py-20">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-white">
                LUXE
              </span>
              <span className="w-8 h-px bg-gold/60 group-hover:w-12 transition-all duration-500" />
              <span className="font-serif text-xl font-light tracking-[0.2em] text-gold">
                IMPORTS
              </span>
            </Link>
            <p className="text-sm text-muted/60 leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex items-center gap-4 text-[10px] text-muted/35 uppercase tracking-[0.3em]">
              <span>Road</span>
              <span className="text-gold/50">—</span>
              <span>Sky</span>
              <span className="text-gold/50">—</span>
              <span>Sea</span>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted/60 hover:text-white hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-6">
              Divisions
            </h3>
            <ul className="space-y-3">
              {footerLinks.divisions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted/60 hover:text-white hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted/60 hover:text-white hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="luxury-divider" />
        <div className="py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted/30 tracking-[0.15em]">
            &copy; {new Date().getFullYear()} Luxe Imports. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted/25">
              {SITE_CONFIG.email}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}