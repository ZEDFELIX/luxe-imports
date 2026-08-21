'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, Search, ChevronDown } from 'lucide-react';
import { getAllShipments, updateShipmentStatus } from '@/lib/actions/shipments';

const SHIPMENT_STATUSES = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'CUSTOMS', label: 'Customs' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export default function AdminShipments() {
  const [shipments, setShipments] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) { setLoading(false); return; }

    getAllShipments()
      .then((data) => setShipments(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = shipments.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return String(s.tracking_number || s.reference || '').toLowerCase().includes(q) ||
      String(s.asset_description || s.asset_type || '').toLowerCase().includes(q);
  });

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateShipmentStatus(id, status);
      setShipments((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
    } catch {}
    setUpdatingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'border-green-500/30 text-green-400';
      case 'IN_TRANSIT': return 'border-blue-500/30 text-blue-400';
      case 'CUSTOMS': return 'border-amber-500/30 text-amber-400';
      case 'CANCELLED': return 'border-red-500/30 text-red-400';
      default: return 'border-gold/20 text-gold/80';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Shipment Management</h1>
          <p className="text-sm text-muted/50">Track and manage all shipments.</p>
        </div>
      </div>
      <div className="mb-6 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shipments..."
          className="w-full bg-dark-card border border-border/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
      </div>

      {!loading && filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((shipment) => (
            <div key={String(shipment.id)} className="bg-dark-card border border-border/20 p-5 hover:border-gold/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted/40 uppercase tracking-wider">{String(shipment.tracking_number || shipment.reference || 'N/A')}</p>
                  <h3 className="text-sm text-white mt-1">{String(shipment.asset_description || shipment.asset_type || 'Shipment')}</h3>
                  {!!shipment.profiles && typeof shipment.profiles === 'object' && shipment.profiles !== null && (
                    <p className="text-[10px] text-muted/40 mt-1">
                      Client: {String((shipment.profiles as Record<string, unknown>).full_name || 'Unknown')}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <select
                    value={String(shipment.status || 'PENDING')}
                    onChange={(e) => handleStatusUpdate(shipment.id as string, e.target.value)}
                    disabled={updatingId === shipment.id}
                    className="appearance-none bg-dark border border-border/30 px-3 py-1.5 pr-7 text-[10px] tracking-wider uppercase text-gold/80 focus:border-gold/50 focus:outline-none transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {SHIPMENT_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted/40 pointer-events-none" />
                </div>
              </div>
              <div className="flex gap-4 text-xs text-muted/40">
                {!!shipment.origin && <span>Origin: {String(shipment.origin)}</span>}
                {!!shipment.destination && <span>Destination: {String(shipment.destination)}</span>}
                {!!shipment.estimated_delivery && <span>ETA: {new Date(String(shipment.estimated_delivery)).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <Truck size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Shipments</h3>
          <p className="text-sm text-muted/40">Active shipments will appear here.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
