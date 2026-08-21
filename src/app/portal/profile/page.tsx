'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProfile, updateProfile } from '@/lib/actions/profile';
import toast from 'react-hot-toast';

export default function PortalProfile() {
  const [profile, setProfile] = useState({ full_name: '', email: '', phone: '', country: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getProfile()
      .then((data) => {
        if (data) {
          setProfile({
            full_name: String(data.full_name || ''),
            email: String(data.email || ''),
            phone: String(data.phone || ''),
            country: String(data.country || ''),
          });
        }
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ full_name: profile.full_name, phone: profile.phone, country: profile.country });
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Profile</h1>
        <p className="text-sm text-muted/50 mb-8">Loading profile...</p>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Profile</h1>
      <p className="text-sm text-muted/50 mb-8">Manage your personal information.</p>

      <form onSubmit={handleSave} className="max-w-lg space-y-5">
        <div>
          <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Full Name</label>
          <input type="text" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Email</label>
          <input type="email" value={profile.email} disabled
            className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-muted/50 cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Phone</label>
          <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Country</label>
          <input type="text" value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })}
            className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors" />
        </div>
        <button type="submit" disabled={loading}
          className="px-8 py-3.5 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </motion.div>
  );
}
