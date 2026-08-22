'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Receipt, FileSpreadsheet, Truck, FolderOpen, Heart, MessageSquare, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthGuard } from '@/components/ui/AuthGuard';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard, FileText, Receipt, FileSpreadsheet, Truck, FolderOpen, Heart, MessageSquare, User, Settings,
};

const links = [
  { href: '/portal', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/portal/requests', label: 'My Requests', icon: 'FileText' },
  { href: '/portal/quotes', label: 'Quotes', icon: 'Receipt' },
  { href: '/portal/invoices', label: 'Invoices', icon: 'FileSpreadsheet' },
  { href: '/portal/shipments', label: 'Shipments', icon: 'Truck' },
  { href: '/portal/documents', label: 'Documents', icon: 'FolderOpen' },
  { href: '/portal/wishlist', label: 'Wishlist', icon: 'Heart' },
  { href: '/portal/messages', label: 'Messages', icon: 'MessageSquare' },
  { href: '/portal/profile', label: 'Profile', icon: 'User' },
  { href: '/portal/settings', label: 'Settings', icon: 'Settings' },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthGuard>
      <div className="pt-16 sm:pt-20 bg-dark min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {links.map((link) => {
                  const Icon = iconMap[link.icon];
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2.5 text-[12px] tracking-[0.05em] transition-all shrink-0 lg:shrink',
                        isActive
                          ? 'bg-gold/10 text-gold border border-gold/20'
                          : 'text-muted/60 hover:text-white hover:bg-dark-card border border-transparent'
                      )}
                    >
                      {Icon && <Icon size={15} className={isActive ? 'text-gold' : ''} />}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}
