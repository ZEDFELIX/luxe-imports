'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface RelatedItem {
  slug: string;
  title: string;
  manufacturer?: string;
  builder?: string;
  year: number;
  price: number;
  images: string[];
  category?: string;
  location: string;
}

interface RelatedListingsProps {
  items: RelatedItem[];
  title: string;
  viewAllHref: string;
  type: 'automotive' | 'aviation' | 'marine';
}

export function RelatedListings({ items, title, viewAllHref, type }: RelatedListingsProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-2">You May Also Like</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-white">{title}</h2>
          </div>
          <Link
            href={viewAllHref}
            className="text-[11px] tracking-[0.1em] uppercase text-gold hover:text-gold-light transition-colors hidden sm:block"
          >
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={`/${type}/${item.slug}`}
                className="group block bg-dark-card border border-border/20 overflow-hidden editorial-hover"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {item.images[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark-card" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 text-[9px] text-white/80">
                    <Camera size={9} /> {item.images?.length || 0}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-sm text-white mb-1 group-hover:text-gold transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-muted/50 mb-2">{item.year}</p>
                  <p className="text-xs text-gold">{formatCurrency(item.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href={viewAllHref}
          className="sm:hidden flex items-center justify-center gap-2 mt-6 py-3 border border-border/30 text-[11px] tracking-[0.1em] uppercase text-gold hover:border-gold/40 transition-all"
        >
          View All {type === 'automotive' ? 'Vehicles' : type === 'aviation' ? 'Aircraft' : 'Vessels'}
        </Link>
      </div>
    </section>
  );
}
