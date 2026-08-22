'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Camera, Search, SlidersHorizontal, X } from 'lucide-react';
import { DEMO_VEHICLES, MANUFACTURERS, VEHICLE_CATEGORIES, COUNTRIES } from '@/lib/constants';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency, convertPrice } from '@/lib/currency';

export default function AutomotivePage() {
  const { currency } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    manufacturer: '',
    category: '',
    yearFrom: '',
    yearTo: '',
    priceMin: '',
    priceMax: '',
    country: '',
  });

  const filtered = DEMO_VEHICLES.filter((v) => {
    if (searchQuery && !v.title.toLowerCase().includes(searchQuery.toLowerCase()) && !v.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.manufacturer && v.manufacturer !== filters.manufacturer) return false;
    if (filters.category && v.category !== filters.category) return false;
    if (filters.country && v.origin_country !== filters.country) return false;
    if (filters.yearFrom && v.year < parseInt(filters.yearFrom)) return false;
    if (filters.yearTo && v.year > parseInt(filters.yearTo)) return false;
    if (filters.priceMin) {
      const minInCurrency = parseFloat(filters.priceMin);
      const priceInCurrency = convertPrice(v.price, currency);
      if (priceInCurrency < minInCurrency) return false;
    }
    if (filters.priceMax) {
      const maxInCurrency = parseFloat(filters.priceMax);
      const priceInCurrency = convertPrice(v.price, currency);
      if (priceInCurrency > maxInCurrency) return false;
    }
    return true;
  });

  const hasFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(200,169,107,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">
              Automotive Division
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-4">
              The World&apos;s Finest<br />
              <span className="text-gradient-gold">Automobiles</span>
            </h1>
            <p className="text-muted/60 text-sm sm:text-base max-w-lg">
              From supercars to executive sedans, we source and deliver the most desirable vehicles from manufacturers across the globe.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="luxury-divider" />

      {/* Search & Filters */}
      <section className="py-6 sm:py-8 border-b border-border/20 sticky top-16 sm:top-20 z-30 bg-dark/95 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by manufacturer or model..."
                className="w-full bg-dark-card border border-border/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border text-[11px] tracking-[0.1em] uppercase transition-all ${
                showFilters || hasFilters
                  ? 'border-gold/40 text-gold bg-gold/5'
                  : 'border-border/30 text-muted/60 hover:text-white'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              <select
                value={filters.manufacturer}
                onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })}
                className="bg-dark-card border border-border/30 px-3 py-2.5 text-xs text-white focus:border-gold/50 focus:outline-none appearance-none"
              >
                <option value="">All Manufacturers</option>
                {MANUFACTURERS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="bg-dark-card border border-border/30 px-3 py-2.5 text-xs text-white focus:border-gold/50 focus:outline-none appearance-none"
              >
                <option value="">All Categories</option>
                {VEHICLE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="bg-dark-card border border-border/30 px-3 py-2.5 text-xs text-white focus:border-gold/50 focus:outline-none appearance-none"
              >
                <option value="">All Countries</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="text"
                value={filters.yearFrom}
                onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value })}
                placeholder="Year from"
                className="bg-dark-card border border-border/30 px-3 py-2.5 text-xs text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none"
              />
              <input
                type="text"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                placeholder={`Max price (${currency})`}
                className="bg-dark-card border border-border/30 px-3 py-2.5 text-xs text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none"
              />
              {hasFilters && (
                <button
                  onClick={() => setFilters({ manufacturer: '', category: '', yearFrom: '', yearTo: '', priceMin: '', priceMax: '', country: '' })}
                  className="flex items-center gap-1 text-xs text-muted/50 hover:text-gold transition-colors"
                >
                  <X size={12} /> Clear
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted/40 mb-8">
            {filtered.length} {filtered.length === 1 ? 'vehicle' : 'vehicles'} available
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((vehicle, index) => (
              <motion.div
                key={vehicle.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/automotive/${vehicle.slug}`}
                  className="group block bg-dark-card border border-border/20 overflow-hidden editorial-hover"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    {vehicle.images[0] ? (
                      <Image
                        src={vehicle.images[0]}
                        alt={vehicle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-dark-card to-dark" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.04),transparent)]" />
                        <p className="absolute inset-0 flex items-center justify-center font-serif text-xl text-white/15">{vehicle.manufacturer}</p>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 text-[10px] text-white/80 z-10">
                      <Camera size={10} /> {vehicle.images?.length || 0} Photos
                    </div>
                    {vehicle.featured && (
                      <span className="absolute top-3 left-3 px-2 py-1 text-[9px] tracking-[0.15em] uppercase bg-gold/20 text-gold border border-gold/30 z-10">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-gold/50 mb-2">{vehicle.category}</p>
                    <h3 className="font-serif text-lg text-white mb-1 group-hover:text-gold transition-colors">
                      {vehicle.title}
                    </h3>
                    <p className="text-xs text-muted/50 mb-4">{vehicle.year} • {vehicle.engine}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/20">
                      <div className="flex items-center gap-1.5 text-muted/40">
                        <MapPin size={12} />
                        <span className="text-[10px]">{vehicle.location}</span>
                      </div>
                      <span className="text-sm text-gold">{getPriceInCurrency(vehicle.price, currency)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
