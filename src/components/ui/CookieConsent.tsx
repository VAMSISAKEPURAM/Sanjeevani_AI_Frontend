'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-green-100 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-green-100 p-3 rounded-full shrink-0">
                  <Cookie className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {t.cookieConsent.message}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  onClick={handleDecline}
                  className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {t.cookieConsent.decline}
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 shadow-lg shadow-green-200 transition-all transform hover:scale-105"
                >
                  {t.cookieConsent.accept}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
