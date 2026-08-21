'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Package, Users, Truck, Receipt, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard, FileText, Package, Users, Truck, Receipt,
};

const links = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin/requests', label: 'Requests', icon: 'FileText' },
  { href: '/admin/inventory', label: 'Inventory', icon: 'Package' },
  { href: '/admin/clients', label: 'Clients', icon: 'Users' },
  { href: '/admin/shipments', label: 'Shipments', icon: 'Truck' },
  { href: '/admin/quotes', label: 'Quotes', icon: 'Receipt' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="pt-16 sm:pt-20 bg-dark min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <aside className="w-full lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-red-400">Admin Panel</span>
              </div>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {links.map((link) => {
                  const Icon = iconMap[link.icon];
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2.5 text-[12px] tracking-[0.05em] transition-all shrink-0 lg:shrink',
                        isActive ? 'bg-gold/10 text-gold border border-gold/20' : 'text-muted/60 hover:text-white hover:bg-dark-card border border-transparent'
                      )}>
                      {Icon && <Icon size={15} className={isActive ? 'text-gold' : ''} />}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-border/20">
                <Link href="/portal" className="flex items-center gap-2 text-[11px] text-muted/40 hover:text-gold transition-colors">
                  <ArrowLeft size={12} /> Back to Portal
                </Link>
              </div>
            </div>
          </aside>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
