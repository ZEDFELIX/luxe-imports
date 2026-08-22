'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

interface WhatsAppButtonProps {
  vehicleTitle: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function WhatsAppButton({ vehicleTitle, className, variant = 'secondary' }: WhatsAppButtonProps) {
  const message = encodeURIComponent(
    `Hello Luxe Imports, I'm interested in the ${vehicleTitle}. Could you provide more details?`
  );
  const phone = SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '');
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-medium tracking-[0.15em] uppercase transition-all',
        variant === 'primary'
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'border border-green-600/30 text-green-500 hover:bg-green-600/10',
        className
      )}
    >
      <MessageCircle size={14} />
      WhatsApp
    </a>
  );
}
