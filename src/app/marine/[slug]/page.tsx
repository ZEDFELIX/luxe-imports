import { notFound } from 'next/navigation';
import { DEMO_MARINE } from '@/lib/constants';
import { VesselDetailClient } from './VesselDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const vessel = DEMO_MARINE.find((v) => v.slug === slug);
  if (!vessel) return { title: 'Not Found' };
  return { title: `${vessel.title} | LUXE IMPORTS`, description: vessel.description };
}

export default async function VesselDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vessel = DEMO_MARINE.find((v) => v.slug === slug);
  if (!vessel) notFound();
  return <VesselDetailClient vessel={vessel as any} />;
}
