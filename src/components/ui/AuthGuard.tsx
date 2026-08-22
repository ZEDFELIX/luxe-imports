'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkSession } from '@/lib/actions/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'CLIENT';
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    checkSession()
      .then((user) => {
        if (!user) {
          router.replace('/auth/login');
          return;
        }
        if (requiredRole && user.role !== requiredRole && user.role !== 'ADMIN') {
          router.replace('/');
          return;
        }
        setAuthorized(true);
      })
      .catch(() => {
        router.replace('/auth/login');
      });
  }, [router, requiredRole]);

  if (authorized === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
