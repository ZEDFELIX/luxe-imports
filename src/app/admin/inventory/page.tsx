'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Search, Edit2, Trash2, X, Eye, EyeOff } from 'lucide-react';
import { DEMO_VEHICLES, DEMO_AIRCRAFT, DEMO_MARINE } from '@/lib/constants';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';
import toast from 'react-hot-toast';

type Tab = 'vehicles' | 'aircraft' | 'marine';
type Avail = 'available' | 'incoming' | 'reserved' | 'sold';

interface VF {
  slug: string; title: string; manufacturer: string; model: string;
  year: number; category: string; price: number; availability: Avail;
  engine: string; transmission: string; fuel_type: string; mileage: number;
  color: string; origin_country: string; location: string; description: string;
  images: string[]; published: boolean; featured: boolean;
}

const EMPTY: VF = {
  slug: '', title: '', manufacturer: '', model: '', year: 2024,
  category: 'Sedan', price: 0, availability: 'available', engine: '',
  transmission: 'Automatic', fuel_type: 'Petrol', mileage: 0, color: '',
  origin_country: 'Japan', location: '', description: '', images: [],
  published: true, featured: false,
};

const AVAIL_CLS: Record<Avail, string> = {
  available: 'text-green-400 bg-green-400/10 border-green-400/20',
  incoming: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  reserved: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  sold: 'text-red-400 bg-red-400/10 border-red-400/20',
};

const FIELDS: { key: string; label: string; type?: string; required?: boolean }[] = [
  { key: 'title', label: 'Title', required: true },
  { key: 'manufacturer', label: 'Manufacturer', required: true },
  { key: 'model', label: 'Model' },
  { key: 'year', label: 'Year', type: 'number' },
  { key: 'price', label: 'Price (USD)', type: 'number' },
  { key: 'engine', label: 'Engine' },
  { key: 'mileage', label: 'Mileage (km)', type: 'number' },
  { key: 'color', label: 'Color' },
  { key: 'location', label: 'Location' },
  { key: 'origin_country', label: 'Origin Country' },
];

export default function AdminInventory() {
  const { currency } = useCurrency();
  const [tab, setTab] = useState<Tab>('vehicles');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [form, setForm] = useState<VF>(EMPTY);

  useEffect(() => {
    const demo = tab === 'vehicles' ? DEMO_VEHICLES : tab === 'aircraft' ? DEMO_AIRCRAFT : DEMO_MARINE;
    const saved = localStorage.getItem('luxe-admin-' + tab);
    let custom: Record<string, unknown>[] = [];
    if (saved) { try { custom = JSON.parse(saved); } catch {} }
    setItems([...custom, ...demo as unknown as Record<string, unknown>[]]);
  }, [tab]);

  const filtered = items.filter(i =>
    !search || String(i.title).toLowerCase().includes(search.toLowerCase()) ||
    String(i.manufacturer || i.builder || '').toLowerCase().includes(search.toLowerCase())
  );

  function persist(all: Record<string, unknown>[]) {
    const demo = tab === 'vehicles' ? DEMO_VEHICLES : tab === 'aircraft' ? DEMO_AIRCRAFT : DEMO_MARINE;
    const custom = all.filter(i => !demo.some((d: any) => d.slug === i.slug));
    localStorage.setItem('luxe-admin-' + tab, JSON.stringify(custom));
    setItems([...custom, ...demo as unknown as Record<string, unknown>[]]);
  }

  function save() {
    if (!form.title || !form.manufacturer) { toast.error('Title and manufacturer required'); return; }
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (editSlug) {
      persist(items.map(i => String(i.slug) === editSlug ? { ...i, ...form, slug } : i));
      toast.success('Vehicle updated');
    } else {
      persist([{ ...form, slug, images: form.images.length ? form.images : ['/images/placeholder.svg'] } as any, ...items]);
      toast.success('Vehicle added');
    }
    setShowForm(false); setEditSlug(null); setForm(EMPTY);
  }

  function del(slug: string) {
    if (!confirm('Delete this vehicle?')) return;
    persist(items.filter(i => String(i.slug) !== slug));
    toast.success('Deleted');
  }

  function openEdit(item: Record<string, unknown>) {
    setForm({
      slug: String(item.slug || ''), title: String(item.title || ''),
      manufacturer: String(item.manufacturer || ''), model: String(item.model || ''),
      year: Number(item.year) || 2024, category: String(item.category || 'Sedan'),
      price: Number(item.price) || 0, availability: (item.availability as Avail) || 'available',
      engine: String(item.engine || ''), transmission: String(item.transmission || 'Automatic'),
      fuel_type: String(item.fuel_type || 'Petrol'), mileage: Number(item.mileage) || 0,
      color: String(item.color || ''), origin_country: String(item.origin_country || 'Japan'),
      location: String(item.location || ''), description: String(item.description || ''),
      images: (item.images as string[]) || [], published: item.published !== false,
      featured: !!item.featured,
    });
    setEditSlug(String(item.slug));
    setShowForm(true);
  }

  function togglePub(slug: string) {
    persist(items.map(i => String(i.slug) === slug ? { ...i, published: !i.published } : i));
  }

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Inventory</h1>
          <p className="text-sm text-muted/50">Manage vehicles, aircraft and marine assets.</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditSlug(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold text-dark text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
          <Plus size={14} /> Add Vehicle
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {(['vehicles', 'aircraft', 'marine'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all ${tab === t ? 'border-gold/40 text-gold bg-gold/5' : 'border-border/30 text-muted/50 hover:text-white'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="mb-6 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted/40" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory..."
          className="w-full bg-dark-card border border-border/30 pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none" />
      </div>

      <div className="space-y-2">
        {filtered.map(item => (
          <div key={String(item.slug)} className="flex items-center justify-between bg-dark-card border border-border/20 p-4 hover:border-gold/10 transition-colors">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 bg-dark flex items-center justify-center border border-border/20 shrink-0">
                <Package size={16} className="text-gold/30" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white truncate">{String(item.title)}</p>
                  {item.published === false && <span className="text-[8px] px-1.5 py-0.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">DRAFT</span>}
                </div>
                <p className="text-[10px] text-muted/40">{String(item.manufacturer || item.builder || '')} &bull; {String(item.year || '')} &bull; {String(item.category || '')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              {'availability' in item && typeof item.availability === 'string' && item.availability && (
                <span className={`text-[9px] tracking-[0.1em] uppercase px-2 py-1 border hidden sm:inline-block ${AVAIL_CLS[item.availability as Avail] || ''}`}>
                  {String(item.availability)}
                </span>
              )}
              <p className="text-sm text-gold w-32 text-right hidden sm:block">{getPriceInCurrency(Number(item.price) || 0, currency)}</p>
              <div className="flex items-center gap-1">
                <button onClick={() => togglePub(String(item.slug))} className="p-1.5 text-muted/40 hover:text-white transition-colors">
                  {item.published === false ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => openEdit(item)} className="p-1.5 text-muted/40 hover:text-gold transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => del(String(item.slug))} className="p-1.5 text-muted/40 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package size={32} className="text-muted/20 mx-auto mb-4" />
            <p className="text-sm text-muted/40">No items found.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 overflow-y-auto pb-20"
            onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-dark-card border border-border/30 p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-lg text-white">{editSlug ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 text-muted/40 hover:text-white"><X size={18} /></button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {FIELDS.map(f => (
                  <div key={f.key} className={f.key === 'title' ? 'col-span-2' : ''}>
                    <label className="block text-[10px] tracking-[0.1em] uppercase text-muted/50 mb-1">{f.label}{f.required && ' *'}</label>
                    <input type={f.type || 'text'}
                      value={String((form as any)[f.key] || '')}
                      onChange={e => set(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                      className="w-full bg-dark border border-border/30 px-3 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[10px] tracking-[0.1em] uppercase text-muted/50 mb-1">Category</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}
                    className="w-full bg-dark border border-border/30 px-3 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none appearance-none">
                    {['Sedan', 'SUV', 'Coupe', 'Sports Car', 'Convertible', 'Wagon', 'Truck'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.1em] uppercase text-muted/50 mb-1">Availability</label>
                  <select value={form.availability} onChange={e => set('availability', e.target.value)}
                    className="w-full bg-dark border border-border/30 px-3 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none appearance-none">
                    {['available', 'incoming', 'reserved', 'sold'].map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.1em] uppercase text-muted/50 mb-1">Transmission</label>
                  <select value={form.transmission} onChange={e => set('transmission', e.target.value)}
                    className="w-full bg-dark border border-border/30 px-3 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none appearance-none">
                    <option>Automatic</option><option>Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.1em] uppercase text-muted/50 mb-1">Fuel Type</label>
                  <select value={form.fuel_type} onChange={e => set('fuel_type', e.target.value)}
                    className="w-full bg-dark border border-border/30 px-3 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none appearance-none">
                    {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Jet Fuel', 'Turbine'].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[10px] tracking-[0.1em] uppercase text-muted/50 mb-1">Description</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
                  className="w-full bg-dark border border-border/30 px-3 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none resize-none" />
              </div>

              <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)}
                    className="accent-[#C8A96B]" />
                  <span className="text-xs text-muted/60">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)}
                    className="accent-[#C8A96B]" />
                  <span className="text-xs text-muted/60">Featured</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button onClick={save}
                  className="flex-1 py-3 bg-gold text-dark text-[11px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
                  {editSlug ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
                <button onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-border/30 text-muted/60 text-[11px] tracking-[0.15em] uppercase hover:text-white transition-all">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
