'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Camera, ArrowRight } from 'lucide-react';
import { DEMO_VEHICLES, DEMO_AIRCRAFT, DEMO_MARINE } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

type Tab = 'automotive' | 'aviation' | 'marine';

export function FeaturedCollection() {
  const [activeTab, setActiveTab] = useState<Tab>('automotive');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'automotive', label: 'Automotive' },
    { id: 'aviation', label: 'Aviation' },
    { id: 'marine', label: 'Marine' },
  ];

  const getItems = () => {
    switch (activeTab) {
      case 'automotive':
        return DEMO_VEHICLES.map((v) => ({
          id: v.slug,
          title: v.title,
          subtitle: `${v.manufacturer} • ${v.year}`,
          price: v.price,
          location: v.location,
          detail: v.engine || '',
          href: `/automotive/${v.slug}`,
          featured: v.featured,
          image: v.images[0] || '',
          photoCount: v.images?.length || 0,
        }));
      case 'aviation':
        return DEMO_AIRCRAFT.map((a) => ({
          id: a.slug,
          title: a.title,
          subtitle: `${a.manufacturer} • ${a.year}`,
          price: a.price,
          location: a.location,
          detail: a.engine_type || '',
          href: `/aviation/${a.slug}`,
          featured: a.featured,
          image: a.images[0] || '',
          photoCount: a.images?.length || 0,
        }));
      case 'marine':
        return DEMO_MARINE.map((m) => ({
          id: m.slug,
          title: m.title,
          subtitle: `${m.builder} • ${m.year}`,
          price: m.price,
          location: m.location,
          detail: m.length_ft ? `${m.length_ft}ft` : '',
          href: `/marine/${m.slug}`,
          featured: m.featured,
          image: m.images[0] || '',
          photoCount: m.images?.length || 0,
        }));
    }
  };

  const items = getItems();

  return (
    <section className="py-20 sm:py-32 bg-dark relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">
              Current Inventory
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white">
              Featured <span className="text-gradient-gold">Collection</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border border-border/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gold text-dark'
                    : 'text-muted/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Link
                href={item.href}
                className="group block bg-dark-card border border-border/20 overflow-hidden editorial-hover"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-dark-card to-dark flex items-center justify-center">
                      <p className="font-serif text-lg text-white/20">{item.subtitle.split('•')[0].trim()}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 text-[10px] text-white/80 z-10">
                    <Camera size={10} /> {item.photoCount} Photos
                  </div>
                  {item.featured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-1 text-[9px] tracking-[0.15em] uppercase bg-gold/20 text-gold border border-gold/30">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg text-white mb-1 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted/50 mb-3">{item.subtitle}</p>

                  {item.detail && (
                    <p className="text-xs text-muted/40 mb-3">{item.detail}</p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-border/20">
                    <div className="flex items-center gap-1.5 text-muted/40">
                      <MapPin size={12} />
                      <span className="text-[10px] tracking-wider">{item.location}</span>
                    </div>
                    <span className="text-sm text-gold font-light">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link
            href={`/${activeTab === 'automotive' ? 'automotive' : activeTab}`}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-gold hover:text-gold-light transition-colors group"
          >
            View All {activeTab === 'automotive' ? 'Vehicles' : activeTab === 'aviation' ? 'Aircraft' : 'Vessels'}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
