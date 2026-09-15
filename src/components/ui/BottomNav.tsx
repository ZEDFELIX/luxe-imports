'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Grid3X3, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/automotive', icon: Grid3X3, label: 'Shop' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/portal', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-dark-card/95 backdrop-blur-xl border-t border-border/30">
      <div className="gold-hairline absolute top-0 left-0 right-0 opacity-40" aria-hidden />
      <div className="flex items-center justify-around h-14 safe-area-bottom">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center w-full h-full transition-colors',
                isActive ? 'text-gold' : 'text-muted/50'
              )}
            >
              {isActive && <span className="absolute top-0 w-8 h-px bg-gold" aria-hidden />}
              <item.icon size={20} strokeWidth={1.5} />
              {item.href === '/cart' && itemCount > 0 && (
                <span className="absolute top-1.5 right-1/2 translate-x-4 w-4 h-4 flex items-center justify-center bg-gold text-dark text-[8px] font-bold rounded-full">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
