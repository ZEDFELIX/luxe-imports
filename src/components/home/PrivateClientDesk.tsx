'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

export function PrivateClientDesk() {
  return (
    <section className="py-20 sm:py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80&auto=format"
          alt=""
          fill
          className="object-cover opacity-[0.04]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-dark/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(200,169,107,0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/20 mb-8">
            <Lock size={14} className="text-gold/60" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60">
              Confidential Service
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
            For Those Who Know<br />
            <span className="text-gradient-gold">Exactly What They Want.</span>
          </h2>

          <p className="text-muted/60 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10">
            Some acquisitions shouldn&apos;t be searchable. Our Private Client Desk handles confidential requests for rare, bespoke and high-value assets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 group"
            >
              Request Private Access
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 border-t border-border/20">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {['Complete Discretion', 'Dedicated Account Manager', 'Priority Sourcing'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gold/50 rounded-full" />
                    <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted/40">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
