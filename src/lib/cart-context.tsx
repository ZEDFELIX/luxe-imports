'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  manufacturer: string;
  year: number;
  priceUSD: number;
  image: string;
  type: 'automotive' | 'aviation' | 'marine';
  trim?: string;
  addedAt: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalUSD: number;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('luxe-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('luxe-cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'addedAt'>) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.length;
  const totalUSD = items.reduce((sum, item) => sum + item.priceUSD, 0);
  const isInCart = useCallback((id: string) => items.some(i => i.id === id), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount, totalUSD, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
