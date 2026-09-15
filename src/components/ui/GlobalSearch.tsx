'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { DEMO_VEHICLES, DEMO_AIRCRAFT, DEMO_MARINE } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface Suggestion {
  title: string;
  subtitle: string;
  href: string;
  type: string;
}

export function GlobalSearch({ className, large }: { className?: string; large?: boolean }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const allItems: Suggestion[] = useMemo(() => [
    ...DEMO_VEHICLES.map(v => ({ title: v.title, subtitle: `${v.manufacturer} • ${v.year} • ${v.category}`, href: `/automotive/${v.slug}`, type: 'Car' })),
    ...DEMO_AIRCRAFT.map(a => ({ title: a.title, subtitle: `${a.manufacturer} • ${a.year}`, href: `/aviation/${a.slug}`, type: 'Aircraft' })),
    ...DEMO_MARINE.map(m => ({ title: m.title, subtitle: `${m.builder} • ${m.year}`, href: `/marine/${m.slug}`, type: 'Yacht' })),
  ], []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allItems.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, allItems]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showDropdown = focused && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      <div className={cn(
        'flex items-center border transition-all',
        large
          ? 'gap-3 px-5 py-4 bg-dark-card border-border/30 focus-within:border-gold/50 focus-within:gold-glow'
          : 'gap-2 px-3 py-2.5 bg-dark-card border-border/30 focus-within:border-gold/50'
      )}>
        <Search size={large ? 18 : 16} className="text-gold/40 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search by make, model, trim..."
          className={cn(
            'flex-1 bg-transparent text-white placeholder:text-muted/30 focus:outline-none',
            large ? 'text-sm' : 'text-xs'
          )}
        />
        {query && (
          <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="text-muted/40 hover:text-white">
            <X size={14} />
          </button>
        )}
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          className={cn(
            'shrink-0 bg-gold text-dark font-semibold tracking-[0.1em] uppercase hover:bg-champagne transition-all flex items-center gap-1',
            large ? 'px-5 py-2 text-[11px]' : 'px-3 py-1.5 text-[10px]'
          )}
        >
          Search
        </Link>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-dark-card border border-border/30 shadow-2xl z-50 max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-xs text-muted/40">No vehicles found for &ldquo;{query}&rdquo;</p>
              <Link href={`/search?q=${encodeURIComponent(query)}`} className="text-[11px] text-gold mt-2 inline-flex items-center gap-1 hover:text-champagne">
                View all results <ArrowRight size={10} />
              </Link>
            </div>
          ) : (
            <>
              <p className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase text-muted/30 border-b border-border/10 font-medium">
                Results
              </p>
              {results.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => { setQuery(''); setFocused(false); }}
                  className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.03] hover:border-l-2 hover:border-gold transition-colors border-b border-l-2 border-l-transparent border-border/10 last:border-0"
                >
                  <div>
                    <p className="text-xs text-white">{item.title}</p>
                    <p className="text-[10px] text-muted/40">{item.subtitle}</p>
                  </div>
                  <span className="text-[9px] tracking-[0.1em] uppercase text-gold/50 px-2 py-0.5 border border-gold/20">{item.type}</span>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => { setFocused(false); }}
                className="flex items-center justify-center gap-1 py-3 text-[11px] text-gold hover:text-champagne transition-colors border-t border-border/20"
              >
                View all results <ArrowRight size={10} />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
