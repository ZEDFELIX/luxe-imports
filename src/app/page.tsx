'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import { GlobalSearch } from '@/components/ui/GlobalSearch';
import { VehicleCard } from '@/components/ui/VehicleCard';
import { RecentlyViewedSection } from '@/components/ui/RecentlyViewedSection';
import { DEMO_VEHICLES, DEMO_AIRCRAFT, DEMO_MARINE } from '@/lib/constants';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';

const OFFER_DISCOUNT = 0.9;

const CATEGORIES = [
  {
    label: 'SUV',
    query: 'SUV',
    description: 'Commanding presence, uncompromising capability.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80&auto=format',
  },
  {
    label: 'Sedan',
    query: 'Sedan',
    description: 'Executive refinement for every journey.',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200&q=80&auto=format',
  },
  {
    label: 'Sports Car',
    query: 'Sports Car',
    description: 'Precision engineering, pure emotion.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format',
  },
];

const COLLECTIONS = [
  {
    title: 'Performance Icons',
    subtitle: 'The most coveted names in speed.',
    href: '/automotive?type=Sports+Car',
    makers: ['Porsche', 'McLaren', 'Ferrari', 'Lamborghini'],
    categories: [] as string[],
  },
  {
    title: 'Luxury SUVs',
    subtitle: 'Command every terrain in first class.',
    href: '/automotive?type=SUV',
    makers: ['Range Rover'],
    categories: ['Luxury SUVs'],
  },
  {
    title: 'Executive Collection',
    subtitle: 'Arrive with quiet authority.',
    href: '/automotive?type=Sedan',
    makers: ['Rolls-Royce', 'Bentley', 'Mercedes-Benz'],
    categories: [],
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discover', description: 'Tell us exactly what you want — or let us find it.' },
  { step: '02', title: 'Source', description: 'Our network locates the finest example worldwide.' },
  { step: '03', title: 'Verify', description: 'Independent inspection of condition and provenance.' },
  { step: '04', title: 'Import', description: 'Full customs, duties and compliance handled.' },
  { step: '05', title: 'Deliver', description: 'White-glove delivery to your doorstep.' },
];

const NETWORK = [
  { flag: '\u{1F1EF}\u{1F1F5}', name: 'Japan', note: 'Pristine domestic-market icons' },
  { flag: '\u{1F1E6}\u{1F1EA}', name: 'UAE', note: 'Desert-kept, low-mileage luxury' },
  { flag: '\u{1F1EC}\u{1F1E7}', name: 'United Kingdom', note: 'Home of the great marques' },
  { flag: '\u{1F1E9}\u{1F1EA}', name: 'Germany', note: 'Factory-fresh engineering' },
  { flag: '\u{1F1FA}\u{1F1F8}', name: 'USA', note: 'Rare limited editions' },
  { flag: '\u{1F1FF}\u{1F1E6}', name: 'South Africa', note: 'Homologation specials & classics' },
];

export default function HomePage() {
  const { currency } = useCurrency();

  const newArrivals = useMemo(
    () => [...DEMO_VEHICLES].sort((a, b) => b.year - a.year).slice(0, 4),
    []
  );

  const bestSellers = useMemo(
    () => DEMO_VEHICLES.filter((v) => v.featured).slice(0, 4),
    []
  );

  const collections = useMemo(
    () =>
      COLLECTIONS.map((collection) => {
        const isPrimary = (v: (typeof DEMO_VEHICLES)[number]) =>
          collection.makers.includes(v.manufacturer) ||
          collection.categories.includes(v.category);
        const primary = DEMO_VEHICLES.filter(isPrimary);
        const rest = DEMO_VEHICLES.filter((v) => !isPrimary(v));
        return { ...collection, vehicles: [...primary, ...rest].slice(0, 4) };
      }),
    []
  );

  const specialOffers = useMemo(() => [1, 4, 6].map((i) => DEMO_VEHICLES[i]), []);

  return (
    <div className="bg-dark">
      {/* 1. Compact Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80&auto=format"
          alt="Luxury vehicle at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/55 to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,8,8,0.6)_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/80 mb-4">
              Global Luxury. Delivered.
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.08] mb-4">
              Drive Something<br />
              <span className="text-gradient-gold">Exceptional.</span>
            </h1>
            <p className="text-muted/70 text-sm sm:text-base mb-8 max-w-md">
              Premium vehicles sourced globally and delivered with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/automotive"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 group"
              >
                Explore Vehicles
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/30 text-white text-[12px] font-medium tracking-[0.15em] uppercase hover:border-gold hover:text-gold transition-all duration-300"
              >
                Request a Vehicle
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Global Vehicle Search — overlapping hero */}
      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl gold-glow"
        >
          <GlobalSearch large />
        </motion.div>
      </section>

      {/* 3. Vehicle Categories */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-2">Browse</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">Vehicle Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.label}
                href={`/automotive?type=${encodeURIComponent(category.query)}`}
                className="group relative h-44 sm:h-52 overflow-hidden border border-border/20 editorial-hover block"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">
                      {category.label}
                    </h3>
                    <p className="text-[11px] text-muted/50 mt-1">{category.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-gold shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center gap-8 mt-6">
            <Link href="/aviation" className="text-[11px] tracking-[0.2em] uppercase text-muted/50 hover:text-gold transition-colors inline-flex items-center gap-2">
              Aviation <ArrowRight size={12} />
            </Link>
            <span className="w-px h-4 bg-border" />
            <Link href="/marine" className="text-[11px] tracking-[0.2em] uppercase text-muted/50 hover:text-gold transition-colors inline-flex items-center gap-2">
              Marine <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. New Arrivals */}
      <section className="py-14 sm:py-20 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-2">Just Landed</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">New Arrivals</h2>
            </div>
            <Link href="/automotive" className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted/50 hover:text-gold transition-colors">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((vehicle) => (
              <VehicleCard
                key={vehicle.slug}
                slug={vehicle.slug}
                title={vehicle.title}
                manufacturer={vehicle.manufacturer}
                year={vehicle.year}
                category={vehicle.category}
                priceUSD={vehicle.price}
                images={vehicle.images}
                location={vehicle.location}
                type="automotive"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Sellers */}
      <section className="py-14 sm:py-20 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-2">Client Favourites</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">Best Sellers</h2>
            </div>
            <Link href="/automotive" className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-muted/50 hover:text-gold transition-colors">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((vehicle) => (
              <VehicleCard
                key={vehicle.slug}
                slug={vehicle.slug}
                title={vehicle.title}
                manufacturer={vehicle.manufacturer}
                year={vehicle.year}
                category={vehicle.category}
                priceUSD={vehicle.price}
                images={vehicle.images}
                location={vehicle.location}
                type="automotive"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Collections */}
      <section className="py-14 sm:py-20 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {collections.map((collection) => (
            <div key={collection.title}>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">{collection.title}</h2>
                  <p className="text-xs text-muted/50 mt-1">{collection.subtitle}</p>
                </div>
                <Link href={collection.href} className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors">
                  View All <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {collection.vehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.slug}
                    slug={vehicle.slug}
                    title={vehicle.title}
                    manufacturer={vehicle.manufacturer}
                    year={vehicle.year}
                    category={vehicle.category}
                    priceUSD={vehicle.price}
                    images={vehicle.images}
                    location={vehicle.location}
                    type="automotive"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Special Offers */}
      <section className="py-14 sm:py-20 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-2">Limited Time</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">Special Offers</h2>
            <p className="text-xs text-muted/50 mt-2">Preferential pricing on selected inventory — while available.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {specialOffers.map((vehicle) => (
              <div key={vehicle.slug}>
                <VehicleCard
                  slug={vehicle.slug}
                  title={vehicle.title}
                  manufacturer={vehicle.manufacturer}
                  year={vehicle.year}
                  category={vehicle.category}
                  priceUSD={Math.round(vehicle.price * OFFER_DISCOUNT)}
                  images={vehicle.images}
                  location={vehicle.location}
                  type="automotive"
                  badge="Special Offer"
                />
                <p className="mt-2 text-right text-[10px] text-muted/40 pr-1">
                  Was <span className="line-through">{getPriceInCurrency(vehicle.price, currency)}</span>
                  {' \u00B7 '}
                  <span className="text-gold">{Math.round((1 - OFFER_DISCOUNT) * 100)}% off</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Our Process */}
      <section className="py-14 sm:py-20 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-2">How It Works</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">Our Process</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="border-t border-border/30 pt-4 relative">
                <span className="absolute -top-px left-0 w-8 h-px bg-gold" />
                <p className="font-serif text-2xl text-gradient-gold mb-2">{step.step}</p>
                <h3 className="text-sm text-white tracking-wide mb-1">{step.title}</h3>
                <p className="text-[11px] text-muted/50 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Our Global Network */}
      <section className="py-14 sm:py-20 border-t border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-2 inline-flex items-center gap-2">
                <Globe size={12} /> Worldwide Reach
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">Our Global Network</h2>
              <p className="text-sm text-muted/60 mt-2 max-w-lg">
                Connecting you to exceptional vehicles worldwide through trusted partners on six continents.
              </p>
            </div>
            <div className="flex gap-8 text-right">
              <div>
                <p className="font-serif text-2xl text-gold">{DEMO_AIRCRAFT.length}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted/40">Aircraft</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-gold">{DEMO_MARINE.length}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted/40">Yachts</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {NETWORK.map((country) => (
              <div
                key={country.name}
                className="bg-dark-card border border-border/20 p-5 editorial-hover hover:border-gold/30 text-center sm:text-left"
              >
                <p className="text-2xl mb-2">{country.flag}</p>
                <h3 className="text-sm text-white mb-1">{country.name}</h3>
                <p className="text-[10px] text-muted/50 leading-relaxed">{country.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Recently Viewed */}
      <RecentlyViewedSection />
    </div>
  );
}
