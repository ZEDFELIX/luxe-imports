'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, Download } from 'lucide-react';
import { getMyInvoices } from '@/lib/actions/invoices';

export default function PortalInvoices() {
  const [invoices, setInvoices] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) { setLoading(false); return; }

    getMyInvoices()
      .then((data) => setInvoices(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Invoices</h1>
      <p className="text-sm text-muted/50 mb-8">View and download your invoices.</p>

      {!loading && invoices.length > 0 ? (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id as string} className="bg-dark-card border border-border/20 p-5 hover:border-gold/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted/40 uppercase tracking-wider">{String(invoice.invoice_number || invoice.id || '').slice(0, 8)}</p>
                  <h3 className="text-sm text-white mt-1">
                    {String(invoice.description || invoice.asset_type || 'Invoice')}
                  </h3>
                </div>
                <span className={`px-3 py-1 text-[10px] tracking-wider uppercase border ${
                  invoice.status === 'paid' ? 'border-green-500/30 text-green-400' :
                  invoice.status === 'overdue' ? 'border-red-500/30 text-red-400' :
                  'border-gold/20 text-gold/80'
                }`}>
                  {(invoice.status as string) || 'pending'}
                </span>
              </div>
              {invoice.amount != null && (
                <p className="text-lg text-gold">${(invoice.amount as number).toLocaleString()}</p>
              )}
              <div className="flex items-center justify-between mt-3">
                {!!invoice.due_date && (
                  <p className="text-[10px] text-muted/40">Due: {new Date(String(invoice.due_date)).toLocaleDateString()}</p>
                )}
                {!!invoice.file_url && (
                  <a href={invoice.file_url as string} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-gold/60 hover:text-gold transition-colors">
                    <Download size={12} /> Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <FileSpreadsheet size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Invoices</h3>
          <p className="text-sm text-muted/40">Invoices will appear here once payments are processed.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
