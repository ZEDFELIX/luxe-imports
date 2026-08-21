import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Not Found' };
  return { title: `${post.title} | LUXE IMPORTS`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = getBlogContent(post.slug);

  return (
    <div className="pt-20 sm:pt-24 bg-dark min-h-screen">
      <div className="py-4 border-b border-border/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[11px] text-muted/50">
            <Link href="/insights" className="hover:text-gold transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Insights
            </Link>
            <span>/</span>
            <span className="text-white/70">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {post.cover_image && (
            <div className="relative aspect-[21/9] overflow-hidden mb-10 sm:mb-14 -mx-4 sm:mx-0 sm:rounded">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </div>
          )}
          <header className="mb-10 sm:mb-14">
            <span className="px-3 py-1 text-[9px] tracking-[0.15em] uppercase bg-gold/10 text-gold border border-gold/20 mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-[11px] text-muted/40">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            {content}
          </div>
        </div>
      </article>
    </div>
  );
}

function getBlogContent(slug: string) {
  const contents: Record<string, React.ReactNode> = {
    'how-to-import-a-luxury-car': (
      <div className="space-y-6 text-sm sm:text-base text-muted/70 leading-relaxed">
        <p>Importing a luxury car involves several key stages, each requiring careful attention to detail and regulatory compliance.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">1. Source & Identify</h2>
        <p>The first step is identifying the exact vehicle you wish to acquire. This includes specifying the manufacturer, model, year, colour, mileage range and any particular options or specifications.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">2. Pre-Purchase Inspection</h2>
        <p>Before any commitment, an independent inspection verifies the vehicle&apos;s condition, history and authenticity. This typically includes a physical inspection, VIN verification and review of service records.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">3. Documentation</h2>
        <p>Essential documents include the bill of sale, export certificate, title/registration, customs declaration and any compliance certificates required by the destination country.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">4. Shipping</h2>
        <p>Choose between RoRo (roll-on/roll-off) and container shipping based on value and preference. Air freight is available for time-critical deliveries. Full insurance coverage is recommended.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">5. Customs & Registration</h2>
        <p>Upon arrival, customs clearance processes the import duties and taxes. Once cleared, the vehicle can be registered in the destination jurisdiction.</p>
      </div>
    ),
    'private-jet-buying-guide': (
      <div className="space-y-6 text-sm sm:text-base text-muted/70 leading-relaxed">
        <p>Acquiring a private aircraft is among the most significant decisions in luxury transportation. This guide outlines the essential considerations.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">Defining Your Mission Profile</h2>
        <p>Consider typical passenger count, range requirements, runway access needs and operating environment. These factors determine whether a light jet, midsize, super-midsize or ultra-long-range aircraft is the right fit.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">New vs Pre-Owned</h2>
        <p>New aircraft offer the latest technology and full warranty. Pre-owned aircraft can represent significant value, particularly with thorough inspection and maintenance history review.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">Due Diligence</h2>
        <p>Aircraft acquisition demands meticulous verification: maintenance log review, airframe and engine times, compliance with Airworthiness Directives, and title search for any liens or encumbrances.</p>
        <h2 className="font-serif text-xl sm:text-2xl text-white mt-10 mb-4">Registration & Compliance</h2>
        <p>Aircraft registration involves national aviation authority requirements, insurance arrangements and operational certification. We coordinate with aviation attorneys and registrars worldwide.</p>
      </div>
    ),
  };

  return contents[slug] || (
    <div className="space-y-6 text-sm sm:text-base text-muted/70 leading-relaxed">
      <p>This article provides comprehensive insights into luxury asset acquisition and international logistics. Our editorial team draws on decades of industry experience to deliver practical guidance for discerning buyers.</p>
      <p>Whether you are acquiring your first luxury vehicle or your fiftieth superyacht, understanding the process is essential to making informed decisions.</p>
      <p>For specific questions about your acquisition, contact our team for a confidential consultation.</p>
    </div>
  );
}
