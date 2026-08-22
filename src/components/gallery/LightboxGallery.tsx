'use client';

import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxGalleryProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  title: string;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export function LightboxGallery({
  images,
  initialIndex,
  onClose,
  title,
}: LightboxGalleryProps) {
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0))
  );
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;

  const go = useCallback(
    (step: number) => {
      if (total === 0) return;
      setDirection(step);
      setIndex((current) => (current + step + total) % total);
    },
    [total]
  );

  // Body scroll lock
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Keyboard navigation + focus trap
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );

    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(-1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.key === 'Tab') {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        const inside = active instanceof Node && container.contains(active);
        if (!inside) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [go, onClose]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    go(delta < 0 ? 1 : -1);
  };

  if (total === 0) return null;

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 sm:px-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70">
            Gallery
          </p>
          <h2 className="font-serif text-lg font-light text-white sm:text-xl">
            {title}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          <X size={18} />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-10"
          >
            <div
              className="relative h-full w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${title} — image ${index + 1} of ${total}`}
                fill
                sizes="100vw"
                className="object-contain"
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/60 text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                go(1);
              }}
              className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/60 text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold sm:right-6"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Counter */}
      <div
        className="flex items-center justify-center py-4"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="border border-white/10 bg-black/60 px-4 py-1.5 text-[11px] tracking-[0.3em] text-white/80 tabular-nums">
          {index + 1} / {total}
        </span>
      </div>
    </motion.div>
  );
}
