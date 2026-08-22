'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { MANUFACTURERS } from '@/lib/constants';

const initialForm = {
  make: '',
  model: '',
  year: '',
  trim: '',
  color: '',
  budget: '',
  mileage: '',
  country: '',
  requirements: '',
};

export default function RequestPage() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-dark-card border border-border/30 px-4 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors';
  const labelClass =
    'block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2';

  return (
    <div className="min-h-screen bg-dark">
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,169,107,0.06),transparent_60%)]" />

        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">
              Vehicle Request
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-white leading-[1.1] mb-4">
              Request a <span className="text-gradient-gold">Vehicle</span>
            </h1>
            <p className="text-sm sm:text-base text-muted/60 max-w-lg mx-auto">
              Tell us what you are looking for and our sourcing specialists will locate,
              verify and deliver it — anywhere in the world.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-dark-card border border-gold/20 p-10 text-center"
            >
              <CheckCircle size={56} className="text-gold mx-auto mb-6" strokeWidth={1.25} />
              <h2 className="font-serif text-3xl font-light text-white mb-3">Request Submitted</h2>
              <p className="text-sm text-muted/60 max-w-md mx-auto mb-8">
                Thank you. A private client manager will review your requirements and
                respond within 24 hours.
              </p>
              <button
                onClick={() => { setFormData(initialForm); setSubmitted(false); }}
                className="px-8 py-3 border border-gold/40 text-gold text-[12px] tracking-[0.15em] uppercase hover:bg-gold hover:text-dark transition-all duration-300"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="make" className={labelClass}>Make</label>
                <select id="make" value={formData.make} onChange={update('make')} required className={`${inputClass} appearance-none`}>
                  <option value="">Select make</option>
                  {MANUFACTURERS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="model" className={labelClass}>Model</label>
                  <input id="model" type="text" value={formData.model} onChange={update('model')} required placeholder="e.g. Ghost Extended" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="year" className={labelClass}>Year</label>
                  <input id="year" type="text" value={formData.year} onChange={update('year')} placeholder="e.g. 2024" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="trim" className={labelClass}>Trim / Variant</label>
                  <input id="trim" type="text" value={formData.trim} onChange={update('trim')} placeholder="e.g. Black Badge" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="color" className={labelClass}>Preferred Color</label>
                  <input id="color" type="text" value={formData.color} onChange={update('color')} placeholder="e.g. Arctic White" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="budget" className={labelClass}>Budget USD</label>
                  <input id="budget" type="text" value={formData.budget} onChange={update('budget')} placeholder="e.g. 250,000" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="mileage" className={labelClass}>Mileage Preference</label>
                  <input id="mileage" type="text" value={formData.mileage} onChange={update('mileage')} placeholder="e.g. Under 5,000 km" className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="country" className={labelClass}>Country Preference</label>
                <input id="country" type="text" value={formData.country} onChange={update('country')} placeholder="e.g. Japan, Germany or any" className={inputClass} />
              </div>

              <div>
                <label htmlFor="requirements" className={labelClass}>Additional Requirements</label>
                <textarea id="requirements" rows={4} value={formData.requirements} onChange={update('requirements')} placeholder="Specifications, timeline, delivery details..." className={`${inputClass} resize-none`} />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 group"
              >
                Submit Request
                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <p className="text-center text-[10px] text-muted/30 tracking-wider">
                All requests are handled with complete confidentiality.
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
