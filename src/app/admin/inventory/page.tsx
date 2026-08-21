'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search } from 'lucide-react';
import { DEMO_VEHICLES, DEMO_AIRCRAFT, DEMO_MARINE } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import { getInventory } from '@/lib/actions/inventory';

type Tab = 'vehicles' | 'aircraft' | 'marine';

export default function AdminInventory() {
  const [activeTab, setActiveTab] = useState<Tab>('vehicles');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) {
      setItems(activeTab === 'vehicles' ? DEMO_VEHICLES as unknown as Record<string, unknown>[] : activeTab === 'aircraft' ? DEMO_AIRCRAFT as unknown as Record<string, unknown>[] : DEMO_MARINE as unknown as Record<string, unknown>[]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getInventory(activeTab)
      .then((data) => {
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(activeTab === 'vehicles' ? DEMO_VEHICLES as unknown as Record<string, unknown>[] : activeTab === 'aircraft' ? DEMO_AIRCRAFT as unknown as Record<string, unknown>[] : DEMO_MARINE as unknown as Record<string, unknown>[]);
        }
      })
      .catch(() => {
        setItems(activeTab === 'vehicles' ? DEMO_VEHICLES as unknown as Record<string, unknown>[] : activeTab === 'aircraft' ? DEMO_AIRCRAFT as unknown as Record<string, unknown>[] : DEMO_MARINE as unknown as Record<string, unknown>[]);
      })
      .finally(() => setLoading(false));
  }, [activeTab]);

  const filtered = items.filter((item) =>
    !search || String(item.title || '').toLowerCase().includes(search.toLowerCase()) || String(item.manufacturer || item.builder || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Inventory</h1>
          <p className="text-sm text-muted/50">Manage vehicles, aircraft and marine assets.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gold text-dark text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
          <Plus size={14} /> Add Asset
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {(['vehicles', 'aircraft', 'marine'] as Tab[]).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all ${activeTab === tab ? 'border-gold/40 text-gold bg-gold/5' : 'border-border/30 text-muted/50 hover:text-white'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-6 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inventory..."
          className="w-full bg-dark-card border border-border/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
      </div>

      {!loading && filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={String(item.slug || item.id)} className="flex items-center justify-between bg-dark-card border border-border/20 p-4 hover:border-gold/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-dark flex items-center justify-center border border-border/20">
                  <Package size={16} className="text-gold/30" />
                </div>
                <div>
                  <p className="text-sm text-white">{String(item.title)}</p>
                  <p className="text-[10px] text-muted/40">{String(item.manufacturer || item.builder || '')} &bull; {String(item.year || '')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gold">{formatCurrency(Number(item.price) || 0)}</p>
                <p className="text-[10px] text-muted/40">{item.published ? 'Published' : 'Draft'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <Package size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Items</h3>
          <p className="text-sm text-muted/40">No inventory items found for this category.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
