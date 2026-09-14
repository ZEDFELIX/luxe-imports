'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Camera, ShoppingCart, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurrency } from '@/lib/currency-context';
import { useCart } from '@/lib/cart-context';
import { getPriceInCurrency } from '@/lib/currency';
import { cn } from '@/lib/utils';

interface VehicleCardProps {
  slug: string;
  title: string;
  manufacturer: string;
  year: number;
  category: string;
  priceUSD: number;
  images: string[];
  location: string;
  type: 'automotive' | 'aviation' | 'marine';
  trim?: string;
  engine?: string;
  mileage?: number;
  transmission?: string;
  availability?: string;
  badge?: string;
}

export function VehicleCard(props: VehicleCardProps) {
  const { currency } = useCurrency();
  const { addItem, removeItem, isInCart } = useCart();
  const inCart = isInCart(props.slug);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      removeItem(props.slug);
    } else {
      addItem({
        id: props.slug,
        slug: props.slug,
        title: props.title,
        manufacturer: props.manufacturer,
        year: props.year,
        priceUSD: props.priceUSD,
        image: props.images[0] || '',
        type: props.type,
        trim: props.trim,
      });
    }
  };

  const href = `/${props.type}/${props.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={href} className="group block bg-dark-card border border-border/20 overflow-hidden editorial-hover">
        <div className="aspect-[4/3] relative overflow-hidden">
          {props.images[0] ? (
            <Image
              src={props.images[0]}
              alt={props.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dark-card to-dark flex items-center justify-center">
              <p className="font-serif text-lg text-white/15">{props.manufacturer}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />

          {/* Photo count */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 text-[9px] text-white/80 z-10">
            <Camera size={9} /> {props.images?.length || 0}
          </div>

          {/* Badge */}
          {props.badge && (
            <div className="absolute top-2 right-2 z-10">
              <span className="px-2 py-0.5 text-[8px] tracking-[0.15em] uppercase bg-gold/20 text-gold border border-gold/30 backdrop-blur-sm">
                {props.badge}
              </span>
            </div>
          )}

          {/* Cart button */}
          <button
            onClick={handleAddToCart}
            className={cn(
              'absolute bottom-2 right-2 z-10 p-2 transition-all',
              inCart
                ? 'bg-gold text-dark'
                : 'bg-black/60 backdrop-blur-sm text-white/70 hover:bg-gold hover:text-dark'
            )}
          >
            <ShoppingCart size={14} />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <p className="text-[9px] tracking-[0.15em] uppercase text-gold/50 mb-1">{props.year} {props.type === 'automotive' ? props.category : props.type === 'aviation' ? 'Aircraft' : 'Yacht'}</p>
          <h3 className="font-serif text-sm sm:text-base text-white mb-1 group-hover:text-gold transition-colors leading-tight line-clamp-1">
            {props.title}
          </h3>
          <p className="text-[10px] text-muted/40 mb-2 line-clamp-1">
            {[props.trim, props.engine, props.mileage ? `${props.mileage.toLocaleString()} km` : null, props.transmission].filter(Boolean).join(' • ')}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-border/15">
            <div className="flex items-center gap-1 text-muted/40">
              <MapPin size={10} />
              <span className="text-[9px] truncate max-w-[100px]">{props.location}</span>
            </div>
            <span className="text-xs sm:text-sm text-gold font-medium">
              {getPriceInCurrency(props.priceUSD, currency)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
