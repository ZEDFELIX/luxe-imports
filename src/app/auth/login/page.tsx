'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { login } from '@/lib/actions/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('Welcome back');
        router.push('/portal');
        router.refresh();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen flex items-center">
      <div className="w-full mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Client Portal</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">Welcome Back</h1>
            <p className="text-sm text-muted/60">Sign in to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-card border border-border/40 px-4 py-3.5 pr-12 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/40 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 accent-gold" />
                <span className="text-muted/60">Remember me</span>
              </label>
              <Link href="/auth/reset-password" className="text-gold/60 hover:text-gold transition-colors">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all disabled:opacity-50 group">
              {loading ? 'Signing in...' : (
                <>Sign In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-muted/40">
            Demo mode: Use any email with password demo123
          </p>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted/50">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-gold hover:text-gold-light transition-colors">Register</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
