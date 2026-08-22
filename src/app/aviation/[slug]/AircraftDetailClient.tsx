'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Camera, ArrowRight, ChevronRight } from 'lucide-react';
import { ImageGallery } from '@/components/gallery';
import { RelatedListings } from '@/components/listings';
import { DEMO_AIRCRAFT } from '@/lib/constants';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useRecentlyViewed } from '@/lib/recently-viewed';
import { useEffect } from 'react';

interface Aircraft {
  slug: string;
  title: string;
  description?: string;
  manufacturer: string;
  model: string;
  year: number;
  category: string;
  price: number;
  currency: string;
  range_nm?: number;
  passengers?: number;
  crew?: number;
  engine_type?: string;
  engine_count?: number;
  origin_country: string;
  location: string;
  condition?: string;
  serial_number?: string;
  specifications?: { [key: string]: string };
  estimated_shipping?: number;
  images: string[];
}

export function AircraftDetailClient({ aircraft }: { aircraft: Aircraft }) {
  const { currency } = useCurrency();
  const { addItem } = useRecentlyViewed();
  const photoCount = aircraft.images?.length || 0;

  useEffect(() => {
    addItem({
      slug: aircraft.slug,
      title: aircraft.title,
      manufacturer: aircraft.manufacturer,
      year: aircraft.year,
      priceUSD: aircraft.price,
      image: aircraft.images[0] || '',
      type: 'aviation',
    });
  }, [aircraft, addItem]);

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen pb-24 lg:pb-12">
      {/* Breadcrumb */}
      <div className="py-3 sm:py-4 border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-muted/50 overflow-x-auto">
            <Link href="/" className="hover:text-gold transition-colors whitespace-nowrap">Home</Link>
            <ChevronRight size={10} className="shrink-0" />
            <Link href="/aviation" className="hover:text-gold transition-colors whitespace-nowrap">Aircraft</Link>
            <ChevronRight size={10} className="shrink-0" />
            <span className="text-white/70 truncate">{aircraft.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">
          {/* Gallery — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <ImageGallery images={aircraft.images} title={aircraft.title} />
            <div className="flex items-center gap-2 mt-3">
              <Camera size={13} className="text-gold/60" />
              <span className="text-[11px] tracking-[0.1em] text-muted/50">{photoCount} Photos</span>
            </div>
          </motion.div>

          {/* Details — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2">{aircraft.category}</p>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white mb-2 leading-tight">{aircraft.title}</h1>
            <p className="text-xs sm:text-sm text-muted/50 mb-4 sm:mb-6">{aircraft.year} &bull; {aircraft.manufacturer} &bull; {aircraft.model}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="bg-dark-card border border-border/20 p-3 sm:p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Price</p>
                <p className="text-lg sm:text-xl text-gold">{getPriceInCurrency(aircraft.price, currency)}</p>
              </div>
              <div className="bg-dark-card border border-border/20 p-3 sm:p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Location</p>
                <p className="text-xs sm:text-sm text-white flex items-center gap-1">
                  <MapPin size={12} className="text-gold/50 shrink-0" /> {aircraft.location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {aircraft.passengers != null && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Passengers</p>
                  <p className="text-xs sm:text-sm text-white">{aircraft.passengers}</p>
                </div>
              )}
              {aircraft.range_nm != null && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Range</p>
                  <p className="text-xs sm:text-sm text-white">{aircraft.range_nm.toLocaleString()} nm</p>
                </div>
              )}
              {aircraft.condition && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Condition</p>
                  <p className="text-xs sm:text-sm text-white">{aircraft.condition}</p>
                </div>
              )}
              {aircraft.engine_type && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Engine</p>
                  <p className="text-xs sm:text-sm text-white">{aircraft.engine_type}</p>
                </div>
              )}
            </div>

            {aircraft.description && (
              <div className="mb-6">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Overview</h3>
                <p className="text-xs sm:text-sm text-muted/70 leading-relaxed">{aircraft.description}</p>
              </div>
            )}

            {aircraft.specifications && Object.keys(aircraft.specifications).length > 0 && (
              <div className="mb-6">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-3">Full Specifications</h3>
                <div className="space-y-0">
                  {Object.entries(aircraft.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2.5 border-b border-border/15">
                      <span className="text-xs text-muted/50">{key}</span>
                      <span className="text-xs text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aircraft.estimated_shipping && (
              <div className="bg-dark-card border border-gold/10 p-4 mb-6">
                <p className="text-[10px] tracking-[0.15em] uppercase text-gold/60 mb-1">Estimated Shipping</p>
                <p className="text-xs sm:text-sm text-white">
                  From {aircraft.origin_country} — approximately {getPriceInCurrency(aircraft.estimated_shipping, currency)}
                </p>
              </div>
            )}

            <div className="hidden lg:flex flex-col gap-3">
              <Link
                href={`/contact?vehicle=${encodeURIComponent(aircraft.title)}&type=aircraft`}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gold text-dark text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all group"
              >
                Inquire Now
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gold/30 text-gold text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold/10 transition-all"
              >
                Request Custom Sourcing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Aircraft */}
      <RelatedListings
        items={DEMO_AIRCRAFT.filter(a => a.slug !== aircraft.slug).slice(0, 4)}
        title="Similar Aircraft"
        viewAllHref="/aviation"
        type="aviation"
      />

      {/* Mobile sticky inquiry */}
      <div className="fixed bottom-0 inset-x-0 lg:hidden z-40 bg-dark-card border-t border-border/30 p-3 safe-area-bottom">
        <WhatsAppButton vehicleTitle={aircraft.title} variant="primary" className="w-full py-4" />
      </div>
    </div>
  );
}
