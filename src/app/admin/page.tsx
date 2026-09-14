'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Truck, Receipt, MessageSquare } from 'lucide-react';
import { getAdminDashboard } from '@/lib/actions/dashboard';

interface DashboardData {
  totalClients: number;
  totalRequests: number;
  pendingQuotes: number;
  activeShipments: number;
  recentRequests: Record<string, unknown>[];
  recentMessages: Record<string, unknown>[];
}

export default function AdminDashboard() {
  const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(isConfigured);

  useEffect(() => {
    if (!isConfigured) return;

    getAdminDashboard()
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isConfigured]);

  const stats = [
    { label: 'Total Requests', value: loading ? '...' : String(data?.totalRequests ?? 0), icon: FileText, change: '+3 this week', color: 'text-blue-400' },
    { label: 'Pending Quotes', value: loading ? '...' : String(data?.pendingQuotes ?? 0), icon: Receipt, change: 'Awaiting review', color: 'text-purple-400' },
    { label: 'Active Shipments', value: loading ? '...' : String(data?.activeShipments ?? 0), icon: Truck, change: 'In transit or customs', color: 'text-cyan-400' },
    { label: 'Total Clients', value: loading ? '...' : String(data?.totalClients ?? 0), icon: Users, change: 'Registered users', color: 'text-gold' },
  ];

  const recentRequests = data?.recentRequests ?? [];
  const recentMessages = data?.recentMessages ?? [];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-2xl sm:text-3xl text-white mb-2">Admin Dashboard</h1>
        <p className="text-sm text-muted/50 mb-8">Overview of operations and key metrics.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="bg-dark-card border border-border/20 p-5 hover:border-gold/10 transition-colors">
              <stat.icon size={18} strokeWidth={1.2} className={`${stat.color} mb-3 opacity-60`} />
              <p className="text-xl text-white font-light">{stat.value}</p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-muted/40 mt-1">{stat.label}</p>
              <p className="text-[10px] text-muted/30 mt-2">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-dark-card border border-border/20 p-6">
            <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-4">Recent Requests</h3>
            {recentRequests.length > 0 ? (
              <div className="space-y-3">
                {recentRequests.map((req) => (
                  <div key={req.id as string} className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
                    <div>
                      <p className="text-sm text-white">{String(req.reference_number || 'N/A')}</p>
                      <p className="text-[10px] text-muted/40">{String(req.asset_type || 'Asset')}{req.manufacturer ? ` - ${String(req.manufacturer)}` : ''}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] tracking-wider uppercase border border-gold/20 text-gold/70">
                      {String(req.status || 'pending')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted/40">No recent requests to display.</p>
              </div>
            )}
          </div>
          <div className="bg-dark-card border border-border/20 p-6">
            <h3 className="text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-4">Recent Messages</h3>
            {recentMessages.length > 0 ? (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id as string} className="flex items-start gap-3 py-2 border-b border-border/10 last:border-0">
                    <MessageSquare size={14} className="text-gold/30 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-white/80 line-clamp-1">{String(msg.subject || msg.content || 'No subject')}</p>
                      <p className="text-[10px] text-muted/40 mt-0.5">
                        {msg.sender && typeof msg.sender === 'object' && msg.sender !== null ? String((msg.sender as Record<string, unknown>).full_name || 'Unknown') : 'Unknown'}
                        {' '}&rarr;{' '}
                        {msg.receiver && typeof msg.receiver === 'object' && msg.receiver !== null ? String((msg.receiver as Record<string, unknown>).full_name || 'Unknown') : 'Unknown'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted/40">No recent messages to display.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
