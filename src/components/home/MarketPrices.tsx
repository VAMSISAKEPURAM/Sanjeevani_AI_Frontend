'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

// Mock data for Andhra Pradesh / Telangana markets
const MARKET_DATA = [
  {
    id: 1,
    crop: 'Tomato',
    market: 'Madanapalle',
    price: 3200,
    trend: 'up',
  },
  {
    id: 2,
    crop: 'Paddy (Sona Masoori)',
    market: 'Nellore',
    price: 2450,
    trend: 'up',
  },
  {
    id: 3,
    crop: 'Groundnut',
    market: 'Anantapur',
    price: 6800,
    trend: 'down',
  },
  {
    id: 4,
    crop: 'Chilli (Teja)',
    market: 'Guntur',
    price: 22000,
    trend: 'stable',
  },
  {
    id: 5,
    crop: 'Cotton',
    market: 'Adilabad',
    price: 7100,
    trend: 'down',
  },
  {
    id: 6,
    crop: 'Turmeric',
    market: 'Nizamabad',
    price: 6500,
    trend: 'up',
  },
  {
    id: 7,
    crop: 'Mango (Benishan)',
    market: 'Tirupati',
    price: 4500,
    trend: 'up',
  },
  {
    id: 8,
    crop: 'Onion',
    market: 'Kurnool',
    price: 1800,
    trend: 'down',
  },
];

export default function MarketPrices() {
  const { t } = useTranslation();

  return (
    <section className="py-8 bg-green-50 border-y border-green-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          {t.marketPrices.title}
        </h2>
      </div>

      <div className="flex overflow-x-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-green-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-green-50 to-transparent z-10" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {/* Doubled data for seamless loop */}
          {[...MARKET_DATA, ...MARKET_DATA].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="inline-flex flex-col bg-white p-4 rounded-xl shadow-sm border border-green-100 min-w-[200px]"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-gray-800">{item.crop}</span>
                {item.trend === 'up' && (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                )}
                {item.trend === 'down' && (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                {item.trend === 'stable' && (
                  <Minus className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="text-sm text-gray-500 mb-1">{item.market}</div>
              <div className="font-mono text-lg font-bold text-green-700">
                ₹{item.price.toLocaleString()}
                <span className="text-xs text-gray-400 font-sans ml-1">
                  {t.marketPrices.quintal}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 mt-4 text-center">
        <p className="text-xs text-green-600/60 italic">
          * {t.marketPrices.disclaimer}
        </p>
      </div>
    </section>
  );
}
