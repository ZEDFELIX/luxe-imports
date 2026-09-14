import { notFound } from 'next/navigation';
import { DEMO_AIRCRAFT } from '@/lib/constants';
import { AircraftDetailClient } from './AircraftDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const aircraft = DEMO_AIRCRAFT.find((a) => a.slug === slug);
  if (!aircraft) return { title: 'Not Found' };
  return { title: `${aircraft.title} | LUXE IMPORTS`, description: aircraft.description };
}

export default async function AircraftDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const aircraft = DEMO_AIRCRAFT.find((a) => a.slug === slug);
  if (!aircraft) notFound();
  return <AircraftDetailClient aircraft={aircraft} />;
}
