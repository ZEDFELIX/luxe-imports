'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { register } from '@/lib/actions/auth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form.email, form.password, form.full_name);
      toast.success('Account created successfully');
      router.push('/portal');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen flex items-center">
      <div className="w-full mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Create Account</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">Join Luxe Imports</h1>
            <p className="text-sm text-muted/60">Create your client account to track acquisitions</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Full Name</label>
              <input type="text" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-dark-card border border-border/40 px-4 py-3.5 pr-12 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Confirm Password</label>
              <input type="password" required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all disabled:opacity-50 group">
              {loading ? 'Creating account...' : (
                <>Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted/40">
            Demo mode: Use any email with password demo123
          </p>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted/50">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-gold hover:text-gold-light transition-colors">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
