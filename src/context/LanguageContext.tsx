'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { translations, Language } from '@/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved language from local storage on mount
  useEffect(() => {
    setTimeout(() => {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && ['en', 'hi', 'te'].includes(savedLang)) {
        setLanguage(savedLang);
      }
      setIsInitialized(true);
    }, 0);
  }, []);

  // Save language to local storage when changed
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('language', language);
    }
  }, [language, isInitialized]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
