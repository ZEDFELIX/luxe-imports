'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, MapPin } from 'lucide-react';
import { getAllClients } from '@/lib/actions/clients';

export default function AdminClients() {
  const [clients, setClients] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) { setLoading(false); return; }

    getAllClients()
      .then((data) => setClients(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = clients.filter((client) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return String(client.full_name || '').toLowerCase().includes(q) ||
      String(client.email || '').toLowerCase().includes(q) ||
      String(client.phone || '').toLowerCase().includes(q);
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Client Management</h1>
          <p className="text-sm text-muted/50">View and manage client accounts.</p>
        </div>
      </div>
      <div className="mb-6 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..."
          className="w-full bg-dark-card border border-border/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
      </div>

      {!loading && filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((client) => (
            <div key={String(client.id)} className="bg-dark-card border border-border/20 p-5 hover:border-gold/10 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-dark flex items-center justify-center border border-border/20 rounded-full">
                    <span className="text-sm text-gold/60 font-light">{String(client.full_name || 'U').charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm text-white">{String(client.full_name || 'Unknown')}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {!!client.email && (
                        <span className="flex items-center gap-1 text-[10px] text-muted/40">
                          <Mail size={10} /> {String(client.email)}
                        </span>
                      )}
                      {!!client.phone && (
                        <span className="flex items-center gap-1 text-[10px] text-muted/40">
                          <Phone size={10} /> {String(client.phone)}
                        </span>
                      )}
                      {!!client.country && (
                        <span className="flex items-center gap-1 text-[10px] text-muted/40">
                          <MapPin size={10} /> {String(client.country)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 text-[9px] tracking-wider uppercase border border-gold/20 text-gold/70">
                    {String(client.role || 'CLIENT')}
                  </span>
                  {!!client.created_at && (
                    <p className="text-[10px] text-muted/30 mt-1">Joined {new Date(String(client.created_at)).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <Users size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Clients</h3>
          <p className="text-sm text-muted/40">Registered clients will appear here.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
