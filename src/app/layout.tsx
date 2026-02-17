import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import CookieConsent from '@/components/ui/CookieConsent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: {
    default: 'Sanjeevani AI - Smart Crop Disease Detection',
    template: '%s | Sanjeevani AI',
  },
  description:
    'AI-powered crop health analysis and pesticide recommendation system. Protect your crops with instant disease detection and expert advice.',
  keywords: [
    'Agriculture',
    'AI',
    'Crop Disease',
    'Farming',
    'Smart Farming',
    'Pesticides',
    'Organic Farming',
    'Sanjeevani',
  ],
  authors: [{ name: 'Sanjeevani Team' }],
  creator: 'Sanjeevani AI',
  metadataBase: new URL('http://localhost:3000'), // Replace with actual domain in production
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3000',
    title: 'Sanjeevani AI - Smart Crop Disease Detection',
    description:
      'AI-powered crop health analysis and pesticide recommendation system.',
    siteName: 'Sanjeevani AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanjeevani AI - Smart Crop Disease Detection',
    description:
      'AI-powered crop health analysis and pesticide recommendation system.',
    creator: '@sanjeevani_ai',
  },
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
