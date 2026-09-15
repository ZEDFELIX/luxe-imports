'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAVIGATION } from '@/lib/constants';
import { CurrencySelector } from '@/components/ui/CurrencySelector';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile menu on navigation
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gradient-to-r from-gold/0 via-gold/70 to-gold/0" aria-hidden />
      <header
        className={cn(
          'fixed top-[3px] left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-dark/92 backdrop-blur-xl border-b border-border/40'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-[72px] items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-white">
                LUXE
              </span>
              <span className="w-8 h-px bg-gold/60 group-hover:w-12 group-hover:bg-gold transition-all duration-500" />
              <span className="font-serif text-lg sm:text-xl font-light tracking-[0.2em] text-gold">
                IMPORTS
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-10">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative py-2 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 hover:text-gold',
                    pathname === item.href ? 'text-gold' : 'text-muted/70'
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-5">
              <CurrencySelector />
              <Link
                href="/contact"
                className="hidden lg:block px-6 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase border border-gold/40 text-gold hover:bg-gold hover:text-dark transition-all duration-300"
              >
                Private Client
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[55] bg-dark/98 backdrop-blur-2xl transition-all duration-500 lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col h-full pt-24 sm:pt-28 px-6 sm:px-10">
          <div className="flex-1 flex flex-col justify-center">
            <nav className="space-y-0">
              {NAVIGATION.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between py-5 text-xl sm:text-2xl font-serif transition-all duration-300 group',
                    pathname === item.href ? 'text-gold' : 'text-white/70 hover:text-gold',
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="tracking-[0.05em]">{item.label}</span>
                  <ChevronRight
                    size={16}
                    className="text-gold/0 group-hover:text-gold/60 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                  />
                </Link>
              ))}
            </nav>

            <div className="mt-12 sm:mt-14 pt-8 border-t border-border/20 space-y-4">
              <Link
                href="/contact"
                className="block w-full text-center py-4 text-[11px] font-medium tracking-[0.2em] uppercase bg-gold text-dark hover:bg-gold-light transition-colors"
              >
                Private Client Inquiry
              </Link>
              <Link
                href="/portal"
                className="block w-full text-center py-4 text-[11px] font-medium tracking-[0.2em] uppercase border border-border/30 text-muted hover:text-white hover:border-gold/40 transition-all"
              >
                Client Portal
              </Link>
            </div>
          </div>

          <div className="pb-8 sm:pb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted/35">
              Global Luxury. Delivered.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}