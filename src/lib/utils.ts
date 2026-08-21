import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateRefNumber(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    REQUESTED: 'bg-blue-500/20 text-blue-400',
    SOURCING: 'bg-amber-500/20 text-amber-400',
    VERIFICATION: 'bg-purple-500/20 text-purple-400',
    NEGOTIATION: 'bg-orange-500/20 text-orange-400',
    PURCHASE: 'bg-green-500/20 text-green-400',
    SHIPPING: 'bg-cyan-500/20 text-cyan-400',
    CUSTOMS: 'bg-indigo-500/20 text-indigo-400',
    DELIVERY: 'bg-emerald-500/20 text-emerald-400',
    COMPLETED: 'bg-gold/20 text-gold',
    PREPARING: 'bg-slate-500/20 text-slate-400',
    BOOKED: 'bg-blue-500/20 text-blue-400',
    IN_TRANSIT: 'bg-amber-500/20 text-amber-400',
    ARRIVED: 'bg-green-500/20 text-green-400',
    DELIVERED: 'bg-gold/20 text-gold',
    PENDING: 'bg-slate-500/20 text-slate-400',
    SENT: 'bg-blue-500/20 text-blue-400',
    ACCEPTED: 'bg-green-500/20 text-green-400',
    REJECTED: 'bg-red-500/20 text-red-400',
    EXPIRED: 'bg-red-500/20 text-red-400',
    DRAFT: 'bg-slate-500/20 text-slate-400',
    PAID: 'bg-green-500/20 text-green-400',
    OVERDUE: 'bg-red-500/20 text-red-400',
    CANCELLED: 'bg-red-500/20 text-red-400',
  };
  return colors[status] || 'bg-slate-500/20 text-slate-400';
}

export function getAssetTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    automobile: 'Automobile',
    aircraft: 'Aircraft',
    yacht: 'Yacht',
    boat: 'Boat',
    other: 'Other',
  };
  return labels[type] || type;
}
