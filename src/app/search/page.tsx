'use client';

import { Suspense, useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { VehicleCard } from '@/components/ui/VehicleCard';
import { DEMO_VEHICLES, DEMO_AIRCRAFT, DEMO_MARINE } from '@/lib/constants';

type Listing = {
  slug: string;
  title: string;
  manufacturer: string;
  model: string;
  year: number;
  category: string;
  priceUSD: number;
  images: string[];
  location: string;
  type: 'automotive' | 'aviation' | 'marine';
};

const ALL_LISTINGS: Listing[] = [
  ...DEMO_VEHICLES.map((v) => ({
    slug: v.slug,
    title: v.title,
    manufacturer: v.manufacturer,
    model: v.model,
    year: v.year,
    category: v.category,
    priceUSD: v.price,
    images: v.images,
    location: v.location,
    type: 'automotive' as const,
  })),
  ...DEMO_AIRCRAFT.map((a) => ({
    slug: a.slug,
    title: a.title,
    manufacturer: a.manufacturer,
    model: a.model,
    year: a.year,
    category: a.category,
    priceUSD: a.price,
    images: a.images,
    location: a.location,
    type: 'aviation' as const,
  })),
  ...DEMO_MARINE.map((m) => ({
    slug: m.slug,
    title: m.title,
    manufacturer: m.builder,
    model: m.model,
    year: m.year,
    category: m.category,
    priceUSD: m.price,
    images: m.images,
    location: m.location,
    type: 'marine' as const,
  })),
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync controlled input with URL query changes
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_LISTINGS;
    return ALL_LISTINGS.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.manufacturer.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      <section className="relative py-10 sm:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(200,169,107,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-3">Search</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-white mb-6">
            Find Your Next <span className="text-gradient-gold">Exceptional Asset</span>
          </h1>
          <div className="max-w-2xl relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by make, model or category..."
              autoFocus
              className="w-full bg-dark-card border border-border/30 pl-12 pr-12 py-4 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/40 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted/40 mb-8">
            {results.length} {results.length === 1 ? 'result' : 'results'}
            {query.trim() && <> for &ldquo;{query.trim()}&rdquo;</>}
          </p>

          {results.length === 0 ? (
            <div className="py-20 text-center">
              <Search size={32} className="mx-auto text-muted/20 mb-6" />
              <h2 className="font-serif text-2xl text-white mb-3">No results found</h2>
              <p className="text-sm text-muted/50 max-w-md mx-auto mb-8">
                We couldn&apos;t find anything matching &ldquo;{query.trim()}&rdquo;. Try different
                keywords — such as a manufacturer (Porsche), a model (GT3 RS) or a category
                (Supercars).
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['Rolls-Royce', 'Ferrari', 'SUV', 'Yacht'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-4 py-2 border border-border/30 text-[11px] tracking-[0.15em] uppercase text-muted/60 hover:border-gold/40 hover:text-gold transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center mt-10 px-7 py-3.5 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all"
              >
                Request a Vehicle Instead
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {results.map((listing) => (
                <VehicleCard
                  key={listing.slug}
                  slug={listing.slug}
                  title={listing.title}
                  manufacturer={listing.manufacturer}
                  year={listing.year}
                  category={listing.category}
                  priceUSD={listing.priceUSD}
                  images={listing.images}
                  location={listing.location}
                  type={listing.type}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-20 sm:pt-24 bg-dark min-h-screen flex items-center justify-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted/40">Loading search…</p>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
