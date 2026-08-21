'use client';

import { motion } from 'framer-motion';
import { Truck, Plane, Ship, FileCheck, ClipboardList, FileText, MapPin } from 'lucide-react';

const services = [
  'International Shipping',
  'RoRo & Container Shipping',
  'Air Freight',
  'Marine Transport',
  'Customs Coordination',
  'Documentation',
  'Destination Delivery',
];

const regions = [
  { name: 'United Kingdom', x: '45%', y: '25%' },
  { name: 'Germany', x: '48%', y: '26%' },
  { name: 'Japan', x: '82%', y: '35%' },
  { name: 'UAE', x: '58%', y: '40%' },
  { name: 'USA', x: '18%', y: '32%' },
  { name: 'South Africa', x: '52%', y: '65%' },
  { name: 'Kenya', x: '55%', y: '48%' },
];

const routes = [
  { from: [45, 25], to: [48, 26] },
  { from: [45, 25], to: [82, 35] },
  { from: [45, 25], to: [58, 40] },
  { from: [45, 25], to: [18, 32] },
  { from: [48, 26], to: [82, 35] },
  { from: [82, 35], to: [58, 40] },
  { from: [58, 40], to: [55, 48] },
  { from: [55, 48], to: [52, 65] },
  { from: [18, 32], to: [52, 65] },
  { from: [45, 25], to: [52, 65] },
];

export function GlobalLogistics() {
  return (
    <section className="py-20 sm:py-32 bg-dark-alt relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">
            Global Logistics
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white">
            From Anywhere.<br />
            <span className="text-gradient-gold">To Anywhere.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[16/10] bg-dark-card border border-border/20 rounded-sm overflow-hidden"
          >
            <svg viewBox="0 0 100 70" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* World map outline (simplified) */}
              <g opacity="0.15" stroke="#C8A96B" strokeWidth="0.15" fill="none">
                {/* Simplified continents */}
                <path d="M10,20 L12,18 L15,19 L18,17 L22,18 L25,16 L28,18 L30,22 L28,25 L25,28 L22,30 L20,35 L18,38 L16,40 L14,38 L12,35 L10,30 L9,25 Z" />
                <path d="M40,15 L43,12 L47,13 L50,11 L53,13 L55,15 L52,18 L50,20 L48,22 L50,25 L52,28 L55,30 L58,28 L60,25 L62,22 L65,20 L68,22 L70,18 L72,15 L75,17 L78,15 L80,18 L82,20 L85,22 L88,20 L90,18 L88,15 L85,12 L82,14 L80,12 L78,10 L75,12 L72,10 L70,12 L68,15 L65,18 L62,20 L60,22 L58,25 L55,28 L52,32 L50,35 L48,32 L45,30 L42,28 L40,25 L38,22 L40,18 Z" />
                <path d="M50,38 L52,40 L55,42 L58,40 L60,42 L62,45 L60,48 L58,50 L55,52 L52,55 L50,58 L48,55 L46,52 L44,48 L42,45 L44,42 L46,40 Z" />
                <path d="M70,45 L73,42 L76,44 L78,42 L80,44 L82,46 L80,48 L78,50 L76,52 L74,50 L72,48 L70,46 Z" />
              </g>

              {/* Routes */}
              {routes.map((route, i) => (
                <motion.line
                  key={i}
                  x1={route.from[0]}
                  y1={route.from[1]}
                  x2={route.to[0]}
                  y2={route.to[1]}
                  stroke="#C8A96B"
                  strokeWidth="0.1"
                  strokeDasharray="1,1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              ))}

              {/* Region dots */}
              {regions.map((region) => (
                <g key={region.name}>
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r="0.8"
                    fill="#C8A96B"
                    opacity="0.8"
                  />
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r="1.5"
                    fill="none"
                    stroke="#C8A96B"
                    strokeWidth="0.1"
                    opacity="0.3"
                  />
                  <text
                    x={region.x}
                    y={parseFloat(region.y) - 2.5}
                    textAnchor="middle"
                    fill="#A8A8A8"
                    fontSize="1.8"
                    opacity="0.5"
                  >
                    {region.name}
                  </text>
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-center gap-4 py-3 border-b border-border/20 group"
                >
                  <span className="text-[11px] font-mono text-gold/40 w-6">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-muted/70 group-hover:text-white transition-colors">
                    {service}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
