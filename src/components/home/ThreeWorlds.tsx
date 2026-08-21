'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Car, Plane, Ship } from 'lucide-react';

const worlds = [
  {
    icon: Car,
    title: 'AUTOMOTIVE',
    description: 'Luxury cars, supercars, SUVs, classics and rare automobiles sourced from the world\'s finest manufacturers.',
    href: '/automotive',
    count: 'Rolls-Royce • Bentley • Ferrari • Porsche • Lamborghini',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format',
  },
  {
    icon: Plane,
    title: 'AVIATION',
    description: 'Private jets, aircraft and bespoke aviation acquisition for those who travel above the ordinary.',
    href: '/aviation',
    count: 'Bombardier • Gulfstream • Cessna • Dassault • Pilatus',
    image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&q=80&auto=format',
  },
  {
    icon: Ship,
    title: 'MARINE',
    description: 'Yachts, superyachts, boats and marine vessels sourced from premier shipyards around the globe.',
    href: '/marine',
    count: 'Lürssen • Feadship • Benetti • Sunseeker • Princess',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80&auto=format',
  },
];

export function ThreeWorlds() {
  return (
    <section className="py-20 sm:py-32 bg-dark relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">
            Our Divisions
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white">
            Three Worlds of<br />
            <span className="text-gradient-gold">Luxury</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {worlds.map((world, index) => (
            <motion.div
              key={world.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Link
                href={world.href}
                className="group block relative bg-dark-card border border-border/30 overflow-hidden h-full"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={world.image}
                    alt={world.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-dark/70 group-hover:bg-dark/60 transition-all duration-500" />

                {/* Gold accent line */}
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-700 z-10" />

                <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full">
                  <world.icon
                    size={32}
                    strokeWidth={1}
                    className="text-gold/60 mb-6 sm:mb-8"
                  />

                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-4 tracking-wide">
                    {world.title}
                  </h3>

                  <p className="text-sm text-muted/60 leading-relaxed mb-8">
                    {world.description}
                  </p>

                  <div className="mt-auto">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-6">
                      {world.count}
                    </p>
                    <div className="flex items-center gap-2 text-gold text-[12px] tracking-[0.1em] uppercase group-hover:gap-3 transition-all duration-300">
                      <span>Explore</span>
                      <span className="text-gold/60">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
