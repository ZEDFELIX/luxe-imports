'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const slides = [
  {
    title: 'GLOBAL LUXURY.',
    subtitle: 'DELIVERED.',
    category: 'Cars • Aircraft • Yachts',
    description: 'Bespoke sourcing, import, export and international logistics for premium automobiles, aircraft and marine vessels.',
  },
  {
    title: 'ROAD.',
    subtitle: 'REDIFINED.',
    category: 'Automotive Division',
    description: 'From Rolls-Royce to Ferrari, we source and deliver the world\'s finest automobiles.',
  },
  {
    title: 'SKY.',
    subtitle: 'UNLIMITED.',
    category: 'Aviation Division',
    description: 'Private jets, helicopters and bespoke aviation acquisition across every continent.',
  },
  {
    title: 'SEA.',
    subtitle: 'MASTERED.',
    category: 'Marine Division',
    description: 'Superyachts, motor yachts and luxury vessels sourced from the world\'s premier builders.',
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format"
          alt="Luxury car at sunset"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(200,169,107,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(200,169,107,0.05),transparent_50%)]" />
        {/* Cinematic grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  current === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute'
                }`}
              >
                <p className="text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-gold/70 mb-4 sm:mb-6">
                  {slide.category}
                </p>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-light text-white leading-[0.95] mb-2">
                  {slide.title}
                </h1>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-light text-gradient-gold leading-[0.95] mb-6 sm:mb-8">
                  {slide.subtitle}
                </h1>
                <p className="text-muted/60 text-sm sm:text-base max-w-lg mb-8 sm:mb-10 leading-relaxed">
                  {slide.description}
                </p>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 group"
              >
                Explore Our Services
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-gold/30 text-gold text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-300"
              >
                Start a Request
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Labels */}
      <div className="relative hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {['Global Sourcing', 'Verified Assets', 'End-to-End Logistics'].map(
              (label) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold/60 rounded-full" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted/50">
                    {label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-[2px] transition-all duration-500 ${
                    current === index
                      ? 'w-10 bg-gold'
                      : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="text-[11px] tracking-[0.15em] text-muted/40 uppercase">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={20} className="text-gold/30" />
      </motion.div>
    </section>
  );
}
