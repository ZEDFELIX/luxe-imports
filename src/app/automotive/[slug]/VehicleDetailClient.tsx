'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Camera, ArrowRight, ChevronRight } from 'lucide-react';
import { ImageGallery } from '@/components/gallery';
import { RelatedListings } from '@/components/listings';
import { DEMO_VEHICLES } from '@/lib/constants';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { VerificationBadges } from '@/components/ui/VerificationBadges';
import { useRecentlyViewed } from '@/lib/recently-viewed';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';
import { useEffect } from 'react';

interface Vehicle {
  slug: string;
  title: string;
  description?: string;
  manufacturer: string;
  model: string;
  year: number;
  category: string;
  price: number;
  currency: string;
  mileage?: number;
  color?: string;
  engine?: string;
  horsepower?: number;
  transmission?: string;
  fuel_type?: string;
  drive_type?: string;
  origin_country: string;
  location: string;
  condition?: string;
  specifications?: { [key: string]: string };
  estimated_shipping?: number;
  images: string[];
}

export function VehicleDetailClient({ vehicle }: { vehicle: Vehicle }) {
  const photoCount = vehicle.images?.length || 0;
  const { addItem } = useRecentlyViewed();
  const { currency } = useCurrency();

  useEffect(() => {
    addItem({
      slug: vehicle.slug,
      title: vehicle.title,
      manufacturer: vehicle.manufacturer,
      year: vehicle.year,
      priceUSD: vehicle.price,
      image: vehicle.images[0] || '',
      type: 'automotive',
    });
  }, [vehicle, addItem]);

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen pb-24 lg:pb-12">
      {/* Breadcrumb */}
      <div className="py-3 sm:py-4 border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-muted/50 overflow-x-auto">
            <Link href="/" className="hover:text-gold transition-colors whitespace-nowrap">Home</Link>
            <ChevronRight size={10} className="shrink-0" />
            <Link href="/automotive" className="hover:text-gold transition-colors whitespace-nowrap">Automotive</Link>
            <ChevronRight size={10} className="shrink-0" />
            <span className="text-white/70 truncate">{vehicle.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">
          {/* Gallery — takes 3 cols on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <ImageGallery images={vehicle.images} title={vehicle.title} />
            {/* Photo count badge */}
            <div className="flex items-center gap-2 mt-3">
              <Camera size={13} className="text-gold/60" />
              <span className="text-[11px] tracking-[0.1em] text-muted/50">{photoCount} Photos</span>
            </div>
          </motion.div>

          {/* Details — takes 2 cols on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2">{vehicle.category}</p>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white mb-2 leading-tight">{vehicle.title}</h1>
            <p className="text-xs sm:text-sm text-muted/50 mb-4 sm:mb-6">{vehicle.year} &bull; {vehicle.manufacturer} &bull; {vehicle.model}</p>

            {/* Price & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="bg-dark-card border border-border/20 p-3 sm:p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Price</p>
                <p className="text-lg sm:text-xl text-gold">{getPriceInCurrency(vehicle.price, currency)}</p>
              </div>
              <div className="bg-dark-card border border-border/20 p-3 sm:p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Location</p>
                <p className="text-xs sm:text-sm text-white flex items-center gap-1">
                  <MapPin size={12} className="text-gold/50 shrink-0" /> {vehicle.location}
                </p>
              </div>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {vehicle.mileage != null && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Mileage</p>
                  <p className="text-xs sm:text-sm text-white">{vehicle.mileage.toLocaleString()} km</p>
                </div>
              )}
              {vehicle.condition && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Condition</p>
                  <p className="text-xs sm:text-sm text-white">{vehicle.condition}</p>
                </div>
              )}
              {vehicle.engine && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Engine</p>
                  <p className="text-xs sm:text-sm text-white">{vehicle.engine}</p>
                </div>
              )}
              {vehicle.transmission && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Transmission</p>
                  <p className="text-xs sm:text-sm text-white">{vehicle.transmission}</p>
                </div>
              )}
              {vehicle.fuel_type && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Fuel</p>
                  <p className="text-xs sm:text-sm text-white">{vehicle.fuel_type}</p>
                </div>
              )}
              {vehicle.drive_type && (
                <div className="bg-dark-card border border-border/20 p-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-0.5">Drive</p>
                  <p className="text-xs sm:text-sm text-white">{vehicle.drive_type}</p>
                </div>
              )}
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="mb-6">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Overview</h3>
                <p className="text-xs sm:text-sm text-muted/70 leading-relaxed">{vehicle.description}</p>
              </div>
            )}

            {/* Full Specifications */}
            {vehicle.specifications && Object.keys(vehicle.specifications).length > 0 && (
              <div className="mb-6">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-3">Full Specifications</h3>
                <div className="space-y-0">
                  {Object.entries(vehicle.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2.5 border-b border-border/15">
                      <span className="text-xs text-muted/50">{key}</span>
                      <span className="text-xs text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping */}
            {vehicle.estimated_shipping && (
              <div className="bg-dark-card border border-gold/10 p-4 mb-6">
                <p className="text-[10px] tracking-[0.15em] uppercase text-gold/60 mb-1">Estimated Shipping</p>
                <p className="text-xs sm:text-sm text-white">
                  From {vehicle.origin_country} — approximately {getPriceInCurrency(vehicle.estimated_shipping, currency)}
                </p>
                <p className="text-[10px] text-muted/40 mt-1">Final cost determined after route and method selection.</p>
              </div>
            )}

            {/* Desktop CTA */}
            <div className="hidden lg:flex flex-col gap-3">
              <Link
                href={`/contact?vehicle=${encodeURIComponent(vehicle.title)}&type=car`}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gold text-dark text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all group"
              >
                Inquire Now
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <WhatsAppButton vehicleTitle={vehicle.title} variant="primary" className="w-full" />
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gold/30 text-gold text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold/10 transition-all"
              >
                Request Custom Sourcing
              </Link>
              <VerificationBadges vinVerified inspectionCompleted serviceHistory importReady className="mt-2" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Vehicles */}
      <RelatedListings
        items={DEMO_VEHICLES.filter(v => v.slug !== vehicle.slug).slice(0, 4)}
        title="Similar Vehicles"
        viewAllHref="/automotive"
        type="automotive"
      />

      {/* Mobile sticky inquiry */}
      <div className="fixed bottom-0 inset-x-0 lg:hidden z-40 bg-dark-card border-t border-border/30 p-3 safe-area-bottom">
        <WhatsAppButton vehicleTitle={vehicle.title} variant="primary" className="w-full py-4" />
      </div>
    </div>
  );
}
