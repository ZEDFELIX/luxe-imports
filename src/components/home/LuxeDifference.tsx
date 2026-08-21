'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Handshake, Ship, PackageCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'WE SOURCE',
    description: 'Our global network locates the exact asset you seek, from private collections to dealer networks worldwide.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'WE VERIFY',
    description: 'Independent inspection, documentation verification and condition assessment before any commitment.',
  },
  {
    number: '03',
    icon: Handshake,
    title: 'WE NEGOTIATE',
    description: 'Expert negotiation on your behalf to secure the best possible terms and price.',
  },
  {
    number: '04',
    icon: Ship,
    title: 'WE TRANSPORT',
    description: 'Specialized logistics — RoRo, container, air freight or marine transport with full insurance coverage.',
  },
  {
    number: '05',
    icon: PackageCheck,
    title: 'WE DELIVER',
    description: 'Customs clearance, documentation and final delivery to your specified destination.',
  },
];

export function LuxeDifference() {
  return (
    <section className="py-20 sm:py-32 bg-dark-alt relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format"
          alt=""
          fill
          className="object-cover opacity-[0.03]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-dark-alt/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,169,107,0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">
            Our Process
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            The Luxe <span className="text-gradient-gold">Difference</span>
          </h2>
          <p className="text-muted/60 text-sm sm:text-base max-w-md mx-auto">
            An end-to-end experience tailored to you.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                className="relative text-center group"
              >
                {/* Step number + icon */}
                <div className="relative inline-flex flex-col items-center mb-6">
                  <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mb-4 group-hover:border-gold/50 transition-all duration-500 bg-dark-card">
                    <step.icon size={22} strokeWidth={1.2} className="text-gold/70" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-[10px] tracking-wider text-gold/40 font-mono">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-[13px] font-medium tracking-[0.15em] uppercase text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-muted/50 leading-relaxed max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
