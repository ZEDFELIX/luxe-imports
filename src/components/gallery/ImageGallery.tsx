'use client';

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { LightboxGallery } from './LightboxGallery';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const step = useCallback(
    (direction: number) => {
      if (total === 0) return;
      setActiveIndex((current) => (current + direction + total) % total);
    },
    [total]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    step(delta < 0 ? 1 : -1);
  };

  return (
    <section aria-label={`${title} gallery`} className="bg-dark">
      {/* Main image */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`${title} main image`}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => total > 0 && setLightboxOpen(true)}
        className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-dark-card outline-none transition-colors duration-300 focus-visible:border-gold sm:aspect-[16/10]"
      >
        {total === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <Camera size={28} strokeWidth={1} className="text-muted/30" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted/40">
              Imagery coming soon
            </p>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeIndex]}
                  alt={`${title} — image ${activeIndex + 1} of ${total}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark/70 to-transparent" />

            {/* Counter */}
            <div className="pointer-events-none absolute right-4 top-4 z-10 border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] tracking-[0.25em] text-white tabular-nums">
              {activeIndex + 1} / {total}
            </div>

            {/* Expand hint */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden items-center gap-2 border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
              <Maximize2 size={12} className="text-gold" />
              Expand
            </div>

            {/* Arrows — desktop only */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold md:flex"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-black/50 text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold md:flex"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              aria-label={`View image ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => goTo(index)}
              className={`relative h-[60px] w-[88px] shrink-0 overflow-hidden border transition-all duration-300 ${
                index === activeIndex
                  ? 'border-gold opacity-100'
                  : 'border-border/40 opacity-40 hover:opacity-80'
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="88px"
                className={`object-cover transition-all duration-500 ${
                  index === activeIndex ? '' : 'grayscale'
                }`}
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && total > 0 && (
        <LightboxGallery
          images={images}
          initialIndex={activeIndex}
          title={title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
