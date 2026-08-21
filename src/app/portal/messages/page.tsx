'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { getMessages, sendMessage, markAsRead } from '@/lib/actions/messages';
import toast from 'react-hot-toast';

export default function PortalMessages() {
  const [messages, setMessages] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isConfigured) { setLoading(false); return; }

    getMessages()
      .then((data) => {
        const msgs = data || [];
        setMessages(msgs);
        msgs.filter((m: Record<string, unknown>) => !m.read).forEach((m: Record<string, unknown>) => {
          markAsRead(m.id as string).catch(() => {});
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h1 className="font-serif text-2xl sm:text-3xl text-white mb-1">Messages</h1>
      <p className="text-sm text-muted/50 mb-8">Communicate with your dedicated specialist.</p>

      {!loading && messages.length > 0 ? (
        <div className="bg-dark-card border border-border/20 p-5">
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {messages.map((msg) => {
              const sender = msg.sender as { full_name?: string } | null;
              return (
                <div key={msg.id as string} className={`flex flex-col ${msg.is_own ? 'items-end' : 'items-start'}`}>
                  <p className="text-[10px] text-muted/40 mb-1">{sender?.full_name || 'Specialist'}</p>
                  <div className={`px-4 py-2.5 text-sm max-w-xs ${
                    msg.is_own ? 'bg-gold/10 text-white/80' : 'bg-border/10 text-white/80'
                  }`}>
                    {String(msg.content)}
                  </div>
                  {!!msg.created_at && (
                    <p className="text-[9px] text-muted/30 mt-1">{new Date(String(msg.created_at)).toLocaleString()}</p>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border/20 pt-4 flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newMessage.trim()) {
                  sendMessage('', newMessage.trim()).then(() => {
                    setNewMessage('');
                    return getMessages();
                  }).then((data) => setMessages(data || [])).catch(() => toast.error('Failed to send'));
                }
              }}
              placeholder="Type a message..."
              className="flex-1 bg-dark border border-border/40 px-4 py-2.5 text-sm text-white focus:border-gold/50 focus:outline-none transition-colors"
            />
            <button
              onClick={() => {
                if (!newMessage.trim()) return;
                sendMessage('', newMessage.trim()).then(() => {
                  setNewMessage('');
                  return getMessages();
                }).then((data) => setMessages(data || [])).catch(() => toast.error('Failed to send'));
              }}
              className="p-2.5 bg-gold text-dark hover:bg-gold-light transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : !loading ? (
        <div className="text-center py-16">
          <MessageSquare size={32} className="text-muted/20 mx-auto mb-4" />
          <h3 className="font-serif text-lg text-white/60 mb-2">No Messages</h3>
          <p className="text-sm text-muted/40">Messages from your specialist will appear here.</p>
        </div>
      ) : null}
    </motion.div>
  );
}
