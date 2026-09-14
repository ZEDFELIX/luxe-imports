'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface ViewedVehicle {
  slug: string;
  title: string;
  manufacturer: string;
  year: number;
  priceUSD: number;
  image: string;
  type: 'automotive' | 'aviation' | 'marine';
  viewedAt: string;
}

interface RecentlyViewedContextType {
  items: ViewedVehicle[];
  addItem: (item: Omit<ViewedVehicle, 'viewedAt'>) => void;
  clearItems: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ViewedVehicle[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('luxe-recently-viewed');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate recently viewed from localStorage after mount
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('luxe-recently-viewed', JSON.stringify(items)); } catch {}
  }, [items]);

  const addItem = useCallback((item: Omit<ViewedVehicle, 'viewedAt'>) => {
    setItems(prev => {
      const filtered = prev.filter(i => i.slug !== item.slug);
      return [{ ...item, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 12);
    });
  }, []);

  const clearItems = useCallback(() => setItems([]), []);

  return (
    <RecentlyViewedContext.Provider value={{ items, addItem, clearItems }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  return context;
}
