'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Truck, ChevronRight } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { ThreeWorlds } from '@/components/home/ThreeWorlds';
import { LuxeDifference } from '@/components/home/LuxeDifference';
import { GlobalSourcingForm } from '@/components/home/GlobalSourcingForm';
import { GlobalLogistics } from '@/components/home/GlobalLogistics';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { PrivateClientDesk } from '@/components/home/PrivateClientDesk';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreeWorlds />
      <LuxeDifference />
      <GlobalSourcingForm />
      <GlobalLogistics />
      <FeaturedCollection />
      <PrivateClientDesk />

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80&auto=format"
            alt=""
            fill
            className="object-cover opacity-[0.06]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-dark/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.06),transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-6">
              Begin Your Journey
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
              Ready to Acquire<br />
              <span className="text-gradient-gold">Something Extraordinary?</span>
            </h2>
            <p className="text-muted/70 text-base sm:text-lg max-w-xl mx-auto mb-10">
              Submit a private request and let our global network source exactly what you&apos;re looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 group"
              >
                Start a Request
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/automotive"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-gold/30 text-gold text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-300"
              >
                Explore Inventory
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
