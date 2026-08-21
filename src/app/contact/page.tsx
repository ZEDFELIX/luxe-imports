'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { ASSET_TYPES, COUNTRIES } from '@/lib/constants';
import { submitContactForm } from '@/lib/actions/contact';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', country: '', asset_type: '',
    budget: '', requirements: '', preferred_contact: 'email',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContactForm({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone || null,
        country: form.country || null,
        asset_type: form.asset_type || null,
        budget: form.budget ? parseFloat(form.budget.replace(/,/g, '')) : null,
        requirements: form.requirements || null,
        preferred_contact: form.preferred_contact,
      });

      toast.success('Message sent successfully');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(200,169,107,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Contact</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6">
              Begin Your <span className="text-gradient-gold">Acquisition</span>
            </h1>
            <p className="text-muted/60 text-sm sm:text-base">
              Whether you know exactly what you want or need guidance, we&apos;re here to help. Submit your requirements and a specialist will be in touch within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="luxury-divider" />

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="font-serif text-xl sm:text-2xl text-white mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-gold/60" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Email</p>
                    <p className="text-sm text-white">info@luxeimports.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold/60" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Phone</p>
                    <p className="text-sm text-white">+44 20 7123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-gold/60" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted/40 mb-1">Location</p>
                    <p className="text-sm text-white">London, United Kingdom</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border/20">
                <a
                  href="https://wa.me/447700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 w-full border border-green-500/30 text-green-400 text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-green-500/10 transition-all"
                >
                  <Phone size={14} /> Contact via WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mb-6">
                    <Send size={24} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-3">Request Received</h3>
                  <p className="text-sm text-muted/60">A specialist will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Full Name *</label>
                      <input type="text" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Phone / WhatsApp</label>
                      <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 234 567 890"
                        className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Country</label>
                      <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors appearance-none">
                        <option value="">Select country</option>
                        {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Asset Type</label>
                      <select value={form.asset_type} onChange={(e) => setForm({ ...form, asset_type: e.target.value })}
                        className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors appearance-none">
                        <option value="">Select type</option>
                        {ASSET_TYPES.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Budget (USD)</label>
                      <input type="text" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        placeholder="e.g. 250,000"
                        className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Requirements</label>
                    <textarea rows={4} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                      placeholder="Describe what you're looking for..."
                      className="w-full bg-dark-card border border-border/40 px-4 py-3.5 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none transition-colors resize-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-muted/60 mb-2">Preferred Contact Method</label>
                    <div className="flex gap-4">
                      {['email', 'phone', 'whatsapp'].map((method) => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="preferred_contact" value={method} checked={form.preferred_contact === method}
                            onChange={(e) => setForm({ ...form, preferred_contact: e.target.value })}
                            className="w-4 h-4 accent-gold" />
                          <span className="text-sm text-muted/60 capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gold text-dark text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-gold-light transition-all group disabled:opacity-50">
                    {loading ? 'Sending...' : <>Submit Request <Send size={14} className="group-hover:translate-x-1 transition-transform" /></>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
