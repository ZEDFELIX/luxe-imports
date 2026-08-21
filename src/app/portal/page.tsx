'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Receipt, Truck, Clock } from 'lucide-react';
import Link from 'next/link';
import { getMyRequests } from '@/lib/actions/requests';
import { getMyQuotes } from '@/lib/actions/quotes';
import { getMyInvoices } from '@/lib/actions/invoices';
import { getMyShipments } from '@/lib/actions/shipments';

export default function PortalDashboard() {
  const [stats, setStats] = useState([
    { label: 'Active Requests', value: '0', icon: FileText, href: '/portal/requests' },
    { label: 'Pending Quotes', value: '0', icon: Receipt, href: '/portal/quotes' },
    { label: 'Active Shipments', value: '0', icon: Truck, href: '/portal/shipments' },
    { label: 'Documents', value: '0', icon: Clock, href: '/portal/documents' },
  ]);
  const [recentActivity, setRecentActivity] = useState<{ type: string; description: string; date: string }[]>([]);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) return;

    async function load() {
      try {
        const [requests, quotes, invoices, shipments] = await Promise.all([
          getMyRequests().catch(() => []),
          getMyQuotes().catch(() => []),
          getMyInvoices().catch(() => []),
          getMyShipments().catch(() => []),
        ]);

        setStats([
          { label: 'Active Requests', value: String(requests.length), icon: FileText, href: '/portal/requests' },
          { label: 'Pending Quotes', value: String(quotes.filter((q: Record<string, unknown>) => q.status === 'pending').length), icon: Receipt, href: '/portal/quotes' },
          { label: 'Active Shipments', value: String(shipments.length), icon: Truck, href: '/portal/shipments' },
          { label: 'Invoices', value: String(invoices.length), icon: Clock, href: '/portal/invoices' },
        ]);

        const activity = [
          ...requests.slice(0, 3).map((r: Record<string, unknown>) => ({ type: 'Request', description: `${r.asset_type || 'Asset'} sourcing request`, date: r.created_at as string })),
          ...quotes.slice(0, 3).map((q: Record<string, unknown>) => ({ type: 'Quote', description: `Quote for ${q.asset_type || 'asset'}`, date: q.created_at as string })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

        setRecentActivity(activity);
      } catch {
        // Keep default zeros
      }
    }
    load();
  }, []);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-2xl sm:text-3xl text-white mb-2">My Luxe</h1>
        <p className="text-sm text-muted/50 mb-8">Welcome to your personal dashboard.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link href={stat.href} className="block bg-dark-card border border-border/20 p-5 hover:border-gold/20 transition-colors">
                <stat.icon size={20} strokeWidth={1.2} className="text-gold/50 mb-3" />
                <p className="text-2xl text-white font-light">{stat.value}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mt-1">{stat.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="bg-dark-card border border-border/20 p-6 sm:p-8">
          <h2 className="font-serif text-lg text-white mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
                  <div>
                    <p className="text-sm text-white/80">{item.description}</p>
                    <p className="text-[10px] text-muted/40 uppercase">{item.type}</p>
                  </div>
                  <p className="text-[10px] text-muted/40">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-sm text-muted/40">No recent activity. Submit a sourcing request to get started.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gold text-dark text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
                Start a Request
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
