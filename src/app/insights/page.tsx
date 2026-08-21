'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/constants';

export default function InsightsPage() {
  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(200,169,107,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold/70 mb-4">Insights</p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6">
              Knowledge & <span className="text-gradient-gold">Expertise</span>
            </h1>
            <p className="text-muted/60 text-sm sm:text-base">
              Guides, analysis and insights from the world of luxury asset acquisition and international logistics.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="luxury-divider" />

      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BLOG_POSTS.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={`/insights/${post.slug}`}
                  className="group block bg-dark-card border border-border/20 overflow-hidden editorial-hover h-full"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-dark-card to-dark">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.04),transparent)]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 text-[9px] tracking-[0.15em] uppercase bg-gold/10 text-gold border border-gold/20">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-[10px] text-muted/40">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg text-white mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted/50 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-[11px] tracking-[0.1em] uppercase text-gold/60 group-hover:text-gold transition-colors flex items-center gap-1">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
