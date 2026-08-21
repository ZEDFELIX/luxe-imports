'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen flex items-center">
      <div className="w-full mx-auto max-w-md px-4 sm:px-6 py-12 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center py-10">
            <div className="w-14 h-14 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={24} className="text-gold" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white mb-3">Password Reset</h1>
            <p className="text-sm text-muted/60 mb-8">
              Password reset is not available in this demo. Please contact an administrator to reset your password.
            </p>
            <Link href="/auth/login"
              className="inline-block px-8 py-3.5 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all">
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
