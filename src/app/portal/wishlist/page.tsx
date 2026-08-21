'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ExternalLink } from 'lucide-react';
import { getWishlist } from '@/lib/actions/wishlist';
import Link from 'next/link';

export default function PortalWishlist() {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) { setLoading(false); return; }

    getWishlist()
      .then((data) => setItems(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Wishlist</h1>
      <p className="text-sm text-muted/50 mb-8">Your saved vehicles, aircraft and vessels.</p>

      {!loading && items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => {
            const type = String(item.asset_type || 'asset');
            const slug = String(item.asset_id || '');
            const href = type === 'automobile' ? `/automotive/${slug}` :
                         type === 'aircraft' ? `/aviation/${slug}` :
                         type === 'yacht' || type === 'boat' ? `/marine/${slug}` : '#';
            return (
              <div key={item.id as string} className="bg-dark-card border border-border/20 p-5 hover:border-gold/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted/40 uppercase tracking-wider">{type}</p>
                    <h3 className="text-sm text-white mt-1">{slug || 'Asset'}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart size={14} className="text-gold fill-gold" />
                    {href !== '#' && (
                      <Link href={href} className="text-muted/40 hover:text-gold transition-colors">
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                </div>
                {!!item.created_at && (
                  <p className="text-[10px] text-muted/30 mt-2">Saved {new Date(String(item.created_at)).toLocaleDateString()}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <Heart size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Saved Assets</h3>
          <p className="text-sm text-muted/40">Browse our inventory and save assets you&apos;re interested in.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
