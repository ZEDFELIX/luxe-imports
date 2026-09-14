'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Shield } from 'lucide-react';
import { logout } from '@/lib/actions/auth';
import toast from 'react-hot-toast';

export default function PortalSettings() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      toast.error('Signed out locally');
    }
    toast.success('Signed out');
    router.push('/');
    router.refresh();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Settings</h1>
      <p className="text-sm text-muted/50 mb-8">Manage your account settings.</p>

      <div className="space-y-6 max-w-lg">
        <div className="bg-dark-card border border-border/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={18} className="text-gold/50" />
            <h3 className="text-sm text-white">Account Security</h3>
          </div>
          <p className="text-xs text-muted/50 mb-4">Manage your password and security preferences.</p>
          <button className="px-4 py-2.5 border border-border/30 text-[11px] tracking-[0.1em] uppercase text-muted/60 hover:text-white hover:border-gold/30 transition-all">
            Change Password
          </button>
        </div>

        <div className="bg-dark-card border border-border/20 p-6">
          <h3 className="text-sm text-white mb-4">Notifications</h3>
          <div className="space-y-3">
            {['Email notifications for status updates', 'Email notifications for new quotes', 'Email notifications for messages'].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-gold" />
                <span className="text-xs text-muted/60">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-dark-card border border-red-500/20 p-6">
          <h3 className="text-sm text-white mb-4">Sign Out</h3>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 border border-red-500/30 text-[11px] tracking-[0.1em] uppercase text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>
    </motion.div>
  );
}
