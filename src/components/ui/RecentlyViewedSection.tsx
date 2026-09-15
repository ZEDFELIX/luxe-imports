'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useRecentlyViewed } from '@/lib/recently-viewed';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';

export function RecentlyViewedSection() {
  const { items } = useRecentlyViewed();
  const { currency } = useCurrency();

  if (items.length === 0) return null;

  return (
    <section className="bg-dark py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-3 font-medium">Continue Exploring</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">Your Recent Browsing</h2>
          </div>
          <Link href="/" className="flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-muted/40 hover:text-gold transition-colors">
            <Clock size={12} />
            <span className="hidden sm:inline">Clear</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.slice(0, 4).map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/${item.type === 'automotive' ? 'automotive' : item.type}/${item.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-dark-card border border-border/15 mb-3 group-hover:border-gold/25 transition-colors">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
                </div>
                <p className="text-[9px] tracking-[0.15em] uppercase text-gold/50 mb-1 font-medium">{item.manufacturer}</p>
                <p className="text-xs text-white group-hover:text-gold transition-colors truncate font-serif text-sm">{item.title}</p>
                <p className="text-xs text-gradient-gold font-semibold mt-1">{getPriceInCurrency(item.priceUSD, currency)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
