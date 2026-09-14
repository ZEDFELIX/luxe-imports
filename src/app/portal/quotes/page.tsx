'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Check, X } from 'lucide-react';
import { getMyQuotes, updateQuoteStatus } from '@/lib/actions/quotes';
import toast from 'react-hot-toast';

export default function PortalQuotes() {
  const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
  const [quotes, setQuotes] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(isConfigured);

  useEffect(() => {
    if (!isConfigured) return;

    getMyQuotes()
      .then((data) => setQuotes(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isConfigured]);

  const handleStatus = async (id: string, status: string) => {
    try {
      await updateQuoteStatus(id, status);
      setQuotes((prev) => prev.map((q) => q.id === id ? { ...q, status } : q));
      toast.success(`Quote ${status}`);
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Quotes</h1>
      <p className="text-sm text-muted/50 mb-8">Review and manage your acquisition quotes.</p>

      {!loading && quotes.length > 0 ? (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div key={quote.id as string} className="bg-dark-card border border-border/20 p-5 hover:border-gold/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm text-white">
                    {String(quote.asset_type || 'Asset')} {quote.manufacturer ? `- ${String(quote.manufacturer)}` : ''} {quote.model ? String(quote.model) : ''} {quote.year ? `(${String(quote.year)})` : ''}
                  </h3>
                  {!!quote.price && (
                    <p className="text-lg text-gold mt-1">${(quote.price as number).toLocaleString()}</p>
                  )}
                </div>
                <span className={`px-3 py-1 text-[10px] tracking-wider uppercase border ${
                  quote.status === 'accepted' ? 'border-green-500/30 text-green-400' :
                  quote.status === 'rejected' ? 'border-red-500/30 text-red-400' :
                  'border-gold/20 text-gold/80'
                }`}>
                  {(quote.status as string) || 'pending'}
                </span>
              </div>
              {!!quote.notes && (
                <p className="text-xs text-muted/50 mb-3">{String(quote.notes)}</p>
              )}
              {String(quote.status) === 'pending' && (
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => handleStatus(quote.id as string, 'accepted')}
                    className="flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-wider uppercase border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-all">
                    <Check size={12} /> Accept
                  </button>
                  <button onClick={() => handleStatus(quote.id as string, 'rejected')}
                    className="flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-wider uppercase border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
                    <X size={12} /> Decline
                  </button>
                </div>
              )}
              {!!quote.created_at && (
                <p className="text-[10px] text-muted/30 mt-2">{new Date(String(quote.created_at)).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <Receipt size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Quotes</h3>
          <p className="text-sm text-muted/40">Quotes will appear here once your request is processed.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
