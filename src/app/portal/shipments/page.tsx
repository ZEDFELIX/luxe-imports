'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { getMyShipments } from '@/lib/actions/shipments';

export default function PortalShipments() {
  const [shipments, setShipments] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) { setLoading(false); return; }

    getMyShipments()
      .then((data) => setShipments(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Shipments</h1>
      <p className="text-sm text-muted/50 mb-8">Track your active and completed shipments.</p>

      {!loading && shipments.length > 0 ? (
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <div key={shipment.id as string} className="bg-dark-card border border-border/20 p-5 hover:border-gold/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted/40 uppercase tracking-wider">{String(shipment.tracking_number || shipment.reference || 'N/A')}</p>
                  <h3 className="text-sm text-white mt-1">
                    {String(shipment.asset_description || shipment.asset_type || 'Shipment')}
                  </h3>
                </div>
                <span className={`px-3 py-1 text-[10px] tracking-wider uppercase border ${
                  shipment.status === 'delivered' ? 'border-green-500/30 text-green-400' :
                  shipment.status === 'in_transit' ? 'border-blue-500/30 text-blue-400' :
                  'border-gold/20 text-gold/80'
                }`}>
                  {(shipment.status as string)?.replace('_', ' ') || 'pending'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {!!shipment.origin && (
                  <div>
                    <p className="text-[10px] text-muted/40 uppercase">Origin</p>
                    <p className="text-xs text-white/70">{String(shipment.origin)}</p>
                  </div>
                )}
                {!!shipment.destination && (
                  <div>
                    <p className="text-[10px] text-muted/40 uppercase">Destination</p>
                    <p className="text-xs text-white/70">{String(shipment.destination)}</p>
                  </div>
                )}
              </div>
              {!!shipment.estimated_delivery && (
                <p className="text-[10px] text-muted/40 mt-3">ETA: {new Date(String(shipment.estimated_delivery)).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <Truck size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Shipments</h3>
          <p className="text-sm text-muted/40">Shipment tracking will appear here once your asset is in transit.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
