'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Vessel {
  slug: string;
  title: string;
  description?: string;
  builder: string;
  model: string;
  year: number;
  category: string;
  price: number;
  currency: string;
  length_ft?: number;
  cabins?: number;
  capacity?: number;
  top_speed_knots?: number;
  range_nm?: number;
  hull_material?: string;
  origin_country: string;
  location: string;
  condition?: string;
  specifications?: { [key: string]: string };
  images: string[];
}

export function VesselDetailClient({ vessel }: { vessel: Vessel }) {
  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      <div className="py-4 border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[11px] text-muted/50">
            <Link href="/marine" className="hover:text-gold transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Marine
            </Link>
            <span>/</span>
            <span className="text-white/70">{vessel.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[4/3] bg-dark-card border border-border/20 relative overflow-hidden">
              {vessel.images[0] ? (
                <Image
                  src={vessel.images[0]}
                  alt={vessel.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.04),transparent)]" />
                  <p className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-white/10">{vessel.builder}</p>
                </>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-3">{vessel.category}</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">{vessel.title}</h1>
            <p className="text-sm text-muted/50 mb-6">{vessel.year} • {vessel.builder} • {vessel.model}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-dark-card border border-border/20 p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Price</p>
                <p className="text-xl text-gold">{formatCurrency(vessel.price)}</p>
              </div>
              <div className="bg-dark-card border border-border/20 p-4">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Location</p>
                <p className="text-sm text-white flex items-center gap-1"><MapPin size={12} className="text-gold/50" /> {vessel.location}</p>
              </div>
              {vessel.length_ft && (
                <div className="bg-dark-card border border-border/20 p-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Length</p>
                  <p className="text-sm text-white">{vessel.length_ft} ft</p>
                </div>
              )}
              {vessel.cabins && (
                <div className="bg-dark-card border border-border/20 p-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Cabins</p>
                  <p className="text-sm text-white">{vessel.cabins}</p>
                </div>
              )}
            </div>

            {vessel.description && (
              <div className="mb-8">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-3">Overview</h3>
                <p className="text-sm text-muted/70 leading-relaxed">{vessel.description}</p>
              </div>
            )}

            {vessel.specifications && (
              <div className="mb-8">
                <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-4">Specifications</h3>
                <div className="space-y-0">
                  {Object.entries(vessel.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border/15">
                      <span className="text-xs text-muted/50">{key}</span>
                      <span className="text-xs text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all group">
              Request Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
