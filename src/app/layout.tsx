import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/ui/BottomNav';
import { PWAInstall } from '@/components/PWAInstall';
import { CurrencyProvider } from '@/lib/currency-context';
import { CartProvider } from '@/lib/cart-context';
import { RecentlyViewedProvider } from '@/lib/recently-viewed';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'LUXE IMPORTS — Global Luxury. Delivered.',
    template: '%s | LUXE IMPORTS',
  },
  description:
    'Bespoke sourcing, import, export and international logistics for premium automobiles, aircraft and marine vessels.',
  keywords: [
    'luxury car import',
    'private jet sourcing',
    'yacht import',
    'luxury vehicle logistics',
    'international car shipping',
    'automobile import',
    'superyacht brokerage',
    'aviation acquisition',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'LUXE IMPORTS',
    title: 'LUXE IMPORTS — Global Luxury. Delivered.',
    description:
      'Bespoke sourcing, import, export and international logistics for premium automobiles, aircraft and marine vessels.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXE IMPORTS — Global Luxury. Delivered.',
    description:
      'Bespoke sourcing, import, export and international logistics for premium automobiles, aircraft and marine vessels.',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LUXE IMPORTS',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#060606',
};

export default function RootLayout({
  children,
}: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-dark text-white antialiased">
        <CurrencyProvider>
          <CartProvider>
            <RecentlyViewedProvider>
              <Navbar />
              <main className="flex-1 pb-16 lg:pb-0">{children}</main>
              <Footer />
              <BottomNav />
              <PWAInstall />
            </RecentlyViewedProvider>
          </CartProvider>
        </CurrencyProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#141414',
              color: '#fff',
              border: '1px solid rgba(201, 168, 108, 0.2)',
              borderRadius: '0',
            },
          }}
        />
      </body>
    </html>
  );
}
