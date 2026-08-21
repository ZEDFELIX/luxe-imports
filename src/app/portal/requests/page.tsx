'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { REQUEST_STATUSES } from '@/lib/constants';
import { getMyRequests } from '@/lib/actions/requests';

export default function PortalRequests() {
  const [requests, setRequests] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) { setLoading(false); return; }

    getMyRequests()
      .then((data) => setRequests(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getStatusLabel = (status: string) => {
    const found = REQUEST_STATUSES.find((s) => s.value === status);
    return found?.label || status;
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">My Requests</h1>
            <p className="text-sm text-muted/50">Track all your sourcing requests.</p>
          </div>
          <Link href="/contact" className="px-5 py-2.5 bg-gold text-dark text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
            New Request
          </Link>
        </div>

        {!loading && requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id as string} className="bg-dark-card border border-border/20 p-5 hover:border-gold/20 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted/40 uppercase tracking-wider">{String(req.reference_number || 'N/A')}</p>
                    <h3 className="text-sm text-white mt-1">
                      {String(req.asset_type || 'Asset')} {req.manufacturer ? `- ${String(req.manufacturer)}` : ''} {req.model ? String(req.model) : ''} {req.year ? `(${String(req.year)})` : ''}
                    </h3>
                  </div>
                  <span className="px-3 py-1 text-[10px] tracking-wider uppercase border border-gold/20 text-gold/80">
                    {getStatusLabel(String(req.status || ''))}
                  </span>
                </div>
                {!!req.budget && (
                  <p className="text-xs text-muted/40">Budget: ${(req.budget as number).toLocaleString()}</p>
                )}
                {!!req.preferred_origin && (
                  <p className="text-xs text-muted/40">Origin: {String(req.preferred_origin)}</p>
                )}
                {!!req.created_at && (
                  <p className="text-[10px] text-muted/30 mt-2">Submitted {new Date(String(req.created_at)).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        ) : !loading ? (
          <div className="text-center py-16">
            <Clock size={32} className="text-muted/20 mx-auto mb-4" />
            <h3 className="font-serif text-lg text-white/60 mb-2">No Requests Yet</h3>
            <p className="text-sm text-muted/40 max-w-sm mx-auto">
              Submit a sourcing request and it will appear here with live status tracking.
            </p>
          </div>
        ) : null}

        {/* Request Status Reference */}
        <div className="mt-12 bg-dark-card border border-border/20 p-6">
          <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-4">Request Stages</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {REQUEST_STATUSES.map((status) => (
              <div key={status.value} className="flex items-center gap-2 py-2">
                <div className="w-6 h-6 rounded-full border border-border/30 flex items-center justify-center text-[9px] text-muted/40">
                  {status.step + 1}
                </div>
                <span className="text-[10px] text-muted/50">{status.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
