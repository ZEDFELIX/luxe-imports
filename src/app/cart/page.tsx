'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency, convertPrice } from '@/lib/currency';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, removeItem, clearCart, totalUSD } = useCart();
  const { currency } = useCurrency();

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen pb-24 lg:pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white">Shopping Cart</h1>
            <p className="text-xs text-muted/50 mt-1">{items.length} {items.length === 1 ? 'vehicle' : 'vehicles'}</p>
          </div>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-[10px] tracking-[0.1em] uppercase text-muted/40 hover:text-red-400 transition-colors">
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={48} strokeWidth={1} className="text-muted/20 mx-auto mb-4" />
            <h2 className="font-serif text-xl text-white mb-2">Your cart is empty</h2>
            <p className="text-sm text-muted/50 mb-6">Browse our collection and add vehicles you&apos;re interested in.</p>
            <Link href="/automotive" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-dark text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
              Explore Vehicles
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 bg-dark-card border border-border/20 p-4"
                >
                  <Link href={`/${item.type}/${item.slug}`} className="shrink-0 w-24 h-24 sm:w-32 sm:h-24 relative overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="128px" />
                    ) : (
                      <div className="w-full h-full bg-dark flex items-center justify-center text-white/10 text-xs">No image</div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/${item.type}/${item.slug}`} className="text-sm text-white hover:text-gold transition-colors font-serif block truncate">
                      {item.title}
                    </Link>
                    <p className="text-[10px] text-muted/40 mt-0.5">{item.year} {item.trim && `• ${item.trim}`}</p>
                    <p className="text-xs text-gold mt-2">{getPriceInCurrency(item.priceUSD, currency)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="shrink-0 p-2 text-muted/30 hover:text-red-400 transition-colors self-start">
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="bg-dark-card border border-border/20 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-muted/50 uppercase tracking-[0.1em]">Total ({currency})</span>
                <span className="text-xl text-gold font-medium">{getPriceInCurrency(totalUSD, currency)}</span>
              </div>
              <p className="text-[10px] text-muted/40 mb-4">Estimated total. Final pricing confirmed during consultation.</p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all group"
              >
                Request Quote for All
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
