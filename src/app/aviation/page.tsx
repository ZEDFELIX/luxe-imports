'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { DEMO_AIRCRAFT, AIRCRAFT_CATEGORIES, AIRCRAFT_MANUFACTURERS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function AviationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');

  const filtered = DEMO_AIRCRAFT.filter((a) => {
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase()) && !a.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeCategory && a.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(200,169,107,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Aviation Division</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-4">
              Private Aviation<br /><span className="text-gradient-gold">Acquisition</span>
            </h1>
            <p className="text-muted/60 text-sm sm:text-base max-w-lg">
              From light jets to ultra-long-range flagships, we source private aircraft from manufacturers and operators worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="luxury-divider" />

      <section className="py-6 sm:py-8 border-b border-border/20 sticky top-16 sm:top-20 z-30 bg-dark/95 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by manufacturer or model..."
                className="w-full bg-dark-card border border-border/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
            </div>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            <button onClick={() => setActiveCategory('')}
              className={`shrink-0 px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all ${!activeCategory ? 'border-gold/40 text-gold bg-gold/5' : 'border-border/30 text-muted/50 hover:text-white'}`}>
              All
            </button>
            {AIRCRAFT_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all ${activeCategory === cat ? 'border-gold/40 text-gold bg-gold/5' : 'border-border/30 text-muted/50 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted/40 mb-8">
            {filtered.length} {filtered.length === 1 ? 'aircraft' : 'aircraft'} available
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((aircraft, index) => (
              <motion.div key={aircraft.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <Link href={`/aviation/${aircraft.slug}`}
                  className="group block bg-dark-card border border-border/20 overflow-hidden editorial-hover">
                  <div className="aspect-[16/10] relative overflow-hidden">
                    {aircraft.images[0] ? (
                      <Image
                        src={aircraft.images[0]}
                        alt={aircraft.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-dark-card to-dark" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.04),transparent)]" />
                        <p className="absolute inset-0 flex items-center justify-center font-serif text-xl text-white/15">{aircraft.manufacturer}</p>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-gold/50 mb-2">{aircraft.category}</p>
                    <h3 className="font-serif text-lg text-white mb-1 group-hover:text-gold transition-colors">{aircraft.title}</h3>
                    <p className="text-xs text-muted/50 mb-4">{aircraft.year} • {aircraft.passengers} passengers • {aircraft.range_nm ? `${aircraft.range_nm.toLocaleString()} nm range` : ''}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/20">
                      <div className="flex items-center gap-1.5 text-muted/40">
                        <MapPin size={12} /><span className="text-[10px]">{aircraft.location}</span>
                      </div>
                      <span className="text-sm text-gold">{formatCurrency(aircraft.price)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-dark-alt">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Need Something Specific?</p>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-white mb-4">Request Aircraft Sourcing</h2>
          <p className="text-muted/60 text-sm mb-8">Our aviation specialists can locate any aircraft type from operators and dealers worldwide.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
            Request Aircraft Sourcing
          </Link>
        </div>
      </section>
    </div>
  );
}
