'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, X, ArrowRight } from 'lucide-react';
import { DEMO_VEHICLES } from '@/lib/constants';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';
import Image from 'next/image';
import Link from 'next/link';

export default function ComparePage() {
  const { currency } = useCurrency();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (slug: string) => {
    setSelected(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  };

  const vehicles = useMemo(() => DEMO_VEHICLES.filter(v => selected.includes(v.slug)), [selected]);

  const specs = [
    { label: 'Price', get: (v: typeof DEMO_VEHICLES[0]) => getPriceInCurrency(v.price, currency) },
    { label: 'Year', get: (v: typeof DEMO_VEHICLES[0]) => String(v.year) },
    { label: 'Category', get: (v: typeof DEMO_VEHICLES[0]) => v.category },
    { label: 'Engine', get: (v: typeof DEMO_VEHICLES[0]) => v.engine || '—' },
    { label: 'Transmission', get: (v: typeof DEMO_VEHICLES[0]) => v.transmission || '—' },
    { label: 'Fuel Type', get: (v: typeof DEMO_VEHICLES[0]) => v.fuel_type || '—' },
    { label: 'Mileage', get: (v: typeof DEMO_VEHICLES[0]) => v.mileage ? `${v.mileage.toLocaleString()} km` : '—' },
    { label: 'Color', get: (v: typeof DEMO_VEHICLES[0]) => v.color || '—' },
    { label: 'Location', get: (v: typeof DEMO_VEHICLES[0]) => v.location },
    { label: 'Condition', get: (v: typeof DEMO_VEHICLES[0]) => v.condition || '—' },
  ];

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen pb-24 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-2">Compare</p>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-2">Vehicle Comparison</h1>
          <p className="text-xs text-muted/50">Select up to 4 vehicles to compare side by side.</p>
        </div>

        {/* Vehicle Selector */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {DEMO_VEHICLES.map(v => {
            const isSelected = selected.includes(v.slug);
            return (
              <button key={v.slug} onClick={() => toggle(v.slug)}
                className={`flex items-center gap-2 p-2.5 text-left text-xs border transition-all ${
                  isSelected ? 'border-gold/50 bg-gold/5 text-gold' : 'border-border/20 bg-dark-card text-muted/60 hover:border-border/40'
                }`}>
                {isSelected ? <Check size={12} className="text-gold shrink-0" /> : <Plus size={12} className="text-muted/30 shrink-0" />}
                <span className="truncate">{v.title}</span>
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        {vehicles.length >= 2 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="w-[140px] sm:w-[180px] p-3 text-left text-[10px] tracking-[0.15em] uppercase text-muted/40 border-b border-border/20" />
                  {vehicles.map(v => (
                    <th key={v.slug} className="p-3 text-center border-b border-border/20">
                      <Link href={`/automotive/${v.slug}`} className="block group">
                        <div className="w-full aspect-[4/3] relative overflow-hidden mb-2 mx-auto max-w-[160px]">
                          {v.images[0] && <Image src={v.images[0]} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="160px" />}
                        </div>
                        <p className="text-xs text-white group-hover:text-gold transition-colors font-serif">{v.title}</p>
                        <p className="text-[9px] text-muted/40">{v.year}</p>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, i) => (
                  <tr key={spec.label} className={i % 2 === 0 ? 'bg-dark-card/30' : ''}>
                    <td className="p-3 text-[11px] text-muted/50 border-b border-border/10">{spec.label}</td>
                    {vehicles.map(v => (
                      <td key={v.slug} className="p-3 text-center text-xs text-white border-b border-border/10">
                        {spec.get(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-sm text-muted/40">Select at least 2 vehicles to compare.</p>
          </div>
        )}
      </div>
    </div>
  );
}
