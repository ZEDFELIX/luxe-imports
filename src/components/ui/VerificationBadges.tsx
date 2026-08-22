import { Shield, CheckCircle, Wrench, Globe, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerificationBadgesProps {
  vinVerified?: boolean;
  inspectionCompleted?: boolean;
  serviceHistory?: boolean;
  importReady?: boolean;
  className?: string;
}

export function VerificationBadges({
  vinVerified,
  inspectionCompleted,
  serviceHistory,
  importReady,
  className,
}: VerificationBadgesProps) {
  const badges = [
    { label: 'Verified Vehicle', icon: <BadgeCheck size={12} />, show: true },
    { label: 'VIN Verified', icon: <Shield size={12} />, show: !!vinVerified },
    { label: 'Inspection Passed', icon: <CheckCircle size={12} />, show: !!inspectionCompleted },
    { label: 'Service History', icon: <Wrench size={12} />, show: !!serviceHistory },
    { label: 'Import Ready', icon: <Globe size={12} />, show: !!importReady },
  ];

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {badges
        .filter((b) => b.show)
        .map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] tracking-[0.1em] uppercase bg-gold/10 text-gold/80 border border-gold/20"
          >
            {badge.icon}
            {badge.label}
          </div>
        ))}
    </div>
  );
}
