'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Truck, Calculator } from 'lucide-react';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';

const SOURCE_COUNTRIES = ['Japan', 'UAE', 'United Kingdom', 'Germany', 'United States', 'South Africa'];
const DEST_COUNTRIES = [
  { name: 'Kenya', duty: 0.25, vat: 0.16, clearance: 1500, registration: 2000 },
  { name: 'UAE', duty: 0.05, vat: 0.05, clearance: 2000, registration: 1500 },
  { name: 'United Kingdom', duty: 0.10, vat: 0.20, clearance: 1800, registration: 2500 },
  { name: 'United States', duty: 0.025, vat: 0, clearance: 2500, registration: 2000 },
  { name: 'South Africa', duty: 0.20, vat: 0.15, clearance: 1200, registration: 1800 },
  { name: 'Australia', duty: 0.05, vat: 0.10, clearance: 2200, registration: 3000 },
];
const SHIPPING_COSTS: Record<string, Record<string, number>> = {
  RORO: { default: 3500, Japan: 4000, 'United Kingdom': 3200, Germany: 3400, 'United States': 4500, UAE: 2800, 'South Africa': 3800 },
  Container: { default: 5500, Japan: 6000, 'United Kingdom': 5200, Germany: 5400, 'United States': 7000, UAE: 4500, 'South Africa': 5800 },
  'Air Freight': { default: 15000, Japan: 18000, 'United Kingdom': 14000, Germany: 15000, 'United States': 20000, UAE: 12000, 'South Africa': 16000 },
};

export default function ImportCalculatorPage() {
  const { currency } = useCurrency();
  const [vehicleValue, setVehicleValue] = useState('');
  const [source, setSource] = useState('Japan');
  const [destination, setDestination] = useState('Kenya');
  const [shipping, setShipping] = useState('RORO');

  const dest = DEST_COUNTRIES.find(d => d.name === destination)!;
  const value = parseFloat(vehicleValue) || 0;
  const shipCost = SHIPPING_COSTS[shipping]?.[source] || SHIPPING_COSTS[shipping]?.default || 3500;

  const calc = useMemo(() => {
    if (value <= 0) return null;
    const shippingCost = shipCost;
    const importDuty = value * dest.duty;
    const vatTax = (value + shippingCost + importDuty) * dest.vat;
    const clearance = dest.clearance;
    const registration = dest.registration;
    const total = value + shippingCost + importDuty + vatTax + clearance + registration;
    return { shippingCost, importDuty, vatTax, clearance, registration, total };
  }, [value, shipCost, dest]);

  const rows = [
    { label: 'Vehicle Cost', value: value },
    { label: `Shipping (${shipping})`, value: calc?.shippingCost || 0 },
    { label: `Import Duty (${(dest.duty * 100).toFixed(0)}%)`, value: calc?.importDuty || 0 },
    { label: `VAT/Tax (${(dest.vat * 100).toFixed(0)}%)`, value: calc?.vatTax || 0 },
    { label: 'Port & Customs Clearance', value: calc?.clearance || 0 },
    { label: 'Registration & Compliance', value: calc?.registration || 0 },
  ];

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen pb-24 lg:pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-2">Cost Estimator</p>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-2">Estimate Your Import Cost</h1>
          <p className="text-xs text-muted/50">Get a preliminary estimate for importing your vehicle.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1.5">Vehicle Value (USD)</label>
              <input type="number" value={vehicleValue} onChange={e => setVehicleValue(e.target.value)}
                placeholder="e.g. 120000"
                className="w-full bg-dark-card border border-border/30 px-3 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1.5">Source Country</label>
              <select value={source} onChange={e => setSource(e.target.value)}
                className="w-full bg-dark-card border border-border/30 px-3 py-3 text-sm text-white focus:border-gold/50 focus:outline-none appearance-none">
                {SOURCE_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1.5">Destination Country</label>
              <select value={destination} onChange={e => setDestination(e.target.value)}
                className="w-full bg-dark-card border border-border/30 px-3 py-3 text-sm text-white focus:border-gold/50 focus:outline-none appearance-none">
                {DEST_COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1.5">Shipping Method</label>
              <select value={shipping} onChange={e => setShipping(e.target.value)}
                className="w-full bg-dark-card border border-border/30 px-3 py-3 text-sm text-white focus:border-gold/50 focus:outline-none appearance-none">
                <option value="RORO">RORO (Roll-on/Roll-off)</option>
                <option value="Container">Container Shipping</option>
                <option value="Air Freight">Air Freight</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {calc ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-dark-card border border-border/20 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Calculator size={16} className="text-gold/60" />
                  <h2 className="text-xs tracking-[0.15em] uppercase text-muted/60">Cost Breakdown</h2>
                </div>
                <div className="space-y-3">
                  {rows.map(row => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-border/10">
                      <span className="text-xs text-muted/50">{row.label}</span>
                      <span className="text-xs text-white">{getPriceInCurrency(row.value, currency)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gold/20">
                  <span className="text-sm font-medium text-white">Estimated Total</span>
                  <span className="text-xl text-gold font-medium">{getPriceInCurrency(calc.total, currency)}</span>
                </div>
                <p className="text-[9px] text-muted/30 mt-3">Estimates only. Final costs confirmed during consultation.</p>
              </motion.div>
            ) : (
              <div className="bg-dark-card border border-border/20 p-6 text-center py-16">
                <Truck size={32} className="text-muted/20 mx-auto mb-3" />
                <p className="text-xs text-muted/40">Enter a vehicle value to see estimated import costs.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
