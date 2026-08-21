'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';
import { ASSET_TYPES, COUNTRIES } from '@/lib/constants';
import { submitSourcingRequest } from '@/lib/actions/requests';
import toast from 'react-hot-toast';

export function GlobalSourcingForm() {
  const [formData, setFormData] = useState({
    asset_type: '',
    manufacturer: '',
    model: '',
    year: '',
    budget: '',
    preferred_origin: '',
    destination: '',
    additional_requirements: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitSourcingRequest({
        asset_type: formData.asset_type,
        manufacturer: formData.manufacturer || null,
        model: formData.model || null,
        year: formData.year ? parseInt(formData.year) : null,
        budget: formData.budget ? parseFloat(formData.budget.replace(/,/g, '')) : null,
        preferred_origin: formData.preferred_origin || null,
        destination: formData.destination || null,
        additional_requirements: formData.additional_requirements || null,
      });

      toast.success('Request submitted successfully');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-dark/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(200,169,107,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">
              Global Sourcing
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
              Your Request.<br />
              <span className="text-gradient-gold">Our Global Network.</span>
            </h2>
            <p className="text-muted/60 text-sm sm:text-base leading-relaxed max-w-md mb-8">
              Submit your requirements and our worldwide network of specialists will locate, verify and deliver your asset.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Access to 50+ countries', detail: 'Global sourcing network' },
                { label: 'Pre-purchase verification', detail: 'Independent inspection' },
                { label: 'Full logistics handling', detail: 'Door-to-door delivery' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gold/60 rounded-full mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-white/80">{item.label}</p>
                    <p className="text-xs text-muted/40">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">
                  Asset Type
                </label>
                <select
                  value={formData.asset_type}
                  onChange={(e) => setFormData({ ...formData, asset_type: e.target.value })}
                  className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Select type</option>
                  {ASSET_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    placeholder="e.g. Rolls-Royce"
                    className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. Ghost Extended"
                    className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">
                    Budget (USD)
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. 250,000"
                    className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">
                    Preferred Origin
                  </label>
                  <select
                    value={formData.preferred_origin}
                    onChange={(e) => setFormData({ ...formData, preferred_origin: e.target.value })}
                    className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="">Any origin</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">
                    Destination
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors appearance-none"
                  >
                    <option value="">Select destination</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  value={formData.additional_requirements}
                  onChange={(e) => setFormData({ ...formData, additional_requirements: e.target.value })}
                  rows={3}
                  placeholder="Colour preferences, specifications, timeline..."
                  className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted || loading}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-50 group"
              >
                {loading ? 'Submitting...' : submitted ? (
                  'Request Submitted'
                ) : (
                  <>
                    Submit Private Request
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-muted/30 tracking-wider">
                All requests are handled with complete confidentiality.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
