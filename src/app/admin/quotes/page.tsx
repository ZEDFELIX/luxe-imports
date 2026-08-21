'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Search, ChevronDown } from 'lucide-react';
import { getAllQuotes, updateQuoteStatus } from '@/lib/actions/quotes';

const QUOTE_STATUSES = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'SENT', label: 'Sent' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'DECLINED', label: 'Declined' },
  { value: 'EXPIRED', label: 'Expired' },
];

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) { setLoading(false); return; }

    getAllQuotes()
      .then((data) => setQuotes(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = quotes.filter((q) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return String(q.reference_number || q.quote_number || '').toLowerCase().includes(s) ||
      String(q.asset_description || q.asset_type || '').toLowerCase().includes(s);
  });

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateQuoteStatus(id, status);
      setQuotes((prev) => prev.map((q) => q.id === id ? { ...q, status } : q));
    } catch {}
    setUpdatingId(null);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Quote Management</h1>
          <p className="text-sm text-muted/50">Create, send and track quotes.</p>
        </div>
      </div>
      <div className="mb-6 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search quotes..."
          className="w-full bg-dark-card border border-border/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
      </div>

      {!loading && filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((quote) => (
            <div key={String(quote.id)} className="bg-dark-card border border-border/20 p-5 hover:border-gold/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted/40 uppercase tracking-wider">{String(quote.reference_number || quote.quote_number || 'N/A')}</p>
                  <h3 className="text-sm text-white mt-1">{String(quote.asset_description || quote.asset_type || 'Quote')}</h3>
                  {!!quote.profiles && typeof quote.profiles === 'object' && quote.profiles !== null && (
                    <p className="text-[10px] text-muted/40 mt-1">
                      Client: {String((quote.profiles as Record<string, unknown>).full_name || 'Unknown')}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    {!!quote.total_price && (
                      <p className="text-sm text-gold">{formatPrice(Number(quote.total_price))}</p>
                    )}
                  </div>
                  <div className="relative">
                    <select
                      value={String(quote.status || 'PENDING')}
                      onChange={(e) => handleStatusUpdate(quote.id as string, e.target.value)}
                      disabled={updatingId === quote.id}
                      className="appearance-none bg-dark border border-border/30 px-3 py-1.5 pr-7 text-[10px] tracking-wider uppercase text-gold/80 focus:border-gold/50 focus:outline-none transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {QUOTE_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted/40 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-muted/40">
                {!!quote.valid_until && <span>Valid until: {new Date(String(quote.valid_until)).toLocaleDateString()}</span>}
                {!!quote.created_at && <span>Created: {new Date(String(quote.created_at)).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <Receipt size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Quotes</h3>
          <p className="text-sm text-muted/40">Quotes will appear here once created.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
