import { notFound } from 'next/navigation';
import { DEMO_VEHICLES } from '@/lib/constants';
import { VehicleDetailClient } from './VehicleDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = DEMO_VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) return { title: 'Not Found' };

  return {
    title: `${vehicle.title} | LUXE IMPORTS`,
    description: vehicle.description,
    openGraph: {
      title: vehicle.title,
      description: vehicle.description,
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = DEMO_VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) notFound();

  return <VehicleDetailClient vehicle={vehicle} />;
}
