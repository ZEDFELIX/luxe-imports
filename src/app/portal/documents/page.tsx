'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Download } from 'lucide-react';
import { getMyDocuments } from '@/lib/actions/documents';

export default function PortalDocuments() {
  const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
  const [documents, setDocuments] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(isConfigured);

  useEffect(() => {
    if (!isConfigured) return;

    getMyDocuments()
      .then((data) => setDocuments(data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isConfigured]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Documents</h1>
      <p className="text-sm text-muted/50 mb-8">Access your documents, reports and certificates.</p>

      {!loading && documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id as string} className="bg-dark-card border border-border/20 p-5 hover:border-gold/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted/40 uppercase tracking-wider">{String(doc.type || 'Document')}</p>
                  <h3 className="text-sm text-white mt-1">{String(doc.title || doc.file_name || 'Untitled')}</h3>
                </div>
                {!!doc.file_url && (
                  <a href={doc.file_url as string} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-wider uppercase border border-gold/20 text-gold/60 hover:text-gold hover:border-gold/40 transition-all">
                    <Download size={12} /> Download
                  </a>
                )}
              </div>
              {!!doc.description && (
                <p className="text-xs text-muted/50">{String(doc.description)}</p>
              )}
              {!!doc.created_at && (
                <p className="text-[10px] text-muted/30 mt-2">Uploaded {new Date(String(doc.created_at)).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <FolderOpen size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Documents</h3>
          <p className="text-sm text-muted/40">Documents will appear here as they are uploaded by our team.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
