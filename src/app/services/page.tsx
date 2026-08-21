'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe, ArrowLeftRight, Truck, FileCheck, Search, ClipboardCheck, Headphones, Crown } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Globe, ArrowLeftRight, Truck, FileCheck, Search, ClipboardCheck, Headphones, Crown,
};

const services = [
  { icon: Globe, title: 'Global Sourcing', description: 'We leverage an extensive worldwide network to locate and acquire the finest luxury automobiles, aircraft and marine vessels. Our sourcing specialists operate across 50+ countries.', details: ['Private collection access', 'Dealer network sourcing', 'Auction representation', 'Factory orders'] },
  { icon: ArrowLeftRight, title: 'Import & Export', description: 'Seamless cross-border transactions with full compliance to international trade regulations. We handle every aspect of the import/export process.', details: ['Trade compliance', 'Documentation', 'Tax optimization', 'Bilateral agreements'] },
  { icon: Truck, title: 'Shipping & Logistics', description: 'Specialized transport solutions designed for high-value assets. From RoRo to air freight, we ensure your asset travels safely.', details: ['RoRo shipping', 'Container shipping', 'Air freight', 'Marine transport'] },
  { icon: FileCheck, title: 'Customs Clearance', description: 'Expert handling of all customs documentation, duties and regulatory requirements at destination.', details: ['Duty classification', 'Documentation prep', 'Broker coordination', 'Clearance tracking'] },
  { icon: Search, title: 'Inspection & Verification', description: 'Thorough independent verification of condition, authenticity and specifications before any commitment is made.', details: ['Pre-purchase inspection', 'Condition reporting', 'VIN/serial verification', 'Third-party surveys'] },
  { icon: ClipboardCheck, title: 'Registration Support', description: 'Complete assistance with vehicle registration and documentation in your jurisdiction.', details: ['Title processing', 'Registration filing', 'Compliance certification', 'Plate & tag assistance'] },
  { icon: Headphones, title: 'After-Sales Support', description: 'Ongoing assistance long after delivery. We remain your partner for maintenance referrals, warranty support and future re-export.', details: ['Maintenance referrals', 'Warranty claims', 'Re-export assistance', 'Insurance coordination'] },
  { icon: Crown, title: 'Private Client Services', description: 'Confidential handling of high-value acquisitions with dedicated personal account management for our most discerning clients.', details: ['Dedicated account manager', 'Priority sourcing', 'Complete discretion', '24/7 availability'] },
];

export default function ServicesPage() {
  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(200,169,107,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">What We Do</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6">
              End-to-End <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="text-muted/60 text-sm sm:text-base leading-relaxed">
              From initial sourcing to final delivery, we provide a complete suite of services for the acquisition, import and logistics of luxury assets worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="luxury-divider" />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-10 sm:py-12 border-b border-border/15 group"
              >
                <div className="lg:col-span-1 flex items-start">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                    <service.icon size={18} strokeWidth={1.2} className="text-gold/60" />
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-3">{service.title}</h3>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-sm text-muted/60 leading-relaxed">{service.description}</p>
                </div>
                <div className="lg:col-span-3">
                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-muted/50">
                        <div className="w-1 h-1 bg-gold/40 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-dark-alt">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Get Started</p>
          <h2 className="font-serif text-2xl sm:text-4xl font-light text-white mb-4">Ready to Begin?</h2>
          <p className="text-muted/60 text-sm mb-8">Contact us to discuss your requirements or submit a sourcing request.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all group">
              Request a Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/automotive" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/30 text-gold text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold/10 transition-all">
              Browse Inventory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
