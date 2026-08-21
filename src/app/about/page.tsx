'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Shield, Eye, Users, Target, Clock } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Trust', description: 'Every transaction is built on transparency and accountability.' },
  { icon: Eye, title: 'Transparency', description: 'Full visibility into every stage of the acquisition process.' },
  { icon: Globe, title: 'Global Reach', description: 'A sourcing network spanning 50+ countries across six continents.' },
  { icon: Users, title: 'Discretion', description: 'Complete confidentiality for high-value and sensitive acquisitions.' },
  { icon: Target, title: 'Precision', description: 'Meticulous attention to specification, condition and documentation.' },
  { icon: Clock, title: 'Timeliness', description: 'Efficient processes that respect your schedule and deadlines.' },
];

export default function AboutPage() {
  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(200,169,107,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">About Us</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
              Beyond Import.<br /><span className="text-gradient-gold">Beyond Export.</span>
            </h1>
            <p className="text-muted/60 text-sm sm:text-base leading-relaxed max-w-xl">
              Luxe Imports is a global luxury acquisition and logistics company. We specialise in sourcing, verifying, transporting and delivering the world&apos;s finest automobiles, aircraft and marine vessels.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="luxury-divider" />

      {/* Philosophy */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Our Philosophy</p>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-white mb-6">
                Precision. Integrity. Global Excellence.
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="space-y-4 text-sm text-muted/60 leading-relaxed">
                <p>
                  In the world of luxury acquisitions, every detail matters. A vehicle&apos;s history, an aircraft&apos;s maintenance records, a yacht&apos;s survey report — these are not mere formalities. They are the foundation of confidence.
                </p>
                <p>
                  We operate at the intersection of global commerce and personal trust. Our role is to ensure that the acquisition of a significant asset is handled with the same care and precision as the asset itself was built.
                </p>
                <p>
                  From the moment you make contact to the moment your asset arrives at its destination, every step is managed, documented and communicated with clarity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-dark-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Our Values</p>
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-white">What Guides Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="bg-dark-card border border-border/20 p-6 sm:p-8"
              >
                <value.icon size={24} strokeWidth={1.2} className="text-gold/50 mb-4" />
                <h3 className="font-serif text-lg text-white mb-2">{value.title}</h3>
                <p className="text-sm text-muted/50 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format"
            alt="Luxury vehicle"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-dark/80" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">How We Work</p>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-white mb-8">
            Source → Verify → Acquire → Transport → Deliver
          </h2>
          <p className="text-muted/60 text-sm leading-relaxed mb-10">
            Every acquisition follows our proven five-stage process, designed to eliminate risk and ensure complete satisfaction at every step.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all group">
            Start Your Acquisition <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
