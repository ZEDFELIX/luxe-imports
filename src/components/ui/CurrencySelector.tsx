'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { CURRENCIES, type Currency } from '@/lib/currency';
import { useCurrency } from '@/lib/currency-context';
import { cn } from '@/lib/utils';

export function CurrencySelector({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = CURRENCIES.find(c => c.code === currency)!;

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-[0.1em] uppercase border border-border/30 text-muted/70 hover:text-white hover:border-gold/40 transition-all"
      >
        {current.code}
        <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-dark-card border border-border/30 shadow-2xl z-50 min-w-[160px]">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors',
                currency === c.code ? 'text-gold bg-gold/5' : 'text-muted/70 hover:text-white hover:bg-white/5'
              )}
            >
              <span>{c.code}</span>
              <span className="text-[10px] text-muted/40">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
