'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';

export default function PortalWishlist() {
  const { items, removeItem } = useCart();
  const { currency } = useCurrency();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">My Garage</h1>
      <p className="text-sm text-muted/50 mb-8">Your saved vehicles, aircraft and vessels.</p>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => {
            const href = item.type === 'automotive'
              ? `/automotive/${item.slug}`
              : item.type === 'aviation'
                ? `/aviation/${item.slug}`
                : `/marine/${item.slug}`;
            return (
              <div key={item.slug} className="bg-dark-card border border-border/20 p-4 hover:border-gold/20 transition-colors">
                <div className="flex gap-4">
                  <Link href={href} className="shrink-0 w-20 h-20 relative overflow-hidden bg-dark">
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-[0.15em] uppercase text-gold/50 mb-0.5">{item.manufacturer} &bull; {item.year}</p>
                    <Link href={href} className="text-sm text-white hover:text-gold transition-colors block truncate">{item.title}</Link>
                    <p className="text-xs text-gold mt-1">{getPriceInCurrency(item.priceUSD, currency)}</p>
                    {item.trim && <p className="text-[10px] text-muted/40 mt-0.5">{item.trim}</p>}
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button onClick={() => removeItem(item.slug)}
                      className="p-2 text-muted/40 hover:text-red-400 transition-colors"
                      title="Remove">
                      <Trash2 size={14} />
                    </button>
                    <Link href={href}
                      className="p-2 text-muted/40 hover:text-gold transition-colors"
                      title="View">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">My Garage is Empty</h3>
          <p className="text-sm text-muted/40 mb-6">Browse our inventory and save vehicles you&apos;re interested in.</p>
          <Link href="/automotive"
            className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-medium tracking-[0.15em] uppercase bg-gold text-dark hover:bg-gold-light transition-all">
            Browse Vehicles <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
