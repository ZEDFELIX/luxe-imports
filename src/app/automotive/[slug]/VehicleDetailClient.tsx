'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Heart, Share2, Printer, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

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
  origin_country: string;
  location: string;
  condition?: string;
  specifications?: { [key: string]: string };
  estimated_shipping?: number;
  images: string[];
}

export function VehicleDetailClient({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      {/* Breadcrumb */}
      <div className="py-4 border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[11px] text-muted/50">
            <Link href="/automotive" className="hover:text-gold transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Automotive
            </Link>
            <span>/</span>
            <span className="text-white/70">{vehicle.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] bg-dark-card border border-border/20 relative overflow-hidden">
              {vehicle.images[0] ? (
                <Image
                  src={vehicle.images[0]}
                  alt={vehicle.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.04),transparent)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-serif text-3xl text-white/10">{vehicle.manufacturer}</p>
                      <p className="text-xs text-muted/20 mt-2">Gallery</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-border/30 text-[11px] tracking-[0.1em] uppercase text-muted/60 hover:text-gold hover:border-gold/30 transition-all">
                <Heart size={14} /> Wishlist
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-border/30 text-[11px] tracking-[0.1em] uppercase text-muted/60 hover:text-gold hover:border-gold/30 transition-all">
                <Share2 size={14} /> Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-border/30 text-[11px] tracking-[0.1em] uppercase text-muted/60 hover:text-gold hover:border-gold/30 transition-all">
                <Printer size={14} /> Print
              </button>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-3">
              {vehicle.category}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">
              {vehicle.title}
            </h1>
            <p className="text-sm text-muted/50 mb-6">
              {vehicle.year} • {vehicle.manufacturer} • {vehicle.model}
            </p>

            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-dark-card border border-border/20 p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Price</p>
                <p className="text-xl text-gold">{formatCurrency(vehicle.price)}</p>
              </div>
              <div className="bg-dark-card border border-border/20 p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Location</p>
                <p className="text-sm text-white flex items-center gap-1">
                  <MapPin size={12} className="text-gold/50" /> {vehicle.location}
                </p>
              </div>
              {vehicle.mileage && (
                <div className="bg-dark-card border border-border/20 p-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Mileage</p>
                  <p className="text-sm text-white">{vehicle.mileage.toLocaleString()} km</p>
                </div>
              )}
              {vehicle.condition && (
                <div className="bg-dark-card border border-border/20 p-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Condition</p>
                  <p className="text-sm text-white">{vehicle.condition}</p>
                </div>
              )}
            </div>

            {/* Description */}
            {vehicle.description && (
              <div className="mb-8">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-3">Overview</h3>
                <p className="text-sm text-muted/70 leading-relaxed">{vehicle.description}</p>
              </div>
            )}

            {/* Specifications */}
            {vehicle.specifications && (
              <div className="mb-8">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-4">Specifications</h3>
                <div className="space-y-0">
                  {Object.entries(vehicle.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border/15">
                      <span className="text-xs text-muted/50">{key}</span>
                      <span className="text-xs text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping */}
            {vehicle.estimated_shipping && (
              <div className="bg-dark-card border border-gold/10 p-5 mb-8">
                <p className="text-[10px] tracking-[0.15em] uppercase text-gold/60 mb-2">Estimated Shipping</p>
                <p className="text-sm text-white">
                  From {vehicle.origin_country} to your destination — approximately {formatCurrency(vehicle.estimated_shipping)}
                </p>
                <p className="text-[10px] text-muted/40 mt-1">Final shipping cost determined after route and method selection.</p>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all group"
              >
                Request Quote
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-gold/30 text-gold text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold/10 transition-all"
              >
                Enquire Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
