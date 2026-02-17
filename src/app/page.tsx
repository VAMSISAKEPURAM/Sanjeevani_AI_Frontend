import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';

import SupportedCrops from '@/components/home/SupportedCrops';
import MarketPrices from '@/components/home/MarketPrices';

export const metadata: Metadata = {
  title: 'Home | Sanjeevani AI',
  description:
    'Welcome to Sanjeevani AI. Detect crop diseases instantly and get expert advice to protect your harvest.',
};

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-0">
      <Hero />
      {/* <MarketPrices /> */}
      <Features />
      <SupportedCrops />
    </div>
  );
}
