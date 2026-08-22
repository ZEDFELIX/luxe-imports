'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Landmark } from 'lucide-react';
import { useCurrency } from '@/lib/currency-context';
import { getPriceInCurrency } from '@/lib/currency';

export default function FinanceCalculatorPage() {
  const { currency } = useCurrency();
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('20');
  const [downType, setDownType] = useState<'percent' | 'amount'>('percent');
  const [term, setTerm] = useState('48');
  const [rate, setRate] = useState('8.5');

  const calc = useMemo(() => {
    const p = parseFloat(price) || 0;
    const dpRaw = parseFloat(downPayment) || 0;
    const dp = downType === 'percent' ? p * dpRaw / 100 : dpRaw;
    const principal = Math.max(p - dp, 0);
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = parseInt(term) || 48;

    if (principal <= 0) {
      return { downPaymentAmt: dp, principal: 0, monthly: 0, totalRepayment: 0, totalInterest: 0 };
    }
    if (r <= 0) {
      const monthly = principal / n;
      return { downPaymentAmt: dp, principal, monthly, totalRepayment: principal, totalInterest: 0 };
    }

    const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalRepayment = monthly * n;
    const totalInterest = totalRepayment - principal;

    return { downPaymentAmt: dp, principal, monthly, totalRepayment, totalInterest };
  }, [price, downPayment, downType, term, rate]);

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen pb-24 lg:pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-2">Finance</p>
          <h1 className="font-serif text-2xl sm:text-3xl text-white mb-2">Finance Your Vehicle</h1>
          <p className="text-xs text-muted/50">Estimate your monthly payments.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1.5">Vehicle Price (USD)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                placeholder="e.g. 150000"
                className="w-full bg-dark-card border border-border/30 px-3 py-3 text-sm text-white placeholder:text-muted/30 focus:border-gold/50 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1.5">Down Payment</label>
              <div className="flex gap-2">
                <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)}
                  className="flex-1 bg-dark-card border border-border/30 px-3 py-3 text-sm text-white focus:border-gold/50 focus:outline-none" />
                <div className="flex border border-border/30">
                  <button onClick={() => setDownType('percent')}
                    className={`px-3 py-2 text-[10px] ${downType === 'percent' ? 'bg-gold text-dark' : 'text-muted/50'}`}>%</button>
                  <button onClick={() => setDownType('amount')}
                    className={`px-3 py-2 text-[10px] ${downType === 'amount' ? 'bg-gold text-dark' : 'text-muted/50'}`}>$</button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1.5">Loan Term</label>
              <select value={term} onChange={e => setTerm(e.target.value)}
                className="w-full bg-dark-card border border-border/30 px-3 py-3 text-sm text-white focus:border-gold/50 focus:outline-none appearance-none">
                {[12, 24, 36, 48, 60, 72].map(t => <option key={t} value={t}>{t} months</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1.5">Interest Rate (%)</label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)}
                className="w-full bg-dark-card border border-border/30 px-3 py-3 text-sm text-white focus:border-gold/50 focus:outline-none" />
            </div>
          </div>

          <div className="lg:col-span-3">
            {parseFloat(price) > 0 ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-dark-card border border-border/20 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Landmark size={16} className="text-gold/60" />
                  <h2 className="text-xs tracking-[0.15em] uppercase text-muted/60">Payment Summary</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Vehicle Price', value: getPriceInCurrency(parseFloat(price) || 0, currency) },
                    { label: 'Down Payment', value: getPriceInCurrency(calc.downPaymentAmt, currency) },
                    { label: 'Amount Financed', value: getPriceInCurrency(calc.principal, currency) },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-border/10">
                      <span className="text-xs text-muted/50">{row.label}</span>
                      <span className="text-xs text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 bg-dark border border-gold/20 text-center">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-muted/50 mb-1">Estimated Monthly Payment</p>
                  <p className="text-2xl text-gold font-medium">{getPriceInCurrency(calc.monthly, currency)}</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted/50">Total Repayment</span>
                    <span className="text-xs text-white">{getPriceInCurrency(calc.totalRepayment, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted/50">Total Interest</span>
                    <span className="text-xs text-white">{getPriceInCurrency(calc.totalInterest, currency)}</span>
                  </div>
                </div>
                <p className="text-[9px] text-muted/30 mt-4">Estimates only. Actual finance terms may vary.</p>
              </motion.div>
            ) : (
              <div className="bg-dark-card border border-border/20 p-6 text-center py-16">
                <Landmark size={32} className="text-muted/20 mx-auto mb-3" />
                <p className="text-xs text-muted/40">Enter a vehicle price to estimate monthly payments.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
