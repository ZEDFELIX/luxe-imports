'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ChevronDown } from 'lucide-react';
import { getAllRequests, updateRequestStatus } from '@/lib/actions/requests';
import { REQUEST_STATUSES } from '@/lib/constants';

export default function AdminRequests() {
  const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
  const [requests, setRequests] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(isConfigured);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isConfigured) return;

    getAllRequests()
      .then((data) => setRequests(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isConfigured]);

  const filtered = requests.filter((req) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return String(req.reference_number || '').toLowerCase().includes(q) ||
      String(req.manufacturer || '').toLowerCase().includes(q) ||
      String(req.model || '').toLowerCase().includes(q) ||
      String(req.asset_type || '').toLowerCase().includes(q);
  });

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateRequestStatus(id, status);
      setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    } catch {}
    setUpdatingId(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Request Management</h1>
          <p className="text-sm text-muted/50">View, assign and manage all sourcing requests.</p>
        </div>
      </div>
      <div className="mb-6 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search requests..."
          className="w-full bg-dark-card border border-border/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
      </div>

      {!loading && filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((req) => (
            <div key={req.id as string} className="bg-dark-card border border-border/20 p-5 hover:border-gold/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted/40 uppercase tracking-wider">{String(req.reference_number || 'N/A')}</p>
                  <h3 className="text-sm text-white mt-1">
                    {String(req.asset_type || 'Asset')} {req.manufacturer ? `- ${String(req.manufacturer)}` : ''} {req.model ? String(req.model) : ''} {req.year ? `(${String(req.year)})` : ''}
                  </h3>
                  {!!req.profiles && typeof req.profiles === 'object' && req.profiles !== null && (
                    <p className="text-[10px] text-muted/40 mt-1">
                      Client: {String((req.profiles as Record<string, unknown>).full_name || 'Unknown')} ({String((req.profiles as Record<string, unknown>).email || '')})
                    </p>
                  )}
                </div>
                <div className="relative">
                  <select
                    value={String(req.status || 'REQUESTED')}
                    onChange={(e) => handleStatusUpdate(req.id as string, e.target.value)}
                    disabled={updatingId === req.id}
                    className="appearance-none bg-dark border border-border/30 px-3 py-1.5 pr-7 text-[10px] tracking-wider uppercase text-gold/80 focus:border-gold/50 focus:outline-none transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {REQUEST_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted/40 pointer-events-none" />
                </div>
              </div>
              <div className="flex gap-4 text-xs text-muted/40">
                {!!req.budget && <span>Budget: ${(req.budget as number).toLocaleString()}</span>}
                {!!req.preferred_origin && <span>Origin: {String(req.preferred_origin)}</span>}
                {!!req.destination && <span>Destination: {String(req.destination)}</span>}
                {!!req.created_at && <span>Submitted: {new Date(String(req.created_at)).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <FileText size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Requests</h3>
          <p className="text-sm text-muted/40">Requests from clients will appear here.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
