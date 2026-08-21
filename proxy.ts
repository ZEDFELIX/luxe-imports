import { type NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;

  if (!session && (pathname.startsWith('/portal') || pathname.startsWith('/admin'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (session && pathname.startsWith('/admin') && session.role !== 'ADMIN' && session.role !== 'STAFF') {
    const url = request.nextUrl.clone();
    url.pathname = '/portal';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
