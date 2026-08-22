'use client';

import { motion } from 'framer-motion';
import { Check, Truck } from 'lucide-react';

const STEPS = [
  'Vehicle Selected',
  'Vehicle Verified',
  'Purchase Confirmed',
  'Export Processing',
  'In Transit',
  'Arrived',
  'Customs',
  'Delivered',
] as const;

const DEMO_SHIPMENTS = [
  {
    id: 'LXI-SHP-2026-0148',
    vehicle: 'Rolls-Royce Ghost Extended',
    origin: 'London, United Kingdom',
    destination: 'Dubai, United Arab Emirates',
    currentStep: 4,
    dates: ['12 Jun 2026', '18 Jun 2026', '24 Jun 2026', '01 Jul 2026', '08 Jul 2026'],
    eta: '28 Jul 2026',
  },
  {
    id: 'LXI-SHP-2026-0152',
    vehicle: 'Ferrari SF90 Stradale',
    origin: 'Maranello, Italy',
    destination: 'Los Angeles, United States',
    currentStep: 1,
    dates: ['05 Jul 2026', '09 Jul 2026'],
    eta: '14 Aug 2026',
  },
];

function StepIcon({ state }: { state: 'completed' | 'current' | 'upcoming' }) {
  if (state === 'completed') {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold">
        <Check size={15} className="text-dark" strokeWidth={3} />
      </span>
    );
  }
  if (state === 'current') {
    return (
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-dark-card">
        <span className="h-2.5 w-2.5 rounded-full bg-gold animate-pulse" />
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/30 bg-dark-card">
      <span className="h-2 w-2 rounded-full bg-border" />
    </span>
  );
}

export default function PortalShipments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Shipments</h1>
      <p className="text-sm text-muted/50 mb-8">Track your active and completed shipments.</p>

      <div className="space-y-6">
        {DEMO_SHIPMENTS.map((shipment) => (
          <div key={shipment.id} className="bg-dark-card border border-border/30 p-5 sm:p-6 hover:border-gold/20 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <p className="text-[10px] tracking-wider uppercase text-muted/40">{shipment.id}</p>
                <h2 className="font-serif text-lg sm:text-xl text-white mt-1">{shipment.vehicle}</h2>
                <p className="text-xs text-muted/60 mt-1.5">
                  {shipment.origin} <span className="text-gold/60 mx-1">&rarr;</span> {shipment.destination}
                </p>
              </div>
              <span className="self-start px-3 py-1 text-[10px] tracking-wider uppercase border border-gold/20 text-gold/80">
                {STEPS[shipment.currentStep]}
              </span>
            </div>

            <ol className="relative space-y-0">
              {STEPS.map((step, index) => {
                const state = index < shipment.currentStep ? 'completed' : index === shipment.currentStep ? 'current' : 'upcoming';
                const isLast = index === STEPS.length - 1;
                const date = shipment.dates[index];
                return (
                  <li key={step} className={`flex gap-4 ${isLast ? '' : 'pb-6'}`}>
                    <div className="relative flex flex-col items-center">
                      <StepIcon state={state} />
                      {!isLast && (
                        <span className={`absolute top-7 bottom-[-24px] w-px ${state === 'completed' ? 'bg-gold/40' : 'bg-border/40'}`} />
                      )}
                    </div>
                    <div className="pt-1 min-h-7">
                      <p className={`text-sm ${state === 'upcoming' ? 'text-muted/40' : state === 'current' ? 'text-gold' : 'text-white'}`}>
                        {step}
                      </p>
                      {date && <p className="text-[11px] text-muted/40 mt-0.5">{date}</p>}
                      {state === 'current' && shipment.eta && step !== 'Delivered' && (
                        <p className="text-[11px] text-gold/50 mt-0.5">ETA: {shipment.eta}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3 border border-border/20 p-4">
        <Truck size={16} className="text-gold/60 shrink-0" />
        <p className="text-[11px] text-muted/40 leading-relaxed">
          Demo shipments shown for preview. Live tracking data will appear here once your asset is in transit.
        </p>
      </div>
    </motion.div>
  );
}
